import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  link: string;
  techStack: string[];
  category: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface TechStack {
  _id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'other';
  icon: string;
  color: string;
  description: string;
  logoUrl: string;
  officialWebsite: string;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Email {
  _id: string;
  from: string;
  name: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  replyMessage?: string;
  repliedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Admin {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
};

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get('/projects');
    return response.data.projects || response.data;
  },
  getById: async (id: string): Promise<Project> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
  create: async (project: Omit<Project, '_id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
    const response = await api.post('/projects', project);
    return response.data;
  },
  update: async (id: string, project: Partial<Project>): Promise<Project> => {
    const response = await api.put(`/projects/${id}`, project);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};

export const techStackApi = {
  getAll: async (includeHidden = false): Promise<TechStack[]> => {
    const params = includeHidden ? { includeHidden: 'true' } : {};
    const response = await api.get('/techstack', { params });
    return response.data.techStack || response.data;
  },
  getById: async (id: string): Promise<TechStack> => {
    const response = await api.get(`/techstack/${id}`);
    return response.data;
  },
  create: async (item: Omit<TechStack, '_id' | 'createdAt' | 'updatedAt'>): Promise<TechStack> => {
    const response = await api.post('/techstack', item);
    return response.data;
  },
  update: async (id: string, item: Partial<TechStack>): Promise<TechStack> => {
    const response = await api.put(`/techstack/${id}`, item);
    return response.data;
  },
  toggleVisibility: async (id: string): Promise<TechStack> => {
    const response = await api.put(`/techstack/${id}/toggle-visibility`);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/techstack/${id}`);
  },
};

export const emailsApi = {
  getAll: async (): Promise<Email[]> => {
    const response = await api.get('/emails');
    return response.data.emails || response.data;
  },
  getById: async (id: string): Promise<Email> => {
    const response = await api.get(`/emails/${id}`);
    return response.data;
  },
  create: async (email: Omit<Email, '_id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Email> => {
    const response = await api.post('/emails', email);
    return response.data;
  },
  updateStatus: async (id: string, status: Email['status']): Promise<Email> => {
    const response = await api.put(`/emails/${id}/status`, { status });
    return response.data;
  },
  reply: async (id: string, replyMessage: string): Promise<void> => {
    await api.post(`/emails/${id}/reply`, { replyMessage });
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/emails/${id}`);
  },
};

export default api;