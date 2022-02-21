import { createSlice } from "@reduxjs/toolkit";

export const plantillaItemSlice = createSlice({
  name: "user",
  initialState: {
    plantilla_item: [],
  },
  reducers: {
    setPlantillaItem: (state, action) => {
      state.plantilla_item = action.payload;
    },
  },
});

export const { setPlantillaItem } = plantillaItemSlice.actions;
export default plantillaItemSlice.reducer;
