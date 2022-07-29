import { createSlice } from "@reduxjs/toolkit";

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: {
    section: [],
    updateSectionItem: false,
    searchField: "",
    currentTable: null, //0 - selected the schedule table, 1 - selected the appointees table
    selectedSched: null, //
    selectedAppointees: [],
    scheduleInformation: [],
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
    setSelectedSched: (state, action) => {
      state.currentTable = 0;
      state.selectedAppointees = [];
      state.selectedSched = action.payload;
    },
    setSelectedAppointees: (state, action) => {
      if (state.currentTable === 0) {
        state.currentTable = 1;
        state.selectedSched = null;
        state.selectedAppointees = [];
      }

      const arrHolder = [...state.selectedAppointees];
      if (arrHolder.includes(action.payload)) {
        const index = arrHolder.indexOf(action.payload);
        if (index > -1) arrHolder.splice(index, 1);
        state.selectedAppointees = [...arrHolder];
      } else {
        state.selectedAppointees = [...arrHolder, action.payload];
      }
    },
    setSelectedAppointeesArray: (state, action) => {
      console.log(action.payload);
      const stringHolder = action.payload;
      const arrHolder = [...stringHolder.toString().split("|")];
      const arrValue = [];

      for (let i = 0; i < arrHolder.length; i++) {
        if (i > 0) arrValue.push(arrHolder[i]);
      }
      state.selectedAppointees = [...arrValue];
    },
    setSCheduleInformation: (state, action) => {
      state.scheduleInformation = action.payload;
    },
  },
});

export const {
  setSection,
  setUpdateSectionItem,
  setSearchField,
  setSelectedAppointees,
  setSelectedSched,
  setSelectedAppointeesArray,
  setSCheduleInformation,
} = onboardingSlice.actions;
export default onboardingSlice.reducer;
