const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  getAllAboutDetails,
  createAboutDetails,
  updateAboutDetails,
  deleteAboutDetails,
} = require("../../controllers/bridginControllers/aboutController");

// GET all about details
router.get("/", getAllAboutDetails);

// POST create about details
router.post(
  "/about/add",
  upload.fields([
    { name: "aboutimg1", maxCount: 1 },
    { name: "aboutimg2", maxCount: 1 },
    { name: "aboutimg3", maxCount: 1 },
  ]),
  createAboutDetails
);

// PUT update about details
router.put(
  "/:id",
  upload.fields([
    { name: "aboutimg1", maxCount: 1 },
    { name: "aboutimg2", maxCount: 1 },
    { name: "aboutimg3", maxCount: 1 },
  ]),
  updateAboutDetails
);

// DELETE delete about details
router.delete("/:id", deleteAboutDetails);

module.exports = router;
