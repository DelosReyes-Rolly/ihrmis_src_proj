export const recrutmentTableHeaders = [
	{
		Header: '',
		accessor: 'app_id',
	},
	{
		Header: '',
		accessor: 'app_email',
	},
	{
		Header: 'Name',
		accessor: 'app_name',
	},
	{
		Header: 'Profile',
		accessor: 'app_profile',
	},
	{
		Header: 'Qualifications',
		accessor: 'app_qualifications',
	},
	{
		Header: 'Position Applied',
		accessor: 'pos_applied',
	},
	{
		Header: 'Status',
		accessor: 'sts_App_remarks',
	},
];
export const recruitmentCMHeaders = [
	{
		Header: ' ',
		columns: [
			{
				Header: ' ',
				accessor: 'app_id',
			},
			{
				Header: 'No.',
				accessor: 'no',
			},
			{
				Header: 'Name & Sex',
				accessor: 'applicant_name',
			},
			{
				Header: 'Eligibility',
				accessor: 'elig',
			},
		],
	},
	{
		Header: 'END - USER',
		columns: [
			{
				Header: 'Edctn - 10%',
				accessor: 'edu',
			},
			{
				Header: 'Exprnce - 15%',
				accessor: 'exp',
			},
			{
				Header: 'Trnng 10%',
				accessor: 'trn',
			},
			{
				Header: 'Cmptncy - 30%',
				accessor: 'cmptncy',
			},
			{
				Header: 'Sub - Total',
				accessor: 'subtotal',
			},
		],
	},
	{
		Header: 'HRMPSB',
		columns: [
			{
				Header: 'Attrbts - 25%',
				accessor: 'attrbts',
			},
			{
				Header: 'Accom. - 5%',
				accessor: 'accom',
			},
			{
				Header: 'Prfrmnce - 5%',
				accessor: 'perfor',
			},
			{
				Header: 'Sub - Total',
				accessor: 'subtotal2',
			},
			{
				Header: 'TOTAL 100%',
				accessor: 'total',
			},
		],
	},
];
export const recruitmentEligbilities = [
	'No Eligibility',
	'Professional',
	'Sub-professional',
	'Board / Bar',
	'Barangay Health Worker',
	'Barangay Official',
	'Barangay Nutrition Scholar',
	'Electronic Data Processing Specialist (EDPS)',
	'Honor Graduate',
	'Foreign School Honor Graduate',
	'Scientific and Technological Specialist',
	'Veteran Preference Rating',
	'Sanggunian Member',
	'Skill Eligibility',
];
