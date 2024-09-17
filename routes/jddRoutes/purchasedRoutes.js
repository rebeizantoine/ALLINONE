const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getAllPurchased,
  getPurchasedById,
  createPurchased,
  updatePurchased,
  deletePurchased,
  deleteAllPurchased,
} = require("../../controllers/jddControllers/purchasedController");

const upload = multer();

// Routes for purchased items
router.get("/", getAllPurchased);
router.get("/:id", getPurchasedById);
router.post("/add", upload.none(), createPurchased);
router.put("/:id", updatePurchased);
router.delete("/:id", deletePurchased);
router.delete("/", deleteAllPurchased);

module.exports = router;
