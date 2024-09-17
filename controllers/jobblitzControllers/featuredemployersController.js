const axios = require("axios");
const FormData = require("form-data");
const FeaturedEmployer = require("../../models/jobblitzModels/featuredemployers");

const IMAGEBB_API_KEY = process.env.IMAGEBB_API_KEY;

// Image uploader function (similar to what you've provided)
const imageUploader = async (req) => {
  try {
    const formData = new FormData();
    formData.append("key", IMAGEBB_API_KEY);

    if (!req.file || !req.file.buffer) {
      throw new Error("Image data is missing.");
    }

    const image = req.file.buffer.toString("base64");
    formData.append("image", image);

    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData
    );

    console.log("ImgBB API Response:", response.data);

    return response?.data?.data?.url;
  } catch (error) {
    console.error("Error from ImgBB API:", error.response?.data);
    throw new Error("Failed to upload image to ImgBB");
  }
};

// Controller to add a featured employer with an image
const addFeaturedEmployer = async (req, res) => {
  try {
    // Upload the image and get the image URL
    const employerImage = await imageUploader(req);

    // Create the featured employer with the image URL
    const featuredEmployer = await FeaturedEmployer.create({
      employerName: req.body.employerName,
      employerImage,
    });

    res.status(200).json({
      success: true,
      message: "Featured employer added successfully",
      data: featuredEmployer,
    });
  } catch (error) {
    console.error("Error adding featured employer:", error);
    res.status(400).json({
      success: false,
      message: "Featured employer not added successfully",
      error: error.message,
    });
  }
};

// Get all featured employers
const getAllFeaturedEmployers = async (req, res) => {
  try {
    const featuredEmployers = await FeaturedEmployer.find();
    res.json(featuredEmployers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a Featured Employer by ID
const getFeaturedEmployerByID = async (req, res) => {
  try {
    const foundFeaturedEmployer = await FeaturedEmployer.findById(
      req.params.id
    );

    if (!foundFeaturedEmployer) {
      return res.status(404).json({ msg: "Featured employer not found" });
    }
    res.json(foundFeaturedEmployer);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Featured employer not found" });
    }
    res.status(500).send("Server Error");
  }
};

// Update featured employer
const updateFeaturedEmployer = async (req, res) => {
  const featuredEmployerId = req.params.id;

  try {
    let updatedData = { employerName: req.body.employerName };

    // Check if a new image is provided
    if (req.file) {
      // Upload the new image and get the image URL
      const newImageUrl = await imageUploader(req);
      updatedData.employerImage = newImageUrl;
    }

    const updatedFeaturedEmployer = await FeaturedEmployer.findOneAndUpdate(
      { _id: featuredEmployerId },
      { $set: updatedData },
      { new: true }
    );

    // Check if the featured employer was found and updated
    if (!updatedFeaturedEmployer) {
      return res.status(404).json({ msg: "Featured employer not found" });
    }

    res.json(updatedFeaturedEmployer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a featured employer
const deleteFeaturedEmployer = async (req, res) => {
  const featuredEmployerId = req.params.id;
  try {
    const result = await FeaturedEmployer.findByIdAndDelete(featuredEmployerId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Featured employer not found",
      });
    }
    res.json({
      success: true,
      message: "Featured employer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete Featured employer",
      error: error.message,
    });
  }
};

module.exports = {
  getAllFeaturedEmployers,
  getFeaturedEmployerByID,
  addFeaturedEmployer,
  deleteFeaturedEmployer,
  updateFeaturedEmployer,
};
