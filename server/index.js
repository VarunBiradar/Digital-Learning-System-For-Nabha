const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/lessons', require('./routes/lessons'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/announcements', require('./routes/announcements'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Learning Platform API running' }));

// Connect DB & Start Server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    // Seed data on first run
    const { seedDatabase } = require('./utils/seed');
    await seedDatabase();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
