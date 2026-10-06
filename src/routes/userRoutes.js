import express from 'express';
import { createUser, deteleUser, getAllUsers, getUser, updateUser } from '../controllers/userController.js';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.route('/').post(createUser).get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deteleUser);

export default router;