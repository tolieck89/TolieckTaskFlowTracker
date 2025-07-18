import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers, addUser, updateUser, deleteUser } from '../../api/usersApi';

const initialState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const users = await getAllUsers();
    return users;
  }
);

export const addNewUser = createAsyncThunk(
  'users/addNewUser',
  async (user) => {
    const created = await addUser(user);
    return created;
  }
);

export const updateUserData = createAsyncThunk(
  'users/updateUserData',
  async ({ id, updatedData }) => {
    const updated = await updateUser(id, updatedData);
    return updated;
  }
);

export const deleteUserById = createAsyncThunk(
  'users/deleteUserById',
  async (id) => {
    await deleteUser(id);
    return id;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUserRole(state, action) {
      const { id, role } = action.payload;
      const user = state.list.find((u) => u.id === id);
      if (user) user.role = role;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
         state.list.push(action.payload);
})
      .addCase(updateUserData.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.list.findIndex((u) => u.id === updated.id);
        if (index !== -1) {
          state.list[index] = updated;
        }
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        const id = action.payload;
        state.list = state.list.filter((u) => u.id !== id);
      })
      
      .addCase(addNewUser.pending, (state) => {
         state.loading = true;
      })
  },
});

export const { updateUserRole } = userSlice.actions;
export const selectUsers = (state) => state.users.list;
export default userSlice.reducer;
