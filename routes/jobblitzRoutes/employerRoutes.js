const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const express = require("express");
const router = express.Router();

const {
  getAllEmployers,
  getEmployerByID,
  updateEmployerByID,
  deleteEmployerByID,
  addEmployer,
  employerLogin,
  getEmployerByUsername,
} = require("../../controllers/jobblitzControllers/employerController");

router.post("/employers", addEmployer);
router.get("/getAll", getAllEmployers);
router.get("/employers/:employerId", getEmployerByID);
router.get("/employers/username/:usernameEmployer", getEmployerByUsername);
router.put("/employers/update/:employerId", updateEmployerByID);
router.delete("/employers/delete/:employerId", deleteEmployerByID);
router.post("/login", employerLogin);

module.exports = router;
