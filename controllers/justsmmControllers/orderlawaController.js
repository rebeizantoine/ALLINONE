const OrderSummary = require("../../models/justsmmModels/Ordersummary");
const mongoose = require("mongoose"); // Import mongoose

// Get all order summaries
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderSummary.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an order summary by ID
const getOrderById = async (req, res) => {
  try {
    const order = await OrderSummary.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new order summary
const createOrder = async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    // If using multer, the data will be in req.body for non-file fields
    const {
      orderla_firstname,
      orderla_lastname,
      orderla_email,
      orderla_servicename1,
      orderla_quantity1,
      orderla_servicename2,
      orderla_quantity2,
      orderla_paymentoption,
      orderla_totaltopay,
      orderla_additionalcomment,
    } = req.body;

    // Check for missing fields
    const requiredFields = [
      "orderla_firstname",
      "orderla_lastname",
      "orderla_email",
      "orderla_servicename1",
      "orderla_quantity1",

      "orderla_paymentoption",
      "orderla_totaltopay",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      console.error("Missing fields:", missingFields);
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const newOrder = new OrderSummary({
      orderla_firstname,
      orderla_lastname,
      orderla_email,
      orderla_servicename1,
      orderla_quantity1,
      orderla_servicename2: orderla_servicename2 || "", // Handle optional fields
      orderla_quantity2: orderla_quantity2 || 0,
      orderla_paymentoption,
      orderla_totaltopay,
      orderla_additionalcomment: orderla_additionalcomment || "",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(400).json({ message: error.message });
  }
};
// Update an order summary
const updateOrder = async (req, res) => {
  try {
    // Log incoming data
    console.log("Incoming data for update:", req.body);

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    // Find and update the order
    const updatedOrder = await OrderSummary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete an order summary by ID
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await OrderSummary.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all order summaries
const deleteAllOrders = async (req, res) => {
  try {
    await OrderSummary.deleteMany();
    res.status(200).json({ message: "All orders deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  deleteAllOrders,
};
