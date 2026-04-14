import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LangProvider } from './contexts/LangContext';
import ProtectedRoute from './components/ProtectedRoute';

import Landing         from './pages/Landing';
import Login           from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminPanel      from './pages/AdminPanel';
import LessonLibrary   from './pages/LessonLibrary';
import LessonPlayer    from './pages/LessonPlayer';
import Progress        from './pages/Progress';
import DigitalLiteracy from './pages/DigitalLiteracy';

function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/"      element={<Landing />} />
            <Route path="/login" element={<Login />} />

            {/* Student */}
            <Route path="/student" element={
              <ProtectedRoute roles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/progress" element={
              <ProtectedRoute roles={['student']}>
                <Progress />
              </ProtectedRoute>
            } />
            <Route path="/digital-literacy" element={
              <ProtectedRoute roles={['student']}>
                <DigitalLiteracy />
              </ProtectedRoute>
            } />

            {/* Teacher */}
            <Route path="/teacher" element={
              <ProtectedRoute roles={['teacher']}>
                <TeacherDashboard />
              </ProtectedRoute>
            } />

            {/* Admin */}
            <Route path="/admin" element={
              <ProtectedRoute roles={['admin']}>
                <AdminPanel />
              </ProtectedRoute>
            } />

            {/* Shared (all logged-in users) */}
            <Route path="/lessons" element={
              <ProtectedRoute>
                <LessonLibrary />
              </ProtectedRoute>
            } />
            <Route path="/lesson/:id" element={
              <ProtectedRoute>
                <LessonPlayer />
              </ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </LangProvider>
    </BrowserRouter>
  );
}

export default App;
