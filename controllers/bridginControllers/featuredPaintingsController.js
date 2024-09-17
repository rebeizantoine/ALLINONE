const FeaturedP = require("../../models/bridgingModels/featuredPaintings");
const imageUploader2 = require("../../utils/imageUploader2");

const getAllFeaturedPaintings = async (req, res) => {
  try {
    const featuredPaintings = await FeaturedP.find();
    res.status(200).json(featuredPaintings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFeaturedPainting = async (req, res) => {
  try {
    const feature_image_of_painting = req.files["feature_image_of_painting"]
      ? await imageUploader2(req.files["feature_image_of_painting"][0])
      : null;

    const newFeaturedPainting = await FeaturedP.create({
      feature_artist: req.body.feature_artist || null,
      feature_artist_name: req.body.feature_artist_name || null,
      feature_artist_last_name: req.body.feature_artist_last_name || null,
      feature_genre: req.body.feature_genre || null,
      feature_tag1: req.body.feature_tag1 || null,
      feature_tag2: req.body.feature_tag2 || null,
      feature_tag3: req.body.feature_tag3 || null,
      feature_year_of_painting: req.body.feature_year_of_painting || null,
      feature_name_of_painting: req.body.feature_name_of_painting || null,
      feature_image_of_painting: feature_image_of_painting,
      feature_description_of_painting:
        req.body.feature_description_of_painting || null,
    });

    res.status(200).json({
      success: true,
      message: "Featured painting created successfully",
      data: newFeaturedPainting,
    });
  } catch (error) {
    console.error("Error in createFeaturedPainting:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create featured painting",
      error: error.message,
    });
  }
};

const updateFeaturedPainting = async (req, res) => {
  const paintingId = req.params.id;

  try {
    let updatedData = {
      feature_artist: req.body.feature_artist,
      feature_artist_name: req.body.feature_artist_name,
      feature_artist_last_name: req.body.feature_artist_last_name,
      feature_genre: req.body.feature_genre,
      feature_tag1: req.body.feature_tag1,
      feature_tag2: req.body.feature_tag2,
      feature_tag3: req.body.feature_tag3,
      feature_year_of_painting: req.body.feature_year_of_painting,
      feature_name_of_painting: req.body.feature_name_of_painting,
      feature_description_of_painting: req.body.feature_description_of_painting,
    };

    if (req.files && req.files["feature_image_of_painting"]) {
      updatedData.feature_image_of_painting = await imageUploader2(
        req.files["feature_image_of_painting"][0]
      );
    }

    const updatedFeaturedPainting = await FeaturedP.findByIdAndUpdate(
      paintingId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedFeaturedPainting) {
      return res.status(404).json({ message: "Featured painting not found" });
    }

    res.json(updatedFeaturedPainting);
  } catch (error) {
    console.error("Error while updating Featured Painting:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteFeaturedPainting = async (req, res) => {
  try {
    const painting = await FeaturedP.findByIdAndDelete(req.params.id);
    if (!painting) {
      return res.status(404).json({ message: "Featured painting not found" });
    }
    res.status(200).json({ message: "Featured painting deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllFeaturedPaintings,
  createFeaturedPainting,
  updateFeaturedPainting,
  deleteFeaturedPainting,
};
