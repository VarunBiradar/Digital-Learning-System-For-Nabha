import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyProgress } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import { CheckCircle, Clock, Target, Award, Play } from 'lucide-react';

const Progress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProgress().then(r => setProgress(r.data)).finally(() => setLoading(false));
  }, []);

  const completed = progress.filter(p => p.completed);
  const inProgress = progress.filter(p => !p.completed);

  const xpLevel = Math.floor((user?.xp || 0) / 500) + 1;
  const xpToNext = 500 - ((user?.xp || 0) % 500);
  const xpPct = (((user?.xp || 0) % 500) / 500) * 100;

  if (loading) return (
    <div className="app-layout"><Sidebar />
      <main className="main-content loading-center"><div className="spinner" /></main>
    </div>
  );

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <h1 style={{ marginBottom: 'var(--space-xl)', fontSize: '1.8rem' }} className="animate-fade-in-up">
          📈 My Progress
        </h1>

        {/* XP Level Card */}
        <div className="card card-no-hover animate-fade-in-up" style={{ marginBottom: 'var(--space-xl)', animationDelay: '0.1s' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-md)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
            <div>
              <h3 className="gradient-text">Level {xpLevel} Learner</h3>
              <p style={{ fontSize: '0.85rem' }}>{user?.xp} XP total · {xpToNext} XP to Level {xpLevel + 1}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--secondary)' }}>{user?.xp}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>TOTAL XP</div>
            </div>
          </div>
          <div className="progress-bar" style={{ height: 10 }}>
            <div className="progress-fill xp-bar" style={{ width: `${xpPct}%` }} />
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid animate-fade-in-up" style={{ marginBottom: 'var(--space-xl)', animationDelay: '0.15s' }}>
          <div className="stat-card">
            <div className="stat-icon"><CheckCircle size={22} color="var(--success)" /></div>
            <div className="stat-number">{completed.length}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Play size={22} color="var(--primary-light)" /></div>
            <div className="stat-number">{inProgress.length}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Award size={22} color="var(--accent)" /></div>
            <div className="stat-number">{user?.badges?.length || 0}</div>
            <div className="stat-label">Badges</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Target size={22} color="var(--secondary)" /></div>
            <div className="stat-number">{progress.filter(p => p.quizAttempted).length}</div>
            <div className="stat-label">Quizzes Taken</div>
          </div>
        </div>

        {/* Completed lessons */}
        {completed.length > 0 && (
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', marginBottom: 'var(--space-xl)' }}>
            <div className="section-title" style={{ marginBottom: 'var(--space-md)' }}>✅ Completed Lessons</div>
            <div className="grid-auto">
              {completed.map(p => (
                <div key={p._id} className="card" style={{ borderColor: 'rgba(46,204,113,0.3)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>{p.lesson?.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.lesson?.subject} · Grade {p.lesson?.grade}</div>
                    </div>
                    <CheckCircle size={20} color="var(--success)" />
                  </div>
                  {p.quizAttempted && (
                    <div className="progress-bar" style={{ marginTop: 'var(--space-sm)' }}>
                      <div className="progress-fill" style={{ width: `${p.quizScore}%`, background: p.quizScore >= 80 ? 'var(--success)' : p.quizScore >= 50 ? 'var(--warning)' : 'var(--danger)' }} />
                    </div>
                  )}
                  {p.quizAttempted && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>Quiz: {p.quizScore}%</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* In progress */}
        {inProgress.length > 0 && (
          <div className="animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
            <div className="section-title" style={{ marginBottom: 'var(--space-md)' }}>🔄 In Progress</div>
            <div className="grid-auto">
              {inProgress.map(p => (
                <Link key={p._id} to={`/lesson/${p.lesson?._id}`} className="card" style={{ textDecoration: 'none' }}>
                  <div style={{ fontWeight: 600, marginBottom: 4, color: 'var(--text)' }}>{p.lesson?.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 'var(--space-sm)' }}>{p.lesson?.subject}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--primary-light)' }}>
                    <Clock size={12} /> Continue lesson →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {progress.length === 0 && (
          <div className="card card-no-hover" style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>🚀</div>
            <h3>Start your learning journey!</h3>
            <p style={{ marginBottom: 'var(--space-lg)' }}>Complete lessons to see your progress here.</p>
            <Link to="/lessons" className="btn btn-primary">Browse Lessons</Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Progress;
