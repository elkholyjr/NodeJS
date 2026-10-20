import Post from "./post.model.js";
import Comment from "../comments/comment.model.js";
import User from "../users/user.model.js";
import { fn, col } from "sequelize";

class PostRepository {
  async create(data) {
    const post = new Post(data);
    return await post.save();
  }

  async findOwnedPost(postId, userId) {
    return await Post.findOne({
      where: {
        id: postId,
        userId,
      },
    });
  }

  async findAllDetails() {
    return await Post.findAll({
      attributes: ["id", "title"],
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
        {
          model: Comment,
          attributes: ["id", "content"],
        },
      ],
    });
  }

  async findAllWithCommentCount() {
    return await Post.findAll({
      attributes: [
        "id",
        "title",
        "content",
        "userId",
        [fn("COUNT", col("Comments.id")), "commentCount"],
      ],
      include: [
        {
          model: Comment,
          attributes: [],
          required: false,
        },
      ],
      group: [
        "Post.id",
        "Post.title",
        "Post.content",
        "Post.userId",
        "Post.createdAt",
        "Post.updatedAt",
        "Post.deletedAt",
      ],
    });
  }

  async delete(post) {
    return await post.destroy();
  }
}

export default new PostRepository();