const Employer = require("../../models/jobblitzModels/employer");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../extra/generateToken");

const getAllEmployers = async (req, res) => {
  try {
    const employers = await Employer.find();
    res.json(employers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addEmployer = async (req, res) => {
  try {
    const employer = await Employer.create(req.body);
    res.status(200).json({
      success: true,
      message: "Employer added successfully",
      data: employer,
    });
  } catch (error) {
    console.error("Error adding Employer:", error);
    res.status(400).json({
      success: false,
      message: "Employer not added successfully",
      error: error.message,
    });
  }
};

const getEmployerByID = async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.employerId);
    res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: employer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to retrieve Employer by ID",
      error: error,
    });
  }
};
const employerLogin = async (req, res) => {
  const { usernameEmployer, passwordnameEmployer } = req.body;

  try {
    // Find the employer by usernameEmployer
    const employer = await Employer.findOne({ usernameEmployer });

    // Check if the employer exists
    if (!employer) {
      return res.status(400).json({
        success: false,
        message: `Employer with username ${usernameEmployer} not found`,
      });
    }

    // Compare the provided password with the stored password
    if (passwordnameEmployer !== employer.passwordnameEmployer) {
      return res.status(400).json({
        success: false,
        message: "Wrong password.",
      });
    }

    // Create a JWT token and send it back to the client
    const token = generateToken(employer._id, employer.role);

    return res.status(200).json({
      success: true,
      message: `Employer with username ${usernameEmployer} logged in successfully.`,
      data: token,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to login.",
      error: error.message,
    });
  }
};

const getEmployerByUsername = async (req, res) => {
  try {
    const employer = await Employer.findOne({
      usernameEmployer: req.params.usernameEmployer,
    });

    if (!employer) {
      return res.status(404).json({
        success: false,
        message: `Employer with username ${req.params.usernameEmployer} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: employer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrieve Employer by username",
      error: error.message,
    });
  }
};
const updateEmployerByID = async (req, res) => {
  const { employerId } = req.params;
  const updatedData = req.body;

  try {
    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(employerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employer ID",
      });
    }

    // Log the request body
    console.log("Request Body:", req.body);

    // Find the employer by ID and update the information
    const updatedEmployer = await Employer.findByIdAndUpdate(
      employerId,
      updatedData,
      { new: true, runValidators: true }
    );

    // Log the updated employer
    console.log("Updated Employer:", updatedEmployer);

    if (!updatedEmployer) {
      return res.status(404).json({
        success: false,
        message: "Employer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employer updated successfully",
      data: updatedEmployer,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.message,
      });
    }

    // Handle other errors
    console.error("Error updating employer data:", error);
    res.status(500).json({
      success: false,
      message: "Employer not updated successfully",
      error: error.message,
    });
  }
};

const deleteEmployerByID = async (req, res) => {
  try {
    const deletedEmployer = await Employer.findByIdAndDelete(
      req.params.employerId
    );
    if (!deletedEmployer) {
      return res.status(404).json({
        success: false,
        message: "Employer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employer deleted successfully",
      data: deletedEmployer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Employer not deleted successfully",
      error: error.message,
    });
  }
};

module.exports = {
  getAllEmployers,
  getEmployerByID,
  updateEmployerByID,
  deleteEmployerByID,
  addEmployer,
  employerLogin,
  getEmployerByUsername,
};
