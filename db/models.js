const mongoose = require('mongoose');
const userSchema = require('./schema/users');
const Users = mongoose.model("Users", userSchema);
module.exports = { Users };