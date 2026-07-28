import Post from "../models/postModel.js";

export const createPost = async (req, res) => {
    try {
        const newPost = await Post.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                post: newPost
            }
        })
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

export const getAllPosts = async (_req, res) => {
    try {

        const posts = await Post.findAll();
        
        res.status(200).json({
            status: 'success',
            data: {
                posts
            }
        })
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

export const getPost = async (req, res) => {
    try {

        const post = await Post.findByPk(req.params.id);

        if (!post)

            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            })
        
        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })
    } catch(err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}

export const updatePost = async (req, res) => {
    try {

        const post = await Post.findByPk(req.params.id);
        if (!post)
            return res.status(404).json({
                status: 'fail',
                message: 'Not found'
            })
        
        await post.update(req.body)

        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        });
    } catch(err) {
        res.status(500).json({
            status: 'fail',
            message: err
        })
    }
}

export const deletePost = async (req, res) => {
    try {

        const user = await Post.findByPk(req.params.id);

        if (!user)
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        
        await user.destroy();

        res.status(204).json({
            status: 'success',
            message: 'Post successfully deleted',
            data: null
        })
        
    } catch(err) {
        res.status(500).json({
            status: 'fail',
            message: err
        })
    }
}