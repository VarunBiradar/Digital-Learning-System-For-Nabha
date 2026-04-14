import { useEffect, useState } from 'react';
import { useLang } from '../contexts/LangContext';
import { getProgressStats, getStudentProgress, getLessons, getStudents, createAnnouncement } from '../services/api';
import Sidebar from '../components/Sidebar';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend, ArcElement
} from 'chart.js';
import { Users, BookOpen, TrendingUp, MessageSquarePlus, CheckCircle, Send } from 'lucide-react';
import './TeacherDashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const chartOpts = {
  responsive: true,
  plugins: { legend: { labels: { color: '#9CA3AF', font: { size: 11 } } } },
  scales: {
    x: { ticks: { color: '#6B7280' }, grid: { color: 'rgba(255,255,255,0.05)' } },
    y: { ticks: { color: '#6B7280' }, grid: { color: 'rgba(255,255,255,0.05)' } }
  }
};

const TeacherDashboard = () => {
  const { t } = useLang();
  const [stats, setStats]         = useState(null);
  const [recentProg, setRecentProg] = useState([]);
  const [lessons, setLessons]     = useState([]);
  const [students, setStudents]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [annForm, setAnnForm]     = useState({ title: '', message: '', type: 'info' });
  const [annSent, setAnnSent]     = useState(false);

  useEffect(() => {
    Promise.all([getProgressStats(), getStudentProgress(), getLessons(), getStudents()])
      .then(([s, p, l, st]) => {
        setStats(s.data);
        setRecentProg(p.data.slice(0, 5));
        setLessons(l.data);
        setStudents(st.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAnnounce = async (e) => {
    e.preventDefault();
    await createAnnouncement(annForm);
    setAnnForm({ title: '', message: '', type: 'info' });
    setAnnSent(true);
    setTimeout(() => setAnnSent(false), 3000);
  };

  // Chart data
  const subjectMap = {};
  lessons.forEach(l => { subjectMap[l.subject] = (subjectMap[l.subject] || 0) + 1; });

  const barData = {
    labels: Object.keys(subjectMap),
    datasets: [{
      label: 'Lessons per Subject',
      data: Object.values(subjectMap),
      backgroundColor: 'rgba(13,115,119,0.7)',
      borderColor: 'rgba(20,160,165,1)',
      borderWidth: 1,
      borderRadius: 6,
    }]
  };

  const diffMap = { beginner: 0, intermediate: 0, advanced: 0 };
  lessons.forEach(l => { diffMap[l.difficulty]++; });

  const donutData = {
    labels: ['Beginner', 'Intermediate', 'Advanced'],
    datasets: [{
      data: [diffMap.beginner, diffMap.intermediate, diffMap.advanced],
      backgroundColor: ['rgba(46,204,113,0.8)', 'rgba(243,156,18,0.8)', 'rgba(231,76,60,0.8)'],
      borderColor: ['#2ECC71', '#F39C12', '#E74C3C'],
      borderWidth: 1,
    }]
  };

  if (loading) return (
    <div className="app-layout"><Sidebar />
      <main className="main-content loading-center"><div className="spinner" /></main>
    </div>
  );

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        {/* Header */}
        <div className="section-header animate-fade-in-up" style={{ marginBottom: 'var(--space-xl)' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem' }}>👩‍🏫 Teacher {t('dashboard')}</h1>
            <p className="section-subtitle">Overview of student progress and platform activity</p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid animate-fade-in-up" style={{ marginBottom: 'var(--space-xl)', animationDelay: '0.1s' }}>
          <div className="stat-card">
            <div className="stat-icon"><Users size={22} color="var(--primary-light)" /></div>
            <div className="stat-number">{students.length}</div>
            <div className="stat-label">Total Students</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><BookOpen size={22} color="var(--secondary)" /></div>
            <div className="stat-number">{lessons.length}</div>
            <div className="stat-label">Total Lessons</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><CheckCircle size={22} color="var(--success)" /></div>
            <div className="stat-number">{stats?.totalCompleted || 0}</div>
            <div className="stat-label">Completions</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><TrendingUp size={22} color="var(--accent)" /></div>
            <div className="stat-number">{stats?.avgQuizScore || 0}%</div>
            <div className="stat-label">Avg Quiz Score</div>
          </div>
        </div>

        <div className="teacher-grid">
          {/* Charts */}
          <div className="teacher-charts">
            <div className="card card-no-hover animate-fade-in-up" style={{ marginBottom: 'var(--space-lg)', animationDelay: '0.15s' }}>
              <div className="section-title" style={{ marginBottom: 'var(--space-lg)' }}>📊 Lessons by Subject</div>
              <Bar data={barData} options={chartOpts} height={180} />
            </div>
            <div className="card card-no-hover animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="section-title" style={{ marginBottom: 'var(--space-lg)' }}>🎯 Difficulty Distribution</div>
              <div style={{ maxWidth: 260, margin: '0 auto' }}>
                <Doughnut data={donutData} options={{ responsive: true, plugins: { legend: { labels: { color: '#9CA3AF' } } } }} />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div>
            {/* Announce */}
            <div className="card card-no-hover animate-fade-in-up" style={{ marginBottom: 'var(--space-lg)', animationDelay: '0.2s' }}>
              <div className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
                <MessageSquarePlus size={16} style={{ display: 'inline', marginRight: 6 }} />
                Post Announcement
              </div>
              {annSent && <div className="alert alert-success" style={{ marginBottom: 'var(--space-md)' }}>✅ Announcement posted!</div>}
              <form onSubmit={handleAnnounce} className="ann-form">
                <div className="form-group">
                  <input
                    className="form-input"
                    placeholder="Title"
                    value={annForm.title}
                    onChange={e => setAnnForm(f => ({ ...f, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-input"
                    placeholder="Write your message..."
                    rows={3}
                    value={annForm.message}
                    onChange={e => setAnnForm(f => ({ ...f, message: e.target.value }))}
                    required
                  />
                </div>
                <div className="ann-form-footer">
                  <select className="form-input" value={annForm.type} onChange={e => setAnnForm(f => ({ ...f, type: e.target.value }))}>
                    <option value="info">ℹ️ Info</option>
                    <option value="success">✅ Success</option>
                    <option value="warning">⚠️ Warning</option>
                  </select>
                  <button type="submit" className="btn btn-primary btn-sm">
                    <Send size={14} /> Post
                  </button>
                </div>
              </form>
            </div>

            {/* Recent activity */}
            <div className="card card-no-hover animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
              <div className="section-title" style={{ marginBottom: 'var(--space-md)' }}>🕒 Recent Completions</div>
              {recentProg.length === 0 ? (
                <p style={{ fontSize: '0.85rem' }}>No completions yet.</p>
              ) : (
                <div className="activity-list">
                  {recentProg.map((p, i) => (
                    <div key={i} className="activity-row">
                      <div className="activity-avatar">{p.user?.name?.charAt(0) || '?'}</div>
                      <div className="activity-info">
                        <div className="activity-name">{p.user?.name}</div>
                        <div className="activity-lesson">{p.lesson?.title}</div>
                      </div>
                      <CheckCircle size={16} color="var(--success)" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Students table */}
        <div className="card card-no-hover animate-fade-in-up" style={{ marginTop: 'var(--space-xl)', animationDelay: '0.3s' }}>
          <div className="section-title" style={{ marginBottom: 'var(--space-lg)' }}>👥 Students</div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th><th>Grade</th><th>School</th><th>XP</th><th>Badges</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s._id}>
                    <td>
                      <div className="flex items-center gap-sm">
                        <div className="student-avatar">{s.name.charAt(0)}</div>
                        {s.name}
                      </div>
                    </td>
                    <td><span className="badge badge-primary">Grade {s.grade || 'N/A'}</span></td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{s.school}</td>
                    <td><span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{s.xp} XP</span></td>
                    <td>{s.badges?.map(b => <span key={b} className="tag" style={{ marginRight: 3 }}>{b}</span>)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
