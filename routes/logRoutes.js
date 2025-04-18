const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    getLogs,
    getLogsByType,
    getLogsByUser,
    createLog,
    cleanupOldLogs
} = require('../controllers/logController');

// Tüm rotaları koruma altına al
router.use(protect);

// Tüm yetkili kullanıcıların erişebileceği rotalar
router.post('/', createLog);

// Sadece adminlerin erişebileceği rotalar
router.use(authorize('admin'));
router.get('/', getLogs);
router.get('/type/:type', getLogsByType);
router.get('/user/:userId', getLogsByUser);
router.delete('/cleanup', cleanupOldLogs);

module.exports = router; 