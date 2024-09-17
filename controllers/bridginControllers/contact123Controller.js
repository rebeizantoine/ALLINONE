const ContactUs123 = require("../../models/bridgingModels/contact123");

const getContactUsDetails = async (req, res) => {
  try {
    const contactUs = await ContactUs123.findOne();
    if (!contactUs) {
      return res.status(404).json({ message: "Contact us details not found" });
    }
    res.status(200).json(contactUs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createContactUsDetails = async (req, res) => {
  try {
    const newContactUs = await ContactUs123.create(req.body);
    res.status(201).json({
      message: "Contact us details created successfully",
      contactUs: newContactUs,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateContactUsDetails = async (req, res) => {
  try {
    let contactUs = await ContactUs123.findOne();
    if (!contactUs) {
      return res.status(404).json({ message: "Contact us details not found" });
    }
    contactUs.set(req.body);
    await contactUs.save();
    res
      .status(200)
      .json({ message: "Contact us details updated successfully", contactUs });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteContactUsDetails = async (req, res) => {
  try {
    const contactUs = await ContactUs123.findOne();
    if (!contactUs) {
      return res.status(404).json({ message: "Contact us details not found" });
    }
    await ContactUs123.deleteOne(contactUs);
    res
      .status(200)
      .json({ message: "Contact us details deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getContactUsDetails,
  createContactUsDetails,
  updateContactUsDetails,
  deleteContactUsDetails,
};
