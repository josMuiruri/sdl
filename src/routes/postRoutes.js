import express from 'express';
import { createPost, getAllPosts, getPost, updatePost } from "../controllers/postController.js";

const router = express.Router();

router.route('/').post(createPost).get(getAllPosts);
router.route('/:id').get(getPost).patch(updatePost);

export default router;