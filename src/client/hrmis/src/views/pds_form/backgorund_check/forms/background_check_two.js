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

const BackgroundCheckFormTwo = () => {
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

	const checkboxes = [
		{ label: "Habitual Tardiness", value: 1 },
		{ label: "Absenteeism", value: 2 },
		{ label: "Dishonesty", value: 3 },
		{ label: "Disgraceful and immoral conduct", value: 4 },
		{ label: "Gossiping, rumor-mongering", value: 5 },
		{ label: "Discourtesy in the course of official duties", value: 6 },
		{ label: "Violation of reasonable office rules and regulation", value: 7 },
		{
			label: "Using office equipment and/or supplies for personal use",
			value: 8,
		},
		{
			label:
				"Loitering/loafing, not observing prescribed office hours/schedule",
			value: 9,
		},
		{ label: "None", value: 10 },
		{ label: "Other", value: 11 },
	];

	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			6: initials[6] ?? "",
			7: initials[7] ?? "",
			8: initials[8] ?? "",
			9: initials[9] ?? "",
			10: initials[10] ?? "",
		},
		validationSchema: Yup.object({
			6: Yup.string().required("This field is required"),
			7: Yup.string().required("This field is required"),
			8: Yup.string().required("This field is required"),
			9: Yup.array()
				.min(1, "This field is required")
				.of(Yup.string().required())
				.required("This field is required"),
			10: otherValidation,
		}),
		onSubmit: async (value, { resetForm }) => {
			value.applicant_id = applicant;
			value.reference = reference;
			const nine = value[9].join(",");
			value.nine = nine;
			await axios
				.post(API_HOST + "new-reference-check", value)
				.then(() => {
					navigate(`/background-check/three/${reference}/${applicant}`);
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
					if (element.chk_question == 9) {
						values[element.chk_question] = element.chk_answer?.split(",");
						const otherChecker = values[element.chk_question].filter(
							(element) => element == 11
						);
						if (otherChecker.length > 0) {
							setOther(true);
						}
					} else {
						values[element.chk_question] = element.chk_answer;
					}
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
								<strong style={{ color: "red" }}>* </strong> 3.1 Please describe
								the candidate's work ethic or attitude towards his/her job
							</label>
							<TextAreaComponent
								name="6"
								value={form.values[6]}
								onChange={form.handleChange}
								maxLength="30"
							/>
							{form.touched[6] && form.errors[6] ? (
								<span className="invalid-response">{form.errors[6]}</span>
							) : null}
						</div>
					</div>
					<div className="add-office-modal">
						<div className="item-modal-5">
							<label>
								<strong style={{ color: "red" }}>* </strong> 3.2 Please describe
								the candidate's working relations with his/her peers/co-workers
								and his/her superiors.
							</label>
							<TextAreaComponent
								name="7"
								value={form.values[7]}
								onChange={form.handleChange}
								maxLength="30"
							/>
							{form.touched[7] && form.errors[7] ? (
								<span className="invalid-response">{form.errors[7]}</span>
							) : null}
						</div>
					</div>
					<div className="add-office-modal">
						<div className="item-modal-5">
							<label>
								<strong style={{ color: "red" }}>* </strong> 3.3 What is/was the
								candidate's biggest/greatest contribution to your company?
							</label>
							<TextAreaComponent
								name="8"
								value={form.values[8]}
								onChange={form.handleChange}
								maxLength="30"
							/>
							{form.touched[8] && form.errors[8] ? (
								<span className="invalid-response">{form.errors[8]}</span>
							) : null}
						</div>
					</div>
					<div className="add-office-modal">
						<div className="item-modal-5">
							<label>
								<strong style={{ color: "red" }}>* </strong> 9 Have you observed
								the candidate to exhibit/have exhibited any of the following
								during the course of his/her employment in your office/company
								(Please tick choice's that may apply)?
							</label>
							<div className="nine">
								{checkboxes.map((data, index) => {
									let checked = false;
									if (form.values[9].length > 0) {
										let checker = form.values[9].filter(
											(element) => element == data.value
										);
										if (checker.length > 0) {
											checked = true;
										}
									}
									return (
										<div
											className="item-modal-5 radio-buttons"
											style={{
												display: "flex",
												flexDirection: "row",
												alignItems: "center",
												paddingTop: "1rem",
												width: "33%",
											}}
											key={index}
										>
											<InputComponent
												id={index}
												name="9"
												type="checkbox"
												onChange={(e) => {
													form.handleChange(e);
													if (data.value === 11) {
														if (checked === false) {
															setOther(true);
															setOtherValidation(
																Yup.string().required("This field is required")
															);
														} else {
															setOther(false);
															setOtherValidation(null);
														}
													}
												}}
												className="checkbox"
												maxLength="30"
												checked={checked}
												value={data.value}
											/>
											<label htmlFor={index} style={{}}>
												{data.label}
											</label>
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
											width: "33%",
										}}
									>
										<InputComponent
											name="10"
											value={form.values[10]}
											onChange={form.handleChange}
											maxLength="30"
										/>
										{form.touched[10] && form.errors[10] ? (
											<span className="invalid-response">
												{form.errors[10]}
											</span>
										) : null}
									</div>
								)}
							</div>

							{form.touched[9] && form.errors[9] ? (
								<span className="invalid-response">{form.errors[9]}</span>
							) : null}
						</div>
					</div>
					<div className="add-office-modal"></div>
				</div>
				<br />
				<form style={{ boxSizing: "border-box" }} onSubmit={form.handleSubmit}>
					<div
						className="add-office-modal"
						style={{ display: "flex", flexDirection: "row" }}
					>
						<div className="item-modal-5">
							<p>2/3</p>
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
									navigate(`/background-check/${reference}/${applicant}`);
								}}
							/>
							<ButtonComponent
								type="button"
								buttonLogoEnd={<AiOutlineRight size="15px" />}
								className="next-button"
								buttonName="Next"
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

export default BackgroundCheckFormTwo;
