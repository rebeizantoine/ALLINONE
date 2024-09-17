const express = require("express");
const router = express.Router();

const {
  addJobDescription,
  getAllJobDescriptions,
  deleteJobDescription,
  updateJobDescription,
  getJobDescriptionsByUsername,
  getJobDescriptionsByCategory,
  getJobDescriptionById,
} = require("../../controllers/jobblitzControllers/jobdescriptionController");

// Define your routes
router.post("/add", addJobDescription);
router.get("/getAll", getAllJobDescriptions);
router.get("/jobdescriptions/:id", getJobDescriptionById);
router.delete("/delete/:id", deleteJobDescription);
router.put("/:id", updateJobDescription);
router.get("/employer/:usernameEmployer", getJobDescriptionsByUsername);
router.get("/getByCategory/:categoryName", getJobDescriptionsByCategory);
module.exports = router;
