const Purchased = require("../../models/jddModels/Purchased");

// Get all purchased items
const getAllPurchased = async (req, res) => {
  try {
    const purchasedItems = await Purchased.find();
    res.status(200).json(purchasedItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a purchased item by ID
const getPurchasedById = async (req, res) => {
  try {
    const purchasedItem = await Purchased.findById(req.params.id);
    if (!purchasedItem) {
      return res.status(404).json({ message: "Purchased item not found" });
    }
    res.status(200).json(purchasedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new purchased item
const createPurchased = async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const newPurchasedItem = new Purchased({
      purchased_firstname: req.body.purchased_firstname,
      purchased_lastname: req.body.purchased_lastname,
      purchased_email: req.body.purchased_email,
      purchased_phonenumber1: req.body.purchased_phonenumber1,
      purchased_phonenumber2: req.body.purchased_phonenumber2,
      purchased_deliveryoption: req.body.purchased_deliveryoption,
      purchased_location: req.body.purchased_location,
      purchased_additionaldetails: req.body.purchased_additionaldetails,
      purchased_item1name: req.body.purchased_item1name,
      purchased_item1price: req.body.purchased_item1price,
      purchased_item2name: req.body.purchased_item2name,
      purchased_item2price: req.body.purchased_item2price,
      purchased_item3name: req.body.purchased_item3name,
      purchased_item3price: req.body.purchased_item3price,
      purchased_item4name: req.body.purchased_item4name,
      purchased_item4price: req.body.purchased_item4price,
      purchased_subtotal: req.body.purchased_subtotal,
      purchased_date: req.body.purchased_date,
    });
    const savedPurchasedItem = await newPurchasedItem.save();
    res.status(201).json(savedPurchasedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a purchased item
const updatePurchased = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedPurchased = await Purchased.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedPurchased) {
      return res.status(404).json({ message: "Purchased item not found" });
    }

    res.json(updatedPurchased);
  } catch (error) {
    res.status(400).json({ message: "Error updating purchased item", error });
  }
};

// Delete a purchased item by ID
const deletePurchased = async (req, res) => {
  try {
    const deletedPurchasedItem = await Purchased.findByIdAndDelete(
      req.params.id
    );
    if (!deletedPurchasedItem) {
      return res.status(404).json({ message: "Purchased item not found" });
    }
    res.status(200).json({ message: "Purchased item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all purchased items
const deleteAllPurchased = async (req, res) => {
  try {
    await Purchased.deleteMany();
    res.status(200).json({ message: "All purchased items deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPurchased,
  getPurchasedById,
  createPurchased,
  updatePurchased,
  deletePurchased,
  deleteAllPurchased,
};
