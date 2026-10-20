import commentRepository from "./comment.repository.js";

class CommentService {
  async createBulk(comments) {
    return await commentRepository.bulkCreate(comments);
  }

  async updateComment(commentId, userId, content) {
    const comment = await commentRepository.findOwnedComment(
      commentId,
      userId
    );

    if (!comment) {
      const error = new Error(
        "Comment not found or you are not the owner"
      );
      error.statusCode = 404;
      throw error;
    }

    return await commentRepository.updateContent(comment, content);
  }

  async findOrCreateComment(data) {
    return await commentRepository.findOrCreate(data);
  }

  async searchComments(word) {
    if (!word || !word.trim()) {
      const error = new Error("Search word is required");
      error.statusCode = 400;
      throw error;
    }

    return await commentRepository.searchByWord(word.trim());
  }

  async getNewestComments(postId) {
    return await commentRepository.findNewestByPost(postId);
  }

  async getCommentDetails(id) {
    return await commentRepository.findDetailsById(id);
  }
}

export default new CommentService();