import { Router } from "express";
import postController from "./post.controller.js";

const router = Router();

router.post("/create", (req, res, next) =>
  postController.createPost(req, res, next)
);

router.delete("/delete/:postId", (req, res, next) =>
  postController.deletePost(req, res, next)
);

router.get("/details", (req, res, next) =>
  postController.getPostDetails(req, res, next)
);

router.get("/comment-count", (req, res, next) =>
  postController.getPostsWithCommentCount(req, res, next)
);

export default router;