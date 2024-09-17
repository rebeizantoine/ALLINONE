const FeaturedArtist = require("../../models/bridgingModels/featuredArtist");
const Artists = require("../../models/bridgingModels/artists");

const getFeaturedArtists = async (req, res) => {
  try {
    // Ensure all artists are featured (if needed, depending on your application logic)
    // await ensureAllArtistsFeatured(); // Uncomment if this function is required

    // Find all featured artists and populate the artist field
    const featuredArtists = await FeaturedArtist.find().populate("artist");

    // Filter out any featured artists where the artist field is null or artist is not featured on the front
    const validFeaturedArtists = featuredArtists.filter(
      (fa) => fa.artist && fa.artist.featured_on_front
    );

    // Get the last 4 featured artists
    const limitedFeaturedArtists = validFeaturedArtists.slice(-4);

    res.status(200).json(limitedFeaturedArtists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addFeaturedArtist = async (req, res) => {
  const { artistId } = req.body;

  try {
    const artist = await Artists.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    const newFeaturedArtist = new FeaturedArtist({ artist: artistId });
    await newFeaturedArtist.save();

    res.status(201).json(newFeaturedArtist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFeaturedArtist = async (req, res) => {
  const { id } = req.params;

  try {
    const featuredArtist = await FeaturedArtist.findByIdAndDelete(id);
    if (!featuredArtist) {
      return res.status(404).json({ message: "Featured artist not found" });
    }

    res.status(200).json({ message: "Featured artist removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editFeaturedArtist = async (req, res) => {
  const { id } = req.params;
  const { fields } = req;

  const selected_for_front = fields.selected_for_front; // Extracting form-data field

  try {
    const featuredArtist = await FeaturedArtist.findById(id);
    if (!featuredArtist) {
      return res.status(404).json({ message: "Featured artist not found" });
    }

    // Update the selected_for_front field
    featuredArtist.selected_for_front = selected_for_front;

    // Save the updated document
    await featuredArtist.save();

    // Respond with the updated document
    res.status(200).json({
      message: "Featured artist updated successfully",
      featuredArtist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ensure all artists are featured
const ensureAllArtistsFeatured = async () => {
  try {
    const artists = await Artists.find();

    for (const artist of artists) {
      const existingFeaturedArtist = await FeaturedArtist.findOne({
        artist: artist._id,
      });
      if (!existingFeaturedArtist) {
        const newFeaturedArtist = new FeaturedArtist({ artist: artist._id });
        await newFeaturedArtist.save();
        console.log(
          `Featured artist added: ${artist.artist_name} ${artist.artist_lastname}`
        );
      } else {
        console.log(
          `Artist already featured: ${artist.artist_name} ${artist.artist_lastname}`
        );
      }
    }

    console.log("All artists have been featured.");
  } catch (error) {
    console.error("Error featuring artists:", error);
  }
};

module.exports = {
  getFeaturedArtists,
  addFeaturedArtist,
  removeFeaturedArtist,
  editFeaturedArtist,
};
