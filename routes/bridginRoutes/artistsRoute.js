const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const multerErrorHandler = require("../../utils/multerErrorHandler");
const {
  getAllArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  getArtistById,
  deleteAllArtists,
  getArtistByFirstNameAndLastName,
  getArtistsByFeatured,
  getArtistPdfById,
  getArtistPdfByName,
  deletePdfByArtistName,
} = require("../../controllers/bridginControllers/artistsController");

// Directories for file uploads
const pdfDir = path.join(__dirname, "../uploads/pdfs");
const imageDir = path.join(__dirname, "../uploads/images");

// Ensure directories exist
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// Multer configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "artist_pdf") {
        cb(null, pdfDir);
      } else {
        cb(null, imageDir);
      }
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "text/plain",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

router.get("/featured", getArtistsByFeatured);
router.get("/", getAllArtists);
router.get("/:id", getArtistById);

// Ensure this route is specific enough and not overridden
router.get(
  "/artists/:artist_name/:artist_lastname",
  getArtistByFirstNameAndLastName
);

router.get(
  "/artist/pdf/name/:artist_name/:artist_lastname",
  getArtistPdfByName
);
router.get("/artist/pdf/:id", getArtistPdfById);

router.post(
  "/artists/add",
  upload.fields([
    { name: "artist_image", maxCount: 1 },
    { name: "artist_work1", maxCount: 1 },
    { name: "artist_work2", maxCount: 1 },
    { name: "artist_work3", maxCount: 1 },
    { name: "artist_pitch", maxCount: 1 },
    { name: "artist_pdf", maxCount: 1 },
  ]),
  multerErrorHandler,
  createArtist
);

router.put(
  "/:id",
  upload.fields([
    { name: "artist_image", maxCount: 1 },
    { name: "artist_work1", maxCount: 1 },
    { name: "artist_work2", maxCount: 1 },
    { name: "artist_work3", maxCount: 1 },
    { name: "artist_pitch", maxCount: 1 },
    { name: "artist_pdf", maxCount: 1 },
  ]),
  multerErrorHandler,
  updateArtist
);

router.delete("/deleteall", deleteAllArtists);
router.delete(
  "/artists/:artist_name/:artist_lastname/pdf",
  deletePdfByArtistName
);

router.delete("/:id", deleteArtist);

module.exports = router;
