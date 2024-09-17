const FeaturedGallery = require("../../models/bridgingModels/gallery");
const imageUploader2 = require("../../utils/imageUploader2");

// Get all featured galleries
const getAllFeaturedGalleries = async (req, res) => {
  try {
    const galleries = await FeaturedGallery.find();
    res.status(200).json(galleries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single featured gallery by ID
const getFeaturedGalleryById = async (req, res) => {
  try {
    const gallery = await FeaturedGallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Gallery not found" });
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new featured gallery
const createFeaturedGallery = async (req, res) => {
  try {
    const galleryImage = req.files["gallery_image"]
      ? await imageUploader2(req.files["gallery_image"][0])
      : null;

    const newGallery = await FeaturedGallery.create({
      gallery_name: req.body.gallery_name || null,
      gallery_date: req.body.gallery_date || null,
      gallery_country: req.body.gallery_country || null,
      gallery_city: req.body.gallery_city || null,
      gallery_host: req.body.gallery_host || null,
      gallery_description: req.body.gallery_description || null,
      gallery_featured_artists1: req.body.gallery_featured_artists1 || null,
      gallery_featured_artists2: req.body.gallery_featured_artists2 || null,
      gallery_featured_artists3: req.body.gallery_featured_artists3 || null,
      gallery_image: galleryImage, // Include gallery_image here
    });

    res.status(200).json({
      success: true,
      message: "Gallery created successfully",
      data: newGallery,
    });
  } catch (error) {
    console.error("Error in createFeaturedGallery:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create gallery",
      error: error.message,
    });
  }
};

// Update a featured gallery by ID
const updateFeaturedGallery = async (req, res) => {
  const galleryId = req.params.id;

  try {
    let updatedData = {
      gallery_name: req.body.gallery_name,
      gallery_date: req.body.gallery_date,
      gallery_country: req.body.gallery_country,
      gallery_city: req.body.gallery_city,
      gallery_host: req.body.gallery_host,
      gallery_description: req.body.gallery_description,
      gallery_featured_artists1: req.body.gallery_featured_artists1,
      gallery_featured_artists2: req.body.gallery_featured_artists2,
      gallery_featured_artists3: req.body.gallery_featured_artists3,
    };

    if (req.files) {
      if (req.files["gallery_image"]) {
        updatedData.gallery_image = await imageUploader2(
          req.files["gallery_image"][0]
        );
      }
    }

    const updatedGallery = await FeaturedGallery.findByIdAndUpdate(
      galleryId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedGallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    res.json(updatedGallery);
  } catch (error) {
    console.error("Error while updating gallery:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete a featured gallery by ID
const deleteFeaturedGallery = async (req, res) => {
  try {
    const gallery = await FeaturedGallery.findByIdAndDelete(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }
    res.status(200).json({ message: "Gallery deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteAllGalleries = async (req, res) => {
  try {
    const result = await FeaturedGallery.deleteMany({});
    res.json({ message: "All Galleries deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllFeaturedGalleries,
  getFeaturedGalleryById,
  createFeaturedGallery,
  updateFeaturedGallery,
  deleteFeaturedGallery,
  deleteAllGalleries,
};
