const Categoriesjdd = require("../../models/jddModels/Category");
const imageUploader2 = require("../../utils/imageUploader2");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Categoriesjdd.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const category_image = req.files["category_image"]
      ? await imageUploader2(req.files["category_image"][0])
      : null;

    const newCategory = await Categoriesjdd.create({
      category_name: req.body.category_name || null,
      category_image: category_image,
    });
    res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error in createCategory:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    let updatedData = {
      category_name: req.body.category_name,
    };
    if (req.files) {
      if (req.files["category_image"]) {
        updatedData.category_image = await imageUploader2(
          req.files["category_image"][0]
        );
      }
    }
    const updatedCategory = await Categoriesjdd.findByIdAndUpdate(
      categoryId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json(updatedCategory);
  } catch (error) {
    console.error("Error while updating category:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Categoriesjdd.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllCategories = async (req, res) => {
  try {
    const result = await Categoriesjdd.deleteMany({});
    res.json({ message: "All categories deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Categoriesjdd.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.error("Error while fetching category by ID:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
  getCategoryById,
};
