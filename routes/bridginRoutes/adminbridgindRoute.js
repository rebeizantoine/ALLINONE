const express = require("express");
const router = express.Router();

const {
  getAllAdminsbridging,
  adminbridgingLogin,
  createAdminbridging,
} = require("../../controllers/bridginControllers/adminbridgingController");

router.get("/", getAllAdminsbridging);
router.post("/adminsbridging/login", adminbridgingLogin);
router.post("/createadmins", createAdminbridging);

module.exports = router;
