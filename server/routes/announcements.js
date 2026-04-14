const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Announcement = require('../models/Announcement');

// GET /api/announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().populate('author', 'name role').sort('-createdAt').limit(10);
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/announcements — teacher/admin only
router.post('/', auth, async (req, res) => {
  try {
    if (!['teacher', 'admin'].includes(req.user.role))
      return res.status(403).json({ message: 'Forbidden' });
    const ann = await Announcement.create({ ...req.body, author: req.user.id });
    res.status(201).json(ann);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/announcements/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
