import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  signup: async (name, email, password) => {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
  },
};

// Blog API
export const blogAPI = {
  getAll: async () => {
    const response = await api.get('/blogs');
    return response.data;
  },
  
  getOne: async (id) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },
  
  create: async (blog) => {
    const response = await api.post('/blogs', blog);
    return response.data;
  },
  
  update: async (id, blog) => {
    const response = await api.put(`/blogs/${id}`, blog);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  },
  
  like: async (id) => {
    const response = await api.post(`/blogs/${id}/like`);
    return response.data;
  },
  
  addComment: async (id, text) => {
    const response = await api.post(`/blogs/${id}/comments`, { text });
    return response.data;
  },
  
  getUserBlogs: async () => {
    const response = await api.get('/user/blogs');
    return response.data;
  },
};

export default api;