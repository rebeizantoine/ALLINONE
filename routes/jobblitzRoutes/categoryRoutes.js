const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  getAllCategories,
  getCategoryByID,
  addCategory,
  deleteCategory,
  updateCategory,
} = require("../../controllers/jobblitzControllers/categoryController");

router.get("/", getAllCategories);
router.get("/getByID/:id", getCategoryByID);
router.post("/categories", upload.single("image"), addCategory);
router.put("/updateCategory/:id", upload.single("image"), updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);
module.exports = router;
