import { createSlice } from "@reduxjs/toolkit";

export const plantillaItemSlice = createSlice({
  name: "user",
  initialState: {
    plantilla_item: [],
    next_rank: false,
    select_agency: false,
    rank_email: false,
  },
  reducers: {
    setNextRank: (state) => {
      state.next_rank = !state.next_rank;
    },

    setSelectAgency: (state) => {
      state.select_agency = !state.select_agency;
    },

    setRankEmail: (state) => {
      state.rank_email = !state.rank_email;
    },
  },
});

export const { setSelectAgency, setNextRank, setRankEmail } = plantillaItemSlice.actions;
export default plantillaItemSlice.reducer;
