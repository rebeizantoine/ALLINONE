const Contactsjdd = require("../../models/jddModels/Contactsjdd");

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contactsjdd.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createContact = async (req, res) => {
  try {
    console.log("Incoming data:", req.body); // Log incoming data

    const newContact = new Contactsjdd({
      contact_facebook: req.body.contact_facebook,
      contact_instagram: req.body.contact_instagram,
      contact_whatsapp: req.body.contact_whatsapp,
      contact_gmail: req.body.contact_gmail,
      contact_location: req.body.contact_location,
      contact_phonenumber: req.body.contact_phonenumber,
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const updatedContact = await Contactsjdd.findByIdAndUpdate(
      req.params.id,
      {
        contact_facebook: req.body.contact_facebook,
        contact_instagram: req.body.contact_instagram,
        contact_whatsapp: req.body.contact_whatsapp,
        contact_gmail: req.body.contact_gmail,
        contact_location: req.body.contact_location,
        contact_phonenumber: req.body.contact_phonenumber,
      },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contactsjdd.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const contact = await Contactsjdd.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllContacts = async (req, res) => {
  try {
    const result = await Contactsjdd.deleteMany({});
    res.json({ message: "All items deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
  getContactById,
  deleteAllContacts,
};
