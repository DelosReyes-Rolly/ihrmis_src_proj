import { createSlice } from "@reduxjs/toolkit";

const jvscrwFormSlice = createSlice({
  name: "jvscrw_form",
  initialState: {
    jvsId: "",
    version: "",
    education: {
      comp_type: "ED",
      comp_specific: "",
      competencies: [],
    },
    training: {
      comp_type: "TR",
      comp_specific: "",
      competencies: [],
    },
    experience: {
      comp_type: "EX",
      comp_specific: "",
      competencies: [],
    },
  },
  reducers: {
    setCompEducation: (state, actions) => {
      /**
       * IF TYPE IS 0 REBASE ELSE ADD ONE IN ARRAY
       */
      const { type, data } = actions.payload;
      if (type === 2) {
      }
      if (type === 1) {
        state.education = {
          ...state.education,
          competencies: [...state.education.competencies, data],
        };
      }
      if (type === 0) {
        state.education = { ...data };
      }
    },
    setCompTraining: (state, actions) => {
      /**
       * IF TYPE IS 0 REBASE; IF TYPE IS 2 EDIT ARRAY, ELSE ADD ONE IN ARRAY
       */
      const { type, data } = actions.payload;

      if (type === 2) {
        state.training = {
          ...state.training,
          competencies: [...data],
        };
      }
      if (type === 1) {
        state.training = {
          ...state.training,
          competencies: [...state.training.competencies, data],
        };
      }
      if (type === 0) {
        state.training = { ...data };
      }
    },
    setCompExperience: (state, actions) => {
      /**
       * IF TYPE IS 0 REBASE ELSE ADD ONE IN ARRAY
       */
      const { type, data } = actions.payload;
      if (type === 2) {
      }
      if (type === 1) {
        state.experience = {
          ...state.experience,
          competencies: [...state.experience.competencies, data],
        };
      }
      if (type === 0) {
        state.experience = [...data];
      }
    },
  },
});

export const { setCompEducation, setCompExperience, setCompTraining } =
  jvscrwFormSlice.actions;

export default jvscrwFormSlice.reducer;
