const express = require("express");
const router = express.Router();

const {
  getAllAdmins,
  getAdminById,
  createAdmin,
  deleteAdmin,
  adminLogin,
} = require("../../controllers/jobblitzControllers/adminController1");

// Get all admins
router.get("/admins", getAllAdmins);

// Get admin by ID
router.get("/admins/:id", getAdminById);

// Create a new admin
router.post("/admins", createAdmin);

// Delete an admin
router.delete("/admins/:id", deleteAdmin);

// Admin login
router.post("/admins/login", adminLogin);

module.exports = router;
