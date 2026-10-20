import postService from "./post.service.js";

class PostController {
  async createPost(req, res, next) {
    try {
      const post = await postService.createPost(req.body);

      res.status(201).json({
        message: "Post created successfully",
        post,
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({
          message: "userId is required",
        });
      }

      const result = await postService.deletePost(
        req.params.postId,
        userId
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getPostDetails(req, res, next) {
    try {
      const posts = await postService.getPostDetails();

      res.status(200).json({ posts });
    } catch (error) {
      next(error);
    }
  }

  async getPostsWithCommentCount(req, res, next) {
    try {
      const posts =
        await postService.getPostsWithCommentCount();

      res.status(200).json({ posts });
    } catch (error) {
      next(error);
    }
  }
}

export default new PostController();