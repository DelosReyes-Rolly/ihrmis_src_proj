import { createSlice } from "@reduxjs/toolkit";

const popupResponseSlice = createSlice({
  name: "popupResponse",
  initialState: {
    isBusy: false,
    isSuccess: false,
    isFail: false,
    message: {
      title: "",
      content: "",
    },
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
    setMessage: (state, action) => {
      const { title, content } = action.payload;
      state.message = { title, content };
    },
  },
});

export const { setBusy, setSuccess, setFail, setMessage } =
  popupResponseSlice.actions;
export default popupResponseSlice.reducer;
