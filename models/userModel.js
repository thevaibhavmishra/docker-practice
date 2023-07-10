const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "A user must have a name "],
        unique: true
    },
    password: {
        type: String,
        require: [true, "User must hava a password"]
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User