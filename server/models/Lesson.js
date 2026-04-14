const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titlePa: { type: String, default: '' },
  description: { type: String, required: true },
  descriptionPa: { type: String, default: '' },
  subject: { type: String, required: true },
  grade: { type: String, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  duration: { type: Number, default: 30 }, // minutes
  videoUrl: { type: String, default: '' },
  content: { type: String, default: '' },
  quiz: [{
    question: String,
    questionPa: String,
    options: [String],
    answer: Number
  }],
  thumbnail: { type: String, default: '' },
  category: { type: String, default: 'Computer Basics' },
  tags: [{ type: String }],
  enrolledCount: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lesson', lessonSchema);
