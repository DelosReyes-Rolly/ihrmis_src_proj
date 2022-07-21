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
import ThreeAddEducationModal from "../../../../pds_form/parts/add_modals/three_add_educ.js";
import { educationInputItem } from "../../../../pds_form/static/input_items";

const fetchEmployeeEducation = async (id) => {
	let data = [];
	await axios
		.get(API_HOST + "get-emp_edu/" + id)
		.then((res) => {
			data = res.data.data;
		})
		.catch((err) => console.log(err.response.data.message ?? err.message));
	return data;
};

const removeEducation = async (id) => {
	await axios
		.delete(API_HOST + "remove-emp_edu/" + id)
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

const EducationalTab = () => {
	const [school, setSchool] = useState([]);
	const [togModal, setTogModal] = useState(false);
	const [togEditModal, setTogEditModal] = useState(false);
	const [sgEducation, setSgEducation] = useState(undefined);

	const { item } = useParams();
	const dispatch = useDispatch();

	const removeTrnHandler = async () => {
		dispatch(setBusy(true));
		setTogEditModal(false);
		await removeEducation(sgEducation?.edu_id);
		dispatch(setBusy(false));
	};

	useEffect(() => {
		const fetcher = async () => {
			setSchool(await fetchEmployeeEducation(item));
		};
		fetcher();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [togEditModal, togModal]);
	return (
		<React.Fragment>
			<ThreeAddEducationModal
				isDisplay={togModal}
				onClose={() => setTogModal(false)}
				endpoint="add-update-emp_edu"
			/>

			<ThreeAddEducationModal
				isDisplay={togEditModal}
				onClose={() => setTogEditModal(false)}
				endpoint="add-update-emp_edu"
				reference={sgEducation}
				remove={removeTrnHandler}
			/>

			<div className="default-table" style={{ margin: "20px 0px" }}>
				<table id="table-design">
					<thead>
						<tr className="main-header">
							<th colSpan="12">
								<span>EDUCATIONAL BACKGROUND</span>
							</th>
						</tr>
						<tr className="secondary-headers-20">
							<th colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>
								Name of School
							</th>
							<th colSpan="4" rowSpan="2" style={{ textAlign: "center" }}>
								Level of Education/Basic Education/Degree/Course
							</th>
							<th colSpan="2" rowSpan="1" style={{ textAlign: "center" }}>
								Period of Attendance
							</th>
							<th colSpan="1" rowSpan="2" style={{ textAlign: "center" }}>
								Units Earned
							</th>
						</tr>
						<tr className="secondary-headers-20">
							<th colSpan="1" rowSpan="1" style={{ textAlign: "center" }}>
								From
							</th>
							<th colSpan="1" rowSpan="1" style={{ textAlign: "center" }}>
								To
							</th>
						</tr>
					</thead>
					<tbody>
						{school.map((item, key) => {
							return (
								<tr
									className="trHoverBody"
									key={key}
									onClick={() => {
										setSgEducation(item);
										setTogEditModal(true);
									}}
								>
									<td colSpan="5" style={{ textAlign: "center" }}>
										{item?.edu_app_school}
									</td>
									<td colSpan="4" style={{ textAlign: "center" }}>
										{educationInputItem[item.edu_app_level]?.title}
									</td>
									<td colSpan="1" style={{ textAlign: "center" }}>
										{item?.edu_app_from}
									</td>
									<td colSpan="1" style={{ textAlign: "center" }}>
										{item?.edu_app_to}
									</td>
									<td colSpan="1" style={{ textAlign: "center" }}>
										{item?.edu_app_units}
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

export default EducationalTab;
