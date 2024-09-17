const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  getAllFeaturedPaintings,
  createFeaturedPainting,
  updateFeaturedPainting,
  deleteFeaturedPainting,
} = require("../../controllers/bridginControllers/featuredPaintingsController");

// GET all featured paintings
router.get("/", getAllFeaturedPaintings);

// POST create featured painting
router.post(
  "/add",
  upload.fields([{ name: "feature_image_of_painting", maxCount: 1 }]),
  createFeaturedPainting
);

// PUT update featured painting
router.put(
  "/:id",
  upload.fields([{ name: "feature_image_of_painting", maxCount: 1 }]),
  updateFeaturedPainting
);

// DELETE delete featured painting
router.delete("/:id", deleteFeaturedPainting);

module.exports = router;
