import User from "../modules/users/user.model.js";
import Post from "../modules/posts/post.model.js";
import Comment from "../modules/comments/comment.model.js";

User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

export { User, Post, Comment };