const Exhibition = require("../../models/bridgingModels/exhibitions");
const imageUploader2 = require("../../utils/imageUploader2");

const getAllExhibitions = async (req, res) => {
  try {
    const exhibitions = await Exhibition.find();
    res.status(200).json(exhibitions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createExhibition = async (req, res) => {
  try {
    const exhibitionFeatured1Image = req.files["exhibition_featured1image"]
      ? await imageUploader2(req.files["exhibition_featured1image"][0])
      : null;

    const newExhibition = await Exhibition.create({
      exhibition_name: req.body.exhibition_name || null,
      exhibition_description: req.body.exhibition_description || null,
      exhibition_country: req.body.exhibition_country || null,
      exhibition_city: req.body.exhibition_city || null,
      exhibition_opening_hours: req.body.exhibition_opening_hours || null,
      exhibition_closing_hours: req.body.exhibition_closing_hours || null,
      exhibition_featured1name: req.body.exhibition_featured1name || null,
      exhibition_featured1image: exhibitionFeatured1Image || null,
      exhibition_featured2name: null,
      exhibition_featured2image: null,
      exhibition_featured3name: null,
      exhibition_featured3image: null,
      exhibition_day: req.body.exhibition_day || null,
      exhibition_month: req.body.exhibition_month || null,
      featured_on_front: req.body.featured_on_front || false,
    });

    res.status(200).json({
      success: true,
      message: "Exhibition created successfully",
      data: newExhibition,
    });
  } catch (error) {
    console.error("Error in createExhibition:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create exhibition",
      error: error.message,
    });
  }
};

const updateExhibition = async (req, res) => {
  const exhibitionId = req.params.id;

  try {
    let updatedData = {
      exhibition_name: req.body.exhibition_name,
      exhibition_description: req.body.exhibition_description,
      exhibition_country: req.body.exhibition_country,
      exhibition_city: req.body.exhibition_city,
      exhibition_opening_hours: req.body.exhibition_opening_hours,
      exhibition_closing_hours: req.body.exhibition_closing_hours,
      exhibition_featured1name: req.body.exhibition_featured1name,
      exhibition_featured2name: null,
      exhibition_featured3name: null,
      exhibition_day: req.body.exhibition_day,
      exhibition_month: req.body.exhibition_month,
      featured_on_front: req.body.featured_on_front,
    };

    if (req.files && req.files["exhibition_featured1image"]) {
      updatedData.exhibition_featured1image = await imageUploader2(
        req.files["exhibition_featured1image"][0]
      );
    }

    const updatedExhibition = await Exhibition.findByIdAndUpdate(
      exhibitionId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedExhibition) {
      return res.status(404).json({ message: "Exhibition not found" });
    }

    res.json(updatedExhibition);
  } catch (error) {
    console.error("Error while updating exhibition:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteExhibition = async (req, res) => {
  try {
    const exhibition = await Exhibition.findByIdAndDelete(req.params.id);
    if (!exhibition) {
      return res.status(404).json({ message: "Exhibition not found" });
    }
    res.status(200).json({ message: "Exhibition deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllExhibitions = async (req, res) => {
  try {
    const result = await Exhibition.deleteMany({});
    res.json({ message: "All exhibitions deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExhibitionById = async (req, res) => {
  const { id } = req.params;
  try {
    const exhibition = await Exhibition.findById(id);
    if (!exhibition) {
      return res.status(404).json({ message: "Exhibition not found" });
    }
    res.json(exhibition);
  } catch (error) {
    console.error("Error while fetching exhibition by ID:", error.message);
    res.status(500).json({ message: error.message });
  }
};
const getExhibitionByName = async (req, res) => {
  try {
    // Convert URL-encoded exhibition name to formatted string
    const formattedExhibitionName = decodeURIComponent(
      req.params.exhibition_name
    )
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter of each word
      .replace(/%20/g, " "); // Replace %20 with space

    const exhibition = await Exhibition.findOne({
      exhibition_name: formattedExhibitionName,
    });

    if (!exhibition) {
      return res.status(404).json({ message: "Exhibition not found" });
    }

    res.json(exhibition);
  } catch (error) {
    console.error("Error while fetching exhibition by name:", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = {
  getAllExhibitions,
  createExhibition,
  updateExhibition,
  deleteExhibition,
  deleteAllExhibitions,
  getExhibitionById,
  getExhibitionByName,
};
