import { Router } from "express";
import commentController from "./comment.controller.js";

const router = Router();

router.post("/find-or-create", (req, res, next) =>
  commentController.findOrCreateComment(req, res, next)
);

router.get("/search", (req, res, next) =>
  commentController.searchComments(req, res, next)
);

router.get("/newest/:postId", (req, res, next) =>
  commentController.getNewestComments(req, res, next)
);

router.get("/details/:id", (req, res, next) =>
  commentController.getCommentDetails(req, res, next)
);

router.patch("/update/:commentId", (req, res, next) =>
  commentController.updateComment(req, res, next)
);

router.post("/createBulk", (req, res, next) =>
  commentController.createBulk(req, res, next)
);

export default router;