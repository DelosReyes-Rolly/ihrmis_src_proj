import ModalComponent from "../../common/modal_component/modal_component";
import React, { useEffect, useState } from "react";
import SelectComponent from "../../common/input_component/select_component/select_component";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
	apiModelOfficeType,
	apiModelOfficeAreaType,
	apiModelOffices,
	apiModelgetPositions,
} from "./static/input_items";
import { usePopUpHelper } from "../../../helpers/use_hooks/popup_helper";
import InputComponent from "../../common/input_component/input_component/input_component";
import { API_HOST } from "../../../helpers/global/global_config";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../../../features/reducers/popup_response";
import { useSelectValueCon } from "../../../helpers/use_hooks/select_value_cons";

const AddOfficeModal = ({ isDisplay, onClose, officeData }) => {
	const dispatch = useDispatch();
	const { displayData } = useSelectValueCon();
	const { renderBusy, renderFailed, renderSucceed } = usePopUpHelper();
	const { isRefresh } = useSelector((state) => state.popupResponse);
	const [state, setState] = useState({
		positions: [],
		offices: apiModelOffices,
	});
	const getPlantillas = async (office) => {
		setState({ ...state, positions: await apiModelgetPositions(office) });
	};
	useEffect(() => {
		getPlantillas(officeData?.ofc_id ?? "");
	}, [officeData?.ofc_id]);
	console.log(officeData);
	const officeForm = useFormik({
		enableReinitialize: true,

		initialValues: {
			ofc_id: officeData?.ofc_id ?? "",
			ofc_type: officeData?.ofc_type ?? "",
			ofc_name: officeData?.ofc_name ?? "",
			ofc_acronym: officeData?.ofc_acronym ?? "",
			ofc_area_code: officeData?.ofc_area_code ?? "",
			ofc_area_type: officeData?.ofc_area_type ?? "",
			ofc_head_itm_id: officeData?.ofc_head ?? "",
			ofc_oic_itm_id: officeData?.ofc_oic_itm_id ?? "",
			ofc_ofc_id: officeData?.ofc_ofc_id ?? "",
		},
		validationSchema: Yup.object({
			ofc_type: Yup.number()
				.typeError("Must be a number")
				.required("This field is required"),
			ofc_name: Yup.string()
				.required("This field is required")
				.max(191, "Invalid input"),
			ofc_acronym: Yup.string()
				.required("This field is required")
				.max(30, "Invalid input"),
			ofc_area_code: Yup.string()
				.required("This field is required")
				.max(10, "Invalid input"),
			ofc_area_type: Yup.string()
				.required("This field is required")
				.max(1, "Invalid input"),
			// ofc_head_itm_id: Yup.number()
			//   .typeError("Must be a number")
			//   .required("This field is required"),
			// ofc_oic_itm_id: Yup.number()
			//   .typeError("Must be a number")
			//   .required("This field is required"),
			ofc_ofc_id: Yup.number()
				.typeError("Must be a number")
				.required("This field is required"),
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);
			await axios
				.post(API_HOST + "offices", value, {
					// headers: { "X-CSRF-TOKEN": token.content },
				})
				.then(() => {
					renderSucceed({});
					dispatch(setRefresh());
				})
				.catch((err) => {
					// renderFailed();
				});
			renderBusy(false);
			onClose();
			resetForm();
		},
	});

	return (
		<React.Fragment>
			<ModalComponent
				title="Offices"
				onSubmitName="Save"
				onCloseName="Close"
				isDisplay={isDisplay}
				onSubmit={officeForm.handleSubmit}
				onSubmitType="submit"
				onClose={onClose}
			>
				<div className="add-office-modal">
					<div className="left-input item-modal-6">
						<label>Office Type</label>
						<SelectComponent
							name="ofc_type"
							value={officeForm.values.ofc_type}
							onChange={officeForm.handleChange}
							itemList={apiModelOfficeType}
						/>
					</div>
					<div className="right-input item-modal-6">
						<label>Parent Office</label>
						<SelectComponent
							name="ofc_ofc_id"
							value={officeForm.values.ofc_ofc_id}
							onChange={(e) => {
								officeForm.handleChange(e);
								// getPlantillas(e.target.value);
							}}
							itemList={apiModelOffices}
						/>
					</div>
				</div>
				<div className="add-office-modal">
					<div className="left-input item-modal-1">
						<label>Office Name</label>
						<InputComponent
							name="ofc_name"
							value={officeForm.values.ofc_name}
							onChange={officeForm.handleChange}
							maxLength="191"
						/>
					</div>
					<div className="right-input item-modal-1">
						<label>Office Acronym</label>
						<InputComponent
							name="ofc_acronym"
							value={officeForm.values.ofc_acronym}
							onChange={officeForm.handleChange}
							maxLength="30"
						/>
					</div>
				</div>
				<div className="add-office-modal">
					<div className="left-input item-modal-1">
						<label>Office Area Code</label>
						<InputComponent
							name="ofc_area_code"
							value={officeForm.values.ofc_area_code}
							onChange={officeForm.handleChange}
							maxLength="191"
						/>
					</div>
					<div className="right-input item-modal-1">
						<label>Office Area Type</label>
						<SelectComponent
							name="ofc_area_type"
							value={officeForm.values.ofc_area_type}
							onChange={officeForm.handleChange}
							itemList={apiModelOfficeAreaType}
						/>
					</div>
				</div>
				<div className="add-office-modal">
					<div className="left-input item-modal-1">
						<label>Office Head</label>
						<SelectComponent
							name="ofc_head_itm_id"
							value={officeForm.values.ofc_head_itm_id}
							onChange={officeForm.handleChange}
							itemList={state.positions}
						/>
					</div>
					<div className="right-input item-modal-1">
						<label>Office in Charge</label>
						<SelectComponent
							name="ofc_oic_itm_id"
							//   value={offi}
							onChange={officeForm.handleChange}
							itemList={state.positions}
						/>
					</div>
				</div>
			</ModalComponent>
		</React.Fragment>
	);
};
export default AddOfficeModal;
