const express = require('express');
const router = express.Router();
const { getStores, addStore } = require('../controllers/storeController');
const { authorize } = require('../middlewares/authMiddleware');

router.get('/', getStores);
router.post('/', authorize('system_admin'), addStore);

module.exports = router;
