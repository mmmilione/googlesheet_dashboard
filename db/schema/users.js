const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    email: String,
    pw: String,
    isAdmin: Boolean,
    hasChangedPW: Boolean,
    expiry: Number
});

module.exports = userSchema;