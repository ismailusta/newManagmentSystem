const Log = require('../models/Log');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('express-async-handler');

// @desc    Tüm logları getir
// @route   GET /api/logs
// @access  Özel/Admin
exports.getLogs = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    let query = {};

    // Filtreler varsa uygula
    if (req.query.type) query.type = req.query.type;
    if (req.query.status) query.status = req.query.status;
    if (req.query.startDate && req.query.endDate) {
        query.createdAt = {
            $gte: new Date(req.query.startDate),
            $lte: new Date(req.query.endDate)
        };
    }

    const logs = await Log.find(query)
        .populate('user', 'fullName email')
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit);

    const total = await Log.countDocuments(query);

    res.status(200).json({
        success: true,
        count: logs.length,
        total,
        pagination: {
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        },
        data: logs
    });
});

// @desc    Türe göre logları getir
// @route   GET /api/logs/type/:type
// @access  Özel/Admin
exports.getLogsByType = asyncHandler(async (req, res) => {
    const logs = await Log.find({ type: req.params.type })
        .populate('user', 'fullName email')
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: logs.length,
        data: logs
    });
});

// @desc    Kullanıcıya göre logları getir
// @route   GET /api/logs/user/:userId
// @access  Özel/Admin
exports.getLogsByUser = asyncHandler(async (req, res) => {
    const logs = await Log.find({ user: req.params.userId })
        .populate('user', 'fullName email')
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: logs.length,
        data: logs
    });
});

// @desc    Yeni log kaydı oluştur
// @route   POST /api/logs
// @access  Özel
exports.createLog = asyncHandler(async (req, res) => {
    const { type, action, details } = req.body;

    // Kullanıcı bilgisi ve istek detayları ile log oluştur
    const log = await Log.create({
        type,
        action,
        details,
        user: req.user._id,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        status: 'success'
    });

    res.status(201).json({
        success: true,
        data: log
    });
});

// @desc    Eski logları temizle
// @route   DELETE /api/logs/cleanup
// @access  Özel/Admin
exports.cleanupOldLogs = asyncHandler(async (req, res) => {
    const daysToKeep = parseInt(req.query.days, 10) || 30;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const result = await Log.deleteMany({
        createdAt: { $lt: cutoffDate }
    });

    res.status(200).json({
        success: true,
        message: `${daysToKeep} günden eski ${result.deletedCount} log silindi`,
        data: result
    });
}); 