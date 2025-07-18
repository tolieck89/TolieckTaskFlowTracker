import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as tasksApi from '../../api/tasksApi';

export const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
  return await tasksApi.getTasks();
});

export const addTask = createAsyncThunk('tasks/add', async (task) => {
  return await tasksApi.createTask(task);
});

export const editTask = createAsyncThunk('tasks/edit', async ({ id, updates }) => {
  return await tasksApi.updateTask(id, updates);
});

export const removeTask = createAsyncThunk('tasks/remove', async (id) => {
  await tasksApi.deleteTask(id);
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addTask.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(editTask.fulfilled, (state, action) => {
        const idx = state.list.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })

      .addCase(removeTask.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t.id !== action.payload);
      })



      
  },
});

export default tasksSlice.reducer;
