// routes/trackingRoutes.js
const express = require("express");
const fetch = require("node-fetch");
const Tracking = require("../models/Tracking");
const router = express.Router();

// Helper: Get VPN and geo-data
const getVpnGeoData = async (ip) => {
  const vpnResponse = await fetch(`https://vpnapi.io/api/${ip}?key=${process.env.VPN_API_KEY}`);
  const vpnData = await vpnResponse.json();

  const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
  const geoData = await geoResponse.json();

  return {
    isVpn: vpnData.security && vpnData.security.vpn,
    country: geoData.country_name,
  };
};

// Track Domain Data
router.post("/", async (req, res) => {
  const { domain, gclid, ip } = req.body;

  try {
    const { isVpn, country } = await getVpnGeoData(ip);

    let tracking = await Tracking.findOne({ domain });
    if (!tracking) {
      tracking = new Tracking({ domain, gclid, country, isVpn, visits: 1 });
    } else {
      tracking.visits += 1;
      tracking.gclid = gclid || tracking.gclid;
      tracking.country = country;
      tracking.isVpn = isVpn;
      tracking.lastVisit = Date.now();
    }

    await tracking.save();
    res.json(tracking);
  } catch (error) {
    console.error("Error tracking domain:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
