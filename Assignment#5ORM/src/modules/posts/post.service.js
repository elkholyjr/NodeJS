import postRepository from "./post.repository.js";

class PostService {
  async createPost(data) {
    return await postRepository.create(data);
  }

  async deletePost(postId, userId) {
    const post = await postRepository.findOwnedPost(
      postId,
      userId
    );

    if (!post) {
      const error = new Error(
        "Post not found or you are not its owner"
      );
      error.statusCode = 404;
      throw error;
    }

    await postRepository.delete(post);

    return { message: "Post deleted successfully" };
  }

  async getPostDetails() {
    return await postRepository.findAllDetails();
  }

  async getPostsWithCommentCount() {
    return await postRepository.findAllWithCommentCount();
  }
}

export default new PostService();