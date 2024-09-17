const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const imageUploader2 = require("../../utils/imageUploader2");

router.post("/upload-test", upload.single("test_image"), async (req, res) => {
  try {
    const imageUrl = await imageUploader2(req.file);
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    console.error("Test upload error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload image to Cloudinary",
      error: error.message,
    });
  }
});

module.exports = router;
