import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData) => {
    
    await new Promise((res) => setTimeout(res, 500));
    return {
      ...projectData,
      id: Date.now(), 
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
.addCase(updateProject.fulfilled, (state, action) => {
  const idx = state.list.findIndex(p => p.id === action.payload.id);
  if (idx !== -1) {
    state.list[idx] = action.payload;
  }
});
  },})


export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId) => {
   
    await new Promise((res) => setTimeout(res, 300));
    return projectId;
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async (projectData) => {
    await new Promise((res) => setTimeout(res, 300));
    return projectData;
  }
);


export default projectsSlice.reducer;
