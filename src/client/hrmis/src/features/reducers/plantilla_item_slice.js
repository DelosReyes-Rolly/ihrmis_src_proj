import { createSlice } from "@reduxjs/toolkit";

export const plantillaItemSlice = createSlice({
	name: "user",
	initialState: {
		plantilla_items: [],
		next_rank: false,
		context_menu: false,
		rank_email: false,
		next_rank_list: [],
		email_recepients: "",
		select_agency: false,
		selected_agency_rank: null,
		notify_office: false,
		selected_agency: [],
		item_id: null,
		emailtemplate_data: null,
		selected_employee: [],
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
			const emailArr = action.payload;
			state.email_recepients = emailArr?.join(", ");
			// console.log(state.email_recepients);
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
			// console.log(payload);
		},

		setItemID: (state, action) => {
			const { payload } = action;
			state.item_id = payload;
			// console.log(state.item_id);
		},

		setVcEmailTemplateData: (state, action) => {
			state.emailtemplate_data = action.payload;
			// console.log(state.selected_plantilla);
		},

		setSelectedPlantillaItems: (state, action) => {
			const { payload } = action;
			state.plantilla_items = payload;
			// console.log(state.plantilla_items);
		},

		setSelectedAgencyRank: (state, action) => {
			const { payload } = action;
			state.selected_agency_rank = payload;
			// console.log(state.selected_agency_rank);
		},

		setSelectedEmployee: (state, action) => {
			const { payload } = action;
			state.selected_employee = payload;
			// console.log(state.selected_agency_rank);
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
	setItemID,
	setVcEmailTemplateData,
	setSelectedPlantillaItems,
	setSelectedAgencyRank,
	setSelectedEmployee,
} = plantillaItemSlice.actions;

export default plantillaItemSlice.reducer;
