import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem('token');

export const getProjects = async () => {
  const res = await axios.get(`${API_URL}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const getAuthHeaders = () => {
  const raw = localStorage.getItem('user'); 
  try {
    const parsed = JSON.parse(raw);
    const token = parsed?.token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch (err) {
    console.warn('❌ Failed to parse token from localStorage:', err);
    return {};
  }
};



export const createProject = async (project) => {
  const headers = getAuthHeaders();
  console.log('🔐 Headers:', headers); 
  const res = await axios.post(`${API_URL}/projects`, project, {
    headers,
  });
  return res.data;
};


export const updateProject = async (id, updates) => {
  const res = await axios.put(`${API_URL}/projects/${id}`, updates, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const deleteProject = async (id) => {
await axios.delete(`${API_URL}/projects/${id}`, 
    {
    headers: getAuthHeaders(),
  });
};
