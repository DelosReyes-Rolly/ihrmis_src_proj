import {
	printVacantPositions,
	printNoticeOFVacany,
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
		label: "JVS &CRW",
		link: "#",
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
		label: "Memo on Posting of Vacancy",
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
		link: printNoticeOFVacany,
	},
];
