export const selectTasks = state => state.tasks.list;

export const selectTasksByProjectId = (projectId) => (state) =>
  state.tasks.list.filter(task => task.projectId === projectId);
