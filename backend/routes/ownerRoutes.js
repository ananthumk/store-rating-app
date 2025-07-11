const express = require('express');
const router = express.Router();
const { authorize } = require('../middlewares/authMiddleware');
const { getStoreRatings, getStoreAverageRating } = require('../controllers/ownerController');

router.get('/:storeId/ratings', authorize('store_owner'), getStoreRatings);
router.get('/:storeId/average', authorize('store_owner'), getStoreAverageRating);

module.exports = router;