/**
 * updateLessonsCategory.js — Sets ALL lessons' category to 'Digital Literacy'
 * Usage: node server/utils/updateLessonsCategory.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Lesson   = require('../models/Lesson');

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  const result = await Lesson.updateMany({}, { $set: { category: 'Digital Literacy' } });
  console.log(`✅ Updated ${result.modifiedCount} lessons → category: "Digital Literacy"`);

  await mongoose.disconnect();
  process.exit(0);
};

run().catch(err => { console.error('❌ Error:', err.message); process.exit(1); });
