const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "A blog must have title"]
    },
    body: {
        type: String,
        require: [true, "A blog must have a body"],
    },
});

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog