import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

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
