import { createSlice } from "@reduxjs/toolkit";

const jvscrwSlice = createSlice({
    name: 'jvsform',
    
    initialState: {
        education: [],
        relTraining: [],
        relWorkExp: [],
        dutiesRespon: [],

    },

    reducers: {
        addEducation: (state)=> {
            state.education = [];
        },
        addRelTraining: (state)=> {
            state.relTraining = [];
        },
        addRelWorkExp: (state)=> {
            state.relWorkExp = [];
        },
        addDutiesRespoon: (state) => {
            state.dutiesRespon = []
        },
        addWrittenExam: (state) => {
            state.dutiesRespon = []
        },
        addOralExam: (state) => {
            state.dutiesRespon = []
        },
        addCreativeWork: (state) => {
            state.dutiesRespon = []
        },
        addAnalyticSkill: (state) => {
            state.dutiesRespon = []
        },
        addComputeSkill: (state) => {
            state.dutiesRespon = []
        },
        addOther: (state) => {
            state.dutiesRespon = []
        }
    }
});

export const { setBusy } = jvscrwSlice.actions;
export default loadingSlice.reducer;