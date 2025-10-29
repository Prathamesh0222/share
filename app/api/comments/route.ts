import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CommentSchema } from "@/lib/validate";
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
    const parsedData = CommentSchema.safeParse(body);

    if (!parsedData.data) {
      return NextResponse.json(
        {
          error: "Input Validation Error",
        },
        {
          status: 411,
        }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        comment: parsedData.data.comment,
        authorId: session.user.id,
        postId: body.postId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(comment, {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      {
        error: "Failed to create comment",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    if (!postId) {
      return NextResponse.json(
        {
          error: "Post ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: {
          postId,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.comment.count({
        where: {
          postId,
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      comments,
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch comments",
      },
      {
        status: 500,
      }
    );
  }
}
