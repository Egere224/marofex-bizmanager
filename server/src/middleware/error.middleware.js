export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  // Log unexpected errors
  if (!err.isOperational) {
    console.error("🔥 Unexpected Error:", err);
  }

  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      success: false,
      status,
      message: err.message,
      stack: err.stack
    });
  }

  // Production-safe response
  if (err.isOperational) {
    return res.status(statusCode).json({
      success: false,
      status,
      message: err.message
    });
  }

  // Unknown error
  return res.status(500).json({
    success: false,
    status: "error",
    message: "Something went wrong"
  });
};