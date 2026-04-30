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
      },

      // ── NEW COMPUTER LESSONS ──────────────────────────────────────────────

      {
        title: 'Computer Hardware: Deep Dive',
        titlePa: 'ਕੰਪਿਊਟਰ ਹਾਰਡਵੇਅਰ: ਡੂੰਘੀ ਜਾਣਕਾਰੀ',
        description: 'Explore motherboards, RAM, ROM, hard drives, GPU, and all the physical parts that make a computer work.',
        descriptionPa: 'ਮਦਰਬੋਰਡ, RAM, ROM, ਹਾਰਡ ਡਰਾਈਵ ਅਤੇ GPU ਬਾਰੇ ਵਿਸਥਾਰ ਨਾਲ ਜਾਣੋ।',
        subject: 'Computer Basics', grade: '7', difficulty: 'beginner', duration: 40,
        videoUrl: 'https://www.youtube.com/embed/ExxFxD4OSZ0',
        content: '## Computer Hardware\n\nHardware refers to the physical components of a computer.\n\n## Key Components\n- **Motherboard**: The main circuit board connecting all components\n- **CPU (Processor)**: Executes instructions — measured in GHz\n- **RAM**: Temporary fast memory (4GB, 8GB, 16GB)\n- **HDD / SSD**: Permanent storage for files and OS\n- **GPU**: Graphics card for display and gaming\n- **PSU**: Power Supply Unit — converts AC to DC power\n- **Cooling Fan**: Keeps components from overheating\n\n## Input vs Output Devices\n- **Input**: Keyboard, Mouse, Microphone, Scanner\n- **Output**: Monitor, Printer, Speakers\n\n## Fun Fact\nModern CPUs contain billions of transistors on a chip smaller than your fingernail!',
        category: 'Computer Basics', tags: ['hardware', 'motherboard', 'RAM', 'CPU', 'components'],
        enrolledCount: 38, createdBy: teacher._id,
        quiz: [
          { question: 'What connects all components in a computer?', questionPa: 'ਕੰਪਿਊਟਰ ਦੇ ਸਾਰੇ ਹਿੱਸਿਆਂ ਨੂੰ ਕੀ ਜੋੜਦਾ ਹੈ?', options: ['GPU', 'RAM', 'Motherboard', 'HDD'], answer: 2 },
          { question: 'Which stores data permanently?', questionPa: 'ਡੇਟਾ ਸਥਾਈ ਤੌਰ ਤੇ ਕਿੱਥੇ ਸੁਰੱਖਿਅਤ ਹੁੰਦਾ ਹੈ?', options: ['RAM', 'Cache', 'HDD/SSD', 'CPU'], answer: 2 }
        ]
      },

      {
        title: 'Operating Systems Explained',
        titlePa: 'ਓਪਰੇਟਿੰਗ ਸਿਸਟਮ ਦੀ ਜਾਣਕਾਰੀ',
        description: 'Understand what an operating system does, compare Windows, Linux, and Android, and learn to manage files and folders.',
        descriptionPa: 'ਓਪਰੇਟਿੰਗ ਸਿਸਟਮ ਕੀ ਕਰਦਾ ਹੈ ਅਤੇ Windows, Linux, Android ਦੀ ਤੁਲਨਾ ਸਿੱਖੋ।',
        subject: 'Computer Basics', grade: '8', difficulty: 'beginner', duration: 35,
        videoUrl: 'https://www.youtube.com/embed/26QPDBe-NB8',
        content: '## What is an Operating System?\n\nAn OS manages hardware and software resources for the user.\n\n## Popular Operating Systems\n| OS | Used In | Made By |\n|---|---|---|\n| Windows 11 | Laptops, PCs | Microsoft |\n| macOS | MacBook, iMac | Apple |\n| Linux | Servers, programmers | Open Source |\n| Android | Smartphones | Google |\n| iOS | iPhone | Apple |\n\n## Key OS Functions\n1. **Process Management** — runs multiple apps at once\n2. **Memory Management** — allocates RAM to programs\n3. **File System** — organizes files in folders\n4. **Device Drivers** — lets OS talk to hardware\n5. **Security** — user login, permissions\n\n## File Management Tips\n- Use folders to organize your work\n- Shortcut: `Ctrl + C` = Copy, `Ctrl + V` = Paste\n- Right-click for more options',
        category: 'Computer Basics', tags: ['OS', 'windows', 'linux', 'android', 'operating system'],
        enrolledCount: 42, createdBy: teacher._id,
        quiz: [
          { question: 'Which OS is used in most Android phones?', questionPa: 'ਜ਼ਿਆਦਾਤਰ Android ਫ਼ੋਨਾਂ ਵਿੱਚ ਕਿਹੜਾ OS ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ?', options: ['Windows', 'iOS', 'Linux', 'Android'], answer: 3 },
          { question: 'What does an OS manage?', questionPa: 'OS ਕੀ ਪ੍ਰਬੰਧਿਤ ਕਰਦਾ ਹੈ?', options: ['Only files', 'Only internet', 'Hardware and software resources', 'Only keyboard'], answer: 2 }
        ]
      },

      {
        title: 'Networking & the Internet',
        titlePa: 'ਨੈੱਟਵਰਕਿੰਗ ਅਤੇ ਇੰਟਰਨੈੱਟ',
        description: 'Learn how computers connect to each other, how the internet works, and what Wi-Fi, IP addresses, and routers do.',
        descriptionPa: 'ਜਾਣੋ ਕੰਪਿਊਟਰ ਕਿਵੇਂ ਜੁੜਦੇ ਹਨ, ਇੰਟਰਨੈੱਟ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ ਅਤੇ Wi-Fi ਕੀ ਹੈ।',
        subject: 'Computer Basics', grade: '9', difficulty: 'intermediate', duration: 45,
        videoUrl: 'https://www.youtube.com/embed/x3c1ih2NJEg',
        content: '## How Computers Communicate\n\nNetworking allows devices to share data and resources.\n\n## Types of Networks\n- **LAN** (Local Area Network): Your home or school network\n- **WAN** (Wide Area Network): The Internet is the largest WAN\n- **Wi-Fi**: Wireless LAN using radio waves\n\n## Key Concepts\n- **IP Address**: Unique address of every device (e.g. 192.168.1.1)\n- **Router**: Directs traffic between your network and the internet\n- **DNS**: Converts website names to IP addresses\n- **HTTP/HTTPS**: Protocol for loading web pages (S = secure)\n- **Bandwidth**: Speed of data transfer (Mbps)\n\n## How a Website Loads\n1. You type `google.com` in browser\n2. DNS converts it to an IP address\n3. Your browser sends a request to Google\'s server\n4. Google sends back the webpage data\n5. Browser displays the page',
        category: 'Computer Basics', tags: ['networking', 'internet', 'wifi', 'IP address', 'router'],
        enrolledCount: 31, createdBy: teacher._id,
        quiz: [
          { question: 'What does DNS do?', questionPa: 'DNS ਕੀ ਕਰਦਾ ਹੈ?', options: ['Stores files', 'Converts website names to IP addresses', 'Sends emails', 'Blocks viruses'], answer: 1 },
          { question: 'What is a LAN?', questionPa: 'LAN ਕੀ ਹੈ?', options: ['A type of virus', 'Local Area Network', 'Large Access Node', 'Linux Area Network'], answer: 1 }
        ]
      },

      {
        title: 'Scratch Programming for Beginners',
        titlePa: 'ਸ਼ੁਰੂਆਤੀਆਂ ਲਈ Scratch ਪ੍ਰੋਗ੍ਰਾਮਿੰਗ',
        description: 'Create animations, games, and stories using MIT Scratch — a visual block-based programming language perfect for beginners.',
        descriptionPa: 'MIT Scratch ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਐਨੀਮੇਸ਼ਨ, ਗੇਮਾਂ ਅਤੇ ਕਹਾਣੀਆਂ ਬਣਾਓ।',
        subject: 'Programming', grade: '6', difficulty: 'beginner', duration: 50,
        videoUrl: 'https://www.youtube.com/embed/jXUZaf5D12A',
        content: '## What is Scratch?\n\nScratch is a free visual programming language made by MIT. Instead of typing code, you drag and drop colourful blocks!\n\n## Key Concepts in Scratch\n- **Sprites**: Characters or objects in your project\n- **Stage**: The area where your project runs\n- **Blocks**: Commands you drag to build programs\n  - 🟦 Motion blocks: Move, turn, go to position\n  - 🟪 Looks blocks: Say, change costume\n  - 🟨 Events: When green flag clicked\n  - 🟥 Control: If-else, repeat, forever\n\n## Your First Project\n1. Open scratch.mit.edu\n2. Click "Create"\n3. Drag "When 🚩 clicked" block\n4. Add "Move 10 steps"\n5. Add "Repeat 10" to loop it\n6. Click 🚩 and watch the cat walk!\n\n## Why Learn Scratch?\n- Teaches logical thinking\n- No typing errors — just drag blocks\n- Share projects with the world for free',
        category: 'Programming', tags: ['scratch', 'coding', 'animation', 'games', 'beginner', 'MIT'],
        enrolledCount: 55, createdBy: teacher._id,
        quiz: [
          { question: 'Where can you use Scratch for free?', questionPa: 'Scratch ਮੁਫ਼ਤ ਵਿੱਚ ਕਿੱਥੇ ਵਰਤ ਸਕਦੇ ਹੋ?', options: ['microsoft.com', 'scratch.mit.edu', 'google.com', 'apple.com'], answer: 1 },
          { question: 'What are "Sprites" in Scratch?', questionPa: 'Scratch ਵਿੱਚ "Sprites" ਕੀ ਹਨ?', options: ['Background colors', 'Code blocks', 'Characters or objects', 'Sound files'], answer: 2 }
        ]
      },

      {
        title: 'PowerPoint Presentations',
        titlePa: 'PowerPoint ਪ੍ਰੈਜ਼ੈਂਟੇਸ਼ਨਾਂ',
        description: 'Design eye-catching presentations in Microsoft PowerPoint — add slides, transitions, images, and deliver confidently.',
        descriptionPa: 'Microsoft PowerPoint ਵਿੱਚ ਸਲਾਈਡਾਂ, ਚਿੱਤਰ ਅਤੇ ਟ੍ਰਾਂਜ਼ੀਸ਼ਨਾਂ ਨਾਲ ਪ੍ਰੈਜ਼ੈਂਟੇਸ਼ਨ ਬਣਾਓ।',
        subject: 'MS Office', grade: '8', difficulty: 'beginner', duration: 40,
        videoUrl: 'https://www.youtube.com/embed/MHFnPBBH7m4',
        content: '## Microsoft PowerPoint\n\nPowerPoint lets you create visual presentations using slides.\n\n## Creating a Presentation\n1. Open PowerPoint → New Presentation\n2. Choose a Theme (Design tab)\n3. Add a Title Slide\n4. Click "New Slide" for each topic\n\n## Slide Best Practices\n- **Rule of 5**: Max 5 bullet points per slide\n- Use large fonts (24pt minimum)\n- One image per slide keeps focus\n- High contrast: dark text on light background\n\n## Key Features\n| Feature | Purpose |\n|---|---|\n| Themes | Ready-made colour and font sets |\n| Transitions | Animated slide changes |\n| Animations | Entrance/exit effects for text |\n| Slide Show | Present in full screen (F5) |\n| Notes pane | Speaker notes hidden from audience |\n\n## Useful Shortcuts\n- `F5` — Start slide show\n- `Ctrl+M` — New slide\n- `Ctrl+D` — Duplicate slide\n- `B` during presentation — Black screen',
        category: 'MS Office', tags: ['powerpoint', 'presentation', 'slides', 'microsoft', 'office'],
        enrolledCount: 44, createdBy: teacher._id,
        quiz: [
          { question: 'Which key starts a PowerPoint slide show?', questionPa: 'PowerPoint ਸਲਾਈਡ ਸ਼ੋ ਕਿਹੜੀ ਕੁੰਜੀ ਨਾਲ ਸ਼ੁਰੂ ਹੁੰਦਾ ਹੈ?', options: ['F1', 'F5', 'F10', 'Ctrl+P'], answer: 1 },
          { question: 'What does a "Transition" do in PowerPoint?', questionPa: 'PowerPoint ਵਿੱਚ "Transition" ਕੀ ਕਰਦਾ ਹੈ?', options: ['Changes font size', 'Animates the slide change', 'Deletes a slide', 'Prints the slide'], answer: 1 }
        ]
      },

      {
        title: 'Binary Numbers & How Computers Think',
        titlePa: 'ਬਾਈਨਰੀ ਸੰਖਿਆਵਾਂ ਅਤੇ ਕੰਪਿਊਟਰ ਕਿਵੇਂ ਸੋਚਦਾ ਹੈ',
        description: 'Discover the secret language of computers — binary! Learn to count in 0s and 1s, convert numbers, and understand bits and bytes.',
        descriptionPa: 'ਕੰਪਿਊਟਰ ਦੀ ਗੁਪਤ ਭਾਸ਼ਾ — ਬਾਈਨਰੀ ਸਿੱਖੋ! 0 ਅਤੇ 1 ਵਿੱਚ ਗਿਣਨਾ ਸਿੱਖੋ।',
        subject: 'Computer Basics', grade: '9', difficulty: 'intermediate', duration: 35,
        videoUrl: 'https://www.youtube.com/embed/M41M9ATm49M',
        content: '## Why Binary?\n\nComputers use electricity — a switch is either ON (1) or OFF (0). This is why everything in a computer is stored as binary.\n\n## Counting in Binary\n| Decimal | Binary |\n|---|---|\n| 0 | 0000 |\n| 1 | 0001 |\n| 2 | 0010 |\n| 3 | 0011 |\n| 4 | 0100 |\n| 8 | 1000 |\n| 15 | 1111 |\n\n## Bits and Bytes\n- **Bit**: One binary digit (0 or 1)\n- **Byte**: 8 bits → stores one character\n- **Kilobyte (KB)**: 1024 bytes\n- **Megabyte (MB)**: 1024 KB\n- **Gigabyte (GB)**: 1024 MB\n\n## Converting Binary to Decimal\nBinary: `1011`\n= 1×8 + 0×4 + 1×2 + 1×1\n= 8 + 0 + 2 + 1\n= **11 in decimal**\n\n## Real-Life Binary\n- Text, images, videos, music — all stored as billions of 0s and 1s!',
        category: 'Computer Basics', tags: ['binary', 'bits', 'bytes', 'number system', 'computing'],
        enrolledCount: 27, createdBy: teacher._id,
        quiz: [
          { question: 'How many bits are in one byte?', questionPa: 'ਇੱਕ byte ਵਿੱਚ ਕਿੰਨੇ bits ਹੁੰਦੇ ਹਨ?', options: ['4', '8', '16', '2'], answer: 1 },
          { question: 'What is the decimal value of binary 1010?', questionPa: 'ਬਾਈਨਰੀ 1010 ਦਾ ਦਸ਼ਮਲਵ ਮੁੱਲ ਕੀ ਹੈ?', options: ['8', '12', '10', '6'], answer: 2 }
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
