
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    createTask: (state, action) => {
      const task = {
        ...action.payload,
        id: crypto.randomUUID(), 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.list.push(task);
    },
    updateTask: (state, action) => {
      const { id, ...changes } = action.payload;
      const task = state.list.find(t => t.id === id);
      if (task) {
        Object.assign(task, changes);
        task.updatedAt = new Date().toISOString();
      }
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter(t => t.id !== action.payload);
    },
  },
});

export const { createTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
