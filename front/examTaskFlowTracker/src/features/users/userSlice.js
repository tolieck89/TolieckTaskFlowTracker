import {createSlice} from '@reduxjs/toolkit';


const initialState = {
  list: [
    { id: '1', name: 'Марія', email: 'maria@flow.ua', role: 'user' },
    { id: '2', name: 'Петро', email: 'petro@flow.ua', role: 'watcher' },
    { id: '3', name: 'Admin', email: 'you@taskflow.ua', role: 'admin' }, 
  ],
};

const userSlice = createSlice({
    name:'users',
    initialState,
    reducers: {
        updateUserRole(state, action){
            const {id, role} = action.payload;
            const user = state.list.find((u) => u.id === id);
            if(user) user.role = role;
        }, 
    }, 
});

export const {updateUserRole} = userSlice.actions;
export default userSlice.reducer;