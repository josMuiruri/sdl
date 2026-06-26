import express from 'express';

const router = express.Router();

router.route('/').post(createUser);

module.exports = router;