import { createSlice } from "@reduxjs/toolkit";

export const plantillaItemSlice = createSlice({
  name: "user",
  initialState: {
    plantilla_item: [],
    selectAgency: false,
  },
  reducers: {
    // setPlantillaItem: (state, action) => {
    //   state.plantilla_item = action.payload;
    // },
    setSelectAgency: (state) => {
      state.selectAgency = !state.selectAgency;
    },
  },
});

export const { setSelectAgency } = plantillaItemSlice.actions;
export default plantillaItemSlice.reducer;
