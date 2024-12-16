// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const trackingRoutes = require("./routes/trackingRoutes");
const scriptRoute = require("./routes/ScriptRoute");

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173", "http://academians.com.au"], // Replace with your frontend URL
    methods: "GET,POST,PUT,DELETE", // Specify allowed methods if needed
    credentials: true, // Allow cookies to be sent
  }));

// Connect to MongoDB
connectDB();

// Routes
app.use(trackingRoutes);
app.use(scriptRoute);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running and this is the root test response!" });
  })


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
