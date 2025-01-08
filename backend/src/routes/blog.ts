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

      let parsedTags: string[] = [];
      if (tags) {
        try {
          parsedTags = tags
            .split(",")
            .map((tag: string) => tag.trim())
            .filter((tag: string) => tag !== "");
        } catch (error) {
          console.error("Error parsing tags:", error);
          return res.status(400).json({ error: "Invalid tags format" });
        }
      }

      const blog = await prisma.post.create({
        data: {
          title,
          content,
          authorId: userId,
          imgUrl: imgUrl ?? "",
          published: new Date(),
        },
      });

      if (parsedTags.length > 0) {
        for (const tagName of parsedTags) {
          let tag = await prisma.tag.findUnique({
            where: {
              name: tagName,
            },
          });
          if (!tag) {
            tag = await prisma.tag.create({
              data: {
                name: tagName,
              },
            });
          }
          const existingPostTag = await prisma.postTag.findUnique({
            where: {
              postId_tagId: {
                postId: blog.id,
                tagId: tag.id,
              },
            },
          });
          if (!existingPostTag) {
            await prisma.postTag.create({
              data: {
                postId: blog.id,
                tagId: tag.id,
              },
            });
          }
        }
      }

      return res.status(201).json({
        id: blog.id,
      });
    } catch (error) {
      console.error("Error creating post:", error);
      return res.status(500).json({ error: "Failed to create post" });
    }
  }
);

blogRouter.post("/bookmark", async (req: CustomRequest, res: Response) => {
  const userId = req.userId ?? "";
  const postId = req.body.postId;

  if (!userId) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  if (!postId) {
    return res.status(400).json({ error: "Post ID is required" });
  }

  try {
    const bookmark = await prisma.bookmark.create({
      data: {
        userId,
        postId,
      },
    });
    return res.status(201).json(bookmark);
  } catch (error) {
    console.error("Error while creating bookmark: ", error);
    return res.status(500).json({ error: "Failed to create bookmark" });
  }
});

blogRouter.delete("/bookmark", async (req: CustomRequest, res: Response) => {
  const userId = req.userId ?? "";
  const postId = req.body.postId;

  if (!userId) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  if (!postId) {
    return res.status(400).json({ error: "Post ID is required" });
  }

  try {
    await prisma.bookmark.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    return res.status(200).json({ message: "Bookmark removed" });
  } catch (error) {
    console.error("Error removing bookmark", error);
    return res.status(500).json({
      error: "Failed to remove bookmark",
    });
  }
});

blogRouter.get("/bookmarks", async (req: CustomRequest, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({
      error: "Unauthorizted",
    });
  }

  try {
    const bookmarkedPost = await prisma.bookmark.findMany({
      where: {
        userId,
      },
      select: {
        post: {
          select: {
            id: true,
            title: true,
            content: true,
            imgUrl: true,
            published: true,
            author: {
              select: {
                name: true,
              },
            },
            Comment: {
              select: {
                content: true,
              },
            },
            PostTag: {
              select: {
                tag: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return res.status(200).json(bookmarkedPost);
  } catch (error) {
    console.error("Error while fetching bookmark: ", error);
    return res.status(500).json({
      error: "Failed to fetch bookmarks",
    });
  }
});

blogRouter.get("/id", async (req: CustomRequest, res: Response) => {
  const userId = req.userId ?? "";

  if (!userId) {
    return res.status(402).json({
      error: "Unauthorized",
    });
  }

  const response = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    select: {
      title: true,
      content: true,
      imgUrl: true,
      published: true,
      PostTag: {
        select: {
          tag: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      published: "desc",
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

blogRouter.put(
  "/",
  upload.single("image"),
  async (req: CustomRequest, res: Response) => {
    const body = req.body;
    const userId = req.userId ?? "";
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
  }
);

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

blogRouter.get("/bulk", async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 10;
  // const offset = (page - 1) * limit;
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
      published: true,
      imgUrl: true,
      PostTag: {
        select: {
          tag: {
            select: {
              name: true,
            },
          },
        },
      },
      Comment: {
        select: {
          content: true,
          addedAt: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      Bookmark: userId
        ? {
            where: {
              userId: userId,
            },
            select: {
              id: true,
            },
          }
        : false,
    },
    orderBy: {
      published: "desc",
    },
    // take: limit,
    // skip: offset,
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
        Comment: {
          select: {
            content: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
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

blogRouter.delete("/:id", async (req: CustomRequest, res: Response) => {
  const postId = req.params.postId;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        authorId: userId,
      },
    });

    return res.status(200).json({
      message: "Deleted post successful",
    });
  } catch (error) {
    console.error("Error deleting post: ", error);
    return res.status(500).json({
      error: "Error while deleting post",
    });
  }
});

blogRouter.post("/comment", async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { content, postId } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        userId,
        postId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.status(201).json(comment);
  } catch (error) {
    console.error("Error while adding comment", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});
