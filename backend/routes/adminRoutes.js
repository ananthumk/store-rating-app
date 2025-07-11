const express = require('express');
const router = express.Router();
const { authorize } = require('../middlewares/authMiddleware');
const { getStats, getUsersByRole, getUserDetails } = require('../controllers/adminController');

router.get('/stats', authorize('system_admin'), getStats);
router.get('/users', authorize('system_admin'), getUsersByRole);
router.get('/user/:userId', authorize('system_admin'), getUserDetails);

module.exports = router;