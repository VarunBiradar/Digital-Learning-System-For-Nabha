import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLang } from '../contexts/LangContext';
import {
  Home, BookOpen, LayoutDashboard, TrendingUp,
  Users, LogOut, Shield, Globe, Star, Menu, X
} from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { t, toggle, lang } = useLang();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const studentLinks = [
    { to: '/student', icon: <Home size={18} />, label: t('home') },
    { to: '/lessons', icon: <BookOpen size={18} />, label: t('lessons') },
    { to: '/digital-literacy', icon: <Star size={18} />, label: 'Digital Literacy' },
    { to: '/progress', icon: <TrendingUp size={18} />, label: t('progress') },
  ];

  const teacherLinks = [
    { to: '/teacher', icon: <LayoutDashboard size={18} />, label: t('dashboard') },
    { to: '/lessons', icon: <BookOpen size={18} />, label: t('lessons') },
    { to: '/students', icon: <Users size={18} />, label: t('students') },
  ];

  const adminLinks = [
    { to: '/admin', icon: <Shield size={18} />, label: 'Admin Panel' },
    { to: '/lessons', icon: <BookOpen size={18} />, label: t('lessons') },
    { to: '/students', icon: <Users size={18} />, label: 'Users' },
  ];

  const links = user?.role === 'admin' ? adminLinks : user?.role === 'teacher' ? teacherLinks : studentLinks;

  const xpPercent = Math.min((user?.xp % 500) / 5, 100);

  const SidebarContent = () => (
    <div className="sidebar-inner">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">📚</div>
        <div>
          <div className="sidebar-logo-name">{t('appName')}</div>
          <div className="sidebar-logo-tagline">Nabha</div>
        </div>
      </div>

      {/* User Card */}
      {user && (
        <div className="sidebar-user-card">
          <div className="sidebar-avatar">{user.name?.charAt(0).toUpperCase()}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user.name}</div>
            <div className="sidebar-user-role">{user.role} • {user.school?.split(' ')[0]}</div>
          </div>
        </div>
      )}

      {/* XP Bar */}
      {user?.role === 'student' && (
        <div className="sidebar-xp">
          <div className="sidebar-xp-label">
            <Star size={12} /> <span>{user.xp} XP</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill xp-bar" style={{ width: `${xpPercent}%` }} />
          </div>
        </div>
      )}

      <div className="divider" />

      {/* Navigation */}
      <nav className="sidebar-nav">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to !== '/lessons'}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="sidebar-bottom">
        <button className="sidebar-link lang-btn" onClick={toggle}>
          <Globe size={18} />
          <span>{lang === 'en' ? 'ਪੰਜਾਬੀ' : 'English'}</span>
        </button>
        <button className="sidebar-link logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>{t('logout')}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Desktop Sidebar */}
      <aside className="sidebar desktop-sidebar">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
          <aside className="sidebar mobile-sidebar animate-slide-in">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;
