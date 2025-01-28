require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require ('helmet');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minuter
    max: 100, // Max 100 requests per IP
});

const experienceRoutes = require('./routes/experience');
const educationRoutes = require('./routes/education');
const projectRoutes = require('./routes/project');
const recommendationRoutes = require('./routes/recommendations');


const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(limiter);

// Routes
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/recommendations', recommendationRoutes);

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.error('Error connecting to MongoDB:', error));
