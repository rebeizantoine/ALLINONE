const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the directory exists
const pdfDir = path.join(__dirname, "../uploads/pdfs");
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

// Multer configuration for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pdfDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
}).single("pdf");

exports.uploadPDF = (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: "Multer error occurred when uploading.",
        error: err.message,
      });
    } else if (err) {
      return res.status(500).json({
        success: false,
        message: "An unknown error occurred when uploading.",
        error: err.message,
      });
    }
    res.status(200).json({
      success: true,
      message: "PDF uploaded successfully",
      file: req.file,
    });
  });
};

exports.getPDF = (req, res) => {
  const filePath = path.join(pdfDir, req.params.filename);
  res.sendFile(filePath);
};
