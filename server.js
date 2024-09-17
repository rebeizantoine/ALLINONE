require("dotenv").config(); // Load environment variables at the top
const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");

//bridginbrushes Router
const artistsRouter = require("./routes/bridginRoutes/artistsRoute");
const exhibitionsRouter = require("./routes/bridginRoutes/exhibitionsRoute");
const testRoute = require("./routes/bridginRoutes/testRoute");
const aboutRouter = require("./routes/bridginRoutes/aboutRoute");
const featuredArtistRoutes = require("./routes/bridginRoutes/featuredArtistRoutes");
const featuredPaintingsRoutes = require("./routes/bridginRoutes/featuredPaintingsRoute");
const contact123Routes = require("./routes/bridginRoutes/contact123Route");
const galleryRoutes = require("./routes/bridginRoutes/galleryRoutes");
const bodyParser = require("body-parser");
const multerErrorHandler = require("./utils/multerErrorHandler");
const adminbridgingRoutes = require("./routes/bridginRoutes/adminbridgindRoute");
const pdfRoutes = require("./utils/pdfroutes");
const path = require("path");

//jdd Router
const singleitemRoute = require("./routes/jddRoutes/singleitemRoutes");
const contactRoute = require("./routes/jddRoutes/contactjddRoutes");
const categoryRouter = require("./routes/jddRoutes/categoryRoutes");
const collectionRoute = require("./routes/jddRoutes/collectionRoutes");
const adminjddRoute = require("./routes/jddRoutes/adminjddRoutes");
const purchasedRoutes = require("./routes/jddRoutes/purchasedRoutes");

//justsmm Router
const orderSummaryLawaRoutes = require("./routes/justsmmRoutes/orderSummaryRoute"); // Ensure this is the correct path
const adminlawaRoute = require("./routes/justsmmRoutes/adminlawaRoute");
const app = express();
const port = process.env.PORT || 8000;

//jobblitz Router
const adminRoutes = require("./routes/jobblitzRoutes/adminRoutes");
const employerRoutes = require("./routes/jobblitzRoutes/employerRoutes");
const categoryRoutes = require("./routes/jobblitzRoutes/categoryRoutes");
const cvRoutes = require("./routes/jobblitzRoutes/cvRoutes");
const jobDescriptionRoutes = require("./routes/jobblitzRoutes/jobdescriptionRoutes");
const jobseekerRoutes = require("./routes/jobblitzRoutes/jobseekerRoutes");
const featuredemployerRoutes = require("./routes/jobblitzRoutes/featuredemployerRoutes");
const termsofconditionRoutes = require("./routes/jobblitzRoutes/termsofconditionRoutes");

///////

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/pdfs", express.static(path.join(__dirname, "uploads/pdfs")));

//bridgingbrushes Router
app.use("/artists", artistsRouter);
app.use("/exhibitions", exhibitionsRouter);
app.use("/about", aboutRouter);
app.use("/test", testRoute);
app.use("/featured-artists", featuredArtistRoutes);
app.use("/contact123", contact123Routes);
app.use("/featuredp", featuredPaintingsRoutes);
app.use("/gallery", galleryRoutes);
app.use("/adminkplre", adminbridgingRoutes);
app.use("/api", pdfRoutes);
app.use(multerErrorHandler);

//jdd Router

app.use("/singleitem", singleitemRoute);
app.use("/contactsjdd", contactRoute);
app.use("/categoriesjdd", categoryRouter);
app.use("/collections", collectionRoute);
app.use("/adminsjdd", adminjddRoute);
app.use("/purchased", purchasedRoutes);

//justsmm

app.use("/orderlawa", orderSummaryLawaRoutes);
app.use("/adminlawa", adminlawaRoute);

//jobblitz

app.use("/admin", adminRoutes);
app.use("/employer", employerRoutes);
app.use("/categories", categoryRoutes);
app.use("/jobdescriptions", jobDescriptionRoutes);
app.use("/jobseeker/uploadCV", cvRoutes);
app.use("/jobseeker", jobseekerRoutes);
app.use("/cv", cvRoutes);
app.use("/featuredemployer", featuredemployerRoutes);
app.use("/terms", termsofconditionRoutes);

app.listen(port, async () => {
  await dbConnection();
  console.log(`Example app listening on port ${port}`);
});
