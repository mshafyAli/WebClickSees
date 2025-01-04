


// this code is old for betterresult
// const express = require("express");
// const router = express.Router();

// router.get("/script.js", (req, res) => {
//   const scriptContent = `
//     (function() {
//       async function fetchIP() {
//         try {
//           const response = await fetch("https://api.ipify.org?format=json");
//           const data = await response.json();
//           return data.ip;
//         } catch (error) {
//           console.error("Failed to fetch IP:", error);
//           return "unknown";
//         }
//       }

//       (async function() {
//         const ip = await fetchIP();
//         const domain = window.location.hostname;
//         const gclid = new URLSearchParams(window.location.search).get("gclid");

//         // Debugging log
//         console.log("IP:", ip, "GCLID:", gclid, "Domain:", domain);

//         await fetch("https://webclicksees.onrender.com/api/tracking", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ domain, gclid, ip }),  // Ensure 'gclid' and 'ip' are correctly passed
//         }).catch((error) => console.error("Tracking Error:", error));
//       })();
//     })();
//   `;

//   res.setHeader("Content-Type", "application/javascript");
//   res.send(scriptContent);
// });

// module.exports = router;



// new code for checking the data
const express = require("express");
const router = express.Router();

router.get("/script.js", (req, res) => {
  const scriptContent = `
    (function() {
      const domain = window.location.hostname;
      const gclid = new URLSearchParams(window.location.search).get("gclid");

      // Automatically send data to the server using a GET request
      const trackingUrl = new URL("https://webclicksees.onrender.com/api/track");
      trackingUrl.searchParams.append("domain", domain);
      if (gclid) trackingUrl.searchParams.append("gclid", gclid);

      // Create an image request to send the data without blocking rendering
      const img = new Image();
      img.src = trackingUrl.toString();
    })();
  `;

  res.setHeader("Content-Type", "application/javascript");
  res.send(scriptContent);
});

module.exports = router;

