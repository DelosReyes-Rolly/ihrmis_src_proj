import React, { useEffect, useLayoutEffect, useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAgency } from "../../../../../features/reducers/plantilla_item_slice";
import { API_HOST } from "../../../../../helpers/global/global_config";
import useAxiosCallHelper from "../../../../../helpers/use_hooks/axios_call_helper";
import InputComponent from "../../../../common/input_component/input_component/input_component";
import ModalVpComponent from "../../../../common/modal_component/modal_component_vp";

const SelectAgencyModal = ({ isDisplay, onClose, onClickSubmit }) => {
	const [axiosCall] = useAxiosCallHelper();
	const [agencies, setAgencies] = useState([]);
	const dispatch = useDispatch();
	const getDostAgencies = () => {
		axiosCall("get", API_HOST + "getAllAgencies").then(
			(response) => {
				// console.log(response);
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

	useEffect(() => {
		dispatch(setSelectedAgency([]));
	}, [isDisplay]);

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
					<RowDisplay key={index} element={element} />
				))}
			</ModalVpComponent>
		</React.Fragment>
	);
};

export default SelectAgencyModal;

const RowDisplay = ({ element }) => {
	const [toggleState, setToggleState] = useState(false);
	const [fontweight, setFontweight] = useState("Normal");
	const dispatch = useDispatch();
	const { selected_agency } = useSelector((state) => state.plantillaItem);
	let arr_sel_agency = [];

	const handleChange = (e, element) => {
		if (e.target.checked) {
			setFontweight("Bold");
			if (!ifExistSearch(e.target.value)) {
				dispatch(
					setSelectedAgency([...selected_agency, { agn_id: element.agn_id }])
				);
			}
		} else {
			setFontweight("Normal");
			arr_sel_agency = selected_agency;
			arr_sel_agency.filter(
				(sel_agency) => sel_agency.agn_id !== parseInt(e.target.value)
			);
			dispatch(setSelectedAgency(...arr_sel_agency));
		}
	};

	const ifExistSearch = (id) => {
		return selected_agency.some(function (el) {
			return el.agn_id === parseInt(id);
		});
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
						onChange={(e) => handleChange(e, element)}
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
							// sconsole.log(event.target.value);
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
					icon={<MdOutlineAccountCircle />}
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
