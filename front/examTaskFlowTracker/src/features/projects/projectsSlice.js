import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Це — симуляція запиту до бекенду
export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData) => {
    // Поки що просто фейковий delay
    await new Promise((res) => setTimeout(res, 500));
    return {
      ...projectData,
      id: Date.now(), // тимчасовий ID, потім буде з сервера
      createdAt: new Date().toISOString(),
    };
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    list: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
  state.list = state.list.filter((project) => project.id !== action.payload);
})
  },})


export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId) => {
    // тут буде справжній API-запит, поки просто заглушка
    await new Promise((res) => setTimeout(res, 300));
    return projectId;
  }
);

export default projectsSlice.reducer;
