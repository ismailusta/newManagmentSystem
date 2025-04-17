const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const swaggerUI = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const os = require('os');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS middleware
app.use(cors());

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

// Route files
const apartments = require('./routes/apartmentRoutes');
const flats = require('./routes/flatRoutes');
const dues = require('./routes/dueRoutes');
const expenses = require('./routes/expenseRoutes');
const employees = require('./routes/employeeRoutes');
const users = require('./routes/userRoutes');
const complaints = require('./routes/complaintRoutes');
const profiles = require('./routes/profileRoutes');
const announcements = require('./routes/announcementRoutes');
const feedbacks = require('./routes/feedbackRoutes');
const services = require('./routes/serviceRoutes');
const rules = require('./routes/ruleRoutes');
const mails = require('./routes/mailRoutes');
const systemRoutes = require('./routes/systemRoutes');

// Mount routers
app.use('/api/apartments', apartments);
app.use('/api/flats', flats);
app.use('/api/dues', dues);
app.use('/api/expenses', expenses);
app.use('/api/employees', employees);
app.use('/api/users', users);
app.use('/api/complaints', complaints);
app.use('/api/profiles', profiles);
app.use('/api/announcements', announcements);
app.use('/api/feedbacks', feedbacks);
app.use('/api/services', services);
app.use('/api/rules', rules);
app.use('/api/mails', mails);
app.use('/api/system', systemRoutes);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
}); 