import { createSelector } from '@reduxjs/toolkit';

export const selectTasks = (state) => state.tasks.list;

export const selectTasksByProjectId = (projectId) =>
  createSelector([selectTasks], (tasks) =>
    tasks.filter((task) => task.projectId === projectId)
  );
