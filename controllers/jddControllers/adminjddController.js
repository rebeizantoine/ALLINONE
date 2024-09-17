const bcrypt = require("bcrypt");
const Adminsjdd = require("../../models/jddModels/adminjdd");

const getAllAdminsjdd = async (req, res) => {
  try {
    const adminsjdd = await Adminsjdd.find();
    res.json(adminsjdd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminjddLogin = async (req, res) => {
  const { adminname, adminpassword } = req.body;
  try {
    const adminjdd = await Adminsjdd.findOne({ adminname });
    if (!adminjdd) {
      return res.status(400).json({
        success: false,
        message: `Admin with username ${adminname} not found`,
      });
    }
    const passwordMatch = await bcrypt.compare(
      adminpassword,
      adminjdd.adminpassword
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

const createAdminjdd = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.adminpassword, 8);
    const adminjdd = new Adminsjdd({
      adminname: req.body.adminname,
      adminpassword: hashedPassword,
    });
    const newAdminjdd = await adminjdd.save();
    res.status(201).json(newAdminjdd);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllAdminsjdd,
  adminjddLogin,
  createAdminjdd,
};
