import express, { Request, Response, Router } from "express";
import prisma from "../config/prisma.config";
import { PostSchema } from "../libs/postValidator";
import { authMiddleware } from "../middleware";
import { upload } from "../middlewares/multer.middleware";
import { uploadImg } from "../config/cloudinary";
import fs from "fs";

interface CustomRequest extends Request {
  userId?: string;
}

export const blogRouter = Router();
blogRouter.use(express.json());
blogRouter.use(authMiddleware);

blogRouter.post(
  "/",
  upload.single("image"),
  async (req: CustomRequest, res: Response) => {
    const { title, content, tags } = req.body;
    const result = PostSchema.safeParse(req.body);
    const userId = req.userId ?? "";
    if (!result.success) {
      return res.status(400).json({
        message: result.error.errors[0].message,
      });
    }
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      let imgUrl = null;
      if (req.file) {
        try {
          imgUrl = await uploadImg(req.file.path ?? null);
          await fs.unlinkSync(req.file.path); 
        } catch (error) {
          console.error("Error uploading image or deleting file:", error);
          return res.status(500).json({
            message: "Error uploading image or deleting file",
          });
        }
      }

      const blog = await prisma.post.create({
        data: {
          title,
          content,
          authorId: userId,
          imgUrl: imgUrl ?? "",
        },
      });

      if(tags && Array.isArray(tags)){
        for(const tagName of tags){
          let tag = await prisma.tag.findUnique({
            where: {
              name : tagName
            }
          })
          if(!tag){
            tag = await prisma.tag.create({
              data: {
                name: tagName
              }
            })
          }
          await prisma.postTag.create({
            data: {
              postId: blog.id,
              tagId: tag.id
            }
          })
        }
      }

      return res.status(201).json({
        id: blog.id,
      });
    } catch (error) {
      console.error("Error creating post:", error);
      return res.status(500).json({ error: "Failed to create post" });
    }
  },
);

blogRouter.get("/id", async (req: CustomRequest, res: Response) => {
  const userId = req.userId ?? "";
  const response = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    select: {
      title: true,
      content: true,
      imgUrl: true,
    },
  });
  if (!response) {
    return res.status(401).json({
      message: "Unable to fetch the details for the user",
    });
  } else {
    return res.status(200).json({
      message: "User Found",
      response,
    });
  }
});

blogRouter.put("/", upload.single("image"), async (req: CustomRequest, res: Response) => {
  const body = req.body;
  const userId = req.userId ?? "";
  const imgUrl = req.file ? await uploadImg(req.file.path) : null;
  await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
      imgUrl: body.imgUrl,
    },
  });
  return res.status(200).json({
    message: "Updated Post",
  });
});

blogRouter.get("/name", async (req: CustomRequest, res) => {
  try {
    const name = await prisma.user.findFirst({
      where: {
        id: req.userId,
      },
      select: {
        email: true,
        name: true,
      },
    });

    res.status(200).json(name);
  } catch (e) {
    console.error("Error fetching user name:", e);
    res.status(500).json({ error: "Failed to fetch user name" });
  }
});

blogRouter.get("/bulk", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
      imgUrl: true,
      PostTag: {
        select: {
          tag: {
            select: {
              name: true
            }
          }
        }
      }
    },
    take: limit,
    skip: offset,
  });
  return res.status(200).json(posts);
});

blogRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({ error: "Failed to fetch post" });
  }
});
