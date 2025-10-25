import { auth } from "@/lib/auth";
import { generateSlug } from "@/lib/generateSlug";
import { prisma } from "@/lib/prisma";
import { PostSchema } from "@/lib/validate";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

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
