import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: 'load',
    initialState: {
        isBusy: false
    },
    reducers: {
        setBusy: (state)=> {
            state.isBusy = !state.isBusy;
        }
    }
});

export const { setBusy } = loadingSlice.actions;
export default loadingSlice.reducer;

