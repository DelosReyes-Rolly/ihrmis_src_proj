import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: undefined,
    employee_list: [],
  },
  reducers: {
    setEmployee: (state, action) => {
      state.employee = action.payload;
    },
  },
});

export const { setEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
