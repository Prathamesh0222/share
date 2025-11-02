import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LikeSchema } from "@/lib/validate";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

    const body = await req.json();
    const parsedData = LikeSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: parsedData.error },
        { status: 400 }
      );
    }

    const { postId } = parsedData.data;

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
    });

    if (existingLike) {
      return NextResponse.json(
        { message: "Post already liked", like: existingLike },
        { status: 200 }
      );
    }

    const like = await prisma.like.create({
      data: {
        userId: session.user.id,
        postId,
      },
    });

    return NextResponse.json(
      { message: "Post liked successfully", like },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error liking post:", error);
    return NextResponse.json({ error: "Failed to like post" }, { status: 500 });
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
    const parsedData = LikeSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: parsedData.error },
        { status: 400 }
      );
    }

    const { postId } = parsedData.data;

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
    });

    if (!existingLike) {
      return NextResponse.json({ message: "Post not liked" }, { status: 200 });
    }

    const like = await prisma.like.delete({
      where: { id: existingLike.id },
    });

    return NextResponse.json(
      { message: "Post unliked successfully", like },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error unliking post:", error);
    return NextResponse.json(
      { error: "Failed to unlike post" },
      { status: 500 }
    );
  }
}
