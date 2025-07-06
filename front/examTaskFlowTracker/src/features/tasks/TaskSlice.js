import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
      name: 'tasks',
      initialState: {
        list: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
      },
      reducers: {},
      extraReducers: (builder) => {
        builder
          .addCase(createTask.pending, (state) => {
            state.status = 'loading';
          })
})