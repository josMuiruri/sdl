import Post from "../models/postModel";

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

export const getAllPost = async (_req, res) => {
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