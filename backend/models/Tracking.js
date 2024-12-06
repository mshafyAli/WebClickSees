const mongoose = require("mongoose");

const trackingSchema = new mongoose.Schema({
  domain: { type: String, required: true },
  gclid: { type: String },
  country: { type: String },
  isVpn: { type: Boolean },
  visits: { type: Number, default: 0 },
  lastVisit: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Tracking", trackingSchema);