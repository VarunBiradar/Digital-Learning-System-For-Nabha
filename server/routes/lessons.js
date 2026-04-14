const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Lesson = require('../models/Lesson');

// GET /api/lessons
router.get('/', async (req, res) => {
  try {
    const { subject, grade, difficulty, search } = req.query;
    let filter = {};
    if (subject) filter.subject = subject;
    if (grade) filter.grade = grade;
    if (difficulty) filter.difficulty = difficulty;
    if (search) filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ];
    const lessons = await Lesson.find(filter).populate('createdBy', 'name').sort('-createdAt');
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/lessons/:id
router.get('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('createdBy', 'name');
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/lessons — teacher/admin
router.post('/', auth, async (req, res) => {
  try {
    if (!['teacher', 'admin'].includes(req.user.role))
      return res.status(403).json({ message: 'Forbidden' });
    const lesson = await Lesson.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/lessons/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/lessons/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lesson deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
