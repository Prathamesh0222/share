import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { slug } = await params;
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: { id: true, name: true, email: true, image: true },
        },
        Tags: true,
        _count: { select: { Like: true, Bookmark: true, Comment: true } },
        ...(session?.user.id && {
          Bookmark: {
            where: {
              userId: session!.user.id,
            },
            select: {
              id: true,
            },
          },
          Like: {
            where: {
              userId: session!.user.id,
            },
            select: {
              id: true,
            },
          },
        }),
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const { Bookmark, Like, ...rest } = post;
    return NextResponse.json({
      ...rest,
      isBookmarked: session?.user
        ? Array.isArray(Bookmark) && Bookmark.length > 0
        : false,
      isLiked: session?.user ? Array.isArray(Like) && Like.length > 0 : false,
    });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
