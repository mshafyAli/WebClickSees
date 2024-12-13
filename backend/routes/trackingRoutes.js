// // routes/trackingRoutes.js old code
// const express = require("express");
// const fetch = require("node-fetch");
// const Tracking = require("../models/Tracking");
// const router = express.Router();

// // Helper: Get VPN and geo-data
// const getVpnGeoData = async (ip) => {
//   const vpnResponse = await fetch(`https://vpnapi.io/api/${ip}?key=${process.env.VPN_API_KEY}`);
//   const vpnData = await vpnResponse.json();

//   const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
//   const geoData = await geoResponse.json();

//   return {
//     isVpn: vpnData.security && vpnData.security.vpn,
//     country: geoData.country_name,
//   };
// };

// // Track Domain Data
// router.post("/", async (req, res) => {
//   const { domain, gclid, ip } = req.body;

//   try {
//     const { isVpn, country } = await getVpnGeoData(ip);

//     let tracking = await Tracking.findOne({ domain });
//     if (!tracking) {
//       tracking = new Tracking({ domain, gclid, country, isVpn, visits: 1 });
//     } else {
//       tracking.visits += 1;
//       tracking.gclid = gclid || tracking.gclid;
//       tracking.country = country;
//       tracking.isVpn = isVpn;
//       tracking.lastVisit = Date.now();
//     }

//     await tracking.save();
//     res.json(tracking);
//   } catch (error) {
//     console.error("Error tracking domain:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;

const express = require("express");
const axios = require("axios");
const router = express.Router();
const Tracking = require("../models/Tracking");

// Replace with your geolocation API key
const GEOLOCATION_API_KEY = "6db4032c0324747c5d643eb5a15d5181";
const GEOLOCATION_URL = "http://api.ipstack.com";

// Save tracking data with geolocation and VPN detection
router.post("/api/tracking", async (req, res) => {
  try {
    const { domain, gclid, ip } = req.body;

    const geoResponse = await axios.get(`${GEOLOCATION_URL}/${ip}`, {
      params: { access_key: GEOLOCATION_API_KEY },
    });
    const geoData = geoResponse.data;

    const trackingData = new Tracking({
      domain,
      gclid,
      ip,
      country: geoData.country_name,
      isVpn: geoData.security && geoData.security.vpn,
    });

    await trackingData.save();

    res.status(201).json({
      message: "Tracking data saved successfully!",
      domain: trackingData.domain,
      gclid: trackingData.gclid,
      country: trackingData.country,
      isVpn: trackingData.isVpn,
    });
  } catch (error) {
    console.error("Error fetching geolocation or saving data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
