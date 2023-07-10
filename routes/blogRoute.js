const express = require("express");
const blogController = require("../controllers/postController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();


router
    .route("/")
    .get(blogController.getAllBlogs)
    .post(protect, blogController.createPost);

router
    .route("/:id")
    .get(blogController.getOnePost)
    .post(blogController.updatePost)
    .delete(blogController.deletePost);

module.exports = router;