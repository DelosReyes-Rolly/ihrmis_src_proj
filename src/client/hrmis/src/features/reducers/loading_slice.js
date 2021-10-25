import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: 'load',
    initialState: {
        isBusy: false
    },
    reducers: {
        setBusy: (state, action)=> {
            state.isBusy = action.payload;
        }
    }
});

export const { setBusy } = loadingSlice.actions;
export default loadingSlice.reducer;

