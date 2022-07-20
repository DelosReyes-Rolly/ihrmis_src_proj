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
import ThreeAddWorkExperienceModal from "../../../../pds_form/parts/add_modals/three_add_workexp.js";
import { formThreeInput } from "../../../../pds_form/static/input_items";

const fetchEmployeeExperience = async (id) => {
	let data = [];
	await axios
		.get(API_HOST + "get-emp_exp/" + id)
		.then((res) => {
			data = res.data.data;
		})
		.catch((err) => console.log(err.response.data.message ?? err.message));
	return data;
};

const removeExperience = async (id) => {
	await axios
		.delete(API_HOST + "remove-emp_exp/" + id)
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

const ExperienceTab = () => {
	const [workExperienceRecord, setWorkExperienceRecord] = useState();
	const [togModal, setTogModal] = useState(false);
	const [togEditModal, setTogEditModal] = useState(false);
	const [sgExperience, setSgExperience] = useState(undefined);

	const { item } = useParams();
	const dispatch = useDispatch();

	const removeHandler = async () => {
		dispatch(setBusy(true));
		setTogEditModal(false);
		await removeExperience(sgExperience?.exp_id);
		dispatch(setBusy(false));
	};

	useEffect(() => {
		const fetcher = async () => {
			setWorkExperienceRecord(await fetchEmployeeExperience(item));
		};
		fetcher();
	}, [togEditModal, togModal]);

	const getAppointment = (title) => {
		if (title === null) return null;
		let value = "";
		formThreeInput?.add_work_status.forEach((element) => {
			if (element?.id === title) value = element?.title;
		});
		return value;
	};

	return (
		<React.Fragment>
			<ThreeAddWorkExperienceModal
				isDisplay={togModal}
				onClose={() => setTogModal(false)}
				endpoint="add-update-emp_exp"
			/>

			<ThreeAddWorkExperienceModal
				isDisplay={togEditModal}
				onClose={() => setTogEditModal(false)}
				endpoint="add-update-emp_exp"
				reference={sgExperience}
				remove={removeHandler}
			/>

			<div className="default-table" style={{ margin: "20px 0px" }}>
				<table id="table-design" style={{ cursor: "default" }}>
					<thead>
						<tr className="main-header">
							<th colSpan="12">WORK EXPERIENCE</th>
						</tr>
						<tr className="secondary-headers-20">
							<th colSpan="1" rowSpan="1" style={{ textAlign: "center" }}>
								Inclusive Dates
							</th>
							<th colSpan="3" rowSpan="1" style={{ textAlign: "center" }}>
								Position Title
							</th>
							<th colSpan="3" rowSpan="1" style={{ textAlign: "center" }}>
								Department / Agency / Office / Company
							</th>
							<th colSpan="2" rowSpan="1" style={{ textAlign: "center" }}>
								Monthly Salary / SG & Increment
							</th>
							<th colSpan="2" rowSpan="1" style={{ textAlign: "center" }}>
								Status of Appointment
							</th>
							<th colSpan="1" rowSpan="1" style={{ textAlign: "center" }}>
								Government Service
							</th>
						</tr>
					</thead>

					<tbody>
						{workExperienceRecord?.map((item, key) => {
							return (
								<tr
									className="trHoverBody"
									key={key}
									onClick={() => {
										setSgExperience(item);
										setTogEditModal(true);
									}}
								>
									<td colSpan="1" style={{ textAlign: "center" }}>
										{item?.exp_app_from + " to " + item?.exp_app_to}
									</td>
									<td colSpan="3" style={{ textAlign: "center" }}>
										{item?.exp_app_position}
									</td>
									<td colSpan="3" style={{ textAlign: "center" }}>
										{item?.exp_app_agency}
									</td>
									<td colSpan="2" style={{ textAlign: "center" }}>
										{item?.exp_app_salary}
									</td>
									<td colSpan="2" style={{ textAlign: "center" }}>
										{getAppointment(item?.exp_app_appntmnt)}
									</td>
									<td colSpan="1" style={{ textAlign: "center" }}>
										{item?.exp_app_govt == 1 ? "Yes" : "No"}
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
					onClick={() => setTogModal(true)}
					buttonName="Add"
					buttonLogoStart={<MdAdd />}
				/>
			</div>
		</React.Fragment>
	);
};

export default ExperienceTab;
