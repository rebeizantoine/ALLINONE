const express = require("express");
const router = express.Router();
const contactUsController = require("../../controllers/bridginControllers/contact123Controller");

router.get("/", contactUsController.getContactUsDetails);
router.post("/", contactUsController.createContactUsDetails); // POST route to create new contact details
router.put("/", contactUsController.updateContactUsDetails); // PUT route to update contact details
router.delete("/", contactUsController.deleteContactUsDetails); // DELETE route to delete contact details

module.exports = router;
