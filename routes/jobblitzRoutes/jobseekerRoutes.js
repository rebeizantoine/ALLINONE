const express = require("express");
const router = express.Router();

const {
  addJobseeker,
  getAllJobseekers,
  getJobseekerById,
  updateJobseeker,
  loginJobseeker,
  deleteJobseekerById,
  getJobseekerByUsername,
} = require("../../controllers/jobblitzControllers/jobseekerController");

// Route to delete a specific job seeker by ID
router.delete("/jobseekers/:id", deleteJobseekerById);

// Route to register a new job seeker
router.post("/jobseekers", addJobseeker);

// Route to get all job seekers
router.get("/jobseekers", getAllJobseekers);

// Route to get a job seeker by username
router.get("/jobseekers/username/:usernamejobseek", getJobseekerByUsername);

// Route to get a specific job seeker by ID
router.get("/jobseekers/:id", getJobseekerById);

// Route to update a job seeker by ID
router.put("/jobseekers/:id", updateJobseeker);

// Route to handle job seeker login
router.post("/jobseekers/login", loginJobseeker);

module.exports = router;
