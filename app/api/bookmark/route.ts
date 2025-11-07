import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BookmarkSchema } from "@/lib/validate";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsedData = BookmarkSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: parsedData.error },
        { status: 400 }
      );
    }

    const { postId } = parsedData.data;

    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
    });

    if (existingBookmark) {
      return NextResponse.json(
        { message: "Post already bookmarked", bookmark: existingBookmark },
        { status: 200 }
      );
    }

    const bookmark = await prisma.bookmark.create({
      data: {
        userId: session.user.id,
        postId,
      },
    });

    return NextResponse.json(
      { message: "Post bookmarked successfully", bookmark },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to bookmark post", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsedData = BookmarkSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: parsedData.error },
        { status: 400 }
      );
    }

    const { postId } = parsedData.data;

    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
    });

    if (!existingBookmark) {
      return NextResponse.json(
        { message: "Post not bookmarked" },
        { status: 200 }
      );
    }

    const bookmark = await prisma.bookmark.delete({
      where: { id: existingBookmark.id },
    });

    return NextResponse.json(
      { message: "Post unbookmarked successfully", bookmark },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to unbookmark post", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "User not authenticated",
        },
        {
          status: 401,
        }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const skip = (page - 1) * limit;

    const [bookmarks, total] = await Promise.all([
      prisma.bookmark.findMany({
        where: {
          userId: session.user.id,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          post: {
            include: {
              Tags: {
                select: {
                  id: true,
                  name: true,
                },
              },
              author: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                },
              },
              _count: {
                select: {
                  Like: true,
                  Bookmark: true,
                  Comment: true,
                },
              },
              Like: {
                where: {
                  userId: session.user.id,
                },
                select: {
                  id: true,
                },
              },
              Bookmark: {
                where: { userId: session.user.id },
                select: { id: true },
              },
            },
          },
        },
      }),
      prisma.bookmark.count({ where: { userId: session.user.id } }),
    ]);

    const data = bookmarks.map((b) => {
      const p = b.post;
      const { Like: likeArr, ...rest } = p;
      return {
        ...rest,
        isBookmarked: true,
        isLiked: likeArr.length > 0,
      };
    });

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data,
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookmarks" },
      { status: 500 }
    );
  }
}
