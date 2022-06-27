import axios from "axios";
import { API_HOST } from "../../../../helpers/global/global_config";

export const GroupClusterData = [
	{
		id: 'RP',
		title: 'Recruitment, Selection, and Placement (RSP)',
	},
	{
		id: 'PM',
		title: 'Performance Management (PM)',
	},
	{
		id: 'LD',
		title: 'Learning and Development (LD)',
	},
	{
		id: 'RR',
		title: 'Rewards and Recognition (RR)',
	},
	{
		id: 'OT',
		title: 'Other',
	},
];
export const getDocumentGroup = async () => {
	let groups = [];
	await axios
		.get(API_HOST + 'documentary-requirements')
		.then((response) => {
			response.data.data.foreach((data) => {
				let obj = {};
				obj['id'] = data.category.grp_id;
				obj['title'] = data.category.grp_name;
				groups.push(obj);
			});
		})
		.catch((error) => {});
	return groups;
};