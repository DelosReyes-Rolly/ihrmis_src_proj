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
import ThreeAddInterventionModal from "../../../../pds_form/parts/add_modals/three_add_intervention.js";

const fetchEmployeeTraining = async (id) => {
	let data = [];
	await axios
		.get(API_HOST + "get-emp_trn/" + id)
		.then((res) => {
			data = res.data.data;
		})
		.catch((err) => console.log(err.response.data.message ?? err.message));
	return data;
};

const removeTraining = async (id) => {
	await axios
		.delete(API_HOST + "remove-emp_trn/" + id)
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

const TrainingTab = () => {
	const [trainingRecord, setTrainingRecord] = useState([]);
	const [modalTraining, setModalTraining] = useState();
	const [editModalTraining, setEditModalTraining] = useState(false);
	const [trainingContainer, setTrainingContainer] = useState(undefined);

	const { item } = useParams();
	const dispatch = useDispatch();

	const removeTrnHandler = async () => {
		dispatch(setBusy(true));
		setEditModalTraining(false);
		await removeTraining(trainingContainer?.trn_id);
		dispatch(setBusy(false));
	};

	useEffect(() => {
		const fetcher = async () => {
			setTrainingRecord(await fetchEmployeeTraining(item));
		};
		fetcher();
	}, [editModalTraining, modalTraining]);

	return (
		<React.Fragment>
			<ThreeAddInterventionModal
				isDisplay={modalTraining}
				onClose={() => setModalTraining(false)}
				endpoint="add-update-emp_trn"
			/>

			<ThreeAddInterventionModal
				isDisplay={editModalTraining}
				onClose={() => setEditModalTraining(false)}
				endpoint="add-update-emp_trn"
				reference={trainingContainer}
				remove={removeTrnHandler}
			/>

			<div className="default-table" style={{ margin: "20px 0px" }}>
				<table id="table-design" style={{ cursor: "default" }}>
					<thead>
						<tr className="main-header">
							<th colSpan="12">
								LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING PROGRAMS
								ATTENDED
							</th>
						</tr>
						<tr className="secondary-headers-20">
							<th colSpan="4" rowSpan="2" style={{ textAlign: "center" }}>
								Title
							</th>
							<th colSpan="2" rowSpan="1" style={{ textAlign: "center" }}>
								Inclusive Dates
							</th>
							<th colSpan="1" rowSpan="2" style={{ textAlign: "center" }}>
								Number of Hours
							</th>
							<th colSpan="1" rowSpan="2" style={{ textAlign: "center" }}>
								Type of L&D
							</th>
							<th colSpan="4" rowSpan="2" style={{ textAlign: "center" }}>
								Conducted/ Sponsored By
							</th>
						</tr>
						<tr className="fixed-label-table secondary-headers tr-header">
							<th colSpan="1" rowSpan="1" style={{ textAlign: "center" }}>
								From
							</th>
							<th colSpan="1" rowSpan="1" style={{ textAlign: "center" }}>
								To
							</th>
						</tr>
					</thead>
					<tbody>
						{trainingRecord?.map((item, key) => {
							return (
								<tr
									key={key}
									className="trHoverBody"
									onClick={() => {
										setTrainingContainer(item);
										setEditModalTraining(true);
									}}
								>
									<td colSpan="4" style={{ textAlign: "center" }}>
										{item?.trn_app_title}
									</td>
									<td colSpan="1" style={{ textAlign: "center" }}>
										{item?.trn_app_from}
									</td>
									<td colSpan="1" style={{ textAlign: "center" }}>
										{item?.trn_app_to}
									</td>
									<td colSpan="1" style={{ textAlign: "center" }}>
										{item?.trn_app_hours}
									</td>
									<td colSpan="1" style={{ textAlign: "center" }}>
										{item?.trn_app_type}
									</td>
									<td colSpan="4" style={{ textAlign: "center" }}>
										{item?.trn_app_sponsor}
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
					onClick={() => setModalTraining(true)}
					buttonName="Add"
					buttonLogoStart={<MdAdd />}
				/>
			</div>
		</React.Fragment>
	);
};

export default TrainingTab;
