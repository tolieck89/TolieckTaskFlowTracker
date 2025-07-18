import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as projectApi from '../../api/projectApi';

export const fetchProjects = createAsyncThunk('projects/fetch', async () => {
  return await projectApi.getProjects();
});

export const addProject = createAsyncThunk('projects/add', async (task) => {
  return await projectApi.createProject(task);
});

export const editProject = createAsyncThunk('projects/edit', async ({ id, updates }) => {
  return await projectApi.updateProject(id, updates);
});

export const removeProject= createAsyncThunk('projects/remove', async (id) => {
  await projectApi.deleteProject(id);
  return id;
});

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
          // console.log('📦 fulfilled payload', action.payload);

        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addProject.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(editProject.fulfilled, (state, action) => {
        const idx = state.list.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })

      .addCase(removeProject.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      });
  },
});

export default projectSlice.reducer;
