const express = require("express");
const router = express.Router();
const jobPostController = require("../../controllers/jobblitzControllers/jobpostController");

router.get("/jobPosts", jobPostController.getAllJobPosts);
router.post("/jobPosts", jobPostController.addJobPost);
router.get("/jobPosts/:jobPostId", jobPostController.getJobPostByID);
router.put("/jobPosts/update/:jobPostId", jobPostController.updateJobPostByID);
router.delete(
  "/jobPosts/delete/:jobPostId",
  jobPostController.deleteJobPostByID
);

module.exports = router;
