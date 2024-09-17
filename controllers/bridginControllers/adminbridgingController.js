const Adminsbridging = require("../../models/bridgingModels/adminbridging");
const bcrypt = require("bcrypt");

const getAllAdminsbridging = async (req, res) => {
  try {
    const adminsbridging = await Adminsbridging.find();
    res.json(adminsbridging);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminbridgingLogin = async (req, res) => {
  const { adminname, adminpassword } = req.body;
  try {
    const adminbridging = await Adminsbridging.findOne({ adminname });
    if (!adminbridging) {
      return res.status(400).json({
        success: false,
        message: `Admin with username ${adminname} not found`,
      });
    }
    const passwordMatch = await bcrypt.compare(
      adminpassword,
      adminbridging.adminpassword
    );
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Wrong password",
      });
    }
    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to login",
      error: error.message,
    });
  }
};

const createAdminbridging = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.adminpassword, 8);
    const adminbridging = new Adminsbridging({
      adminname: req.body.adminname,
      adminpassword: hashedPassword,
    });
    const newAdminbridging = await adminbridging.save();
    res.status(201).json(newAdminbridging);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllAdminsbridging,
  adminbridgingLogin,
  createAdminbridging,
};
