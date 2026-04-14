import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { BookOpen, Wifi, Globe, Users, Award, ChevronRight, Play } from 'lucide-react';
import './Landing.css';

const Landing = () => {
  const { t, toggle, lang } = useLang();

  const features = [
    { icon: <Wifi size={28} />, title: 'Offline Ready', desc: 'Learn anywhere, even without internet. All lessons available offline.' },
    { icon: <Globe size={28} />, title: 'Bilingual Content', desc: 'Every lesson available in English and Punjabi (ਪੰਜਾਬੀ).' },
    { icon: <BookOpen size={28} />, title: '30+ Lessons', desc: 'Computer basics, digital literacy, MS Office, Python and more.' },
    { icon: <Award size={28} />, title: 'Earn Badges & XP', desc: 'Complete lessons, ace quizzes and earn achievement badges.' },
    { icon: <Users size={28} />, title: 'Teacher Tools', desc: 'Dashboards, progress tracking and assignment management.' },
    { icon: <Play size={28} />, title: 'Video Lessons', desc: 'High-quality video content with embedded quizzes after each lesson.' },
  ];

  const stats = [
    { number: '500+', label: 'Students Enrolled' },
    { number: '30+', label: 'Lessons Available' },
    { number: '12', label: 'Government Schools' },
    { number: '100%', label: 'Free of Cost' },
  ];

  return (
    <div className="landing">
      <div className="gradient-orb orb-1" />
      <div className="gradient-orb orb-2" />

      {/* Navbar */}
      <nav className="landing-nav">
        <div className="landing-nav-logo">
          <span className="logo-emoji">📚</span>
          <span className="logo-text">{t('appName')}</span>
        </div>
        <div className="landing-nav-actions">
          <button className="btn btn-ghost btn-sm" onClick={toggle}>
            <Globe size={14} /> {lang === 'en' ? 'ਪੰਜਾਬੀ' : 'English'}
          </button>
          <Link to="/login" className="btn btn-primary btn-sm">{t('login')}</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <span>🌱</span> Built for rural Nabha schools
        </div>
        <h1 className="hero-title">
          <span className="gradient-text">Digital Learning</span>
          <br />for Every Student
          {lang === 'pa' && <div className="hero-pa">ਹਰ ਵਿਦਿਆਰਥੀ ਲਈ</div>}
        </h1>
        <p className="hero-desc">
          A free, offline-ready platform bringing quality digital education to government schools in Nabha and nearby rural areas. Lessons in English and Punjabi.
        </p>
        <div className="hero-actions">
          <Link to="/login" className="btn btn-primary btn-lg">
            {t('getStarted')} <ChevronRight size={18} />
          </Link>
          <Link to="/login" className="btn btn-ghost btn-lg">
            {t('learnMore')}
          </Link>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          {stats.map((s, i) => (
            <div key={i} className="hero-stat">
              <div className="hero-stat-num">{s.number}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="features-header">
          <h2>Why Learning Platform?</h2>
          <p>Designed from the ground up for rural education challenges</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo logins */}
      <section className="demo-section">
        <div className="demo-card card card-no-hover">
          <h2>Try the Platform</h2>
          <p>Use these demo accounts to explore the platform</p>
          <div className="demo-grid">
            {[
              { role: 'Student', email: 'student1@learning.com', pw: 'password123', color: 'var(--primary-light)' },
              { role: 'Teacher', email: 'teacher@learning.com', pw: 'password123', color: 'var(--secondary)' },
              { role: 'Admin', email: 'admin@learning.com', pw: 'password123', color: 'var(--accent)' },
            ].map(d => (
              <div key={d.role} className="demo-item" style={{ borderColor: d.color }}>
                <div className="demo-role" style={{ color: d.color }}>{d.role}</div>
                <div className="demo-cred"><span>Email:</span> {d.email}</div>
                <div className="demo-cred"><span>Password:</span> {d.pw}</div>
                <Link to="/login" className="btn btn-ghost btn-sm btn-full" style={{ marginTop: 8 }}>
                  Login as {d.role}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>📚 Learning Platform — Bridging the Digital Divide in Nabha, Punjab</p>
        <p style={{ fontSize: '0.8rem', marginTop: 4 }}>Free • Offline • Bilingual • Open to All</p>
      </footer>
    </div>
  );
};

export default Landing;
