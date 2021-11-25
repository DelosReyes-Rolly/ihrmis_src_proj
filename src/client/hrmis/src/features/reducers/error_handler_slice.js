import { createSlice } from "@reduxjs/toolkit";

const errorHandlerSlice = createSlice({
  name: "error",
  initialState: {
    objectError: undefined,
    messageError: undefined,
  },
  reducers: {
    setObjectError: (state, action) => {
      state.objectError = action.payload;
    },
    setMessageError: (state, action) => {
      state.messageError = action.payload;
    },
  },
});

export const { setObjectError, setMessageError } = errorHandlerSlice.actions;
export default errorHandlerSlice.reducer;
