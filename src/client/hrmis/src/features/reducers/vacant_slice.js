import { createSlice } from "@reduxjs/toolkit";

const vacantSlice = createSlice({
  name: "vacant",
  initialState: {
    count: 0,
    anotherState: 0,
  },
  reducers: {
    addCount: (state) => {
      state.count++;
    },
    
  },
});

export const { addCount } = vacantSlice.actions;
export default vacantSlice.reducer;
