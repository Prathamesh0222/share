import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadImg = async (localFilePath: string) => {
  try {
    if (!localFilePath) return;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File uploaded to Cloudinary", response.secure_url);
    return response.secure_url;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.error("Error uploading file to Cloudinary", error);
    return null;
  }
};
