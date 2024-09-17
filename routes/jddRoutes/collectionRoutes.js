const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerErrorHandler = require("../../utils/multerErrorHandler.js");

const {
  getAllCollections,
  createCollection,
  updateCollection,
  deleteCollection,
  deleteAllCollections,
  getCollectionById,
} = require("../../controllers/jddControllers/collectionController.js");

// Multer configuration
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

router.get("/", getAllCollections);
router.get("/:id", getCollectionById);

router.post(
  "/add",
  upload.fields([{ name: "collection_image", maxCount: 1 }]),
  multerErrorHandler,
  createCollection
);

router.put(
  "/:id",
  upload.fields([{ name: "collection_image", maxCount: 1 }]),
  multerErrorHandler,
  updateCollection
);

router.delete("/deleteall", deleteAllCollections);
router.delete("/:id", deleteCollection);

module.exports = router;
