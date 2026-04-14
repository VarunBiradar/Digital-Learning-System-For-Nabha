import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLang } from '../contexts/LangContext';
import { getMyProgress, getLessons, getAnnouncements } from '../services/api';
import Sidebar from '../components/Sidebar';
import {
  BookOpen, TrendingUp, Award, Star, ChevronRight,
  Clock, CheckCircle, Megaphone, PlayCircle, Zap
} from 'lucide-react';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { t, lang } = useLang();
  const [progress, setProgress] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMyProgress(), getLessons(), getAnnouncements()])
      .then(([p, l, a]) => {
        setProgress(p.data);
        setLessons(l.data.slice(0, 6));
        setAnnouncements(a.data.slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, []);

  const completedCount = progress.filter(p => p.completed).length;
  const totalLessons = lessons.length;
  const completionPct = totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0;

  const getProgressForLesson = (lessonId) =>
    progress.find(p => p.lesson?._id === lessonId);

  const difficultyColor = { beginner: 'badge-success', intermediate: 'badge-warning', advanced: 'badge-danger' };
  const annColors = { success: 'badge-success', info: 'badge-info', warning: 'badge-warning' };

  if (loading) return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content loading-center"><div className="spinner" /></main>
    </div>
  );

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="gradient-orb orb-1" style={{ opacity: 0.5 }} />

        {/* Header */}
        <div className="dash-header animate-fade-in-up">
          <div>
            <h1>
              {t('welcome')}, <span className="gradient-text">{user?.name?.split(' ')[0]}!</span>
            </h1>
            <p>{user?.school} • Grade {user?.grade || 'N/A'}</p>
          </div>
          <div className="dash-xp-badge">
            <Zap size={16} />
            <span>{user?.xp} XP</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="stats-grid animate-fade-in-up" style={{ animationDelay: '0.1s', marginBottom: 'var(--space-xl)' }}>
          <div className="stat-card">
            <div className="stat-icon"><BookOpen size={22} color="var(--primary-light)" /></div>
            <div className="stat-number">{completedCount}</div>
            <div className="stat-label">Lessons Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><TrendingUp size={22} color="var(--secondary)" /></div>
            <div className="stat-number">{completionPct}%</div>
            <div className="stat-label">Overall Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Award size={22} color="var(--accent)" /></div>
            <div className="stat-number">{user?.badges?.length || 0}</div>
            <div className="stat-label">Badges Earned</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Star size={22} color="var(--secondary-light)" /></div>
            <div className="stat-number">{user?.xp}</div>
            <div className="stat-label">XP Points</div>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="card card-no-hover animate-fade-in-up" style={{ marginBottom: 'var(--space-xl)', animationDelay: '0.15s' }}>
          <div className="section-header" style={{ marginBottom: 'var(--space-md)' }}>
            <div>
              <div className="section-title">Overall Progress</div>
              <div className="section-subtitle">{completedCount} of {totalLessons} lessons completed</div>
            </div>
            <span className="badge badge-primary">{completionPct}%</span>
          </div>
          <div className="progress-bar" style={{ height: 12 }}>
            <div className="progress-fill" style={{ width: `${completionPct}%` }} />
          </div>
        </div>

        <div className="dash-grid">
          {/* Lessons */}
          <div>
            <div className="section-header animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div>
                <div className="section-title">{t('lessons')}</div>
                <div className="section-subtitle">Continue where you left off</div>
              </div>
              <Link to="/lessons" className="btn btn-ghost btn-sm">
                View All <ChevronRight size={14} />
              </Link>
            </div>

            <div className="lessons-list">
              {lessons.map((lesson, i) => {
                const prog = getProgressForLesson(lesson._id);
                return (
                  <Link
                    key={lesson._id}
                    to={`/lesson/${lesson._id}`}
                    className="lesson-row card animate-fade-in-up"
                    style={{ animationDelay: `${0.2 + i * 0.05}s` }}
                  >
                    <div className="lesson-row-icon">
                      {lesson.category === 'Computer Basics' ? '💻' :
                       lesson.category === 'Digital Literacy' ? '🌐' :
                       lesson.category === 'MS Office' ? '📄' : '🐍'}
                    </div>
                    <div className="lesson-row-info">
                      <div className="lesson-row-title">
                        {lang === 'pa' && lesson.titlePa ? lesson.titlePa : lesson.title}
                      </div>
                      <div className="lesson-row-meta">
                        <span className={`badge ${difficultyColor[lesson.difficulty]}`}>{lesson.difficulty}</span>
                        <span className="tag"><Clock size={10} /> {lesson.duration} {t('minutes')}</span>
                        {prog?.completed && <span className="badge badge-success"><CheckCircle size={10} /> Done</span>}
                      </div>
                    </div>
                    <div className="lesson-row-action">
                      {prog?.completed
                        ? <CheckCircle size={20} color="var(--success)" />
                        : <PlayCircle size={20} color="var(--primary-light)" />}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sidebar panels */}
          <div className="dash-side">
            {/* Badges */}
            <div className="card card-no-hover animate-fade-in-up" style={{ animationDelay: '0.25s', marginBottom: 'var(--space-lg)' }}>
              <div className="section-title" style={{ marginBottom: 'var(--space-md)' }}>🏆 {t('badges')}</div>
              <div className="badges-grid">
                {user?.badges?.length > 0 ? user.badges.map(b => (
                  <div key={b} className="badge-chip">{b}</div>
                )) : <p style={{ fontSize: '0.85rem' }}>Complete lessons to earn badges!</p>}
              </div>
            </div>

            {/* Announcements */}
            <div className="card card-no-hover animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
                <Megaphone size={16} style={{ display: 'inline', marginRight: 6 }} />
                {t('announcements')}
              </div>
              <div className="ann-list">
                {announcements.map(a => (
                  <div key={a._id} className="ann-item">
                    <span className={`badge ${annColors[a.type]}`}>{a.type}</span>
                    <div className="ann-title">{a.title}</div>
                    <div className="ann-msg">{a.message}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
