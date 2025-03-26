


// const express = require("express");
// const axios = require("axios");
// const requestIp = require("request-ip");
// const Tracking = require("../models/Tracking");
// const router = express.Router();
// const {authMiddleware} = require("../controllers/auth/auth-controller")
// const GEOLOCATION_URL = "http://ip-api.com/json"; 
// const VPN_API_KEY = "5648s6-c8489j-4s6hge-o40023"; // Change this to your chosen VPN checking API key
// const VPN_CHECK_URL = "https://proxycheck.io/v2"; // Example VPN check API URL


// // ⭐ Add delay function
// function delay(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// // Helper function to check if the IP is a VPN
// async function checkVpn(ip) {
//     try {

//         // ⭐ Delay before VPN API request
//     await delay(1000); // 1 second delay

//       const vpnResponse = await axios.get(`${VPN_CHECK_URL}/${ip}`, {
//         params: { key: VPN_API_KEY, vpn: 1, asn: 1 },
//       });
//       const vpnData = vpnResponse.data[ip];
//       console.log("VPN Check Data:", vpnData); // Log the VPN check data
//       return vpnData && vpnData.proxy === "yes";
//     } catch (error) {
//       console.error("Error checking VPN:", error.message);
//       return false;
//     }
//   }

// // VPN check API endpoint
// router.get("/api/check-vpn", async (req, res) => {
//   try {
//     const ip = req.query.ip;
//     if (!ip) {
//       return res.status(400).json({ error: "IP address is required" });
//     }

//     const isVpn = await checkVpn(ip);
//     res.status(200).json({ ip, isVpn });
//   } catch (error) {
//     console.error("Error in VPN check API:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Existing tracking API
// router.get("/api/track", async (req, res) => {
//   try {
//     const ip = req.query.ip || requestIp.getClientIp(req);
//     console.log("IP to track:", ip);

//     const domain = req.query.domain || req.hostname;
//     const gclid = req.query.gclid || null;
//     const gad = req.query.gad || null; 
//     const kw = req.query.kw || null;  

//     // ⭐ Delay before Geolocation API request
//     await delay(1000); // 1 second delay

//     // Geolocation request using ip-api
//     const geoResponse = await axios.get(`${GEOLOCATION_URL}/${ip}`);
//     const geoData = geoResponse.data;
//     console.log("Geolocation Data:", geoData);

//     const isVpn = await checkVpn(ip); // Use the new VPN check function

//     const trackingData = new Tracking({
//       domain,
//       gclid,
//       gad,      
//       kw,  
//       ip,
//       country: geoData.country || "Unknown", // Using ip-api response country
//       isVpn,
//     });

//     await trackingData.save();
//     res.status(201).json({ message: "Tracking information logged successfully", trackingData });
//   } catch (error) {
//     console.error("Error tracking user data:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Fetch tracking records
// router.get("/api/tracking-records", async (req, res) => {
//   try {
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//     await Tracking.deleteMany({ date: { $lt: sevenDaysAgo } });

//     const records = await Tracking.find();
//     res.status(200).json(records);
//   } catch (error) {
//     console.error("Error fetching tracking records:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Delete a specific tracking record
// router.delete("/api/tracking-records/:id", authMiddleware, async (req, res) => {
//   // Check if the user is an admin
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ 
//       success: false, 
//       message: "Access denied! Only admins can delete records." 
//     });
//   }

//   const { id } = req.params;
//   try {
//     const deletedRecord = await Tracking.findByIdAndDelete(id);
//     if (!deletedRecord) {
//       return res.status(404).json({ error: "Record not found" });
//     }
//     res.status(200).json({ message: "Record deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting record:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });



// // router.delete("/api/tracking-records/:id", async (req, res) => {
// //   const { id } = req.params;
// //   try {
// //     const deletedRecord = await Tracking.findByIdAndDelete(id);
// //     if (!deletedRecord) {
// //       return res.status(404).json({ error: "Record not found" });
// //     }
// //     res.status(200).json({ message: "Record deleted successfully" });
// //   } catch (error) {
// //     console.error("Error deleting record:", error.message);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // });

// module.exports = router;


const express = require("express");
const axios = require("axios");
const requestIp = require("request-ip");
const Tracking = require("../models/Tracking");
const router = express.Router();
const { authMiddleware } = require("../controllers/auth/auth-controller");

const IPINFO_TOKEN = "17d6b63ed032c5"; // Your IPinfo Access Token
const IPINFO_URL = `https://ipinfo.io`;
const VPN_API_KEY = "5648s6-c8489j-4s6hge-o40023"; // VPN API key
const VPN_CHECK_URL = "https://proxycheck.io/v2";

// Helper delay function
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// VPN check function
async function checkVpn(ip) {
  try {
    console.log(`Checking VPN for IP: ${ip}`);
    await delay(1000); // 1 second delay
    const vpnResponse = await axios.get(`${VPN_CHECK_URL}/${ip}`, {
      params: { key: VPN_API_KEY, vpn: 1, asn: 1 },
    });
    console.log("ProxyCheck.io Response:", vpnResponse.data);
    const vpnData = vpnResponse.data[ip];
    return vpnData && vpnData.proxy === "yes";
  } catch (error) {
    console.error("Error checking VPN:", error.response?.data || error.message);
    return false;
  }
}

// VPN check API endpoint
router.get("/api/check-vpn", async (req, res) => {
  try {
    const ip = req.query.ip;
    if (!ip) {
      return res.status(400).json({ error: "IP address is required" });
    }

    const isVpn = await checkVpn(ip);
    res.status(200).json({ ip, isVpn });
  } catch (error) {
    console.error("Error in VPN check API:", error.response?.data || error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Tracking API
router.get("/api/track", async (req, res) => {
  console.log("Tracking API HIT: Query params =>", req.query); //  LOG IMMEDIATELY
  try {
    const ip = req.query.ip || requestIp.getClientIp(req);
    console.log("IP to track:", ip);
    const domain = req.query.domain || req.hostname;
    const gclid = req.query.gclid || null;
    const gad = req.query.gad || null;
    const kw = req.query.kw || null;

    await delay(1000); // Optional delay for API rate limits

    // Geolocation request using ipinfo.io
    // const geoResponse = await axios.get(`${IPINFO_URL}/${ip}?token=${IPINFO_TOKEN}`);
    // const geoData = geoResponse.data;
    // console.log("Geolocation Data:", geoData);

    try {
      const geoResponse = await axios.get(`${IPINFO_URL}/${ip}?token=${IPINFO_TOKEN}`);
      console.log("🔹 Geolocation Data:", geoResponse.data);
    } catch (geoError) {
      console.error("❌ Geolocation API failed:", geoError.response?.data || geoError.message);
    }

    const isVpn = await checkVpn(ip); // VPN check function

    // Create tracking data with only required fields
    const trackingData = new Tracking({
      domain,
      gclid,
      gad,
      kw,
      ip,
      country: geoData.country || "Unknown",
      isVpn,
    });

    await trackingData.save();

    res.status(201).json({ message: "Tracking information logged successfully", trackingData });
  } catch (error) {
    console.error("Error tracking user data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all tracking records
router.get("/api/tracking-records", async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    await Tracking.deleteMany({ date: { $lt: sevenDaysAgo } });

    const records = await Tracking.find();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching tracking records:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete tracking record (Admin only)
router.delete("/api/tracking-records/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied! Only admins can delete records."
    });
  }

  const { id } = req.params;
  try {
    const deletedRecord = await Tracking.findByIdAndDelete(id);
    if (!deletedRecord) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting record:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;


