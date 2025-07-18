import { createSelector } from '@reduxjs/toolkit';

export const selectTasks = (state) => state.tasks.list;

export const selectTasksByProjectId = createSelector(
  [selectTasks, (_, projectId) => projectId],
  (tasks, projectId) => tasks.filter((t) => t.projectId === projectId)
);
