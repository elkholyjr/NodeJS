import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkPasswordLength(value) {
          if (typeof value !== "string" || value.length <= 6) {
            throw new Error(
              "Password must be greater than 6 characters"
            );
          }
        },
      },
    },

    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    timestamps: true,

    hooks: {
      beforeCreate(user) {
        if (
          typeof user.name !== "string" ||
          user.name.trim().length <= 2
        ) {
          throw new Error(
            "Name must be greater than 2 characters"
          );
        }
      },
    },
  }
);

export default User;