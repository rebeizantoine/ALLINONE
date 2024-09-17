const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerErrorHandler = require("../../utils/multerErrorHandler.js");

const {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  getItemById,
  deleteAllItems,
  getItemsMayLike,
  getItemsByTag,
  getFeaturedItems,
} = require("../../controllers/jddControllers/singleitemController.js");

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

router.get("/", getAllItems);
router.get("/maylike", getItemsMayLike); // Place before :id route
router.get("/items/tag/:tag", getItemsByTag);
router.get("/items/featured", getFeaturedItems); // Place before :id route
router.get("/:id", getItemById);

router.post(
  "/add",
  upload.fields([
    { name: "item_image1", maxCount: 1 },
    { name: "item_image2", maxCount: 1 },
    { name: "item_image3", maxCount: 1 },
  ]),
  multerErrorHandler,
  createItem
);

router.put(
  "/:id",
  upload.fields([
    { name: "item_image1", maxCount: 1 },
    { name: "item_image2", maxCount: 1 },
    { name: "item_image3", maxCount: 1 },
  ]),
  multerErrorHandler,
  updateItem
);

router.delete("/deleteall", deleteAllItems);
router.delete("/:id", deleteItem);

module.exports = router;
