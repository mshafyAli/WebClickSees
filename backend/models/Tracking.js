// const mongoose = require("mongoose");

// const trackingSchema = new mongoose.Schema({
//   domain: { type: String, required: true },
//   gclid: { type: String },
//   country: { type: String },
//   isVpn: { type: Boolean },
//   visits: { type: Number, default: 0 },
//   lastVisit: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Tracking", trackingSchema);


const mongoose = require("mongoose");

const TrackingSchema = new mongoose.Schema({
  domain: { type: String, required: true },
  gclid: { type: String, default: null },
  ip: { type: String, required: true },
  country: { type: String, default: "Unknown" },
  isVpn: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Tracking", TrackingSchema);
