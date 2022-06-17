import { createSlice } from "@reduxjs/toolkit";
import { implodeArray } from "../../helpers/explode_implode";

export const plantillaItemSlice = createSlice({
	name: "user",
	initialState: {
		plantilla_item: [],
		next_rank: false,
		context_menu: false,
		rank_email: false,
		next_rank_list: [],
		email_recepients: "",
		select_agency: false,
		notify_office: false,
		selected_agency: [],
	},
	reducers: {
		setNextRank: (state) => {
			state.next_rank = !state.next_rank;
		},

		setContextMenu: (state) => {
			state.context_menu = !state.context_menu;
		},

		setRankEmail: (state) => {
			state.rank_email = !state.rank_email;
		},

		setNextRankList: (state, action) => {
			state.next_rank_list = [...action.payload];
		},

		setEmailRecepients: (state, action) => {
			console.log(action);
			let emailArr = action.payload;
			state.email_recepients = implodeArray(", ", emailArr);
			console.log(state.email_recepients);
		},

		setSelectAgency: (state) => {
			state.select_agency = !state.select_agency;
		},

		setNotifyOffice: (state) => {
			state.notify_office = !state.notify_office;
		},

		setSelectedAgency: (state, action) => {
			const { payload } = action;
			state.selected_agency = payload;
		},
	},
});

export const {
	setContextMenu,
	setNextRank,
	setRankEmail,
	setNextRankList,
	setEmailRecepients,
	setSelectAgency,
	setNotifyOffice,
	setSelectedAgency,
} = plantillaItemSlice.actions;

export default plantillaItemSlice.reducer;
