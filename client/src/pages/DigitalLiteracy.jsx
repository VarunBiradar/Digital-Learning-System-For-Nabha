import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useLang } from '../contexts/LangContext';
import { ChevronRight, Star, Zap } from 'lucide-react';

const modules = [
  {
    id: 1, icon: '💻', title: 'What is a Computer?', titlePa: 'ਕੰਪਿਊਟਰ ਕੀ ਹੈ?',
    desc: 'Learn about hardware, software, and how computers work.',
    level: 'Beginner', xp: 50, lessons: 3,
    topics: ['Hardware Components', 'Input & Output', 'Storage Devices']
  },
  {
    id: 2, icon: '🌐', title: 'The Internet & You', titlePa: 'ਇੰਟਰਨੈੱਟ ਅਤੇ ਤੁਸੀਂ',
    desc: 'How the internet works, web browsers, and online communication.',
    level: 'Beginner', xp: 50, lessons: 4,
    topics: ['How Internet Works', 'Using a Browser', 'Email Basics', 'Video Calls']
  },
  {
    id: 3, icon: '🔒', title: 'Online Safety', titlePa: 'ਔਨਲਾਈਨ ਸੁਰੱਖਿਆ',
    desc: 'Protect yourself online: strong passwords, privacy, and avoiding scams.',
    level: 'Beginner', xp: 75, lessons: 3,
    topics: ['Strong Passwords', 'Privacy Settings', 'Recognizing Scams']
  },
  {
    id: 4, icon: '📄', title: 'Digital Documents', titlePa: 'ਡਿਜੀਟਲ ਦਸਤਾਵੇਜ਼',
    desc: 'Create and format documents with Microsoft Word and Google Docs.',
    level: 'Beginner', xp: 75, lessons: 5,
    topics: ['MS Word Basics', 'Formatting Text', 'Adding Images', 'Google Docs', 'Printing']
  },
  {
    id: 5, icon: '📊', title: 'Data & Spreadsheets', titlePa: 'ਡੇਟਾ ਅਤੇ ਸਪ੍ਰੈੱਡਸ਼ੀਟ',
    desc: 'Organize data in Excel and Google Sheets. Build charts and use formulas.',
    level: 'Intermediate', xp: 100, lessons: 4,
    topics: ['Excel Basics', 'Formulas & Functions', 'Charts', 'Google Sheets']
  },
  {
    id: 6, icon: '🎨', title: 'Digital Presentations', titlePa: 'ਡਿਜੀਟਲ ਪੇਸ਼ਕਾਰੀ',
    desc: 'Build powerful slide decks with PowerPoint and Google Slides.',
    level: 'Intermediate', xp: 75, lessons: 3,
    topics: ['Slide Design', 'Animations', 'Presenting Online']
  },
  {
    id: 7, icon: '🤖', title: 'Introduction to AI', titlePa: 'AI ਦੀ ਜਾਣ-ਪਛਾਣ',
    desc: 'What is Artificial Intelligence? How it works and affects daily life.',
    level: 'Intermediate', xp: 100, lessons: 3,
    topics: ['What is AI?', 'Machine Learning Basics', 'AI in Daily Life']
  },
  {
    id: 8, icon: '🐍', title: 'Coding with Python', titlePa: 'ਪਾਈਥਨ ਨਾਲ ਕੋਡਿੰਗ',
    desc: 'Write your first programs in Python — the most beginner-friendly language.',
    level: 'Advanced', xp: 150, lessons: 6,
    topics: ['Variables', 'Loops', 'Functions', 'Lists', 'Projects']
  },
];

const levelColor = { Beginner: 'badge-success', Intermediate: 'badge-warning', Advanced: 'badge-danger' };

const DigitalLiteracy = () => {
  const { lang } = useLang();

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        {/* Header */}
        <div className="animate-fade-in-up" style={{ marginBottom: 'var(--space-2xl)' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: 8 }}>
            💡 Digital Literacy Hub
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 600 }}>
            A structured path from complete beginner to digitally confident. Work through modules at your own pace and earn XP along the way.
          </p>
        </div>

        {/* Path overview */}
        <div className="card card-no-hover animate-fade-in-up" style={{ marginBottom: 'var(--space-2xl)', animationDelay: '0.1s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xl)', flexWrap: 'wrap' }}>
            {['Beginner', 'Intermediate', 'Advanced'].map((l, i) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <span className={`badge ${levelColor[l]}`}>{l}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {modules.filter(m => m.level === l).length} modules
                </span>
                {i < 2 && <ChevronRight size={14} color="var(--text-muted)" />}
              </div>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--secondary)' }}>
              <Zap size={16} />
              <span style={{ fontWeight: 700 }}>Up to 675 XP total</span>
            </div>
          </div>
        </div>

        {/* Module Grid */}
        <div className="grid-auto">
          {modules.map((mod, i) => (
            <div
              key={mod.id}
              className="card dl-module animate-fade-in-up"
              style={{ animationDelay: `${0.1 + i * 0.04}s` }}
            >
              <div className="dl-module-header">
                <div className="dl-module-icon">{mod.icon}</div>
                <span className={`badge ${levelColor[mod.level]}`}>{mod.level}</span>
              </div>

              <h3 className="dl-module-title">
                {lang === 'pa' ? mod.titlePa : mod.title}
              </h3>
              <p className="dl-module-desc">{mod.desc}</p>

              <div className="dl-module-topics">
                {mod.topics.slice(0, 3).map(topic => (
                  <span key={topic} className="tag">{topic}</span>
                ))}
                {mod.topics.length > 3 && <span className="tag">+{mod.topics.length - 3} more</span>}
              </div>

              <div className="dl-module-footer">
                <div className="dl-module-meta">
                  <span><Star size={11} color="var(--secondary)" /> {mod.xp} XP</span>
                  <span>📖 {mod.lessons} lessons</span>
                </div>
                <Link to="/lessons" className="btn btn-primary btn-sm">
                  Start <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DigitalLiteracy;
