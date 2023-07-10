const Blog = require("../models/blogModel");

exports.getAllBlogs = async (req, res, next) => {
    try{
        const blogs = await Blog.find();

        res.status(200).json({
            status: 'success',
            results: blogs.length,
            data: {
                blogs
            } 
        })

    }catch (e) {
        res.status(400).json({
            status: 'failure',
        })
    }
}


exports.getOnePost = async (req, res, next) => {
    
    try{
        const blog = await Blog.findById(req.params.id);
    
        res.status(200).json({
            status: 'success',
            data: {
                blog
            } 
        })
    
    }catch (e) {
        res.status(400).json({
            status: 'failure',
        })
    }
}


exports.createPost = async (req, res, next) => {
    
    try{
        const blog = await Blog.create(req.body);
    
        res.status(200).json({
            status: 'success',
            data: {
                blog
            } 
        })
    
    }catch (e) {
        res.status(400).json({
            status: 'failure',
        })
    }
}

exports.updatePost = async (req, res, next) => {
    
    try{
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true, 
            runValidators: true 
        });
    
        res.status(200).json({
            status: 'success',
            data: {
                blog
            } 
        })
    
    }catch (e) {
        res.status(400).json({
            status: 'failure',
        })
    }
}

exports.deletePost = async (req, res, next) => {
    
    try{
        const blog = await Blog.findByIdAndDelete(req.params.id);
    
        res.status(200).json({
            status: 'deleted',
        })
    
    }catch (e) {
        res.status(400).json({
            status: 'failure',
        })
    }
}