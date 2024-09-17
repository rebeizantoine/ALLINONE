const Jobdescriptions = require("../../models/jobblitzModels/jobdescription");

// Controller to add a job description
const addJobDescription = async (req, res) => {
  try {
    const newJobDescription = new Jobdescriptions(req.body);
    await newJobDescription.save();
    res.status(201).json(newJobDescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all job descriptions
const getAllJobDescriptions = async (req, res) => {
  try {
    const jobDescriptions = await Jobdescriptions.find();
    res.status(200).json(jobDescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getJobDescriptionsByCategory = async (req, res) => {
  const categoryName = req.params.categoryName;

  try {
    const jobDescriptions = await Jobdescriptions.find({ categoryName });
    res.json(jobDescriptions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Controller to delete a job description
const deleteJobDescription = async (req, res) => {
  try {
    const { id } = req.params;
    await Jobdescriptions.findByIdAndDelete(id);
    res.status(200).json({ message: "Job description deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a job description
const updateJobDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJobDescription = await Jobdescriptions.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedJobDescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get job descriptions by employer ID
const getJobDescriptionsByUsername = async (req, res) => {
  try {
    const jobDescriptions = await Jobdescriptions.find({
      usernameEmployer: req.params.usernameEmployer,
    });
    res.status(200).json(jobDescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getJobDescriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobDescription = await Jobdescriptions.findById(id);

    if (!jobDescription) {
      return res.status(404).json({ message: "Job description not found" });
    }

    res.status(200).json(jobDescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addJobDescription,
  getAllJobDescriptions,
  deleteJobDescription,
  updateJobDescription,
  getJobDescriptionsByUsername,
  getJobDescriptionsByCategory,
  getJobDescriptionById,
};
