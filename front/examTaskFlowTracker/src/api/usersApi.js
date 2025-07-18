import { SUPERADMIN_EMAIL } from '../constants/roles';

const STORAGE_KEY = "taskflow_users";

export const getAllUsers = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const addUser = (user) => {
  const users = getAllUsers();
  const newUser = { ...user, id: crypto.randomUUID() }; 
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...users, newUser]));
  return newUser;
};

export const updateUser = (id, updatedData) => {
  const users = getAllUsers();
  const updatedUsers = users.map((u) => (u.id === id ? { ...u, ...updatedData } : u));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
  return updatedUsers.find((u) => u.id === id);
};

export const deleteUser = (id) => {
  const users = getAllUsers();
  const filtered = users.filter((u) => u.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const initSuperadmin = () => {
  const users = getAllUsers();
  const exists = users.find((u) => u.email === SUPERADMIN_EMAIL);
  if (!exists) {
    addUser({
      id: '0',
      name: 'Суперадмін',
      email: SUPERADMIN_EMAIL,
      password: 'admin', 
      role: 'admin',
    });
  }
};
