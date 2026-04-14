import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { getLessons, getMyProgress } from '../services/api';
import Sidebar from '../components/Sidebar';
import { Search, Filter, Clock, Users, BookOpen, PlayCircle, CheckCircle } from 'lucide-react';
import './LessonLibrary.css';

const SUBJECTS = ['All', 'Computer Basics', 'Digital Literacy', 'MS Office', 'Programming'];
const GRADES   = ['All', '6', '7', '8', '9', '10'];
const LEVELS   = ['All', 'beginner', 'intermediate', 'advanced'];

const LessonLibrary = () => {
  const { t, lang } = useLang();
  const [lessons, setLessons]   = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [subject, setSubject]   = useState('All');
  const [grade, setGrade]       = useState('All');
  const [level, setLevel]       = useState('All');

  useEffect(() => {
    Promise.all([getLessons(), getMyProgress()])
      .then(([l, p]) => { setLessons(l.data); setProgress(p.data); })
      .finally(() => setLoading(false));
  }, []);

  const filtered = lessons.filter(l => {
    const searchMatch = !search ||
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.description.toLowerCase().includes(search.toLowerCase()) ||
      l.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    const subjectMatch = subject === 'All' || l.subject === subject;
    const gradeMatch   = grade === 'All'   || l.grade === grade;
    const levelMatch   = level === 'All'   || l.difficulty === level;
    return searchMatch && subjectMatch && gradeMatch && levelMatch;
  });

  const getProgress = (id) => progress.find(p => p.lesson?._id === id);

  const diffColor = { beginner: 'badge-success', intermediate: 'badge-warning', advanced: 'badge-danger' };
  const categoryEmoji = {
    'Computer Basics': '💻', 'Digital Literacy': '🌐', 'MS Office': '📄', 'Programming': '🐍'
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        {/* Header */}
        <div className="section-header animate-fade-in-up" style={{ marginBottom: 'var(--space-xl)' }}>
          <div>
            <h1 className="section-title" style={{ fontSize: '1.8rem' }}>
              <BookOpen size={24} style={{ display: 'inline', marginRight: 8, color: 'var(--primary-light)' }} />
              {t('lessons')}
            </h1>
            <div className="section-subtitle">{filtered.length} lessons available</div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-bar card card-no-hover animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={t('search')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-group">
            <Filter size={14} style={{ color: 'var(--text-muted)' }} />
            <select value={subject} onChange={e => setSubject(e.target.value)} className="form-input">
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={grade} onChange={e => setGrade(e.target.value)} className="form-input">
              {GRADES.map(g => <option key={g} value={g}>Grade {g === 'All' ? 'All' : g}</option>)}
            </select>
            <select value={level} onChange={e => setLevel(e.target.value)} className="form-input">
              {LEVELS.map(lv => <option key={lv} value={lv}>{lv.charAt(0).toUpperCase() + lv.slice(1)}</option>)}
            </select>
          </div>
        </div>

        {/* Lesson Grid */}
        {loading ? (
          <div className="loading-center"><div className="spinner" /></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state card card-no-hover">
            <div className="empty-icon">🔍</div>
            <h3>No lessons found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="lessons-grid">
            {filtered.map((lesson, i) => {
              const prog = getProgress(lesson._id);
              return (
                <Link
                  key={lesson._id}
                  to={`/lesson/${lesson._id}`}
                  className="lesson-card card animate-fade-in-up"
                  style={{ animationDelay: `${0.1 + i * 0.04}s` }}
                >
                  {/* Thumbnail */}
                  <div className="lesson-thumbnail">
                    <div className="lesson-thumbnail-bg">
                      <span className="lesson-emoji">{categoryEmoji[lesson.category] || '📚'}</span>
                    </div>
                    {prog?.completed && (
                      <div className="lesson-done-overlay">
                        <CheckCircle size={28} />
                      </div>
                    )}
                    <span className={`badge ${diffColor[lesson.difficulty]} lesson-diff-badge`}>
                      {lesson.difficulty}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="lesson-content">
                    <div className="lesson-subject">{lesson.subject}</div>
                    <h3 className="lesson-title">
                      {lang === 'pa' && lesson.titlePa ? lesson.titlePa : lesson.title}
                    </h3>
                    <p className="lesson-desc">
                      {lang === 'pa' && lesson.descriptionPa ? lesson.descriptionPa : lesson.description}
                    </p>

                    <div className="lesson-meta">
                      <span><Clock size={12} /> {lesson.duration} min</span>
                      <span><Users size={12} /> {lesson.enrolledCount}</span>
                      <span>Grade {lesson.grade}</span>
                    </div>

                    <div className="lesson-footer">
                      {prog?.completed ? (
                        <span className="badge badge-success"><CheckCircle size={10} /> Completed</span>
                      ) : prog ? (
                        <span className="badge badge-warning">In Progress</span>
                      ) : (
                        <span className="badge badge-primary">New</span>
                      )}
                      <span className="lesson-cta">
                        <PlayCircle size={14} />
                        {prog ? t('continueLesson') : t('startLesson')}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default LessonLibrary;
