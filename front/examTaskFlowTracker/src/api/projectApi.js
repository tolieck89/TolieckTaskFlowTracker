const STORAGE_KEY = 'taskflow_projects';
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getProjects = async () => {
  await delay(300);
  const raw = localStorage.getItem(STORAGE_KEY);
  // console.log('getProjects raw:', raw); 
  const parsed = JSON.parse(raw);
  // console.log(' parsed:', parsed);
  return parsed || [];
};

export const createProject = async (project) => {
  await delay(300);
  const projects = await getProjects();

  const newProject = {
    ...project, 
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
        taskTypes: ['feature', 'bug', 'research'] 

  };

  const updated = [...projects, newProject];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newProject;
};

export const updateProject = async (id, updates) => {
  await delay(300);
  const projects = await getProjects();
  const updated = projects.map(p =>
    p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated.find(p => p.id === id);
};

export const deleteProject = async (id) => {
  await delay(300);
  const projects = await getProjects();
  const filtered = projects.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};