import { Op } from "sequelize";
import Comment from "./comment.model.js";
import User from "../users/user.model.js";
import Post from "../posts/post.model.js";

class CommentRepository {
  async bulkCreate(comments) {
    return await Comment.bulkCreate(comments);
  }

  async findOwnedComment(commentId, userId) {
    return await Comment.findOne({
      where: {
        id: commentId,
        userId,
      },
    });
  }

  async findOrCreate(data) {
    return await Comment.findOrCreate({
      where: {
        postId: data.postId,
        userId: data.userId,
        content: data.content,
      },
      defaults: data,
    });
  }

  async searchByWord(word) {
    const where = {
      content: {
        [Op.like]: `%${word}%`,
      },
    };

    const comments = await Comment.findAll({ where });
    const count = await Comment.count({ where });

    return { comments, count };
  }

  async findNewestByPost(postId) {
    return await Comment.findAll({
      where: { postId },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });
  }

  async findDetailsById(id) {
    return await Comment.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
        {
          model: Post,
          attributes: ["id", "title", "content"],
        },
      ],
    });
  }

  async updateContent(comment, content) {
    comment.content = content;
    return await comment.save();
  }
}

export default new CommentRepository();