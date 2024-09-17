const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerErrorHandler = require("../../utils/multerErrorHandler.js");

const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
  getCategoryById,
} = require("../../controllers/jddControllers/categoryController.js");

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

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

router.post(
  "/add",
  upload.fields([{ name: "category_image", maxCount: 1 }]),
  multerErrorHandler,
  createCategory
);

router.put(
  "/:id",
  upload.fields([{ name: "category_image", maxCount: 1 }]),
  multerErrorHandler,
  updateCategory
);

router.delete("/deleteall", deleteAllCategories);
router.delete("/:id", deleteCategory);

module.exports = router;
