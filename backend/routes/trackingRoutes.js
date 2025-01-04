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
const axios = require("axios");
const router = express.Router();
const Tracking = require("../models/Tracking");
// const GEOLOCATION_API_KEY = process.env.GEOLOCATION_API_KEY || "your_ipstack_api_key";
// const GEOLOCATION_URL = "http://api.ipstack.com";
const GEOLOCATION_API_KEY = "6db4032c0324747c5d643eb5a15d5181"; 
const GEOLOCATION_URL = "http://api.ipstack.com";

// Automatically track and save user information
router.get("/api/track", async (req, res) => {
  try {
    // Extract necessary data from the request
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || "unknown";
    const domain = req.query.domain || req.hostname; // Extract domain from query or hostname
    const gclid = req.query.gclid || null; // GCLID from query parameters

    if (!ip || !domain) {
      return res.status(400).json({ error: "Missing required fields: IP or domain" });
    }

    // Fetch geolocation data for the IP
    const geoResponse = await axios.get(`${GEOLOCATION_URL}/${ip}`, {
      params: { access_key: GEOLOCATION_API_KEY },
    });
    const geoData = geoResponse.data;

    // Save tracking data to the database
    const trackingData = new Tracking({
      domain,
      gclid,
      ip,
      country: geoData.country_name || "Unknown",
      isVpn: geoData.security?.vpn || false,
    });

    await trackingData.save();

    // Respond to the request
    res.status(201).send(`
      // Tracking information logged successfully.
    `);
  } catch (error) {
    console.error("Error tracking user data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
