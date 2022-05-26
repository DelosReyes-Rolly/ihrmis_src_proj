import React, { useEffect, useLayoutEffect, useState } from "react";
import { API_HOST } from "../../../../../helpers/global/global_config";
import useAxiosCallHelper from "../../../../../helpers/use_hooks/axios_call_helper";
import InputComponent from "../../../../common/input_component/input_component/input_component";
import ModalVpComponent from "../../../../common/modal_component/modal_component_vp";
import { VscAccount } from "react-icons/vsc";

const array_selected = [];
const SelectAgencyModal = ({
	isDisplay,
	onClose,
	setSelectedAgency,
	onClickSubmit,
}) => {
	const [axiosCall] = useAxiosCallHelper();
	const [agencies, setAgencies] = useState([]);

	const getDostAgencies = () => {
		axiosCall("get", API_HOST + "getAllDostAgencies").then(
			(response) => {
				setAgencies(response.data);
			},
			(error) => {
				console.log(error);
			}
		);
	};

	useLayoutEffect(() => {
		getDostAgencies();
		console.log(agencies);
	}, []);

	return (
		<React.Fragment>
			<ModalVpComponent
				style={{ zIndex: "101" }}
				title="Select Agency"
				isDisplay={isDisplay}
				onClose={onClose}
				onPressedHidden={true}
				onSubmitName="Save"
				onClickSubmit={onClickSubmit}
			>
				<AddHeaderForOfficer />
				{agencies?.map((element, index) => (
					<RowDisplay
						key={index}
						element={element}
						setSelectedAgency={setSelectedAgency}
					/>
				))}
			</ModalVpComponent>
		</React.Fragment>
	);
};

export default SelectAgencyModal;

const RowDisplay = ({ element, setSelectedAgency }) => {
	const [toggleState, setToggleState] = useState(false);
	const [fontweight, setFontweight] = useState("Normal");

	const handleChange = (e) => {
		array_selected.push(e.target.value);
		setSelectedAgency(array_selected);
		if (e.target.checked) {
			setFontweight("Bold");
		} else {
			setFontweight("Normal");
		}
	};

	return (
		<React.Fragment>
			<div className="flex-selectagency-display">
				<label className="div-labal">
					<input
						type="checkbox"
						id={"dost-agency_" + element.agn_id}
						name="dost-agency"
						value={element.agn_id}
						onChange={(e) => handleChange(e)}
					/>
					<p style={{ marginTop: "-3px", fontWeight: fontweight }}>
						{element.agn_acronym}
					</p>
				</label>
				<label className="div-labal" htmlFor="officer-incharge">
					<input
						type="checkbox"
						id={"officer-incharge_" + element.agn_id}
						name="officer-incharge"
						value={toggleState}
						onChange={(event) => {
							// console.log(event.target.value);
							setToggleState(!toggleState);
						}}
					/>
					{toggleState && <DisplayTextbox element={element} />}
				</label>
			</div>
		</React.Fragment>
	);
};

const DisplayTextbox = ({ element }) => {
	return (
		<React.Fragment>
			<div>
				<InputComponent
					value={element.agn_head_name}
					readOnly={true}
					icon={<VscAccount />}
				/>
				<InputComponent value={element.agn_head_email} readOnly={true} />
			</div>
		</React.Fragment>
	);
};

const AddHeaderForOfficer = () => {
	return (
		<React.Fragment>
			<span
				style={{
					display: "flex",
					justifyContent: "flex-end",
					fontWeight: "bold",
					flexDirection: "row",
					width: "64%",
					color: "cornflowerblue",
				}}
			>
				Officer-in-Charge
			</span>
		</React.Fragment>
	);
};
