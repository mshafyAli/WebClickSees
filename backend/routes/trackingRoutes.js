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
// const express = require("express");
// const axios = require("axios");
// const router = express.Router();
// const Tracking = require("../models/Tracking");
// const GEOLOCATION_API_KEY = "6db4032c0324747c5d643eb5a15d5181";
// const GEOLOCATION_URL = "http://api.ipstack.com";

// // Automatically track and save user information
// router.get("/api/track", async (req, res) => {
//   try {
//     // Extract necessary data from the request
//     const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || "unknown";
//     const domain = req.query.domain || req.hostname; // Extract domain from query or hostname
//     const gclid = req.query.gclid || null; // GCLID from query parameters

//     if (!ip || !domain) {
//       return res.status(400).json({ error: "Missing required fields: IP or domain" });
//     }

//     // Fetch geolocation data for the IP
//     const geoResponse = await axios.get(`${GEOLOCATION_URL}/${ip}`, {
//       params: { access_key: GEOLOCATION_API_KEY },
//     });
//     const geoData = geoResponse.data;

//     // Save tracking data to the database
//     const trackingData = new Tracking({
//       domain,
//       gclid,
//       ip,
//       country: geoData.country_name || "Unknown",
//       isVpn: geoData.security?.vpn || false,
//     });

//     await trackingData.save();

//     // Respond to the request
//     res.status(201).send(`
//       // Tracking information logged successfully.
//     `);
//   } catch (error) {
//     console.error("Error tracking user data:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;

// 3rd new code for tracking this code is working fine nut not show isvpn true always show false
// const express = require("express");
// const axios = require("axios");
// const router = express.Router();
// const Tracking = require("../models/Tracking");
// const GEOLOCATION_API_KEY = "6db4032c0324747c5d643eb5a15d5181"; // Replace with your valid API key
// const GEOLOCATION_URL = "http://api.ipstack.com";

// // Helper function to extract the actual client IP
// function getClientIP(req) {
//   const xForwardedFor = req.headers["x-forwarded-for"];
//   if (xForwardedFor) {
//     console.log("x-forwarded-for header:", xForwardedFor); // Log the x-forwarded-for header
//     return xForwardedFor.split(",")[0].trim(); // Return the first IP in the list
//   }
//   console.log("Fallback IP (remoteAddress):", req.connection.remoteAddress); // Log fallback IP
//   return req.connection.remoteAddress || "unknown"; // Fallback to remoteAddress
// }

// // Automatically track and save user information
// router.get("/api/track", async (req, res) => {
//   try {
//     // Extract actual client IP
//     const ip = getClientIP(req);
//     console.log("Extracted IP:", ip); // Log the extracted IP

//     // Extract domain and GCLID
//     const domain = req.query.domain || req.hostname; // Extract domain from query or hostname
//     const gclid = req.query.gclid || null; // GCLID from query parameters

//     console.log("Domain:", domain); // Log the domain
//     console.log("GCLID:", gclid); // Log the GCLID

//     if (!ip || ip === "unknown" || !domain) {
//       console.error("Error: Missing required fields: IP or domain");
//       return res
//         .status(400)
//         .json({ error: "Missing required fields: IP or domain" });
//     }

//     // Fetch geolocation data for the IP
//     const geoResponse = await axios.get(`${GEOLOCATION_URL}/${ip}`, {
//       params: { access_key: GEOLOCATION_API_KEY },
//     });
//     const geoData = geoResponse.data;
//     console.log("Geolocation Data:", geoData); // Log geolocation data

//     // Save tracking data to the database
//     const trackingData = new Tracking({
//       domain,
//       gclid,
//       ip,
//       country: geoData.country_name || "Unknown",
//       isVpn: geoData.security?.vpn || false,
//     });

//     await trackingData.save();
//     console.log("Tracking Data Saved:", trackingData); // Log the saved data

//     // Respond to the request
//     res.status(201).send("// Tracking information logged successfully.");
//   } catch (error) {
//     console.error("Error tracking user data:", error.message); // Log the error message
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// router.get("/api/tracking-records", async (req, res) => {
//   try {
//     const records = await Tracking.find();
//     res.status(200).json(records);
//   } catch (error) {
//     console.error("Error fetching tracking records:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;


// 4th new code for tracking this code is working fine nut not show isvpn true always show false

// const express = require("express");
// const axios = require("axios");
// const router = express.Router();
// const Tracking = require("../models/Tracking");
// const GEOLOCATION_API_KEY = "6db4032c0324747c5d643eb5a15d5181"; // Replace with your valid API key
// const GEOLOCATION_URL = "http://api.ipstack.com";

// // Helper function to extract the actual client IP
// function getClientIP(req) {
//   const xForwardedFor = req.headers["x-forwarded-for"];
//   if (xForwardedFor) {
//     console.log("x-forwarded-for header:", xForwardedFor); // Log the x-forwarded-for header
//     return xForwardedFor.split(",")[0].trim(); // Return the first IP in the list
//   }
//   console.log("Fallback IP (remoteAddress):", req.connection.remoteAddress); // Log fallback IP
//   return req.connection.remoteAddress || "unknown"; // Fallback to remoteAddress
// }

// // Automatically track and save user information
// router.get("/api/track", async (req, res) => {
//   try {
//     // Extract actual client IP
//     const ip = getClientIP(req);
//     console.log("Extracted IP:", ip); // Log the extracted IP

//     // Extract domain and GCLID
//     const domain = req.query.domain || req.hostname; // Extract domain from query or hostname
//     const gclid = req.query.gclid || null; // GCLID from query parameters

//     console.log("Domain:", domain); // Log the domain
//     console.log("GCLID:", gclid); // Log the GCLID

//     if (!ip || ip === "unknown" || !domain) {
//       console.error("Error: Missing required fields: IP or domain");
//       return res
//         .status(400)
//         .json({ error: "Missing required fields: IP or domain" });
//     }

//     // Check if IP already exists
//     const existingRecord = await Tracking.findOne({ ip });

//     if (existingRecord) {
//       return res.status(409).json({ message: "IP already tracked", existingRecord });
//     }

//     // Fetch geolocation data for the IP
//     const geoResponse = await axios.get(`${GEOLOCATION_URL}/${ip}`, {
//       params: { access_key: GEOLOCATION_API_KEY },
//     });
//     const geoData = geoResponse.data;
//     console.log("Geolocation Data:", geoData); // Log geolocation data

//     // Check if VPN detection is available and set it correctly
//     const isVpn = geoData.security && geoData.security.vpn ? geoData.security.vpn : false;

//     // Save tracking data to the database
//     const trackingData = new Tracking({
//       domain,
//       gclid,
//       ip,
//       country: geoData.country_name || "Unknown",
//       isVpn: isVpn,
//     });

//     await trackingData.save();
//     console.log("Tracking Data Saved:", trackingData); // Log the saved data

//     // Respond to the request
//     res.status(201).send("// Tracking information logged successfully.");
//   } catch (error) {
//     console.error("Error tracking user data:", error.message); // Log the error message
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Fetch tracking records
// router.get("/api/tracking-records", async (req, res) => {
//   try {
//     const records = await Tracking.find();
//     res.status(200).json(records);
//   } catch (error) {
//     console.error("Error fetching tracking records:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


// router.delete("/api/tracking-records/:id", async (req, res) => {
//   const { id } = req.params;
//   const deletedRecord = await Tracking.findByIdAndDelete(id);
//   try {
//     if (!deletedRecord) {
//       return res.status(404).json({ error: "Record not found" });
//     }
//     res.status(200).json({ message: "Record deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting record:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;

//5th code for checking vpn 

const express = require("express");
const axios = require("axios");
const router = express.Router();
const Tracking = require("../models/Tracking");

// Replace with your valid ProxyCheck API key
const PROXYCHECK_API_KEY = "5648s6-c8489j-4s6hge-o40023"; 
const PROXYCHECK_URL = "https://proxycheck.io/v2";

// Helper function to extract the actual client IP
function getClientIP(req) {
  const xForwardedFor = req.headers["x-forwarded-for"];
  if (xForwardedFor) {
    console.log("x-forwarded-for header:", xForwardedFor); // Log the x-forwarded-for header
    return xForwardedFor.split(",")[0].trim(); // Return the first IP in the list
  }
  console.log("Fallback IP (remoteAddress):", req.connection.remoteAddress); // Log fallback IP
  return req.connection.remoteAddress || "unknown"; // Fallback to remoteAddress
}

// Automatically track and save user information
router.get("/api/track", async (req, res) => {
  try {
    // Extract actual client IP
    const ip = getClientIP(req);
    console.log("Extracted IP:", ip); // Log the extracted IP

    // Extract domain and GCLID
    const domain = req.query.domain || req.hostname; // Extract domain from query or hostname
    const gclid = req.query.gclid || null; // GCLID from query parameters

    console.log("Domain:", domain); // Log the domain
    console.log("GCLID:", gclid); // Log the GCLID

    if (!ip || ip === "unknown" || !domain) {
      return res.status(400).json({ error: "Missing required fields: IP or domain" });
    }

    // Check if IP already exists
    const existingRecord = await Tracking.findOne({ ip });

    if (existingRecord) {
      return res.status(409).json({ message: "IP already tracked", existingRecord });
    }

    // Skip ProxyCheck for local IPs (127.0.0.1 or ::1)
    if (ip === "127.0.0.1" || ip === "::1") {
      console.log("Local IP detected, skipping geolocation and VPN check.");
      const trackingData = new Tracking({
        domain,
        gclid,
        ip,
        country: "Localhost",
        isVpn: false,
      });

      await trackingData.save();
      console.log("Tracking Data Saved for Localhost:", trackingData); // Log the saved data
      return res.status(201).send("Tracking information logged successfully (Local IP).");
    }

    // Fetch geolocation and VPN data for the IP using ProxyCheck.io API
    const geoResponse = await axios.get(`${PROXYCHECK_URL}/${ip}`, {
      params: { key: PROXYCHECK_API_KEY },
    });

    // Log the full response to see the structure
    console.log("ProxyCheck Response:", geoResponse.data);

    // Check if the expected data exists
    const geoData = geoResponse.data[ip];
    if (!geoData) {
      console.error("Error: No data found for the provided IP");
      return res.status(400).json({ error: "No geolocation data found for the provided IP" });
    }

    console.log("ProxyCheck Data:", geoData); // Log the data from ProxyCheck

    // Check if VPN is detected
    const isVpn = geoData.proxy === "yes"; // `proxy` field indicates VPN usage

    // Save tracking data to the database
    const trackingData = new Tracking({
      domain,
      gclid,
      ip,
      country: geoData.country || "Unknown",
      isVpn: isVpn,
    });

    await trackingData.save();
    console.log("Tracking Data Saved:", trackingData); // Log the saved data

    // Respond to the request
    res.status(201).send("Tracking information logged successfully.");
  } catch (error) {
    console.error("Error tracking user data:", error.message); // Log the error message
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch tracking records
router.get("/api/tracking-records", async (req, res) => {
  try {
    const records = await Tracking.find();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching tracking records:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete tracking record by ID
router.delete("/api/tracking-records/:id", async (req, res) => {
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




