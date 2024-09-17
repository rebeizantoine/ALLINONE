const About = require("../../models/bridgingModels/about");
const imageUploader2 = require("../../utils/imageUploader2");

const getAllAboutDetails = async (req, res) => {
  try {
    const about = await About.find();
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAboutDetails = async (req, res) => {
  try {
    const aboutimg1 = req.files["aboutimg1"]
      ? await imageUploader2(req.files["aboutimg1"][0])
      : null;
    const aboutimg2 = req.files["aboutimg2"]
      ? await imageUploader2(req.files["aboutimg2"][0])
      : null;
    const aboutimg3 = req.files["aboutimg3"]
      ? await imageUploader2(req.files["aboutimg3"][0])
      : null;

    const newAbout = await About.create({
      abouttext1: req.body.abouttext1 || null,
      abouttext2: req.body.abouttext2 || null,
      aboutimg1: aboutimg1,
      aboutimg2: aboutimg2,
      aboutimg3: aboutimg3,
    });

    res.status(200).json({
      success: true,
      message: "AboutDetails created successfully",
      data: newAbout,
    });
  } catch (error) {
    console.error("Error in createAboutDetails:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create AboutDetails",
      error: error.message,
    });
  }
};

const updateAboutDetails = async (req, res) => {
  const aboutId = req.params.id;

  try {
    let updatedData = {
      abouttext1: req.body.abouttext1,
      abouttext2: req.body.abouttext2,
    };

    if (req.files) {
      if (req.files["aboutimg1"]) {
        updatedData.aboutimg1 = await imageUploader2(req.files["aboutimg1"][0]);
      }
      if (req.files["aboutimg2"]) {
        updatedData.aboutimg2 = await imageUploader2(req.files["aboutimg2"][0]);
      }
      if (req.files["aboutimg3"]) {
        updatedData.aboutimg3 = await imageUploader2(req.files["aboutimg3"][0]);
      }
    }

    const updatedAbout = await About.findByIdAndUpdate(
      aboutId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedAbout) {
      return res.status(404).json({ message: "About details not found" });
    }

    res.json(updatedAbout);
  } catch (error) {
    console.error("Error while updating ABOUT:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteAboutDetails = async (req, res) => {
  try {
    const about = await About.findByIdAndDelete(req.params.id);
    if (!about) {
      return res.status(404).json({ message: "about not found" });
    }
    res.status(200).json({ message: "about deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAboutDetails,
  createAboutDetails,
  updateAboutDetails,
  deleteAboutDetails,
};
