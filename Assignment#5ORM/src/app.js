import express from "express";
import userRoutes from "./modules/users/user.routes.js";
import userController from "./modules/users/user.controller.js";
import errorHandler from "./middilewares/errorHandler.js"
import postRoutes from "./modules/posts/post.routes.js";
import commentRoutes from "./modules/comments/comment.routes.js";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.get("/user/:id", (req, res, next) =>
  userController.findById(req, res, next)
);

app.use(errorHandler);

export default app;