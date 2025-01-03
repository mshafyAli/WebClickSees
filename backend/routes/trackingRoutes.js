// this code is old for better result
// const express = require("express");
// const axios = require("axios");
// const router = express.Router();
// const Tracking = require("../models/Tracking");

// const GEOLOCATION_API_KEY = "6db4032c0324747c5d643eb5a15d5181"; // Store securely in environment variables
// const GEOLOCATION_URL = "http://api.ipstack.com";

// // Save tracking data with geolocation and VPN detection
// router.post("/api/tracking", async (req, res) => {
//   try {
//     const { domain, gclid, ip } = req.body;

//     // Fetch geolocation data
//     const geoResponse = await axios.get(`${GEOLOCATION_URL}/${ip}`, {
//       params: { access_key: GEOLOCATION_API_KEY },
//     });
//     const geoData = geoResponse.data;

//     const trackingData = new Tracking({
//       domain,
//       gclid,
//       ip,
//       country: geoData.country_name,
//       isVpn: geoData.security?.vpn || false,
//     });

//     await trackingData.save();

//     res.status(201).json({
//       message: "Tracking data saved successfully!",
//       trackingData,
//     });
//   } catch (error) {
//     console.error("Error fetching geolocation or saving data:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Fetch all tracking data
// router.get("/api/tracking-data", async (req, res) => {
//   try {
//     const trackingData = await Tracking.find();
//     res.json(trackingData);
//   } catch (error) {
//     console.error("Error fetching tracking data:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;



// I tried new code for data save in database

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define the schema and model for tracking
const trackingSchema = new mongoose.Schema({
  ip: String,
  country: String,
  isVpn: Boolean,
  domain: String,
  gclid: String,
  timestamp: { type: Date, default: Date.now },
});

const Tracking = mongoose.model("Tracking", trackingSchema);

// Handle tracking POST request
router.post("/api/tracking", async (req, res) => {
  try {
    const { ip, country, isVpn, domain, gclid } = req.body;

    // Create a new tracking record
    const trackingData = new Tracking({
      ip,
      country,
      isVpn,
      domain,
      gclid,
    });

    // Save to the database
    await trackingData.save();

    res.status(201).json({ message: "Tracking data saved successfully." });
  } catch (error) {
    console.error("Error saving tracking data:", error.message);
    res.status(500).json({ error: "Failed to save tracking data." });
  }
});

module.exports = router;
