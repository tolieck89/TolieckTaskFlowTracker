import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authApi from '../../api/authApi.js';

let parsedUser = null;
try {
  const raw = localStorage.getItem('user');
  parsedUser = raw ? JSON.parse(raw) : null;
} catch (err) {
  console.error("❌ Помилка парсу user з localStorage:", err);
  localStorage.removeItem('user'); 
}

const initialState = {
  user: parsedUser,
  isAuthenticated: !!parsedUser,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    updateUser(state, action) {
      state.user = {
        ...state.user,
        ...action.payload,
      };
      localStorage.setItem('user', JSON.stringify(state.user));
    }
  },
  extraReducers: (builder) => {
    builder

    .addCase(loginUser.fulfilled, (state, action) => {
  state.user = action.payload;
  state.isAuthenticated = true;
  localStorage.setItem('user', JSON.stringify(action.payload)); 
})




  }
});

export const loginUser = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const response = await authApi.login(data.email, data.password);

    const fullUserData = {
      token: response.token,
      ...response.user,
    };

    localStorage.setItem('user', JSON.stringify(fullUserData));

    return fullUserData;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});



export const registerUser = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    const response = await authApi.register(data);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});



export const { logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
