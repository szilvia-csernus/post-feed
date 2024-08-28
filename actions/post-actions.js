"use server";

import { redirect } from "next/navigation";
import { storePost } from "@/lib/posts";
import { uploadImage } from "@/lib/cloudinary";

export async function createPost(prevState, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  }

  if (!content || content.trim().length === 0) {
    errors.push("Content is required");
  }

  if (!image || image.size === 0) {
    errors.push("Image is required");
  }

  if (errors.length > 0) {
    return { errors };
  }

  let imageURL;

  try {
    imageURL = await uploadImage(image);
  }
  catch (error) {
    throw new Error('Image upload failed, post not created. Please try again later.');
  }

  await storePost({
    imageUrl: imageURL,
    title,
    content,
    userId: 1, // dummy user ID
  });

  redirect("/feed");
}
