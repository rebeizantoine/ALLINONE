const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  deleteAllOrders,
} = require("../../controllers/justsmmControllers/orderlawaController"); // Make sure the path is correct

// Get all orders
router.get("/", getAllOrders);

// Get an order by ID
router.get("/:id", getOrderById);

// Create a new order
router.post("/add", createOrder);

// Update an order by ID
router.put("/:id", updateOrder);

// Delete an order by ID
router.delete("/:id", deleteOrder);

// Delete all orders
router.delete("/", deleteAllOrders);

module.exports = router;
