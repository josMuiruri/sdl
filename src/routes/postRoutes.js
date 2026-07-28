import express from 'express';
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../controllers/postController.js";

const router = express.Router();

router.route('/').post(createPost).get(getAllPosts);
router.route('/:id').get(getPost).patch(updatePost).delete(deletePost);

export default router;