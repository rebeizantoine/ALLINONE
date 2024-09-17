const cloudinary = require("./cloudinary");

const imageUploader = async (file) => {
  try {
    const base64 = file.buffer.toString("base64");
    const data = `data:${file.mimetype};base64,${base64}`;
    const result = await cloudinary.uploader.upload(data, {
      resource_type: "auto",
    });
    return result?.url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};

module.exports = { imageUploader };
