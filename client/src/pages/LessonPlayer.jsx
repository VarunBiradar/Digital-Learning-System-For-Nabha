import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { getLesson, saveProgress, getLessons } from '../services/api';
import Sidebar from '../components/Sidebar';
import { ArrowLeft, Clock, Users, CheckCircle, ChevronRight, Award } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './LessonPlayer.css';

const LessonPlayer = () => {
  const { id } = useParams();
  const { t, lang } = useLang();
  const navigate = useNavigate();

  const [lesson, setLesson]           = useState(null);
  const [allLessons, setAllLessons]   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeTab, setActiveTab]     = useState('content');
  const [answers, setAnswers]         = useState({});
  const [submitted, setSubmitted]     = useState(false);
  const [score, setScore]             = useState(0);
  const [completed, setCompleted]     = useState(false);
  const [saving, setSaving]           = useState(false);

  useEffect(() => {
    setLoading(true);
    setSubmitted(false);
    setAnswers({});
    setCompleted(false);
    setActiveTab('content');
    Promise.all([getLesson(id), getLessons()])
      .then(([l, all]) => {
        setLesson(l.data);
        setAllLessons(all.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleMarkComplete = async () => {
    setSaving(true);
    try {
      await saveProgress(id, { completed: true, watchedSeconds: (lesson.duration || 30) * 60 });
      setCompleted(true);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!lesson?.quiz?.length) return;
    let correct = 0;
    lesson.quiz.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    const pct = Math.round((correct / lesson.quiz.length) * 100);
    setScore(pct);
    setSubmitted(true);
    await saveProgress(id, { quizScore: pct, quizAttempted: true, completed: pct >= 50 });
    if (pct >= 50) setCompleted(true);
  };

  const currentIndex = allLessons.findIndex(l => l._id === id);
  const nextLesson   = allLessons[currentIndex + 1];

  if (loading) return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content loading-center"><div className="spinner" /></main>
    </div>
  );

  if (!lesson) return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content"><div className="alert alert-danger">Lesson not found.</div></main>
    </div>
  );

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        {/* Back */}
        <Link to="/lessons" className="btn btn-ghost btn-sm" style={{ marginBottom: 'var(--space-lg)' }}>
          <ArrowLeft size={16} /> {t('lessons')}
        </Link>

        <div className="player-layout">
          {/* Main column */}
          <div className="player-main">
            {/* Video */}
            {lesson.videoUrl && (
              <div className="video-wrapper animate-fade-in-up">
                <iframe
                  src={lesson.videoUrl}
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            )}

            {/* Title */}
            <div className="player-header animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div>
                <h1 className="player-title">
                  {lang === 'pa' && lesson.titlePa ? lesson.titlePa : lesson.title}
                </h1>
                <div className="player-meta">
                  <span><Clock size={13} /> {lesson.duration} min</span>
                  <span><Users size={13} /> {lesson.enrolledCount} students</span>
                  <span className={`badge badge-${lesson.difficulty === 'beginner' ? 'success' : lesson.difficulty === 'intermediate' ? 'warning' : 'danger'}`}>
                    {lesson.difficulty}
                  </span>
                  <span className="badge badge-primary">Grade {lesson.grade}</span>
                </div>
              </div>
              {!completed && (
                <button className="btn btn-secondary btn-sm" onClick={handleMarkComplete} disabled={saving}>
                  {saving ? 'Saving...' : '✅ Mark Complete'}
                </button>
              )}
              {completed && (
                <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                  <CheckCircle size={14} /> Completed!
                </span>
              )}
            </div>

            {/* Tabs */}
            <div className="player-tabs animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <button className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}>
                📖 Lesson Content
              </button>
              {lesson.quiz?.length > 0 && (
                <button className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>
                  🎯 {t('quiz')} ({lesson.quiz.length} Qs)
                </button>
              )}
            </div>

            {/* Tab Content */}
            {activeTab === 'content' && (
              <div className="card card-no-hover lesson-markdown animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <ReactMarkdown>{lang === 'pa' && lesson.contentPa ? lesson.contentPa : lesson.content || '_No content available._'}</ReactMarkdown>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="quiz-container animate-fade-in">
                {submitted ? (
                  <div className="quiz-result card card-no-hover">
                    <div className="quiz-score-circle">
                      <div className="quiz-score-num">{score}%</div>
                      <div className="quiz-score-label">{t('score')}</div>
                    </div>
                    <h3>{score >= 80 ? '🎉 Excellent!' : score >= 50 ? '👍 Good Job!' : '📚 Keep Practicing'}</h3>
                    <p>{score >= 50 ? 'You passed this quiz! +50 XP awarded.' : 'Score 50% or above to earn XP.'}</p>
                    {score >= 80 && (
                      <div className="flex items-center gap-sm" style={{ justifyContent: 'center', marginTop: 'var(--space-md)' }}>
                        <Award size={18} color="var(--accent)" />
                        <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Achievement Unlocked: Quiz Master!</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {lesson.quiz.map((q, qi) => (
                      <div key={qi} className="quiz-question card card-no-hover">
                        <h4 className="quiz-q-text">
                          Q{qi + 1}. {lang === 'pa' && q.questionPa ? q.questionPa : q.question}
                        </h4>
                        <div className="quiz-options">
                          {q.options.map((opt, oi) => (
                            <button
                              key={oi}
                              className={`quiz-option ${answers[qi] === oi ? 'selected' : ''}`}
                              onClick={() => setAnswers(a => ({ ...a, [qi]: oi }))}
                            >
                              <span className="quiz-option-label">{String.fromCharCode(65 + oi)}</span>
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(answers).length < lesson.quiz.length}
                    >
                      {t('submitQuiz')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="player-sidebar">
            <div className="card card-no-hover">
              <div className="section-title" style={{ marginBottom: 'var(--space-md)', fontSize: '0.95rem' }}>
                📚 More Lessons
              </div>
              <div className="player-lesson-list">
                {allLessons.map(l => (
                  <Link
                    key={l._id}
                    to={`/lesson/${l._id}`}
                    className={`player-lesson-item ${l._id === id ? 'active' : ''}`}
                  >
                    <div className="player-lesson-dot" />
                    <div className="player-lesson-name">{l.title}</div>
                    <ChevronRight size={12} />
                  </Link>
                ))}
              </div>
            </div>

            {nextLesson && (
              <div className="card" style={{ marginTop: 'var(--space-md)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>UP NEXT</div>
                <div style={{ fontWeight: 600, marginBottom: 'var(--space-sm)', fontSize: '0.9rem' }}>
                  {nextLesson.title}
                </div>
                <Link to={`/lesson/${nextLesson._id}`} className="btn btn-primary btn-sm btn-full">
                  {t('nextLesson')} <ChevronRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonPlayer;
