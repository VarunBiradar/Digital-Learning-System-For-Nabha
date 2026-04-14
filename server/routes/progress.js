const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Progress = require('../models/Progress');
const User = require('../models/User');

// GET /api/progress/my
router.get('/my', auth, async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user.id }).populate('lesson', 'title subject grade difficulty duration thumbnail category');
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/progress/:lessonId — mark progress
router.post('/:lessonId', auth, async (req, res) => {
  try {
    const { completed, quizScore, quizAttempted, watchedSeconds } = req.body;
    const update = { watchedSeconds, updatedAt: Date.now() };
    if (completed) { update.completed = true; update.completedAt = Date.now(); }
    if (quizAttempted) { update.quizScore = quizScore; update.quizAttempted = true; }

    const progress = await Progress.findOneAndUpdate(
      { user: req.user.id, lesson: req.params.lessonId },
      { $set: update },
      { upsert: true, new: true }
    );

    // Award XP if newly completed
    if (completed) {
      await User.findByIdAndUpdate(req.user.id, { $inc: { xp: 50 } });
    }

    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/progress/students — teacher overview
router.get('/students', auth, async (req, res) => {
  try {
    const all = await Progress.find({ completed: true })
      .populate('user', 'name grade school')
      .populate('lesson', 'title subject')
      .sort('-completedAt')
      .limit(50);
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/progress/stats — summary stats for teacher dashboard
router.get('/stats', auth, async (req, res) => {
  try {
    const totalCompleted = await Progress.countDocuments({ completed: true });
    const totalAttempted = await Progress.countDocuments();
    const avgScore = await Progress.aggregate([
      { $match: { quizAttempted: true } },
      { $group: { _id: null, avg: { $avg: '$quizScore' } } }
    ]);
    res.json({
      totalCompleted,
      totalAttempted,
      avgQuizScore: avgScore[0]?.avg?.toFixed(1) || 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
