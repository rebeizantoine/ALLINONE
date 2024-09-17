const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  getAllFeaturedEmployers,
  getFeaturedEmployerByID,
  addFeaturedEmployer,
  deleteFeaturedEmployer,
  updateFeaturedEmployer,
} = require("../../controllers/jobblitzControllers/featuredemployersController");

router.get("/", getAllFeaturedEmployers);
router.get("/getByID/:id", getFeaturedEmployerByID);
router.post(
  "/featuredEmployers",
  upload.single("employerImage"),
  addFeaturedEmployer
);
router.put(
  "/updateFeaturedEmployer/:id",
  upload.single("employerImage"),
  updateFeaturedEmployer
);
router.delete("/deleteFeaturedEmployer/:id", deleteFeaturedEmployer);

module.exports = router;
