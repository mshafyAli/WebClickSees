


//this code is fine but not provide desired ouput
// const express = require("express");
// const router = express.Router();

// router.get("/script.js", (req, res) => {
//   const scriptContent = `
//     (function () {
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

//       (async function () {
//         const ip = await fetchIP();
//         const domain = window.location.hostname;
//         const gclid = new URLSearchParams(window.location.search).get("gclid");

//         await fetch("https://webclicksees.onrender.com/api/tracking", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ domain, gclid, ip }),
//         }).catch((error) => console.error("Tracking Error:", error));
//       })();
//     })();
//   `;

//   res.setHeader("Content-Type", "application/javascript");
//   res.send(scriptContent);
// });

// module.exports = router;



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
