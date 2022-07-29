export const recrutmentTableHeaders = [
	{
		Header: "",
		accessor: "app_id",
	},
	{
		Header: "",
		accessor: "app_email",
	},
	{
		Header: "Name",
		accessor: "app_name",
	},
	{
		Header: "Profile",
		accessor: "app_profile",
	},
	{
		Header: "Qualifications",
		accessor: "app_qualifications",
	},
	{
		Header: "Position Applied",
		accessor: "pos_applied",
	},
	{
		Header: "Status",
		accessor: "sts_App_remarks",
	},
];
export const recruitmentCMHeaders = [
	{
		Header: " ",
		columns: [
			{
				Header: " ",
				accessor: "app_id",
			},
			{
				Header: "No.",
				accessor: "no",
			},
			{
				Header: "Name & Sex",
				accessor: "applicant_name",
			},
			{
				Header: "Eligibility",
				accessor: "elig",
			},
		],
	},
	{
		Header: "END - USER",
		columns: [
			{
				Header: "Edctn 10%",
				accessor: "edu",
				Cell: ({ cell }) => {
					return (
						<>
							<p style={{ width: "100%", textAlign: "center" }}>{cell.value}</p>
						</>
					);
				},
			},
			{
				Header: "Exprnce 15%",
				accessor: "exp",
				Cell: ({ cell }) => {
					return (
						<>
							<p style={{ width: "100%", textAlign: "center" }}>{cell.value}</p>
						</>
					);
				},
			},
			{
				Header: "Trnng 10%",
				accessor: "trn",
				Cell: ({ cell }) => {
					return (
						<>
							<p style={{ width: "100%", textAlign: "center" }}>{cell.value}</p>
						</>
					);
				},
			},
			{
				Header: "Cmptncy 30%",
				accessor: "cmptncy",
				Cell: ({ cell }) => {
					return (
						<>
							<p style={{ width: "100%", textAlign: "center" }}>{cell.value}</p>
						</>
					);
				},
			},
			{
				Header: "Sub-Total",
				accessor: "subtotal",
				Cell: ({ cell }) => {
					return (
						<>
							<p style={{ width: "100%", textAlign: "center" }}>{cell.value}</p>
						</>
					);
				},
			},
		],
	},
	{
		Header: "HRMPSB",
		columns: [
			{
				Header: "Attrbts 25%",
				accessor: "attrbts",
				Cell: ({ cell }) => {
					return (
						<>
							<p style={{ width: "100%", textAlign: "center" }}>{cell.value}</p>
						</>
					);
				},
			},
			{
				Header: "Accom. 5%",
				accessor: "accom",
				Cell: ({ cell }) => {
					return (
						<>
							<p style={{ width: "100%", textAlign: "center" }}>{cell.value}</p>
						</>
					);
				},
			},
			{
				Header: "Prfrmnce 5%",
				accessor: "perfor",
				Cell: ({ cell }) => {
					return (
						<>
							<p style={{ width: "100%", textAlign: "center" }}>{cell.value}</p>
						</>
					);
				},
			},
			{
				Header: "Sub-Total",
				accessor: "subtotal2",
				Cell: ({ cell }) => {
					return (
						<>
							<p style={{ width: "100%", textAlign: "center" }}>{cell.value}</p>
						</>
					);
				},
			},
			{
				Header: "TOTAL 100%",
				accessor: "total",
				Cell: ({ cell }) => {
					return (
						<>
							<b
								style={{
									display: "inline-block",
									width: "100%",
									textAlign: "end",
								}}
							>
								{cell.value}
							</b>
						</>
					);
				},
			},
		],
	},
];
export const recruitmentEligbilities = [
	"No Eligibility",
	"Professional",
	"Sub-professional",
	"Board / Bar",
	"Barangay Health Worker",
	"Barangay Official",
	"Barangay Nutrition Scholar",
	"Electronic Data Processing Specialist (EDPS)",
	"Honor Graduate",
	"Foreign School Honor Graduate",
	"Scientific and Technological Specialist",
	"Veteran Preference Rating",
	"Sanggunian Member",
	"Skill Eligibility",
];
