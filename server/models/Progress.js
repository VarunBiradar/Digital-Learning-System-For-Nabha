const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  completed: { type: Boolean, default: false },
  quizScore: { type: Number, default: 0 },
  quizAttempted: { type: Boolean, default: false },
  watchedSeconds: { type: Number, default: 0 },
  completedAt: { type: Date },
  updatedAt: { type: Date, default: Date.now }
});

progressSchema.index({ user: 1, lesson: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
