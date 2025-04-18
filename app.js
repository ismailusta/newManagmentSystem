const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const apartmentRoutes = require('./routes/apartmentRoutes');
const flatRoutes = require('./routes/flatRoutes');
const dueRoutes = require('./routes/dueRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const ruleRoutes = require('./routes/ruleRoutes');
const logRoutes = require('./routes/logRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/users', userRoutes);
app.use('/api/apartments', apartmentRoutes);
app.use('/api/flats', flatRoutes);
app.use('/api/dues', dueRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/rules', ruleRoutes);
app.use('/api/logs', logRoutes);

module.exports = app; 