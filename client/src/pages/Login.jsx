import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLang } from '../contexts/LangContext';
import { login } from '../services/api';
import { BookOpen, Eye, EyeOff, Globe, AlertCircle } from 'lucide-react';
import './Login.css';

const Login = () => {
  const { loginUser } = useAuth();
  const { t, toggle, lang } = useLang();
  const navigate = useNavigate();

  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const demoCredentials = {
    student: { email: 'student1@learning.com', password: 'password123' },
    teacher: { email: 'teacher@learning.com', password: 'password123' },
    admin:   { email: 'admin@learning.com',   password: 'password123' },
  };

  const fillDemo = () => {
    const creds = demoCredentials[role];
    setEmail(creds.email);
    setPassword(creds.password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login({ email, password });
      loginUser(res.data.token, res.data.user);
      const r = res.data.user.role;
      navigate(r === 'admin' ? '/admin' : r === 'teacher' ? '/teacher' : '/student');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="gradient-orb orb-1" />
      <div className="gradient-orb orb-2" />

      <div className="login-container animate-fade-in-up">
        {/* Header */}
        <div className="login-header">
          <Link to="/" className="login-logo">
            <BookOpen size={28} />
            <span>{t('appName')}</span>
          </Link>
          <button className="btn btn-ghost btn-sm" onClick={toggle}>
            <Globe size={14} /> {lang === 'en' ? 'ਪੰਜਾਬੀ' : 'English'}
          </button>
        </div>

        <div className="login-card card card-no-hover">
          <h2 className="login-title">{t('login')}</h2>
          <p className="login-subtitle">Welcome back to Learning Platform</p>

          {/* Role selector */}
          <div className="role-selector">
            {['student', 'teacher', 'admin'].map(r => (
              <button
                key={r}
                className={`role-btn ${role === r ? 'active' : ''}`}
                onClick={() => { setRole(r); setEmail(''); setPassword(''); setError(''); }}
              >
                {r === 'student' ? '🧑‍🎓' : r === 'teacher' ? '👩‍🏫' : '🛡️'}
                <span>{r.charAt(0).toUpperCase() + r.slice(1)}</span>
              </button>
            ))}
          </div>

          {/* Demo fill */}
          <button className="demo-fill-btn" onClick={fillDemo}>
            ✨ Use demo {role} credentials
          </button>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="alert alert-danger flex items-center gap-sm">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="pw-wrapper">
                <input
                  type={showPw ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
              {loading ? <span className="spinner" style={{width:18,height:18,borderWidth:2}} /> : null}
              {loading ? 'Logging in...' : t('login')}
            </button>
          </form>

          <p className="login-note">
            All demo accounts use password: <code>password123</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
