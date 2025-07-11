const express = require('express');
const router = express.Router();
const { addRating, updateRating } = require('../controllers/ratingController');
const { authorize } = require('../middlewares/authMiddleware');

router.post('/', authorize('normal_user'), addRating);
router.put('/:id', authorize('normal_user'), updateRating);

module.exports = router;