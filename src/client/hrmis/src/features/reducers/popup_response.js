import { createSlice } from "@reduxjs/toolkit";

const popupResponseSlice = createSlice({
  name: "popupResponse",
  initialState: {
    isBusy: false,
    isSuccess: false,
    isFail: false,
    contents: {},
    body: "",
  },
  reducers: {
    setBusy: (state, action) => {
      state.isBusy = action.payload;
    },
    setSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    setFail: (state, action) => {
      state.isFail = action.payload;
    },
    setContent: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setBusy, setSuccess, setFail } = popupResponseSlice.actions;
export default popupResponseSlice.reducer;
