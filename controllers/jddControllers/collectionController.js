const Collections = require("../../models/jddModels/Collection");
const imageUploader2 = require("../../utils/imageUploader2");

const getAllCollections = async (req, res) => {
  try {
    const collections = await Collections.find();
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCollection = async (req, res) => {
  try {
    const collection_image = req.files["collection_image"]
      ? await imageUploader2(req.files["collection_image"][0])
      : null;

    const newCollection = await Collections.create({
      collection_name: req.body.collection_name || null,
      collection_image: collection_image,
    });
    res.status(200).json({
      success: true,
      message: "Collection created successfully",
      data: newCollection,
    });
  } catch (error) {
    console.error("Error in createCollection:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create collection",
      error: error.message,
    });
  }
};

const updateCollection = async (req, res) => {
  const collectionId = req.params.id;

  try {
    let updatedData = {
      collection_name: req.body.collection_name,
    };
    if (req.files) {
      if (req.files["collection_image"]) {
        updatedData.collection_image = await imageUploader2(
          req.files["collection_image"][0]
        );
      }
    }
    const updatedCollection = await Collections.findByIdAndUpdate(
      collectionId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedCollection) {
      return res.status(404).json({
        message: "Collection not found",
      });
    }

    res.json(updatedCollection);
  } catch (error) {
    console.error("Error while updating collection:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteCollection = async (req, res) => {
  try {
    const collection = await Collections.findByIdAndDelete(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllCollections = async (req, res) => {
  try {
    const result = await Collections.deleteMany({});
    res.json({ message: "All collections deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCollectionById = async (req, res) => {
  const { id } = req.params;
  try {
    const collection = await Collections.findById(id);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res.json(collection);
  } catch (error) {
    console.error("Error while fetching collection by ID:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCollections,
  createCollection,
  updateCollection,
  deleteCollection,
  deleteAllCollections,
  getCollectionById,
};
