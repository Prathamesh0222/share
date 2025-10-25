import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  const { imageBase64 } = await req.json();

  const uploadResult = await cloudinary.uploader.upload(imageBase64, {
    folder: "blog_posts",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    max_file_size: 10 * 1024 * 1024,
  });

  return NextResponse.json({
    imageUrl: uploadResult.secure_url,
  });
}
