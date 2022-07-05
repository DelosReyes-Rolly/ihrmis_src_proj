import axios from 'axios';
import { API_HOST } from '../../../helpers/global/global_config';

export const educationInputItem = [
	{
		id: '1',
		title: "Bachelor's",
	},
	{
		id: '2',
		title: "Master's",
	},
	{
		id: '3',
		title: 'PhD',
	},
];

export const formOneInput = {
	blood_type: [
		{
			id: 'AB+',
			title: 'AB+',
		},
		{
			id: 'AB-',
			title: 'AB-',
		},
		{
			id: 'A+',
			title: 'A+',
		},
		{
			id: 'A-',
			title: 'A-',
		},
		{
			id: 'B+',
			title: 'B+',
		},
		{
			id: 'B-',
			title: 'B-',
		},
		{
			id: 'O+',
			title: 'O+',
		},
		{
			id: 'O-',
			title: 'O-',
		},
	],

	sex: [
		{
			id: 'M',
			title: 'MALE',
		},
		{
			id: 'F',
			title: 'FEMALE',
		},
	],

	civil_status: [
		{
			id: 'SG',
			title: 'Single',
		},
		{
			id: 'MR',
			title: 'Married',
		},
		{
			id: 'WD',
			title: 'Widowed',
		},
		{
			id: 'SP',
			title: 'Separated',
		},
		{
			id: 'OT',
			title: 'Others',
		},
	],

	dual_citizen_type: [
		{
			id: '0',
			title: 'N/A',
		},
		{
			id: '1',
			title: 'By Birth',
		},
		{
			id: '2',
			title: 'By Naturalization',
		},
	],
};

export const formThreeInput = {
	add_educ_level: [
		{
			id: '0',
			title: 'N/A',
		},
		{
			id: '1',
			title: 'Elementary',
		},
		{
			id: '2',
			title: 'Vocational',
		},
		{
			id: '3',
			title: 'College',
		},
		{
			id: '4',
			title: 'Graduate Studies',
		},
	],
	add_work_grade: [
		{ id: '1', title: '1' },
		{ id: '2', title: '2' },
		{ id: '3', title: '3' },
		{ id: '4', title: '4' },
		{ id: '5', title: '5' },
		{ id: '6', title: '6' },
		{ id: '7', title: '7' },
		{ id: '8', title: '8' },
		{ id: '9', title: '9' },
		{ id: '10', title: '10' },
		{ id: '11', title: '11' },
		{ id: '12', title: '12' },
		{ id: '13', title: '13' },
		{ id: '14', title: '14' },
		{ id: '15', title: '15' },
		{ id: '16', title: '16' },
		{ id: '17', title: '17' },
		{ id: '18', title: '18' },
		{ id: '19', title: '19' },
		{ id: '20', title: '20' },
		{ id: '21', title: '21' },
		{ id: '22', title: '22' },
		{ id: '23', title: '23' },
		{ id: '24', title: '24' },
		{ id: '25', title: '25' },
		{ id: '26', title: '26' },
		{ id: '27', title: '27' },
		{ id: '28', title: '28' },
		{ id: '29', title: '29' },
		{ id: '30', title: '30' },
		{ id: '31', title: '31' },
		{ id: '32', title: '32' },
		{ id: '33', title: '33' },
	],
	add_work_step: [
		{ id: '1', title: '1' },
		{ id: '2', title: '2' },
		{ id: '3', title: '3' },
		{ id: '4', title: '4' },
		{ id: '5', title: '5' },
		{ id: '6', title: '6' },
		{ id: '7', title: '7' },
		{ id: '8', title: '8' },
		{ id: '9', title: '9' },
		{ id: '23', title: '23' },
		{ id: '33', title: '33' },
		{ id: '67', title: '67' },
	],

	add_work_status: [
		{ id: 'PE', title: 'Permanent' },
		{ id: 'PV', title: 'Provisional' },
		{ id: 'TM', title: 'Temporary' },
		{ id: 'SB', title: 'Subtitute' },
		{ id: 'CT', title: 'Co-Terminous' },
		{ id: 'CA', title: 'Casual' },
		{ id: 'CO', title: 'Contractual' },
		{ id: 'JO', title: 'Job Order' },
	],

	add_work_service: [
		{ id: '0', title: 'No' },
		{ id: '1', title: 'Yes' },
	],

	add_training_type: [
		{
			id: 'Managerial',
			title: 'Managerial',
		},
		{
			id: 'Supervisory',
			title: 'Supervisory',
		},
		{
			id: 'Technical',
			title: 'Technical',
		},
		{
			id: 'Quality',
			title: 'Quality',
		},
		{
			id: 'Skills',
			title: 'Skills',
		},
		{
			id: 'Soft Skills',
			title: 'Soft Skills',
		},
		{
			id: 'Professional',
			title: 'Professional',
		},
		{
			id: 'Team',
			title: 'Team',
		},
		{
			id: 'Orientaion',
			title: 'Orientaion',
		},
		{
			id: 'Product',
			title: 'Product',
		},
	],
};

export const categoryInputCategory = [
	{
		id: 'CE',
		title: 'Constitutional Official/Executive',
	},
	{
		id: 'PS',
		title: 'Professional Supervisory',
	},
	{
		id: 'PN',
		title: 'Professional Non-Supervisory',
	},
	{
		id: 'SS',
		title: 'Sub-Professional Supervisory',
	},
	{
		id: 'SN',
		title: 'Sub-Professional Non-Supervisory',
	},
];
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
export const SGType = [
	{
		id: '1',
		title: 'SG 1-9',
	},
	{
		id: '2',
		title: 'SG 10-19',
	},
	{
		id: '3',
		title: 'SG 22-24',
	},
];

