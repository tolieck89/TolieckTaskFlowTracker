const STORAGE_KEY = 'taskflow_tasks';
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getTasks = async () => {
  await delay(300);
  const raw = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(raw) || [];
};

export const createTask = async (task) => {
  await delay(300);
  const tasks = await getTasks();
  const newTask = {
    ...task,
  id: crypto.randomUUID(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  };
  const updated = [...tasks, newTask];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newTask;
};

export const updateTask = async (id, updates) => {
  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const idx = tasks.findIndex(t => t.id === id);
  if (idx !== -1) {
    tasks[idx] = { ...tasks[idx], ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem((STORAGE_KEY), JSON.stringify(tasks));
    return tasks[idx]; 
  }
  throw new Error('Задачу не знайдено');
};

export const deleteTask = async (id) => {
  await delay(300);
  const tasks = await getTasks();
  const filtered = tasks.filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

