// this code is correct but not provide Desired output
const express = require("express");
const axios = require("axios");
const router = express.Router();
const Tracking = require("../models/Tracking");

const GEOLOCATION_API_KEY = "6db4032c0324747c5d643eb5a15d5181"; // Store securely in environment variables
const GEOLOCATION_URL = "http://api.ipstack.com";

// Save tracking data with geolocation and VPN detection
router.post("/api/tracking", async (req, res) => {
  try {
    const { domain, gclid, ip } = req.body;

    // Fetch geolocation data
    const geoResponse = await axios.get(`${GEOLOCATION_URL}/${ip}`, {
      params: { access_key: GEOLOCATION_API_KEY },
    });
    const geoData = geoResponse.data;

    const trackingData = new Tracking({
      domain,
      gclid,
      ip,
      country: geoData.country_name,
      isVpn: geoData.security?.vpn || false,
    });

    await trackingData.save();

    res.status(201).json({
      message: "Tracking data saved successfully!",
      trackingData,
    });
  } catch (error) {
    console.error("Error fetching geolocation or saving data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all tracking data
router.get("/api/tracking-data", async (req, res) => {
  try {
    const trackingData = await Tracking.find();
    res.json(trackingData);
  } catch (error) {
    console.error("Error fetching tracking data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;



// const express = require("express");
// const axios = require("axios");
// const router = express.Router();
// const Tracking = require("../models/Tracking");

// // Replace with your geolocation API key
// const GEOLOCATION_API_KEY = "6db4032c0324747c5d643eb5a15d5181";
// const GEOLOCATION_URL = "http://api.ipstack.com";

// // Save tracking data with geolocation and VPN detection
// router.post("/api/tracking", async (req, res) => {
//   try {
//     const { domain, gclid, ip } = req.body;

//     // Log the received data for debugging
//     console.log("Received data:", { domain, gclid, ip });

//     // Ensure the geolocation request is only made if IP is valid
//     if (!ip || ip === "unknown") {
//       return res.status(400).json({ error: "IP address is required" });
//     }

//     const geoResponse = await axios.get(`${GEOLOCATION_URL}/${ip}`, {
//       params: { access_key: GEOLOCATION_API_KEY },
//     });
//     const geoData = geoResponse.data;

//     const trackingData = new Tracking({
//       domain,
//       gclid,
//       ip,
//       country: geoData.country_name || "Unknown",
//       isVpn: geoData.security && geoData.security.vpn,
//     });

//     await trackingData.save();

//     res.status(201).json({
//       message: "Tracking data saved successfully!",
//       domain: trackingData.domain,
//       gclid: trackingData.gclid,
//       country: trackingData.country,
//       isVpn: trackingData.isVpn,
//     });
//   } catch (error) {
//     console.error("Error fetching geolocation or saving data:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;
