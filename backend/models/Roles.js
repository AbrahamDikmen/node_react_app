const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
  role: String,
  permissions: [{type: String}],
});

const model = mongoose.model("roles", rolesSchema);
module.exports = model;
