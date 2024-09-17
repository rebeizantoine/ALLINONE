const Items = require("../../models/jddModels/Singleitem");
const imageUploader2 = require("../../utils/imageUploader2");

const getAllItems = async (req, res) => {
  try {
    const items = await Items.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const item_image1 = req.files["item_image1"]
      ? await imageUploader2(req.files["item_image1"][0])
      : null;
    const item_image2 = req.files["item_image2"]
      ? await imageUploader2(req.files["item_image2"][0])
      : null;
    const item_image3 = req.files["item_image3"]
      ? await imageUploader2(req.files["item_image3"][0])
      : null;

    const newItem = await Items.create({
      item_name: req.body.item_name || null,
      item_price: req.body.item_price || null,
      item_color1: req.body.item_color1 || null,
      item_color2: req.body.item_color2 || null,
      item_quantityAvailable: req.body.item_quantityAvailable || null,
      item_dimensions: req.body.item_dimensions || null,
      item_customizable: req.body.item_customizable || false,
      item_image1: item_image1,
      item_image2: item_image2,
      item_image3: item_image3,
      item_description: req.body.item_description || null,
      item_featuredOnFront: req.body.item_featuredOnFront || false,
      item_mainTag: req.body.item_mainTag || null,
      item_additionalTag1: req.body.item_additionalTag1 || null,
      item_additionalTag2: req.body.item_additionalTag2 || null,
      item_additionalTag3: req.body.item_additionalTag3 || null,
      item_maylike: req.body.item_maylike || false,
    });

    res.status(200).json({
      success: true,
      message: "Item created successfully",
      data: newItem,
    });
  } catch (error) {
    console.error("Error in createItem:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create item",
      error: error.message,
    });
  }
};

const updateItem = async (req, res) => {
  const itemId = req.params.id;

  try {
    let updatedData = {
      item_name: req.body.item_name,
      item_price: req.body.item_price,
      item_color1: req.body.item_color1,
      item_color2: req.body.item_color2,
      item_quantityAvailable: req.body.item_quantityAvailable,
      item_dimensions: req.body.item_dimensions,
      item_customizable: req.body.item_customizable || false,
      item_description: req.body.item_description,
      item_featuredOnFront: req.body.item_featuredOnFront || false,
      item_maylike: req.body.item_maylike || false,
      item_mainTag: req.body.item_mainTag,
      item_additionalTag1: req.body.item_additionalTag1,
      item_additionalTag2: req.body.item_additionalTag2,
      item_additionalTag3: req.body.item_additionalTag3,
    };

    if (req.files) {
      if (req.files["item_image1"]) {
        updatedData.item_image1 = await imageUploader2(
          req.files["item_image1"][0]
        );
      }
      if (req.files["item_image2"]) {
        updatedData.item_image2 = await imageUploader2(
          req.files["item_image2"][0]
        );
      }
      if (req.files["item_image3"]) {
        updatedData.item_image3 = await imageUploader2(
          req.files["item_image3"][0]
        );
      }
    }

    const updatedItem = await Items.findByIdAndUpdate(
      itemId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error("Error while updating item:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await Items.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllItems = async (req, res) => {
  try {
    const result = await Items.deleteMany({});
    res.json({ message: "All items deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Items.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    console.error("Error while fetching item by ID:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getItemsMayLike = async (req, res) => {
  try {
    const items = await Items.find({ item_maylike: true });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getItemsByTag = async (req, res) => {
  try {
    const rawTag = req.params.tag;
    const tag = decodeURIComponent(rawTag).toLowerCase();

    const items = await Items.find({
      $or: [
        { item_mainTag: new RegExp(`^${tag}$`, "i") },
        { item_additionalTag1: new RegExp(`^${tag}$`, "i") },
        { item_additionalTag2: new RegExp(`^${tag}$`, "i") },
        { item_additionalTag3: new RegExp(`^${tag}$`, "i") },
      ],
    });
    res.status(200).json(items);
  } catch (error) {
    console.error("Error while fetching items by tag:", error.message);
    res.status(500).json({ message: error.message });
  }
};
const getFeaturedItems = async (req, res) => {
  try {
    const items = await Items.find({ item_featuredOnFront: true });
    res.status(200).json(items);
  } catch (error) {
    console.error("Error while fetching featured items:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  getItemById,
  deleteAllItems,
  getItemsMayLike,
  getItemsByTag,
  getFeaturedItems,
};
