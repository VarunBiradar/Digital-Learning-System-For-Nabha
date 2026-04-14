const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const Announcement = require('../models/Announcement');

const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) return; // Already seeded

    console.log('🌱 Seeding database...');

    // Create users
    const hashedPw = await bcrypt.hash('password123', 10);

    const admin = await User.create({
      name: 'Admin User', email: 'admin@learning.com', password: hashedPw,
      role: 'admin', school: 'Nabha Government School', xp: 500,
      badges: ['admin', 'founder']
    });

    const teacher = await User.create({
      name: 'Gurpreet Singh', email: 'teacher@learning.com', password: hashedPw,
      role: 'teacher', school: 'Nabha Government School', xp: 300,
      badges: ['educator', 'top-teacher']
    });

    await User.create([
      { name: 'Arjun Sharma', email: 'student1@learning.com', password: hashedPw, role: 'student', grade: '8', school: 'Nabha Government School', xp: 150, badges: ['starter'] },
      { name: 'Priya Kaur', email: 'student2@learning.com', password: hashedPw, role: 'student', grade: '9', school: 'Nabha Government School', xp: 250, badges: ['learner', 'quiz-master'] },
      { name: 'Ranjit Pal', email: 'student3@learning.com', password: hashedPw, role: 'student', grade: '7', school: 'Nabha Government School', xp: 100, badges: ['starter'] },
      { name: 'Simran Bhat', email: 'student4@learning.com', password: hashedPw, role: 'student', grade: '10', school: 'Nabha Government School', xp: 350, badges: ['learner', 'explorer'] },
    ]);

    // Create lessons
    await Lesson.create([
      {
        title: 'Introduction to Computers',
        titlePa: 'ਕੰਪਿਊਟਰ ਦੀ ਜਾਣ-ਪਛਾਣ',
        description: 'Learn what a computer is, its basic components, and how it works. Perfect for absolute beginners.',
        descriptionPa: 'ਜਾਣੋ ਕੰਪਿਊਟਰ ਕੀ ਹੈ, ਇਸਦੇ ਮੁੱਢਲੇ ਹਿੱਸੇ ਅਤੇ ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ।',
        subject: 'Computer Basics', grade: '6', difficulty: 'beginner', duration: 30,
        videoUrl: 'https://www.youtube.com/embed/CkL6uCOuAEw',
        content: '## What is a Computer?\n\nA computer is an electronic machine that processes data...\n\n## Main Components\n- **CPU**: The brain of the computer\n- **RAM**: Temporary memory for running programs\n- **Storage**: Where your files are saved\n- **Monitor**: Displays output\n- **Keyboard & Mouse**: Input devices',
        category: 'Computer Basics', tags: ['computer', 'hardware', 'basics'],
        enrolledCount: 45, createdBy: teacher._id,
        quiz: [
          { question: 'What does CPU stand for?', questionPa: 'CPU ਦਾ ਕੀ ਅਰਥ ਹੈ?', options: ['Central Processing Unit', 'Computer Processing Unit', 'Central Program Unit', 'Core Power Unit'], answer: 0 },
          { question: 'Which part is the brain of the computer?', questionPa: 'ਕੰਪਿਊਟਰ ਦਾ ਦਿਮਾਗ ਕਿਹੜਾ ਹਿੱਸਾ ਹੈ?', options: ['RAM', 'Monitor', 'CPU', 'Keyboard'], answer: 2 }
        ]
      },
      {
        title: 'Internet Safety & Digital Literacy',
        titlePa: 'ਇੰਟਰਨੈੱਟ ਸੁਰੱਖਿਆ ਅਤੇ ਡਿਜੀਟਲ ਸਾਖਰਤਾ',
        description: 'Learn how to stay safe online, recognize fake news, and protect your personal information.',
        descriptionPa: 'ਸਿੱਖੋ ਕਿਵੇਂ ਔਨਲਾਈਨ ਸੁਰੱਖਿਅਤ ਰਹਿਣਾ ਹੈ ਅਤੇ ਆਪਣੀ ਜਾਣਕਾਰੀ ਕਿਵੇਂ ਬਚਾਉਣੀ ਹੈ।',
        subject: 'Digital Literacy', grade: '7', difficulty: 'beginner', duration: 25,
        videoUrl: 'https://www.youtube.com/embed/inWWhr5tnEA',
        content: '## Internet Safety\n\nThe internet is a powerful tool, but it comes with risks...\n\n## Key Rules\n1. Never share passwords\n2. Be careful what you post online\n3. Verify before you trust\n4. Use strong passwords',
        category: 'Digital Literacy', tags: ['internet', 'safety', 'digital', 'online'],
        enrolledCount: 38, createdBy: teacher._id,
        quiz: [
          { question: 'What should you NEVER share online?', questionPa: 'ਔਨਲਾਈਨ ਕੀ ਕਦੇ ਵੀ ਸਾਂਝਾ ਨਹੀਂ ਕਰਨਾ ਚਾਹੀਦਾ?', options: ['Your name', 'Your password', 'Your favorite color', 'Your school name'], answer: 1 }
        ]
      },
      {
        title: 'Microsoft Word Basics',
        titlePa: 'ਮਾਈਕ੍ਰੋਸਾਫਟ ਵਰਡ ਦੀਆਂ ਮੂਲ ਗੱਲਾਂ',
        description: 'Master Microsoft Word — create documents, format text, add images, and print your work.',
        descriptionPa: 'ਮਾਈਕ੍ਰੋਸਾਫਟ ਵਰਡ ਸਿੱਖੋ — ਦਸਤਾਵੇਜ਼ ਬਣਾਓ, ਟੈਕਸਟ ਫੌਰਮੈਟ ਕਰੋ।',
        subject: 'MS Office', grade: '8', difficulty: 'beginner', duration: 45,
        videoUrl: 'https://www.youtube.com/embed/S-pNHzNEa1g',
        content: '## Getting Started with Word\n\nMicrosoft Word is the most widely used word processor...\n\n## Essential Skills\n- Creating new documents\n- Formatting text (bold, italic, underline)\n- Inserting images\n- Saving and printing',
        category: 'MS Office', tags: ['word', 'microsoft', 'document', 'office'],
        enrolledCount: 52, createdBy: teacher._id,
        quiz: [
          { question: 'Which keyboard shortcut saves a document?', questionPa: 'ਕਿਹੜਾ ਸ਼ੌਰਟਕਟ ਦਸਤਾਵੇਜ਼ ਸੇਵ ਕਰਦਾ ਹੈ?', options: ['Ctrl+A', 'Ctrl+S', 'Ctrl+P', 'Ctrl+C'], answer: 1 }
        ]
      },
      {
        title: 'Introduction to Python',
        titlePa: 'ਪਾਈਥਨ ਦੀ ਜਾਣ-ਪਛਾਣ',
        description: 'Start your programming journey with Python — the most beginner-friendly coding language in the world.',
        descriptionPa: 'ਪਾਈਥਨ ਨਾਲ ਆਪਣੀ ਪ੍ਰੋਗ੍ਰਾਮਿੰਗ ਯਾਤਰਾ ਸ਼ੁਰੂ ਕਰੋ।',
        subject: 'Programming', grade: '10', difficulty: 'intermediate', duration: 60,
        videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8',
        content: '## Why Python?\n\nPython is simple, readable, and powerful...\n\n## Your First Program\n```python\nprint("Hello, Nabha!")\n```\n\n## Variables\n```python\nname = "Arjun"\nage = 15\nprint(f"My name is {name} and I am {age} years old")\n```',
        category: 'Programming', tags: ['python', 'coding', 'programming', 'beginner'],
        enrolledCount: 29, createdBy: teacher._id,
        quiz: [
          { question: 'What does print() do in Python?', questionPa: 'ਪਾਈਥਨ ਵਿੱਚ print() ਕੀ ਕਰਦਾ ਹੈ?', options: ['Prints on paper', 'Displays output on screen', 'Saves a file', 'Deletes data'], answer: 1 }
        ]
      },
      {
        title: 'Email & Google Workspace',
        titlePa: 'ਈਮੇਲ ਅਤੇ ਗੂਗਲ ਵਰਕਸਪੇਸ',
        description: 'Learn to use Gmail, Google Docs, Google Sheets, and Google Meet for school and work.',
        descriptionPa: 'Gmail, Google Docs ਅਤੇ Google Meet ਦੀ ਵਰਤੋਂ ਕਰਨਾ ਸਿੱਖੋ।',
        subject: 'Digital Literacy', grade: '9', difficulty: 'beginner', duration: 35,
        videoUrl: 'https://www.youtube.com/embed/1yqTUJi6DkI',
        content: '## Google Workspace for Education\n\nGoogle offers free tools for students...\n\n## Tools Covered\n- Gmail: Email communication\n- Google Docs: Online document editing\n- Google Sheets: Spreadsheets\n- Google Meet: Video calling',
        category: 'Digital Literacy', tags: ['google', 'email', 'gmail', 'workspace'],
        enrolledCount: 41, createdBy: teacher._id,
        quiz: [
          { question: 'Which Google tool is used for video calls?', questionPa: 'ਵੀਡੀਓ ਕਾਲ ਲਈ ਕਿਹੜਾ Google ਟੂਲ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ?', options: ['Gmail', 'Google Docs', 'Google Meet', 'Google Sheets'], answer: 2 }
        ]
      },
      {
        title: 'Spreadsheets with Excel',
        titlePa: 'ਐਕਸਲ ਨਾਲ ਸਪ੍ਰੈੱਡਸ਼ੀਟ',
        description: 'Learn Microsoft Excel for data management, formulas, and creating charts for school projects.',
        descriptionPa: 'ਡੇਟਾ ਪ੍ਰਬੰਧਨ ਅਤੇ ਚਾਰਟ ਬਣਾਉਣ ਲਈ Microsoft Excel ਸਿੱਖੋ।',
        subject: 'MS Office', grade: '9', difficulty: 'intermediate', duration: 50,
        videoUrl: 'https://www.youtube.com/embed/rwbho0CgEAI',
        content: '## Excel Fundamentals\n\nExcel is the world\'s most popular spreadsheet software...\n\n## Key Concepts\n- Cells, rows, and columns\n- Basic formulas: SUM, AVERAGE, COUNT\n- Creating bar and pie charts\n- Sorting and filtering data',
        category: 'MS Office', tags: ['excel', 'spreadsheet', 'data', 'formulas'],
        enrolledCount: 33, createdBy: teacher._id,
        quiz: [
          { question: 'Which formula adds up numbers in Excel?', questionPa: 'ਐਕਸਲ ਵਿੱਚ ਕਿਹੜਾ ਫਾਰਮੂਲਾ ਸੰਖਿਆਵਾਂ ਜੋੜਦਾ ਹੈ?', options: ['=ADD()', '=TOTAL()', '=SUM()', '=PLUS()'], answer: 2 }
        ]
      },
      {
        title: 'Typing Skills & Keyboard Mastery',
        titlePa: 'ਟਾਈਪਿੰਗ ਹੁਨਰ ਅਤੇ ਕੀਬੋਰਡ',
        description: 'Improve your typing speed and accuracy. Learn touch typing, keyboard shortcuts, and special characters.',
        descriptionPa: 'ਆਪਣੀ ਟਾਈਪਿੰਗ ਸਪੀਡ ਅਤੇ ਸ਼ੁੱਧਤਾ ਵਧਾਓ।',
        subject: 'Computer Basics', grade: '6', difficulty: 'beginner', duration: 20,
        videoUrl: 'https://www.youtube.com/embed/wMO-5OdNFgk',
        content: '## Touch Typing\n\nTouch typing means typing without looking at the keys...\n\n## Home Row Keys\nPlace your fingers on: A S D F (left hand) J K L ; (right hand)',
        category: 'Computer Basics', tags: ['typing', 'keyboard', 'speed', 'practice'],
        enrolledCount: 60, createdBy: teacher._id,
        quiz: [
          { question: 'What are the home row keys for the left hand?', questionPa: 'ਖੱਬੇ ਹੱਥ ਲਈ ਹੋਮ ਰੋਅ ਕੁੰਜੀਆਂ ਕਿਹੜੀਆਂ ਹਨ?', options: ['Q W E R', 'A S D F', 'Z X C V', 'G H J K'], answer: 1 }
        ]
      },
      {
        title: 'Web Browsing & Research Skills',
        titlePa: 'ਵੈੱਬ ਬ੍ਰਾਊਜ਼ਿੰਗ ਅਤੇ ਖੋਜ ਹੁਨਰ',
        description: 'Effectively use search engines, evaluate websites for credibility, and research topics for school assignments.',
        descriptionPa: 'ਸਰਚ ਇੰਜਣ ਦੀ ਵਰਤੋਂ ਕਰੋ ਅਤੇ ਸਕੂਲ ਪ੍ਰੋਜੈਕਟਾਂ ਲਈ ਖੋਜ ਕਰੋ।',
        subject: 'Digital Literacy', grade: '8', difficulty: 'beginner', duration: 30,
        videoUrl: 'https://www.youtube.com/embed/BNHR6IQJGZs',
        content: '## Smart Searching\n\nThe internet has billions of pages. Here\'s how to find what you need...\n\n## Google Search Tips\n- Use quotes for exact phrases: "climate change India"\n- Add site: to search a website: site:wikipedia.org python\n- Use - to exclude words: jaguar -car',
        category: 'Digital Literacy', tags: ['google', 'search', 'research', 'browser'],
        enrolledCount: 47, createdBy: teacher._id,
        quiz: [
          { question: 'Which symbol searches an exact phrase in Google?', questionPa: 'Google ਵਿੱਚ ਸਹੀ ਵਾਕਾਂਸ਼ ਖੋਜਣ ਲਈ ਕਿਹੜਾ ਚਿੰਨ੍ਹ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ?', options: ['Asterisk *', 'Hashtag #', 'Quotation marks ""', 'Brackets []'], answer: 2 }
        ]
      }
    ]);

    // Announcements
    await Announcement.create([
      { title: 'Welcome to the Learning Platform!', message: 'We are excited to launch the Learning Platform for all students and teachers in Nabha. Start exploring lessons today!', type: 'success', author: admin._id },
      { title: 'New Python Lessons Added', message: 'Introduction to Python programming is now available for Grade 10 students. Check the lesson library!', type: 'info', author: teacher._id },
      { title: 'Scheduled Maintenance', message: 'The platform will be down for maintenance on Sunday 10 PM - 11 PM.', type: 'warning', author: admin._id }
    ]);

    console.log('✅ Database seeded successfully!');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  }
};

module.exports = { seedDatabase };
