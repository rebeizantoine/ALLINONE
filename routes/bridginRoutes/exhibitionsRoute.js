const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  getAllExhibitions,
  getExhibitionById,
  createExhibition,
  updateExhibition,
  deleteExhibition,
  deleteAllExhibitions,
  getExhibitionByName,
} = require("../../controllers/bridginControllers/exhibitionsController");

// Get all exhibitions
router.get("/", getAllExhibitions);

// Get a single exhibition by ID
router.get("/:id", getExhibitionById);

// Get a single exhibition by name
router.get("/exhibition/:exhibition_name", getExhibitionByName);

// Create a new exhibition
router.post(
  "/exhibition/add",
  upload.fields([{ name: "exhibition_featured1image", maxCount: 1 }]),
  createExhibition
);

// Update an exhibition by ID
router.put(
  "/:id",
  upload.fields([{ name: "exhibition_featured1image", maxCount: 1 }]),
  updateExhibition
);

// Delete all exhibitions
router.delete("/deleteall", deleteAllExhibitions);

// Delete a single exhibition by ID
router.delete("/:id", deleteExhibition);

module.exports = router;
