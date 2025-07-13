import {createSlice} from '@reduxjs/toolkit';


const initialState = {
  list: [
    { id: '1', name: 'Кішечка', email: 'kitty@flow.ua', role: 'user' },
    { id: '2', name: 'Вовк в овечій шкурі', email: 'zhopa@flow.ua', role: 'admin' },
    { id: '3', name: 'Циганка', email: 'Gypsy@flow.ua', role: 'user' },
    { id: '4', name: 'Хабалка', email: 'inktank@flow.ua', role: 'admin' },
    { id: '5', name: 'Admin', email: 'you@taskflow.ua', role: 'admin' }, 
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