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
    origin: ["https://clicks.encoders.com.pk", "https://academians.com.au","https://the-academians.com","https://britishphdwriters.co.uk"], // Replace with your frontend URL
    methods: "GET,POST,PUT,DELETE", 
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
