const mongoose = require("mongoose");

const featuredArtistSchema = new mongoose.Schema({
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artists",
    required: true,
  },
  featured_date: { type: Date, default: Date.now },
  selected_for_front: { type: Boolean, default: false },
});

module.exports = mongoose.model("FeaturedArtist", featuredArtistSchema);
