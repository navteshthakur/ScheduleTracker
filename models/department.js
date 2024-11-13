const mongoose = require("mongoose");
const schemaObj = {
    department: {type: String, required: true},
    taskCode: {type: String, required: true}
}
const mongooseSchema = mongoose.Schema(schemaObj);
module.exports = mongoose.model("Department", mongooseSchema);