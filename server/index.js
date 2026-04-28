const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // In production allow all origins as fallback
    if (process.env.NODE_ENV === 'production') return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth',          require('./routes/auth'));
app.use('/api/users',         require('./routes/users'));
app.use('/api/lessons',       require('./routes/lessons'));
app.use('/api/progress',      require('./routes/progress'));
app.use('/api/announcements', require('./routes/announcements'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Learning Platform API running' }));

// Connect DB & Start Server
const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI environment variable is not set!');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    const { seedDatabase } = require('./utils/seed');
    await seedDatabase();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

