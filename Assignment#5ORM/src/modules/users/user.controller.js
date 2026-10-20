import userService from "./user.service.js";

class UserController {
  async signup(req, res, next) {
    try {
      const user = await userService.signup(req.body);

      const result = user.toJSON();
      delete result.password;

      res.status(201).json({
        message: "User created successfully",
        user: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async createOrUpdate(req, res, next) {
    try {
      const data = {
        ...req.body,
        id: Number(req.params.id),
      };

      const [user, created] = await userService.createOrUpdate(data);

      res.status(200).json({
        message: created
          ? "User created successfully"
          : "User updated successfully",
        userId: user?.id ?? data.id,
      });
    } catch (error) {
      next(error);
    }
  }

  async findByEmail(req, res, next) {
    try {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({
          message: "Email is required",
        });
      }

      const user = await userService.findByEmail(email);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const result = user.toJSON();
      delete result.password;

      res.status(200).json({ user: result });
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const user = await userService.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();