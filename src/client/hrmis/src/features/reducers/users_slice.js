import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userRank: 'employee'
    },
    reducers: {
        changeUser: (state) => {
            if( state.userRank === 'employee'){
                state.userRank = 'online';
            } else {
                state.userRank = 'employee';
            }
        }
    }
});

export const { changeUser } = userSlice.actions;
export default userSlice.reducer;