import { Op } from "sequelize";
import User from "./user.model.js";

class UserRepository {
  async findByEmail(email) {
    return await User.findOne({
      where: {
        email: {
          [Op.eq]: email,
          [Op.ne]: null,
        },
      },
    });
  }

  async findById(id) {
    return await User.findByPk(id);
  }

  build(data) {
    return User.build(data);
  }

  async save(user) {
    return await user.save();
  }

  async upsert(data) {
    return await User.upsert(data, {
      validate: false,
    });
  }

  async findByIdWithoutRole(id) {
    return await User.findByPk(id, {
      attributes: {
        exclude: ["role", "password"],
      },
    });
  }
}

export default new UserRepository();