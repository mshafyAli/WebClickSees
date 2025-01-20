// new code for checking the data
// const express = require("express");
// const router = express.Router();

// router.get("/script.js", (req, res) => {
//   const scriptContent = `
//     (function() {
//       const domain = window.location.hostname;
//       const gclid = new URLSearchParams(window.location.search).get("gclid");

//       // Automatically send data to the server using a GET request
//       const trackingUrl = new URL("https://webclicksees.onrender.com/api/track");
//       trackingUrl.searchParams.append("domain", domain);
//       if (gclid) trackingUrl.searchParams.append("gclid", gclid);

//       // Create an image request to send the data without blocking rendering
//       const img = new Image();
//       img.src = trackingUrl.toString();
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
    (function () {
  const url = window.location.href;

  // Extract everything after the first "?" in the URL
  let queryString = url.includes("?") ? url.split("?").slice(1).join("?") : "";

  // Normalize the query string: Replace additional "?" with "&"
  queryString = queryString.replace(/\?/g, "&"); // Correctly escape "?" with "\?"

  // Parse the normalized query string
  const urlParams = new URLSearchParams(queryString);

  // Extract parameters
  const domain = window.location.hostname;
  const gclid = urlParams.get("gclid");
  const kw = urlParams.get("kw");

  // Automatically send data to the server using a GET request
  const trackingUrl = new URL("https://webclicksees.onrender.com/api/track");
  trackingUrl.searchParams.append("domain", domain);
  if (gclid) trackingUrl.searchParams.append("gclid", gclid);
  if (kw) trackingUrl.searchParams.append("kw", kw);

  // Create an image request to send the data without blocking rendering
  const img = new Image();
  img.src = trackingUrl.toString();
})();
  `;

  res.setHeader("Content-Type", "application/javascript");
  res.send(scriptContent);
});

module.exports = router;
