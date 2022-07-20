import { createSlice } from "@reduxjs/toolkit";

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: {
    section: [],
    updateSectionItem: false,
    searchField: "",
  },
  reducers: {
    setSection: (state, action) => {
      state.section = action.payload;
    },
    setUpdateSectionItem: (state) => {
      state.updateSectionItem = !state.updateSectionItem;
    },
    setSearchField: (state, action) => {
      state.searchField = action.payload;
    },
  },
});

export const { setSection, setUpdateSectionItem, setSearchField } =
  onboardingSlice.actions;
export default onboardingSlice.reducer;
