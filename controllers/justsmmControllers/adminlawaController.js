const bcrypt = require("bcrypt");
const Adminlawa = require("../../models/justsmmModels/adminlawa");

const getAllAdminslawa = async (req, res) => {
  try {
    const adminslawa = await Adminlawa.find();
    res.json(adminslawa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminlawaLogin = async (req, res) => {
  const { adminname, adminpassword } = req.body;
  try {
    const adminlawa = await Adminlawa.findOne({ adminla_username: adminname });
    if (!adminlawa) {
      return res.status(400).json({
        success: false,
        message: `Admin with username ${adminname} not found`,
      });
    }
    const passwordMatch = await bcrypt.compare(
      adminpassword,
      adminlawa.adminla_password
    );
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Wrong Password",
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
const createAdminlawa = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.adminpassword, 8);
    const adminlawa = new Adminlawa({
      adminla_username: req.body.adminname,
      adminla_password: hashedPassword,
    });
    const newAdminlawa = await adminlawa.save();
    res.status(201).json(newAdminlawa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllAdminslawa,
  adminlawaLogin,
  createAdminlawa,
};
