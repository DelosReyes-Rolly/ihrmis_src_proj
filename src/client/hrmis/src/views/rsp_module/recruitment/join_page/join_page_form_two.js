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
import {
	IoLocationSharp,
	IoMailOutline,
	IoMailSharp,
	IoPerson,
} from "react-icons/io5";
import ButtonComponent from "../../../common/button_component/button_component";
import { BsFillPhoneFill, BsFillTelephoneFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

const JoinPageFormTwo = () => {
	const navigate = useNavigate();
	const mounted = useIsMounted();
	const dispatch = useDispatch();
	const { renderBusy } = usePopUpHelper();
	const [office, setOfficeState] = useState([]);
	const { refresh } = useSelector((state) => state.popupResponse);
	const { item } = useParams();
	const [data, setData] = useState([]);

	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			acc_req_email: data.acc_req_email ?? "",
			reEmail: data.acc_req_email ?? "",
			acc_req_telephone: data.acc_req_telephone ?? "",
			acc_req_mobile: data.acc_req_mobile ?? "",
		},
		validationSchema: Yup.object({
			acc_req_email: Yup.string()
				.required("This field is required")
				.email("This field must be an email"),
			reEmail: Yup.string()
				.oneOf([Yup.ref("acc_req_email"), null], "Emails must match")
				.required("This field is required"),
			acc_req_telephone: Yup.string().required("This field is required"),
			acc_req_mobile: Yup.string().required("This field is required"),
		}),
		onSubmit: async (value, { resetForm }) => {
			if (item !== undefined) {
				value.acc_req_id = item;
			}
			renderBusy(true);
			await axios
				.post(API_HOST + "account-request", value)
				.then(() => {
					dispatch(setRefresh());
					navigate("/join-page/three/" + item);
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

	const getAccountRequest = async () => {
		await axios
			.get(API_HOST + "account-request/" + item)
			.then((response) => {
				const data = response.data.data;
				let values = {
					acc_req_email: data.acc_req_email,
					acc_req_telephone: data.acc_req_telephone,
					acc_req_mobile: data.acc_req_mobile,
				};
				if (!mounted.current) return;
				setData(values);
			})
			.catch((error) => {});
	};
	useEffect(() => {
		if (item !== undefined) {
			getAccountRequest();
		}
	}, [refresh, item]);
	return (
		<>
			<form onSubmit={form.handleSubmit} onClick={(e) => e.stopPropagation()}>
				<div className="form-inputs">
					<div className="join-inputs w60">
						<IconComponent icon={<IoMailSharp size={25} />} />
						<InputComponent
							placeholder="Email"
							name="acc_req_email"
							className="no-outline-input"
							value={form.values.acc_req_email}
							onChange={form.handleChange}
							maxLength="30"
						/>
						{form.touched.emacc_req_emailail && form.errors.acc_req_email ? (
							<span className="invalid-response">
								{form.errors.acc_req_email}
							</span>
						) : null}
					</div>
					<div className="w40"></div>
				</div>
				<div className="form-inputs">
					<div className="join-inputs w60">
						<IconComponent icon={<IoMailOutline size={25} />} />
						<InputComponent
							placeholder="Re-enter Email"
							name="reEmail"
							className="no-outline-input"
							value={form.values.reEmail}
							onChange={form.handleChange}
							maxLength="30"
						/>
						{form.touched.reEmail && form.errors.reEmail ? (
							<span className="invalid-response">{form.errors.reEmail}</span>
						) : null}
					</div>
					<div className="w40"></div>
				</div>
				<div className="form-inputs">
					<div className="join-inputs w60">
						<IconComponent icon={<BsFillTelephoneFill size={25} />} />
						<InputComponent
							placeholder="Phone Number"
							name="acc_req_telephone"
							className="no-outline-input"
							value={form.values.acc_req_telephone}
							onChange={form.handleChange}
							maxLength="30"
						/>
						{form.touched.acc_req_telephone && form.errors.acc_req_telephone ? (
							<span className="invalid-response">
								{form.errors.acc_req_telephone}
							</span>
						) : null}
					</div>
					<div className="w40"></div>
				</div>
				<div className="form-inputs">
					<div className="join-inputs w60">
						<IconComponent icon={<BsFillPhoneFill size={25} />} />
						<InputComponent
							placeholder="Mobile Number"
							name="acc_req_mobile"
							className="no-outline-input"
							value={form.values.acc_req_mobile}
							onChange={form.handleChange}
							maxLength="30"
						/>
						{form.touched.acc_req_mobile && form.errors.acc_req_mobile ? (
							<span className="invalid-response">
								{form.errors.acc_req_mobile}
							</span>
						) : null}
					</div>
					<div className="w40"></div>
				</div>
			</form>
			<div
				className="mt5"
				style={{
					display: "flex",
					flexDirection: "row",
					width: "4.5rem",
					gap: "0.5rem",
				}}
			>
				<ButtonComponent
					buttonName={"Back"}
					onClick={(e) => {
						e.stopPropagation();
						navigate("/join-page/one/" + item);
					}}
				/>
				<ButtonComponent
					buttonName={"Next"}
					type={"submit"}
					onClick={form.handleSubmit}
				/>
			</div>
		</>
	);
};

export default JoinPageFormTwo;
