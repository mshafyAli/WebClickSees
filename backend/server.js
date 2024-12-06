// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const trackingRoutes = require("./routes/trackingRoutes");

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/api/tracking", trackingRoutes);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running and this is the root test response!" });
  })


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
