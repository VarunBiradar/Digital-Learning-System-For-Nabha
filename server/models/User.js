const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  grade: { type: String, default: '' },
  school: { type: String, default: 'Nabha Government School' },
  language: { type: String, enum: ['en', 'pa'], default: 'en' },
  avatar: { type: String, default: '' },
  badges: [{ type: String }],
  xp: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
