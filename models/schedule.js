// Naming convention for models: use singular form of the represented entity
// Import mongoose
const mongoose = require("mongoose");
// Define data schema (JSON)
const dataSchemaObj = {
  employeeName: { type: String, required: true },
  scheduleDate: { type: Date },
  department: { type: String, required: true },
  isScheduled: { type: String, default: "TO DO" },
};
// Create mongoose schema
const scheduleSchema = mongoose.Schema(dataSchemaObj);
// Create and import mongoose model
module.exports = mongoose.model("Schedule", scheduleSchema);