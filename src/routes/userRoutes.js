import express from 'express';
import { createUser, getAllUsers, getUser } from './../controllers/userController.js';

const router = express.Router();

router.route('/').post(createUser).get(getAllUsers);
router.route('/:id').get(getUser);

export default router;