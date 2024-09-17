// cvRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Jobseekers = require("../../controllers/jobblitzControllers/jobseekerController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.jobseekId}_${file.originalname}`); // Set the filename
  },
});

const upload = multer({ storage: storage });

router.post("/:jobseekId", upload.single("cvFile"), async (req, res) => {
  try {
    // Handle the uploaded file here
    const uploadedCVPath = `/uploads/${req.file.filename}`;

    // Update the jobseeker document with the uploaded CV path
    await Jobseekers.findByIdAndUpdate(
      req.params.jobseekId,
      { cvjobseek: uploadedCVPath },
      { new: true }
    );

    res.status(200).json({ uploadedCVPath });
  } catch (error) {
    console.error("Error uploading CV file:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
