


// this code is old for betterresult
const express = require("express");
const router = express.Router();

router.get("/script.js", (req, res) => {
  const scriptContent = `
    (function() {
      async function fetchIP() {
        try {
          const response = await fetch("https://api.ipify.org?format=json");
          const data = await response.json();
          return data.ip;
        } catch (error) {
          console.error("Failed to fetch IP:", error);
          return "unknown";
        }
      }

      (async function() {
        const ip = await fetchIP();
        const domain = window.location.hostname;
        const gclid = new URLSearchParams(window.location.search).get("gclid");

        // Debugging log
        console.log("IP:", ip, "GCLID:", gclid, "Domain:", domain);

        await fetch("https://webclicksees.onrender.com/api/tracking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ domain, gclid, ip }),  // Ensure 'gclid' and 'ip' are correctly passed
        }).catch((error) => console.error("Tracking Error:", error));
      })();
    })();
  `;

  res.setHeader("Content-Type", "application/javascript");
  res.send(scriptContent);
});

module.exports = router;



// new code for checking the data
// const express = require("express");
// const router = express.Router();
// const GEOLOCATION_API_KEY = "6db4032c0324747c5d643eb5a15d5181"; // Replace with your API key
// const GEOLOCATION_URL = "https://api.ipstack.com";

// // Serve the script
// router.get("/script.js", (req, res) => {
//   const scriptContent = `
//     (function() {
//       async function fetchIPDetails() {
//         try {
//           // Fetch the user's public IP address
//           const ipResponse = await fetch("https://api.ipify.org?format=json");
//           const ipData = await ipResponse.json();
//           const ip = ipData.ip;

//           // Fetch geolocation data for the IP address
//           const geoResponse = await fetch("${GEOLOCATION_URL}/" + ip + "?access_key=${GEOLOCATION_API_KEY}");
//           const geoData = await geoResponse.json();

//           const country = geoData.country_name || "Unknown";
//           const isVpn = geoData.security?.vpn || false;
//           const domain = window.location.hostname;
//           const gclid = new URLSearchParams(window.location.search).get("gclid");

//           // Log the tracking data in the console
//           console.log("Tracking Data:", { ip, country, isVpn, domain, gclid });

//           // Send tracking data to the server using a POST request
//           await fetch("https://webclicksees.onrender.com/api/tracking", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ ip, country, isVpn, domain, gclid }),
//           }).then((response) => {
//             if (!response.ok) {
//               throw new Error("Failed to save tracking data");
//             }
//             console.log("Tracking data saved successfully");
//           }).catch((error) => {
//             console.error("Error saving tracking data:", error);
//           });
//         } catch (error) {
//           console.error("Error tracking data:", error);
//         }
//       }

//       // Execute the tracking logic on load
//       fetchIPDetails();
//     })();
//   `;

//   res.setHeader("Content-Type", "application/javascript");
//   res.send(scriptContent);
// });

// module.exports = router;


// new code for checking the data
// const express = require("express");
// const router = express.Router();

// const GEOLOCATION_API_KEY = "6db4032c0324747c5d643eb5a15d5181"; // Replace with your API key
// const GEOLOCATION_URL = "https://api.ipstack.com";

// // Serve the script
// router.get("/script.js", (req, res) => {
//   const scriptContent = `
//     (function() {
//       async function fetchIPDetails() {
//         try {
//           // Fetch the user's public IP address
//           const ipResponse = await fetch("https://api.ipify.org?format=json");
//           const ipData = await ipResponse.json();
//           const ip = ipData.ip;

//           // Fetch geolocation data for the IP address
//           const geoResponse = await fetch("${GEOLOCATION_URL}/" + ip + "?access_key=${GEOLOCATION_API_KEY}");
//           const geoData = await geoResponse.json();

//           const country = geoData.country_name || "Unknown";
//           const isVpn = geoData.security?.vpn || false;
//           const domain = window.location.hostname;
//           const gclid = new URLSearchParams(window.location.search).get("gclid");

//           // Log the tracking data in the console
//           console.log("Tracking Data:", { ip, country, isVpn, domain, gclid });

//           // Send tracking data to the server using a POST request
//           await fetch("https://webclicksees.onrender.com/api/tracking", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ ip, country, isVpn, domain, gclid }),
//           }).then((response) => {
//             if (!response.ok) {
//               throw new Error("Failed to save tracking data");
//             }
//             console.log("Tracking data saved successfully");
//           }).catch((error) => {
//             console.error("Error saving tracking data:", error);
//           });
//         } catch (error) {
//           console.error("Error tracking data:", error);
//         }
//       }

//       // Execute the tracking logic on page load
//       fetchIPDetails();
//     })();
//   `;

//   res.setHeader("Content-Type", "application/javascript");
//   res.send(scriptContent);
// });

// module.exports = router;
