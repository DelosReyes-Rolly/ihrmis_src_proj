import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALERT_ENUM, popupAlert } from "../../../../helpers/alert_response";
import { API_HOST } from "../../../../helpers/global/global_config";
import { useIsMounted } from "../../../../helpers/use_hooks/isMounted";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import InputComponent from "../../../common/input_component/input_component/input_component";
import * as Yup from "yup";
import { useFormik } from "formik";
import { setRefresh } from "../../../../features/reducers/popup_response";
import IconComponent from "../../../common/icon_component/icon";
import { BsFillTagFill } from "react-icons/bs";
import { IoLocationSharp, IoPerson } from "react-icons/io5";
import { FaCertificate } from "react-icons/fa";
import ButtonComponent from "../../../common/button_component/button_component";
import SelectComponent from "../../../common/input_component/select_component/select_component";
import { useNavigate, useParams } from "react-router-dom";

const JoinPageFormOne = () => {
	const navigate = useNavigate();
	const mounted = useIsMounted();
	const dispatch = useDispatch();
	const { renderBusy } = usePopUpHelper();
	const [office, setOfficeState] = useState([]);
	const [positions, setPositionState] = useState([]);
	const { refresh } = useSelector((state) => state.popupResponse);
	const { item } = useParams();
	const [data, setData] = useState([]);

	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			acc_req_title_id: data.title ?? "",
			acc_req_last_name: data.last_name ?? "",
			acc_req_first_name: data.first_name ?? "",
			acc_req_middle_name: data.middle_name ?? "",
			acc_req_position: data.position ?? "",
			acc_req_office: data.office ?? "",
		},
		validationSchema: Yup.object({
			acc_req_title_id: Yup.string().required("This field is required"),
			acc_req_last_name: Yup.string().max(50).required("This field is required"),
			acc_req_first_name: Yup.string().required("This field is required"),
			acc_req_middle_name: Yup.string().required("This field is required"),
			acc_req_position: Yup.number().required("This field is required"),
			acc_req_office: Yup.number().required("This field is required"),
		}),
		onSubmit: async (value, { resetForm }) => {
			if (item !== undefined) {
				value.acc_req_id = item;
			}
			renderBusy(true);
			await axios
				.post(API_HOST + "account-request", value)
				.then((response) => {
					popupAlert({
						message: 'General information saved successfully',
						type: ALERT_ENUM.success,
					});
					if (item !== undefined) {
						navigate("/join-page/two/" + item);
					} else {
						navigate("/join-page/two/" + response.data.data?.acc_req_id);
					}
					dispatch(setRefresh());
				})
				.catch((err) => {
					popupAlert({
						message: err.message,
						type: ALERT_ENUM.fail,
					});
				});
			renderBusy(false);
			resetForm();
		},
	});

	const getPositions = async (ofc_id) => {
		let positions = [];
		await axios
			.get(API_HOST + "plantilla-positions/" + ofc_id)
			.then((response) => {
				response.data.data.forEach((data) => {
					let obj = {};
					obj["id"] = data.itm_id;
					obj["title"] = data.pos_title;
					positions.push(obj);
				});
			})
			.catch((error) => console.log(error));
		if (!mounted.current) return;
		setPositionState(positions);
	};
	const getOffice = async () => {
		let offices = [];
		await axios
			.get(API_HOST + "office")
			.then((response) => {
				response.data.data.forEach((data) => {
					let obj = {};
					obj["id"] = data.ofc_id;
					obj["title"] = data.ofc_acronym;
					offices.push(obj);
				});
			})
			.catch((error) => {});
		if (!mounted.current) return;
		setOfficeState(offices);
	};

	const getAccountRequest = async () => {
		await axios
			.get(API_HOST + "account-request/" + item)
			.then((response) => {
				const data = response.data.data;
				let values = {
					title: data.acc_req_title_id,
					office: data.acc_req_office,
					position: data.acc_req_position,
					last_name: data.acc_req_last_name,
					first_name: data.acc_req_first_name,
					middle_name: data.acc_req_middle_name,
				};
				if (!mounted.current) return;
				setData(values);
			})
			.catch((error) => {});
	};

	useEffect(() => {
		getOffice();
		if (item !== undefined) {
			getAccountRequest();
		}
	}, [refresh, item]);

	useEffect(() => {
		getPositions(form.values.acc_req_office);
	}, [form.values.acc_req_office]);
	return (
		<>
			<form onSubmit={form.handleSubmit} onClick={(e) => e.stopPropagation()}>
				<div className="form-inputs">
					<div className="join-inputs w100">
						<IconComponent icon={<BsFillTagFill size={25} />} />
						<InputComponent
							placeholder="Title"
							name="acc_req_title_id"
							className="no-outline-input"
							value={form.values.acc_req_title_id}
							onChange={form.handleChange}
							maxLength="30"
						/>
					</div>
					<div className="w100"></div>
				</div>
				<div className="form-inputs">
					{form.touched.acc_req_title_id && form.errors.acc_req_title_id ? (
						<span className="invalid-response">
							{form.errors.acc_req_title_id}
						</span>
					) : null}
				</div>
				<div className="form-inputs">
					<div className="join-inputs w100">
						<IconComponent icon={<IoPerson size={25} />} />
						<InputComponent
							placeholder="Last Name"
							name="acc_req_last_name"
							className="no-outline-input"
							value={form.values.acc_req_last_name}
							onChange={form.handleChange}
							maxLength="50"
						/>
					</div>
					<div className="join-inputs w100">
						<InputComponent
							placeholder="First Name"
							name="acc_req_first_name"
							className="no-outline-input"
							value={form.values.acc_req_first_name}
							onChange={form.handleChange}
							maxLength="50"
						/>
					</div>
					<div className="join-inputs w100">
						<InputComponent
							placeholder="Middle Name"
							name="acc_req_middle_name"
							className="no-outline-input"
							value={form.values.acc_req_middle_name}
							onChange={form.handleChange}
							maxLength="50"
						/>
					</div>
				</div>
				<div className="form-inputs">
					<div className="w100">
						{form.touched.acc_req_last_name && form.errors.acc_req_last_name ? (
							<span className="invalid-response">
								{form.errors.acc_req_last_name}
							</span>
						) : null}
					</div>
					<div className="w100">
						{form.touched.acc_req_first_name &&
						form.errors.acc_req_first_name ? (
							<span className="invalid-response">
								{form.errors.acc_req_first_name}
							</span>
						) : null}
					</div>
					<div className="w100">
						{form.touched.acc_req_middle_name &&
						form.errors.acc_req_middle_name ? (
							<span className="invalid-response">
								{form.errors.acc_req_middle_name}
							</span>
						) : null}
					</div>
				</div>
				<div className="form-inputs">
					<div className="join-inputs w100">
						<IconComponent icon={<IoLocationSharp size={25} />} />
						<SelectComponent
							name="acc_req_office"
							defaultTitle="Office/Location"
							className="no-outline-input"
							value={form.values.acc_req_office}
							onChange={(e) => {
								form.handleChange(e);
							}}
							itemList={office}
						/>
						{form.touched.acc_req_office && form.errors.acc_req_office ? (
							<span className="invalid-response">
								{form.errors.acc_req_office}
							</span>
						) : null}
					</div>
					<div className="w100"></div>
				</div>
				<div className="form-inputs">
					<div className="join-inputs w100">
						<IconComponent icon={<FaCertificate size={25} />} />
						<SelectComponent
							name="acc_req_position"
							defaultTitle="Position/Designation"
							className="no-outline-input"
							value={form.values.acc_req_position}
							onChange={(e) => {
								form.handleChange(e);
							}}
							itemList={positions}
						/>
						{form.touched.acc_req_position && form.errors.acc_req_position ? (
							<span className="invalid-response">
								{form.errors.acc_req_position}
							</span>
						) : null}
					</div>
					<div className="w100"></div>
				</div>
				<div className="mt5">
					<ButtonComponent buttonName={"Next"} onClick={form.handleSubmit} />
				</div>
			</form>
		</>
	);
};

export default JoinPageFormOne;
