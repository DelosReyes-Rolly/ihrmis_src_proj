import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setBusy } from "../../../../../features/reducers/popup_response.js";
import {
	ALERT_ENUM,
	popupAlert,
} from "../../../../../helpers/alert_response.js";
import { API_HOST } from "../../../../../helpers/global/global_config.js";
import ButtonComponent from "../../../../common/button_component/button_component.js";
import FourAddReferenceModal from "../../../../pds_form/parts/add_modals/five_add_reference.js";

const fetchEmployeeReference = async (id) => {
	let data = [];
	await axios
		.get(API_HOST + "get-emp_ref/" + id)
		.then((res) => (data = res.data.data))
		.catch((err) => console.log(err));
	return data;
};

const removeReference = async (id) => {
	await axios
		.delete(API_HOST + "remove-emp_ref/" + id)
		.then(() =>
			popupAlert({
				message: "Deleted Successfully",
				type: ALERT_ENUM.success,
			})
		)
		.catch((error) =>
			popupAlert({
				message: error?.response?.data?.message ?? error?.message,
				type: ALERT_ENUM.fail,
			})
		);
};

const ReferenceTab = () => {
	const [referenceRecord, setReferenceRecord] = useState([]);
	const [itemData, setItemData] = useState();
	const [toogleModal, setToggleModal] = useState(false);
	const [toogleEditModal, setEditToggleModal] = useState(false);
	const { item } = useParams();
	const dispatch = useDispatch();

	const removeRefHandler = () => {
		dispatch(setBusy(true));
		setEditToggleModal(false);
		removeReference(itemData?.ref_id);
		dispatch(setBusy(false));
	};

	useEffect(() => {
		fetchEmployeeReference(item).then((res) => setReferenceRecord(res));
	}, [toogleModal, toogleEditModal]);

	return (
		<React.Fragment>
			<FourAddReferenceModal
				isDisplay={toogleModal}
				onClose={() => setToggleModal(false)}
				endpoint="add-update-emp_ref"
			/>
			<FourAddReferenceModal
				isDisplay={toogleEditModal}
				onClose={() => setEditToggleModal(false)}
				onPressed={removeRefHandler}
				reference={itemData}
				endpoint="add-update-emp_ref"
			/>
			<div
				className="default-table"
				style={{ margin: "20px 0px", cursor: "default", userSelect: "none" }}
			>
				<table id="table-design">
					<thead>
						<tr className="main-header">
							<th colSpan="12">
								REFERENCES <br />
								<span style={{ fontSize: "12px", fontWeight: "normal" }}>
									(Person not related by consanguinity or affinity to
									applicant/appointee)
								</span>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="secondary-headers-20">
							<th colSpan="3">Name</th>
							<th colSpan="6">Address</th>
							<th colSpan="3">Tel No.</th>
						</tr>

						{referenceRecord?.map((item, key) => {
							return (
								<tr
									key={key}
									className="trHoverBody"
									onClick={() => {
										setEditToggleModal(true);
										setItemData(item);
									}}
								>
									<td colSpan="3">{item?.ref_app_name}</td>
									<td colSpan="6">{item?.ref_app_addr}</td>
									<td colSpan="3">
										{item?.ref_app_tel_no} &#47; {item?.ref_app_email}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div
				style={{ display: "flex", flexDirection: "row", justifyContent: "end" }}
			>
				<ButtonComponent
					onClick={() => setToggleModal(true)}
					buttonName="Add"
					buttonLogoStart={<MdAdd />}
				/>
			</div>
		</React.Fragment>
	);
};

export default ReferenceTab;
