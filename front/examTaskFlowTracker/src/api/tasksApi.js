const BASE_URL = 'http://localhost:3000/api/tasks';

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user')); 
  return user?.token;
};


export const getTasks = async () => {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error('Не вдалося завантажити задачі');
  return await res.json();
};

export const createTask = async (task) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Помилка при створенні задачі');
  return await res.json();
};

export const updateTask = async (id, updates) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Помилка при оновленні задачі');
  return await res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error('Помилка при видаленні задачі');
};
