const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors.map((error) => error.message),
    });
  }

  // Unique constraint errors (e.g., duplicate email)
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      message: "Resource already exists",
      errors: err.errors.map((error) => error.message),
    });
  }

  // Foreign key constraint errors
  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      message: "Invalid foreign key reference",
    });
  }

  // Custom application errors
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message:
      statusCode === 500
        ? "Internal server error"
        : err.message,
  });
};

export default errorHandler;