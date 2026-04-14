import { useEffect, useState } from 'react';
import { getUsers, getUserStats, getLessons, deleteUser, deleteLesson, getAnnouncements, deleteAnnouncement } from '../services/api';
import Sidebar from '../components/Sidebar';
import { Users, BookOpen, Trash2, ShieldCheck, TrendingUp } from 'lucide-react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [users, setUsers]           = useState([]);
  const [lessons, setLessons]       = useState([]);
  const [announcements, setAnn]     = useState([]);
  const [stats, setStats]           = useState(null);
  const [loading, setLoading]       = useState(true);
  const [activeTab, setActiveTab]   = useState('users');

  useEffect(() => {
    Promise.all([getUsers(), getLessons(), getUserStats(), getAnnouncements()])
      .then(([u, l, s, a]) => {
        setUsers(u.data); setLessons(l.data); setStats(s.data); setAnn(a.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    await deleteUser(id);
    setUsers(u => u.filter(x => x._id !== id));
  };

  const handleDeleteLesson = async (id) => {
    if (!window.confirm('Delete this lesson?')) return;
    await deleteLesson(id);
    setLessons(l => l.filter(x => x._id !== id));
  };

  const handleDeleteAnn = async (id) => {
    await deleteAnnouncement(id);
    setAnn(a => a.filter(x => x._id !== id));
  };

  const roleColor = { admin: 'badge-danger', teacher: 'badge-warning', student: 'badge-primary' };

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
            <h1 style={{ fontSize: '1.8rem' }}>🛡️ Admin Panel</h1>
            <p className="section-subtitle">Manage users, lessons, and platform content</p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid animate-fade-in-up" style={{ marginBottom: 'var(--space-xl)', animationDelay: '0.1s' }}>
          <div className="stat-card">
            <div className="stat-icon"><Users size={22} color="var(--primary-light)" /></div>
            <div className="stat-number">{stats?.totalUsers || 0}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><ShieldCheck size={22} color="var(--secondary)" /></div>
            <div className="stat-number">{stats?.totalStudents || 0}</div>
            <div className="stat-label">Students</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><TrendingUp size={22} color="var(--success)" /></div>
            <div className="stat-number">{stats?.totalTeachers || 0}</div>
            <div className="stat-label">Teachers</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><BookOpen size={22} color="var(--accent)" /></div>
            <div className="stat-number">{lessons.length}</div>
            <div className="stat-label">Lessons</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          {['users', 'lessons', 'announcements'].map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'users' ? `👥 Users (${users.length})` :
               tab === 'lessons' ? `📚 Lessons (${lessons.length})` :
               `📢 Announcements (${announcements.length})`}
            </button>
          ))}
        </div>

        {/* Users Table */}
        {activeTab === 'users' && (
          <div className="card card-no-hover animate-fade-in" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Role</th><th>School</th><th>XP</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id}>
                      <td>
                        <div className="flex items-center gap-sm">
                          <div className="admin-avatar">{u.name.charAt(0)}</div>
                          {u.name}
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{u.email}</td>
                      <td><span className={`badge ${roleColor[u.role]}`}>{u.role}</span></td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{u.school}</td>
                      <td><span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{u.xp}</span></td>
                      <td>
                        {u.role !== 'admin' && (
                          <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(u._id)}>
                            <Trash2 size={13} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Lessons Table */}
        {activeTab === 'lessons' && (
          <div className="card card-no-hover animate-fade-in" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr><th>Title</th><th>Subject</th><th>Grade</th><th>Difficulty</th><th>Enrolled</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {lessons.map(l => (
                    <tr key={l._id}>
                      <td style={{ fontWeight: 600, maxWidth: 250 }}>{l.title}</td>
                      <td><span className="badge badge-primary">{l.subject}</span></td>
                      <td>Grade {l.grade}</td>
                      <td><span className={`badge badge-${l.difficulty === 'beginner' ? 'success' : l.difficulty === 'intermediate' ? 'warning' : 'danger'}`}>{l.difficulty}</span></td>
                      <td>{l.enrolledCount}</td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteLesson(l._id)}>
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Announcements */}
        {activeTab === 'announcements' && (
          <div className="announce-grid animate-fade-in">
            {announcements.map(a => (
              <div key={a._id} className="card ann-admin-card">
                <div className="ann-admin-header">
                  <span className={`badge badge-${a.type === 'success' ? 'success' : a.type === 'warning' ? 'warning' : 'info'}`}>
                    {a.type}
                  </span>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteAnn(a._id)}>
                    <Trash2 size={13} />
                  </button>
                </div>
                <h4 style={{ margin: '8px 0 4px', color: 'var(--text)' }}>{a.title}</h4>
                <p style={{ fontSize: '0.82rem' }}>{a.message}</p>
                {a.author && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 8 }}>By: {a.author.name}</div>}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
