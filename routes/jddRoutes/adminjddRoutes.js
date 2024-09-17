const express = require("express");
const router = express.Router();

const {
  getAllAdminsjdd,
  adminjddLogin,
  createAdminjdd,
} = require("../../controllers/jddControllers/adminjddController");

router.get("/adminsjdd", getAllAdminsjdd);
router.post("/adminsjdd/login", adminjddLogin);
router.post("/admins", createAdminjdd);

module.exports = router;
