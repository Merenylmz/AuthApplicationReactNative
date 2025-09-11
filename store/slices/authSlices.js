import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    user: {}
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action)=>{
            state = action.payload
        },
        logout: (state, action)=>{
            state = initialState
        }  
    },

});

export default authSlice.reducer;
export const login = authSlice.actions.login;
export const logout = authSlice.actions.logout;
