const path = require("path");
const fs = require("fs");
const Artists = require("../../models/bridgingModels/artists");
const imageUploader2 = require("../../utils/imageUploader2");

// Function to save the file with the desired filename format
const saveFile = (sourcePath, destinationPath) => {
  return new Promise((resolve, reject) => {
    const directory = path.dirname(destinationPath);

    // Create directory if it doesn't exist
    fs.mkdir(directory, { recursive: true }, (err) => {
      if (err) return reject(err);

      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(destinationPath);

      readStream.on("error", reject);
      writeStream.on("error", reject);

      writeStream.on("finish", resolve);

      readStream.pipe(writeStream);
    });
  });
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        // If the error is not "file not found", reject the promise
        if (err.code !== "ENOENT") return reject(err);
      }
      resolve();
    });
  });
};

const getAllArtists = async (req, res) => {
  try {
    const artists = await Artists.find();
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArtist = async (req, res) => {
  try {
    const artistImage = req.files["artist_image"]
      ? await imageUploader2(req.files["artist_image"][0])
      : null;
    const artistWork1 = req.files["artist_work1"]
      ? await imageUploader2(req.files["artist_work1"][0])
      : null;
    const artistWork2 = req.files["artist_work2"]
      ? await imageUploader2(req.files["artist_work2"][0])
      : null;
    const artistWork3 = req.files["artist_work3"]
      ? await imageUploader2(req.files["artist_work3"][0])
      : null;
    const artistPitch = req.files["artist_pitch"]
      ? await imageUploader2(req.files["artist_pitch"][0])
      : null;

    const artistName = req.body.artist_name;
    const artistLastname = req.body.artist_lastname;

    let artistPdf = null;
    if (req.files["artist_pdf"]) {
      const pdfFile = req.files["artist_pdf"][0];
      const pdfFilename = `${artistName}-${artistLastname}-${pdfFile.originalname}`;
      const pdfFilePath = path.join(__dirname, "../uploads/pdfs", pdfFilename);

      console.log("Saving PDF to:", pdfFilePath); // Debugging log
      await saveFile(pdfFile.path, pdfFilePath);
      artistPdf = path.join("uploads/pdfs", pdfFilename); // Save relative path
    }

    const newArtist = await Artists.create({
      artist_name: artistName || null,
      artist_lastname: artistLastname || null,
      artist_aka: req.body.artist_aka || null,
      artist_arttype: req.body.artist_arttype || null,
      artist_country: req.body.artist_country || null,
      artist_city: req.body.artist_city || null,
      artist_about: req.body.artist_about || null,
      artist_work1name: req.body.artist_work1name || null,
      artist_work1des: req.body.artist_work1des || null,
      artist_work2name: req.body.artist_work2name || null,
      artist_work2des: req.body.artist_work2des || null,
      artist_work3name: req.body.artist_work3name || null,
      artist_work3des: req.body.artist_work3des || null,
      artist_image: artistImage,
      artist_work1: artistWork1,
      artist_work2: artistWork2,
      artist_work3: artistWork3,
      artist_pitch: artistPitch,
      artist_pdf: artistPdf,
      featured_on_front: req.body.featured_on_front || false,
    });

    res.status(200).json({
      success: true,
      message: "Artist created successfully",
      data: newArtist,
    });
  } catch (error) {
    console.error("Error in createArtist:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create artist",
      error: error.message,
    });
  }
};

const updateArtist = async (req, res) => {
  const artistId = req.params.id;

  try {
    const artistName = req.body.artist_name;
    const artistLastname = req.body.artist_lastname;

    let updatedData = {
      artist_name: artistName,
      artist_lastname: artistLastname,
      artist_aka: req.body.artist_aka,
      artist_arttype: req.body.artist_arttype,
      artist_country: req.body.artist_country,
      artist_city: req.body.artist_city,
      featured_on_front: req.body.featured_on_front || false,
    };

    if (req.files) {
      if (req.files["artist_image"]) {
        updatedData.artist_image = await imageUploader2(
          req.files["artist_image"][0]
        );
      }
      if (req.files["artist_work1"]) {
        updatedData.artist_work1 = await imageUploader2(
          req.files["artist_work1"][0]
        );
      }
      if (req.files["artist_work2"]) {
        updatedData.artist_work2 = await imageUploader2(
          req.files["artist_work2"][0]
        );
      }
      if (req.files["artist_work3"]) {
        updatedData.artist_work3 = await imageUploader2(
          req.files["artist_work3"][0]
        );
      }
      if (req.files["artist_pitch"]) {
        updatedData.artist_pitch = await imageUploader2(
          req.files["artist_pitch"][0]
        );
      }
      if (req.files["artist_pdf"]) {
        const pdfFile = req.files["artist_pdf"][0];
        const pdfFilename = `${artistName}-${artistLastname}-${pdfFile.originalname}`;
        const pdfFilePath = path.join(
          __dirname,
          "../uploads/pdfs",
          pdfFilename
        );

        console.log("Saving PDF to:", pdfFilePath); // Debugging log
        await saveFile(pdfFile.path, pdfFilePath);
        updatedData.artist_pdf = path.join("uploads/pdfs", pdfFilename); // Save relative path
      }
    }

    const updatedArtist = await Artists.findByIdAndUpdate(
      artistId,
      updatedData,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Artist updated successfully",
      data: updatedArtist,
    });
  } catch (error) {
    console.error("Error in updateArtist:", error);
    res.status(400).json({
      success: false,
      message: "Failed to update artist",
      error: error.message,
    });
  }
};

const deleteArtist = async (req, res) => {
  try {
    const artistId = req.params.id;
    const deletedArtist = await Artists.findByIdAndDelete(artistId);
    if (!deletedArtist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.json({ message: "Artist deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArtistById = async (req, res) => {
  try {
    const artist = await Artists.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArtistByFirstNameAndLastName = async (req, res) => {
  const { artist_name, artist_lastname } = req.params;
  console.log(`Searching for artist: ${artist_name} ${artist_lastname}`); // Log parameters
  try {
    const artist = await Artists.findOne({
      artist_name: new RegExp(`^${artist_name}$`, "i"),
      artist_lastname: new RegExp(`^${artist_lastname}$`, "i"),
    });

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.json(artist);
  } catch (error) {
    console.error(error); // Log any error
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAllArtists = async (req, res) => {
  try {
    await Artists.deleteMany({});
    res.json({ message: "All artists deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArtistsByFeatured = async (req, res) => {
  try {
    const artists = await Artists.find({ featured_on_front: true });
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArtistPdfById = async (req, res) => {
  try {
    const artist = await Artists.findById(req.params.id);
    if (!artist || !artist.artist_pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    const pdfFilePath = path.resolve(artist.artist_pdf);
    console.log("Serving PDF from:", pdfFilePath); // Debugging log

    res.sendFile(pdfFilePath);
  } catch (error) {
    console.error("Error in getArtistPdfById:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getArtistPdfByName = async (req, res) => {
  const { artist_name, artist_lastname } = req.params;
  try {
    const artist = await Artists.findOne({
      artist_name: new RegExp(`^${artist_name}$`, "i"),
      artist_lastname: new RegExp(`^${artist_lastname}$`, "i"),
    });

    if (!artist || !artist.artist_pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    const pdfFilePath = path.resolve(artist.artist_pdf);
    console.log("Serving PDF from:", pdfFilePath); // Debugging log

    res.sendFile(pdfFilePath);
  } catch (error) {
    console.error("Error in getArtistPdfByName:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const deletePdfByArtistName = async (req, res) => {
  const { artist_name, artist_lastname } = req.params;

  try {
    // Construct the filename pattern
    const pdfPattern = `${artist_name}-${artist_lastname}-*.pdf`;

    // Construct the full directory path
    const directoryPath = path.join(__dirname, "../uploads/pdfs");

    // Find all files in the directory that match the pattern
    const files = fs.readdirSync(directoryPath);
    const pdfFiles = files.filter(
      (file) =>
        file.startsWith(`${artist_name}-${artist_lastname}-`) &&
        file.endsWith(".pdf")
    );

    if (pdfFiles.length === 0) {
      return res.status(404).json({ message: "PDF not found" });
    }

    // Delete all matching PDF files
    for (const pdfFile of pdfFiles) {
      const pdfFilePath = path.join(directoryPath, pdfFile);
      console.log("Deleting PDF from:", pdfFilePath); // Debugging log
      await deleteFile(pdfFilePath);
    }

    // Update the artist's document in the database
    const artist = await Artists.findOneAndUpdate(
      {
        artist_name: new RegExp(`^${artist_name}$`, "i"),
        artist_lastname: new RegExp(`^${artist_lastname}$`, "i"),
      },
      { $unset: { artist_pdf: "" } }, // Remove the artist_pdf field
      { new: true }
    );

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.status(200).json({
      success: true,
      message: "PDF deleted successfully",
      data: artist,
    });
  } catch (error) {
    console.error("Error in deletePdfByArtistName:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete PDF",
      error: error.message,
    });
  }
};

module.exports = {
  getAllArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  getArtistById,
  getArtistByFirstNameAndLastName,
  deleteAllArtists,
  getArtistsByFeatured,
  getArtistPdfById,
  getArtistPdfByName,
  deletePdfByArtistName,
};
