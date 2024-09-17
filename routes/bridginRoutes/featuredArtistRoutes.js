const express = require("express");
const {
  getFeaturedArtists,
  addFeaturedArtist,
  removeFeaturedArtist,
  editFeaturedArtist,
} = require("../../controllers/bridginControllers/featuredArtistController");

const router = express.Router();

router.get("/", getFeaturedArtists);
router.post("/", addFeaturedArtist);
router.delete("/:id", removeFeaturedArtist);
router.put("/:id", editFeaturedArtist);

module.exports = router;
