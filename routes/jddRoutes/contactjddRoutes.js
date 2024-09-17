const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
  getContactById,
  deleteAllContacts,
} = require("../../controllers/jddControllers/contactjddController");

const upload = multer();

router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.post("/add", upload.none(), createContact); // Handle non-file fields in form-data
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);
router.delete("/", deleteAllContacts);

module.exports = router;
