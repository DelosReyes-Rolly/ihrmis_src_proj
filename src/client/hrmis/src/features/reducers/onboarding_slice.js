import { createSlice } from "@reduxjs/toolkit";

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: {
    section: [],
    updateSectionItem: false,
    searchField: "",
    currentTable: null, // 1 - schedule, 2 - appointees
    selectedApplicantIdArray: [],
    selectedApplicantIDschedArray: [],
    selectedScheduleId: null,
    modal: false,
    refreshApi: false,
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
    setCurrentTable: (state, action) => {
      state.currentTable = action.payload;
    },
    setSelectedApplicantIdArray: (state, action) => {
      state.selectedApplicantIdArray = action.payload;
    },
    setSelectedScheduleId: (state, action) => {
      state.selectedScheduleId = action.payload;
    },
    setSelectedApplicantIDschedArray: (state, action) => {
      state.selectedApplicantIDschedArray = action.payload;
    },
    setApplicantNames: (state, action) => {
      state.applicantNames = action.payload;
    },
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setRefreshApi: (state) => {
      state.refreshApi = !state.refreshApi;
    },
  },
});

export const {
  setSection,
  setUpdateSectionItem,
  setSearchField,
  setCurrentTable,
  setSelectedApplicantIdArray,
  setSelectedScheduleId,
  setModal,
  setRefreshApi,
  // setApplicantNames,
} = onboardingSlice.actions;
export default onboardingSlice.reducer;
