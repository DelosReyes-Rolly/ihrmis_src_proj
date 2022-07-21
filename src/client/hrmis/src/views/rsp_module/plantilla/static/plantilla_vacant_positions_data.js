import {
	printVacantPositions,
	printNoticeOfVacancy,
} from "../../../../router/outside_routes";

/**
 *  tableHeaderColumnName
 *  @description static data
 */
export const tableHeaderColumnName = [
	{
		Header: "Item ID.",
		accessor: "itm_id", // accessor is the "key" in the data
	},
	{
		Header: "Item No.",
		accessor: "itm_no", // accessor is the "key" in the data
	},
	{
		Header: "Position",
		accessor: "pos_title",
	},
	{
		Header: "Office",
		accessor: "ofc_acronym",
	},
	{
		Header: "Agency ID",
		accessor: "ofc_agn_id",
	},
	{
		Header: "Status",
		accessor: "itm_status",
	},
	{
		Header: "Category",
		accessor: "pos_category",
	},
	{
		Header: "Item State",
		accessor: "itm_state",
	},
	{
		Header: "Agency Email",
		accessor: "agn_head_email",
	},
	{
		Header: "Is Notify",
		accessor: "is_notify",
	},
];

//Initialized or assigned menu items and links
export const plantillaItemsVacantPosMenuItems = [
	{
		id: 1,
		label: "Notify Office",
		link: "#",
	},
	{
		id: 2,
		label: "Next-in-rank",
		link: "#",
	},
	{
		id: 3,
		label: "JVS & CRW",
		link: "/jvs-crw/",
	},
	{
		id: 4,
		label: "History",
		link: "#",
	},
];

export const plantillaItemsReportsMenuItems = [
	{
		id: 1,
		label: "Memo on Posting of Posting of Announcement of Vacancy",
		link: "#",
	},
	{
		id: 2,
		label: "DOST-CO Vacant Position",
		link: printVacantPositions,
	},
	{
		id: 3,
		label: "Notice of Vacancy",
		link: printNoticeOfVacancy,
	},
];

export const EMPLOYEE_DROPDOWN = [
	{
		id: 1,
		label: "PDS",
		link: "/rsp/plantilla/employee/:item",
	},
	{
		id: 2,
		label: "DTR",
		link: "#",
	},
	{
		id: 3,
		label: "Remarks",
		link: "#",
	},
];

export const memoOnPostingOfVacancyItemList = [
	{
		id: 1,
		label: "To DOST Agencies",
		link: true,
	},
	{
		id: 2,
		label: "To CSC",
		link: printVacantPositions,
	},
];
