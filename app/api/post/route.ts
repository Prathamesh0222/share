import { auth } from "@/lib/auth";
import { generateSlug } from "@/lib/generateSlug";
import { prisma } from "@/lib/prisma";
import { PostSchema } from "@/lib/validate";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "User Not Authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsedData = PostSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: parsedData.error },
        { status: 400 }
      );
    }

    const { title, content, slug, tags, imageUrl } = parsedData.data;

    const tagsOperations = tags?.map((tag: string) => ({
      where: {
        name: tag.trim().toLowerCase(),
      },
      create: {
        name: tag.trim().toLowerCase(),
      },
    }));

    const finalSlug = slug?.trim() || generateSlug(title);

    const existingPost = await prisma.post.findUnique({
      where: { slug: finalSlug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        slug: finalSlug,
        imageUrl,
        authorId: session.user.id,
        Tags: tagsOperations?.length
          ? { connectOrCreate: tagsOperations }
          : undefined,
      },
      include: {
        Tags: true,
      },
    });

    return NextResponse.json(
      { message: "Post created successfully", post },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create post", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
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
          ...(session?.user && {
            Bookmark: {
              where: {
                userId: session.user.id,
              },
              select: {
                id: true,
              },
            },
          }),
        },
      }),
      prisma.post.count(),
    ]);

    const postsWithBookmarkStatus = posts.map((post) => {
      const { Bookmark, ...rest } = post;
      return {
        ...rest,
        isBookmarked: session?.user
          ? Array.isArray(Bookmark) && Bookmark.length > 0
          : false,
      };
    });

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: postsWithBookmarkStatus,
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    });
  } catch (error) {
    console.error("Error while fetching posts");
    return NextResponse.json(
      { error: "Error while fetching posts" },
      { status: 500 }
    );
  }
}
