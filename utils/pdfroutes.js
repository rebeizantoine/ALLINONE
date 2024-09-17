const express = require("express");
const router = express.Router();
const pdfController = require("./pdfcontroller");

router.post("/upload-pdf", pdfController.uploadPDF);
router.get("/pdf/:filename", pdfController.getPDF);

module.exports = router;
