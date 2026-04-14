const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// GET /api/users — admin only
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const users = await User.find().select('-password').sort('-createdAt');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/students — teacher/admin
router.get('/students', auth, async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password').sort('name');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/stats — admin stats
router.get('/stats', auth, async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalTeachers = await User.countDocuments({ role: 'teacher' });
    const totalUsers = await User.countDocuments();
    res.json({ totalStudents, totalTeachers, totalUsers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/users/:id — update user
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, grade, school, language } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, grade, school, language }, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/users/:id — admin only
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
