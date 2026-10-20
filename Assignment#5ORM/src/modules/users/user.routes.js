import { Router } from "express";
import userController from "./user.controller.js";

const router = Router();

router.post("/signup", (req, res, next) =>
  userController.signup(req, res, next)
);

router.put("/upsert/:id", (req, res, next) =>
  userController.createOrUpdate(req, res, next)
);

router.get("/find/by-email", (req, res, next) =>
  userController.findByEmail(req, res, next)
);

router.get("/find/:id", (req, res, next) =>
  userController.findById(req, res, next)
);

export default router;