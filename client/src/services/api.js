import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

const API = axios.create({ baseURL: BASE_URL });

// Auto-attach JWT token
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const getMe = () => API.get('/auth/me');

// Lessons
export const getLessons = (params) => API.get('/lessons', { params });
export const getLesson = (id) => API.get(`/lessons/${id}`);
export const createLesson = (data) => API.post('/lessons', data);
export const updateLesson = (id, data) => API.put(`/lessons/${id}`, data);
export const deleteLesson = (id) => API.delete(`/lessons/${id}`);

// Progress
export const getMyProgress = () => API.get('/progress/my');
export const saveProgress = (lessonId, data) => API.post(`/progress/${lessonId}`, data);
export const getProgressStats = () => API.get('/progress/stats');
export const getStudentProgress = () => API.get('/progress/students');

// Users
export const getUsers = () => API.get('/users');
export const getStudents = () => API.get('/users/students');
export const getUserStats = () => API.get('/users/stats');
export const deleteUser = (id) => API.delete(`/users/${id}`);

// Announcements
export const getAnnouncements = () => API.get('/announcements');
export const createAnnouncement = (data) => API.post('/announcements', data);
export const deleteAnnouncement = (id) => API.delete(`/announcements/${id}`);

export default API;
