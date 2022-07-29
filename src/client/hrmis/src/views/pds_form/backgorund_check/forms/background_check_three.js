import React, { useEffect, useState, Component } from "react";
import { useDispatch } from "react-redux";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useScrollToTop } from "../../../../helpers/use_hooks/useScollTop";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setMessageError } from "../../../../features/reducers/error_handler_slice";
import { API_HOST } from "../../../../helpers/global/global_config";
import { ALERT_ENUM, popupAlert } from "../../../../helpers/alert_response";
import { setRefresh } from "../../../../features/reducers/popup_response";
import PrevNextSubButtons from "../../parts/prev_next_sub_buttons";
import dostLogo from "../../../../assets/images/logo.png";
import InputComponent from "../../../common/input_component/input_component/input_component";
import ButtonComponent from "../../../common/button_component/button_component";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import TextAreaComponent from "../../../common/input_component/textarea_input_component/textarea_input_component";

const BackgroundCheckFormThree = () => {
	useScrollToTop();

	const dispatch = useDispatch();

	const { reference, applicant } = useParams();
	const [initials, setInitials] = useState({});
	const [applicantName, setApplicantName] = useState("");
	const [other, setOther] = useState(false);
	const [otherValidation, setOtherValidation] = useState(
		Yup.string().required("This field is required")
	);
	const navigate = useNavigate();

	const five = [
		{ label: "Yes", value: 3 },
		{ label: "Maybe", value: 2 },
		{ label: "No", value: 1 },
	];
	const nine = [
		{ label: "Yes", value: 2 },
		{ label: "No, Please tell us why", value: 1 },
	];

	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			11: initials[11] ?? "",
			12: initials[12] ?? "",
			13: initials[13] ?? "",
			14: initials[14] ?? "",
			15: initials[15] ?? "",
			16: initials[16] ?? "",
			17: initials[17] ?? "",
			18: initials[18] ?? "",
		},
		validationSchema: Yup.object({
			11: Yup.number().required("This field is required"),
			12: Yup.number().required("This field is required"),
			13: Yup.string().required("This field is required"),
			14: Yup.string().required("This field is required"),
			15: Yup.string().required("This field is required"),
			16: otherValidation,
			17: Yup.string().required("This field is required"),
			18: Yup.string().required("This field is required"),
		}),
		onSubmit: async (value, { resetForm }) => {
			value.applicant_id = applicant;
			value.reference = reference;
			await axios
				.post(API_HOST + "new-reference-check", value)
				.then(() => {
					navigate(`/background-check/thank-you`);
					dispatch(setRefresh());
				})
				.catch((err) => {
					popupAlert({
						message: err.message,
						type: ALERT_ENUM.fail,
					});
				});
			// renderBusy(false);
			// resetForm();
		},
	});
	useEffect(() => {
		getReferenceData();
	}, []);

	const getReferenceData = async () => {
		await axios
			.get(API_HOST + "get-reference-check/" + reference)
			.then((response) => {
				const applicantData = response.data.data;
				const values = {};
				applicantData?.tbl_reference_checks.forEach((element) => {
					if (element.chk_question === "15" && element.chk_answer === "1") {
						setOther(true);
					}
					values[element.chk_question] = element.chk_answer;
				});
				const name = `${applicantData?.app_nm_first} ${applicantData?.app_nm_mid[0]}. ${applicantData?.app_nm_last} ${applicantData?.app_nm_extn}`;
				setInitials(values);
				setApplicantName(name);
			})
			.catch((error) => {});
	};
	return (
		<React.Fragment>
			<div className="pds-profile-main-view">
				<div className="form-header">
					<img src={dostLogo} width="50px" height="50px" alt="dost-logo" />
					<h3>Department of Science and Technology</h3>
					<p>General Santos Avenue, Bicutan Taguig City</p> <br />
					<br />
					<p
						style={{
							fontSize: "1.5rem",
							fontWeight: "600",
							paddingTop: "1rem",
						}}
					>
						Employment Background Check
					</p>
					<br />
					<h1 style={{ color: "rgb(0, 78, 135)" }}>
						{applicantName.toUpperCase()}
					</h1>
				</div>
				<br></br>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div className="add-office-modal">
						<div className="item-modal-5">
							<label>
								<strong style={{ color: "red" }}>* </strong> 5. To the best of
								your knowledge, has the candidate been held liable for or has
								any pending administrative and/or criminal charge?
							</label>
							<div className="five">
								{five.map((data, index) => {
									return (
										<div
											className="item-modal-5 radio-buttons"
											style={{
												display: "flex",
												flexDirection: "row",
												alignItems: "center",
												justifyContent: "flex-start",
											}}
											key={index + ""}
										>
											<InputComponent
												id={index + "11"}
												name="11"
												type="radio"
												onChange={form.handleChange}
												maxLength="30"
												checked={form.values[11] == data.value ? true : false}
												value={data.value}
											/>
											<label htmlFor={index + "11"}>{data.label}</label>
										</div>
									);
								})}
							</div>
							{console.log(form.errors)}
							{form.touched[11] && form.errors[11] ? (
								<span className="invalid-response">{form.errors[11]}</span>
							) : null}
						</div>
					</div>
					<div class="add-office-modal">
						<div className="item-modal-5">
							<label>
								<strong style={{ color: "red" }}>* </strong> 6. Has there been
								an instance where the candidate was a subject of a grievance or
								complaint, whether formal or informal, of a co-worker, peer, or
								subordinate (if applicable)?
							</label>
							<div className="five">
								{five.map((data, index) => {
									return (
										<div
											className="item-modal-5 radio-buttons"
											style={{
												display: "flex",
												flexDirection: "row",
												alignItems: "center",
												justifyContent: "flex-start",
											}}
											key={index}
										>
											<InputComponent
												id={index}
												name="12"
												type="radio"
												onChange={form.handleChange}
												maxLength="30"
												checked={form.values[12] == data.value ? true : false}
												value={data.value}
											/>
											<label htmlFor={index}>{data.label}</label>
										</div>
									);
								})}
							</div>
							{form.touched[12] && form.errors[12] ? (
								<span className="invalid-response">{form.errors[12]}</span>
							) : null}
						</div>
					</div>
					<div className="add-office-modal">
						<div className="item-modal-5">
							<label>
								<strong style={{ color: "red" }}>* </strong> 7. What are the
								candidate's strengths?
							</label>
							<InputComponent
								name="13"
								value={form.values[13]}
								onChange={form.handleChange}
								maxLength="30"
							/>
							{form.touched[13] && form.errors[13] ? (
								<span className="invalid-response">{form.errors[13]}</span>
							) : null}
						</div>
					</div>
					<div className="add-office-modal">
						<div className="item-modal-5">
							<label>
								<strong style={{ color: "red" }}>* </strong> 8. What are the
								candidate's areas for improvement?
							</label>
							<InputComponent
								name="14"
								value={form.values[14]}
								onChange={form.handleChange}
								maxLength="30"
							/>
							{form.touched[14] && form.errors[14] ? (
								<span className="invalid-response">{form.errors[14]}</span>
							) : null}
						</div>
					</div>
					<div class="add-office-modal">
						<div className="item-modal-5">
							<label>
								<strong style={{ color: "red" }}>* </strong> 9.1. Will you
								recommend the candidate for the selected position?
							</label>
							<div className="five">
								{nine.map((data, index) => {
									return (
										<div
											className="item-modal-5 radio-buttons"
											style={{
												display: "flex",
												flexDirection: "row",
												alignItems: "center",
												justifyContent: "flex-start",
											}}
											key={index + "15"}
										>
											<InputComponent
												id={index + "15"}
												name="15"
												type="radio"
												onChange={(e) => {
													form.handleChange(e);
													if (form.values[15] == 2 && other === false) {
														setOther(true);
														setOtherValidation(
															Yup.string().required("This field is required")
														);
													} else {
														setOther(false);
														setOtherValidation(null);
													}
												}}
												maxLength="30"
												checked={form.values[15] == data.value ? true : false}
												value={data.value}
											/>
											<label htmlFor={index + "15"}>{data.label}</label>
										</div>
									);
								})}
								{other && (
									<div
										className="item-modal-5 radio-buttons"
										style={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
											paddingTop: "1rem",
										}}
									>
										<TextAreaComponent
											name="16"
											value={form.values[16]}
											onChange={form.handleChange}
											maxLength="30"
										/>
										{form.touched[16] && form.errors[16] ? (
											<span className="invalid-response">
												{form.errors[16]}
											</span>
										) : null}
									</div>
								)}
							</div>
							{form.touched[15] && form.errors[15] ? (
								<span className="invalid-response">{form.errors[15]}</span>
							) : null}
						</div>
					</div>
					<div className="add-office-modal">
						<div className="item-modal-5">
							<label>
								<strong style={{ color: "red" }}>* </strong> 9.2. What makes the
								candidate the best fit for the job?
							</label>
							<InputComponent
								name="17"
								value={form.values[17]}
								onChange={form.handleChange}
								maxLength="30"
							/>
							{form.touched[17] && form.errors[17] ? (
								<span className="invalid-response">{form.errors[17]}</span>
							) : null}
						</div>
					</div>
					<div className="add-office-modal">
						<div className="item-modal-5">
							<label>
								<strong style={{ color: "red" }}>* </strong> 9.2. Additional
								job-related information about the candidate relevant to his/her
								position.
							</label>
							<TextAreaComponent
								name="18"
								value={form.values[18]}
								onChange={form.handleChange}
								maxLength="30"
							/>
							{form.touched[18] && form.errors[18] ? (
								<span className="invalid-response">{form.errors[18]}</span>
							) : null}
						</div>
					</div>
				</div>

				<br />
				<form style={{ boxSizing: "border-box" }} onSubmit={form.handleSubmit}>
					<div
						className="add-office-modal"
						style={{ display: "flex", flexDirection: "row" }}
					>
						<div className="item-modal-5">
							<p>3/3</p>
						</div>
						<div
							class="item-modal-5"
							style={{
								display: "flex",
								justifyContent: "flex-end",
								gap: "12px",
							}}
						>
							<ButtonComponent
								type="button"
								buttonLogoStart={<AiOutlineLeft size="15px" />}
								className="next-button"
								buttonName="Back"
								onClick={(e) => {
									e.stopPropagation();
									navigate(`/background-check/two/${reference}/${applicant}`);
								}}
							/>
							<ButtonComponent
								type="button"
								buttonLogoEnd={<AiOutlineRight size="15px" />}
								className="next-button"
								buttonName="Submit"
								onClick={form.handleSubmit}
							/>
						</div>
					</div>
				</form>
				<br />
				<br />
			</div>
		</React.Fragment>
	);
};

export default BackgroundCheckFormThree;
