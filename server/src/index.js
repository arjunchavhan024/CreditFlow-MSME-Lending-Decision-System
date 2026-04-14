const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route for Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'CreditFlow API is running' });
});

// Import Routes
const businessRoutes = require('./routes/business');
const loanRoutes = require('./routes/loan');

// Use Routes
app.use('/api/v1/business', businessRoutes);
app.use('/api/v1/loan', loanRoutes);

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
