const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  getAllFeaturedGalleries,
  getFeaturedGalleryById,
  createFeaturedGallery,
  updateFeaturedGallery,
  deleteFeaturedGallery,
  deleteAllGalleries,
} = require("../../controllers/bridginControllers/galleryController");

// Get all featured galleries
router.get("/", getAllFeaturedGalleries);

// Get a single featured gallery by ID
router.get("/:id", getFeaturedGalleryById);

// Create a new featured gallery
router.post(
  "/",
  upload.fields([{ name: "gallery_image", maxCount: 1 }]),
  createFeaturedGallery
);

// Update a featured gallery by ID
router.put(
  "/:id",
  upload.fields([{ name: "gallery_image", maxCount: 1 }]),
  updateFeaturedGallery
);

router.delete("/all", deleteAllGalleries);
router.delete("/:id", deleteFeaturedGallery);

module.exports = router;
