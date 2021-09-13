import { createSlice } from "@reduxjs/toolkit";

const mobileViewSlice = createSlice({
    name: 'MobileView',
    initialState: {
        sidebar: false
    },
    reducers: {
        openSideBar: (state)=> {
            state.sidebar = !state.sidebar;
        }
    }
});

export const { openSideBar } = mobileViewSlice.actions;
export default mobileViewSlice.reducer;

