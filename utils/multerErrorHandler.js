const multer = require("multer");

const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("Multer Error:", err);
    return res.status(400).json({
      success: false,
      message: "Multer error occurred when uploading.",
      error: err.message,
    });
  } else if (err) {
    console.error("Unknown Error:", err);
    return res.status(500).json({
      success: false,
      message: "An unknown error occurred when uploading.",
      error: err.message,
    });
  }
  next();
};

module.exports = multerErrorHandler;
