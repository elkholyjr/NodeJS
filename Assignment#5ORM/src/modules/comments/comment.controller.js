import commentService from "./comment.service.js";

class CommentController {
  async createBulk(req, res, next) {
    try {
      const comments = Array.isArray(req.body)
        ? req.body
        : req.body.comments;

      if (!Array.isArray(comments) || comments.length === 0) {
        return res.status(400).json({
          message: "A non-empty comments array is required",
        });
      }

      const result = await commentService.createBulk(comments);

      res.status(201).json({
        message: "Comments created successfully",
        comments: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateComment(req, res, next) {
    try {
      const { userId, content } = req.body;

      if (userId == null || typeof content !== "string" || !content.trim()) {
        return res.status(400).json({
          message: "userId and non-empty content are required",
        });
      }

      const comment = await commentService.updateComment(
        req.params.commentId,
        userId,
        content
      );

      res.status(200).json({
        message: "Comment updated successfully",
        comment,
      });
    } catch (error) {
      next(error);
    }
  }

  async findOrCreateComment(req, res, next) {
    try {
      const { postId, userId, content } = req.body;

      if (
        postId == null ||
        userId == null ||
        typeof content !== "string" ||
        !content.trim()
      ) {
        return res.status(400).json({
          message: "postId, userId, and content are required",
        });
      }

      const [comment, created] =
        await commentService.findOrCreateComment({
          postId,
          userId,
          content,
        });

      res.status(created ? 201 : 200).json({
        message: created
          ? "Comment created successfully"
          : "Existing comment found",
        created,
        comment,
      });
    } catch (error) {
      next(error);
    }
  }

  async searchComments(req, res, next) {
    try {
      const result = await commentService.searchComments(
        req.query.word
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  // GET /comments/newest/:postId
  async getNewestComments(req, res, next) {
    try {
      const comments = await commentService.getNewestComments(
        req.params.postId
      );

      res.status(200).json({ comments });
    } catch (error) {
      next(error);
    }
  }

  async getCommentDetails(req, res, next) {
    try {
      const comment = await commentService.getCommentDetails(
        req.params.id
      );

      if (!comment) {
        return res.status(404).json({
          message: "Comment not found",
        });
      }

      res.status(200).json({ comment });
    } catch (error) {
      next(error);
    }
  }
}

export default new CommentController();