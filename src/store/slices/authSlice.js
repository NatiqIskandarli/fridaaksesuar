import { createSlice } from "@reduxjs/toolkit";
import { UserLists } from "@/data/Users";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: false,
        userData: {},
        userid : 0
    },
    reducers: {
        logIn(state, action) {
            const findUser = UserLists.filter(user => user.email === action.payload);
            if (findUser.length) {
                state.userData = findUser[0];
                state.login = true;
            } 
        },
        DaxilOl(state, action){
            state.userid = action.payload
        }
    }
});

export const { logIn,DaxilOl } = authSlice.actions;

export default authSlice.reducer;



