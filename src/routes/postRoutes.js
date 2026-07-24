import express from 'express';
import { createPost, getAllPost } from "../controllers/postController";

const router = express.Router();

router.route('/').post(createPost).get(getAllPost)