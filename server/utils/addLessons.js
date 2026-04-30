/**
 * addLessons.js  ─  Run once to insert new computer lessons into live DB
 * Usage: node server/utils/addLessons.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User     = require('../models/User');
const Lesson   = require('../models/Lesson');

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // Use the existing teacher account as author
  const teacher = await User.findOne({ role: 'teacher' });
  if (!teacher) { console.error('❌ No teacher found. Run seed first.'); process.exit(1); }

  const newLessons = [
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
      content: '## What is an Operating System?\n\nAn OS manages hardware and software resources for the user.\n\n## Popular Operating Systems\n| OS | Used In | Made By |\n|---|---|---|\n| Windows 11 | Laptops, PCs | Microsoft |\n| macOS | MacBook, iMac | Apple |\n| Linux | Servers, programmers | Open Source |\n| Android | Smartphones | Google |\n| iOS | iPhone | Apple |\n\n## Key OS Functions\n1. **Process Management** — runs multiple apps at once\n2. **Memory Management** — allocates RAM to programs\n3. **File System** — organizes files in folders\n4. **Device Drivers** — lets OS talk to hardware\n5. **Security** — user login, permissions',
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
      content: '## How Computers Communicate\n\nNetworking allows devices to share data and resources.\n\n## Types of Networks\n- **LAN** (Local Area Network): Your home or school network\n- **WAN** (Wide Area Network): The Internet is the largest WAN\n- **Wi-Fi**: Wireless LAN using radio waves\n\n## Key Concepts\n- **IP Address**: Unique address of every device (e.g. 192.168.1.1)\n- **Router**: Directs traffic between your network and the internet\n- **DNS**: Converts website names to IP addresses\n- **HTTP/HTTPS**: Protocol for loading web pages (S = secure)\n- **Bandwidth**: Speed of data transfer (Mbps)',
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
      content: '## What is Scratch?\n\nScratch is a free visual programming language made by MIT. Instead of typing code, you drag and drop colourful blocks!\n\n## Key Concepts in Scratch\n- **Sprites**: Characters or objects in your project\n- **Stage**: The area where your project runs\n- **Blocks**: Commands you drag to build programs\n\n## Your First Project\n1. Open scratch.mit.edu\n2. Click "Create"\n3. Drag "When 🚩 clicked" block\n4. Add "Move 10 steps" and "Repeat 10"\n5. Click 🚩 and watch the cat walk!\n\n## Why Learn Scratch?\n- Teaches logical thinking\n- No typing errors — just drag blocks\n- Share projects with the world for free',
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
      content: '## Microsoft PowerPoint\n\nPowerPoint lets you create visual presentations using slides.\n\n## Creating a Presentation\n1. Open PowerPoint → New Presentation\n2. Choose a Theme (Design tab)\n3. Add a Title Slide\n4. Click "New Slide" for each topic\n\n## Slide Best Practices\n- **Rule of 5**: Max 5 bullet points per slide\n- Use large fonts (24pt minimum)\n- High contrast: dark text on light background\n\n## Useful Shortcuts\n- `F5` — Start slide show\n- `Ctrl+M` — New slide\n- `Ctrl+D` — Duplicate slide',
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
      content: '## Why Binary?\n\nComputers use electricity — a switch is either ON (1) or OFF (0).\n\n## Counting in Binary\n| Decimal | Binary |\n|---|---|\n| 0 | 0000 |\n| 1 | 0001 |\n| 2 | 0010 |\n| 4 | 0100 |\n| 8 | 1000 |\n| 15 | 1111 |\n\n## Bits and Bytes\n- **Bit**: One binary digit (0 or 1)\n- **Byte**: 8 bits → stores one character\n- **Kilobyte (KB)**: 1024 bytes\n- **Megabyte (MB)**: 1024 KB\n- **Gigabyte (GB)**: 1024 MB\n\n## Converting Binary to Decimal\nBinary `1011` = 1×8 + 0×4 + 1×2 + 1×1 = **11**',
      category: 'Computer Basics', tags: ['binary', 'bits', 'bytes', 'number system', 'computing'],
      enrolledCount: 27, createdBy: teacher._id,
      quiz: [
        { question: 'How many bits are in one byte?', questionPa: 'ਇੱਕ byte ਵਿੱਚ ਕਿੰਨੇ bits ਹੁੰਦੇ ਹਨ?', options: ['4', '8', '16', '2'], answer: 1 },
        { question: 'What is the decimal value of binary 1010?', questionPa: 'ਬਾਈਨਰੀ 1010 ਦਾ ਦਸ਼ਮਲਵ ਮੁੱਲ ਕੀ ਹੈ?', options: ['8', '12', '10', '6'], answer: 2 }
      ]
    }
  ];

  // Skip any lesson titles that already exist (safe to re-run)
  const existing = await Lesson.find({}, 'title').lean();
  const existingTitles = new Set(existing.map(l => l.title));

  const toInsert = newLessons.filter(l => !existingTitles.has(l.title));

  if (toInsert.length === 0) {
    console.log('⚠️  All lessons already exist in DB — nothing inserted.');
  } else {
    await Lesson.insertMany(toInsert);
    console.log(`✅ Inserted ${toInsert.length} new lesson(s):`);
    toInsert.forEach(l => console.log(`   • ${l.title}`));
  }

  await mongoose.disconnect();
  process.exit(0);
};

run().catch(err => { console.error('❌ Error:', err.message); process.exit(1); });
