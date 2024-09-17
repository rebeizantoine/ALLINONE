const axios = require("axios");
const FormData = require("form-data");
const Category = require("../../models/jobblitzModels/category");
const multer = require("multer");

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
// Controller to add a category with an image
const addCategory = async (req, res) => {
  try {
    // Upload the image and get the image URL
    const imageUrl = await imageUploader(req);

    // Create the category with the image URL
    const category = await Category.create({
      categoryName: req.body.categoryName,
      image: imageUrl,
    });

    res.status(200).json({
      success: true,
      message: "Category added successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(400).json({
      success: false,
      message: "Category not added successfully",
      error: error.message,
    });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a Category by ID
const getCategoryByID = async (req, res) => {
  try {
    const foundCategory = await Category.findById(req.params.id);

    if (!foundCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.json(foundCategory);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(500).send("Server Error");
  }
};

// Update category
const updateCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    let updatedData = { categoryName: req.body.categoryName };

    // Check if a new image is provided
    if (req.file) {
      // Upload the new image and get the image URL
      const newImageUrl = await imageUploader(req);
      updatedData.image = newImageUrl;
    }

    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      { $set: updatedData },
      { new: true }
    );

    // Check if the category was found and updated
    if (!updatedCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const result = await Category.findByIdAndDelete(categoryId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete Category",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryByID,
  addCategory,
  deleteCategory,
  updateCategory,
};
