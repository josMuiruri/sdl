import express from 'express';
import { createUser, deteleUser, getAllUsers, getUser, updateUser } from './../controllers/userController.js';

const router = express.Router();

router.route('/').post(createUser).get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deteleUser);

export default router;