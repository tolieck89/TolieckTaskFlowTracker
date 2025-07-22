import { SUPERADMIN_EMAIL } from '../constants/roles';
const STORAGE_KEY = "taskflow_users";

export const deleteUser = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error('Не вдалося видалити користувача');
};
export const getAllUsers = async () => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const response = await fetch('http://localhost:3000/api/users', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Не вдалося завантажити користувачів');
  }

  return await response.json(); // <-- повертає масив юзерів
};

export const addUser = async (user) => {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) throw new Error('Помилка при створенні користувача');

  return await response.json();
};

export const updateUser = async (id, updatedData) => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const response = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error('Помилка при оновленні користувача');
  }

  return await response.json();
};




