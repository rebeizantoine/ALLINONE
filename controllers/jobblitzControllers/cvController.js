const CV = require("../../models/jobblitzModels/cv");
// Create a new CV
const createCV = async (req, res) => {
  try {
    const newCV = new CV(req.body);
    const savedCV = await newCV.save();
    res.status(201).json(savedCV);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllCVs = async (req, res) => {
  try {
    const allCVs = await CV.find();
    res.json(allCVs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get CV by ID
const getCVById = async (req, res) => {
  const cvId = req.params.id;
  try {
    const foundCV = await CV.findById(cvId);
    if (!foundCV) {
      return res.status(404).json({ error: "CV not found" });
    }
    res.json(foundCV);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update CV by ID
const updateCVById = async (req, res) => {
  const cvId = req.params.id;
  try {
    const updatedCV = await CV.findByIdAndUpdate(cvId, req.body, { new: true });
    if (!updatedCV) {
      return res.status(404).json({ error: "CV not found" });
    }
    res.json(updatedCV);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete CV by ID
const deleteCVById = async (req, res) => {
  const cvId = req.params.id;
  try {
    const deletedCV = await CV.findByIdAndRemove(cvId);
    if (!deletedCV) {
      return res.status(404).json({ error: "CV not found" });
    }
    res.json(deletedCV);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  createCV,
  deleteCVById,
  updateCVById,
  getCVById,
  getAllCVs,
};
