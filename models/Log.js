const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Log türü zorunludur'],
        enum: ['info', 'warning', 'error', 'security', 'audit'],
        default: 'info'
    },
    action: {
        type: String,
        required: [true, 'İşlem açıklaması zorunludur']
    },
    details: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, 'Detaylar zorunludur']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Kullanıcı referansı zorunludur']
    },
    ipAddress: {
        type: String
    },
    userAgent: {
        type: String
    },
    status: {
        type: String,
        enum: ['success', 'failure'],
        default: 'success'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Daha hızlı sorgu performansı için indeksler
LogSchema.index({ createdAt: -1 });
LogSchema.index({ type: 1, createdAt: -1 });
LogSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Log', LogSchema); 