import React, { useEffect, useState, Component } from "react";
import { useDispatch } from "react-redux";
import { useLocationHelper } from "../../../../helpers/use_hooks/location_helper";
import InputComponent from "../../../common/input_component/input_component/input_component";
import SelectComponent from "../../../common/input_component/select_component/select_component";
import ReCAPTCHA from "react-google-recaptcha";
import { IoCopySharp } from "react-icons/io5";
import { formOneInput } from "../../static/input_items";
import countryList from "iso-3166-country-list";
import phil from "phil-reg-prov-mun-brgy";
import PrevNextSubButtons from "../prev_next_sub_buttons";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import DostHeader from "../dost_header";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useScrollToTop } from "../../../../helpers/use_hooks/useScollTop";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setMessageError } from "../../../../features/reducers/error_handler_slice";
import {
	API_HOST,
	validationName,
	validationRequired,
	validationRequiredNum,
	validationEmail,
	yesterday,
} from "../../../../helpers/global/global_config";
import useAxiosHelper from "../../../../helpers/use_hooks/axios_helper";

const PER_ADDR_RULE = Yup.string().when("copy_res_addr", {
	is: "false",
	then: validationRequired,
});

const FormPageOne = () => {
	useScrollToTop();
	// ===================================
	// CUSTOM HOOK SERVICE
	// ===================================
	// FOR FORM
	const [getApplicantData, setgetApplicantData] = useState({});

	// FOR CLOSING POPUPS
	const { renderBusy, renderSucceed, renderFailed } = usePopUpHelper();

	// ===================================
	// REDUX STATE AND FUNCIONALITIES
	// ===================================
	const dispatch = useDispatch();

	// ===================================
	// HANDLING ROUTES
	// ===================================
	const { item } = useParams();
	const navigate = useNavigate();
	// ===================================
	// DISPLAYING SELECT MENU IN CITIZENSHIP
	// ===================================
	const [resCity, resBrgy, getResCity, getResBrgy] = useLocationHelper();
	const [perCity, perBrgy, getPerCity, getPerBrgy] = useLocationHelper();

	const [verifyCapcha, setVerifyCaptcha] = useState(false); // Use for determining if user successfully finish the captcha
	const urlpath = window.location.pathname;
	const route = urlpath.split("/");
	const parameter = item ? "/" + item : "";
	let position = undefined;

	if (route[3] === "applicant") {
		console.log(route[4]);
		position = "/" + route[4];
	}
	const getApplicantRecord = async () => {
		if (position === undefined) {
			await axios
				.get(API_HOST + `get-new-applicant${parameter}`)
				.then((res) => {
					const data = res ? res.data.data : null;
					console.log(data);
					getResCity(data ? data.res_province : "");
					getResBrgy(data ? data.res_municipality : "");
					getPerCity(data.per_province ?? "");
					getPerBrgy(data.per_municipality ?? "");
					setgetApplicantData({ ...data });
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const checkItemIfNull = () => {
		if (item !== undefined) setVerifyCaptcha(true);
	};

	useEffect(() => {
		checkItemIfNull();
		getApplicantRecord();
	}, []);

	const pdsOneInputHandler = useFormik({
		enableReinitialize: true,
		initialValues: {
			app_nm_last: getApplicantData?.app_nm_last ?? "",
			app_nm_first: getApplicantData?.app_nm_first ?? "",
			app_nm_extn: getApplicantData?.app_nm_extn ?? "",
			app_nm_mid: getApplicantData.app_nm_mid ?? "",

			app_birth_date: getApplicantData?.app_birth_date ?? "",
			app_birth_place: getApplicantData?.app_birth_place ?? "",
			app_sex: getApplicantData?.app_sex ?? "",
			app_blood_type: getApplicantData?.app_blood_type ?? "",
			app_civil_status: getApplicantData?.app_civil_status ?? "",
			app_civil_others: getApplicantData?.app_civil_others ?? "",
			app_height: getApplicantData.app_height ?? "",
			app_weight: getApplicantData?.app_weight ?? "",

			app_gsis: getApplicantData?.app_gsis ?? "",
			app_pagibig: getApplicantData?.app_pagibig ?? "",
			app_philhealth: getApplicantData?.app_philhealth ?? "",
			app_sss: getApplicantData?.app_sss ?? "",
			app_tin: getApplicantData?.app_tin ?? "",
			app_emp_no: getApplicantData?.app_emp_no ?? "",

			app_filipino: getApplicantData?.app_filipino ?? undefined,
			app_dual_cny_id: getApplicantData?.app_dual_cny_id ?? "",
			app_dual_type_check:
				getApplicantData?.app_dual_type != 0 &&
				getApplicantData?.app_dual_type != null
					? true
					: false,

			app_dual_type: getApplicantData?.app_dual_type ?? "",

			res_block_lot: getApplicantData?.res_block_lot ?? "",
			res_street: getApplicantData?.res_street ?? "",
			res_sub_village: getApplicantData?.res_sub_village ?? "",
			res_zip_code: getApplicantData?.res_zip_code ?? "",
			res_province: getApplicantData?.res_province ?? "",
			res_municipality: getApplicantData?.res_municipality ?? "",
			res_barangay: getApplicantData?.res_barangay ?? "",

			copy_res_addr: false,

			per_block_lot: getApplicantData?.per_block_lot ?? "",
			per_street: getApplicantData?.per_street ?? "",
			per_sub_village: getApplicantData?.per_sub_village ?? "",
			per_zip_code: getApplicantData?.per_zip_code ?? "",
			per_province: getApplicantData?.per_province ?? "",
			per_municipality: getApplicantData?.per_municipality ?? "",
			per_barangay: getApplicantData?.per_barangay ?? "",

			app_tel_no: getApplicantData?.app_tel_no ?? "",
			app_mobile_no: getApplicantData?.app_mobile_no ?? "",
			app_email_addr: getApplicantData?.app_email_addr ?? "",
		},

		validationSchema: Yup.object({
			app_nm_last: validationName,
			app_nm_first: validationName,
			app_nm_extn: validationName,
			app_nm_mid: validationName,

			app_birth_date: validationRequired.max(yesterday, "Invalid Birthdate"),
			app_birth_place: validationRequired,
			app_sex: validationRequired,
			app_blood_type: validationRequired,
			app_civil_status: validationRequired,
			app_civil_others: Yup.string().when("app_civil_status", {
				is: "OT",
				then: validationRequired,
			}),
			app_height: validationRequiredNum,
			app_weight: validationRequiredNum,

			app_gsis: validationRequired,
			app_pagibig: validationRequired,
			app_philhealth: validationRequired,
			app_sss: validationRequired,
			app_tin: validationRequired,
			app_emp_no: validationRequired,

			app_filipino: validationRequiredNum,
			app_dual_cny_id: Yup.string().when("app_filipino", {
				is: 0,
				then: Yup.string().required("This field is required"),
			}),
			app_dual_type_check: Yup.bool(),
			app_dual_type: Yup.string().when("app_dual_type_check", {
				is: 1,
				then: Yup.string().required("This field is required"),
			}),

			res_block_lot: validationRequired,
			res_street: validationRequired,
			res_sub_village: validationRequired,
			res_zip_code: validationRequiredNum,
			res_province: validationRequired,
			res_municipality: validationRequired,
			res_barangay: validationRequired,

			copy_res_addr: Yup.string(),

			per_block_lot: PER_ADDR_RULE,
			per_street: PER_ADDR_RULE,
			per_sub_village: PER_ADDR_RULE,
			per_zip_code: Yup.number().when("copy_res_addr", {
				is: "false",
				then: validationRequiredNum,
			}),
			per_province: PER_ADDR_RULE,
			per_municipality: PER_ADDR_RULE,
			per_barangay: PER_ADDR_RULE,

			app_tel_no: validationRequiredNum,
			app_mobile_no: validationRequiredNum,
			app_email_addr: validationEmail,
		}),
		onSubmit: async (values) => {
			console.log(values);
			if (verifyCapcha === true) {
				renderBusy(true);
				await useAxiosHelper
					.post(
						values,
						position !== undefined
							? "new-applicant" + position
							: "modify-applicant" + item
					)
					.then(() => {
						renderSucceed({ content: "Form submitted" });
						if (position !== undefined) {
							navigate(
								"/pds-applicant/email-confirmation/" + values.app_email_addr
							);
						}
					})
					.catch((err) => renderFailed({ content: err.message }));
				renderBusy(false);
			} else {
				renderFailed({ content: "Please complete the CAPTCHA" });
			}
		},
	});

	return (
		<React.Fragment>
			<div className="pds-profile-main-view">
				<DostHeader />
				<br />
				<form
					style={{ boxSizing: "border-box" }}
					onSubmit={pdsOneInputHandler.handleSubmit}
				>
					<table id="custom-table">
						<thead>
							<tr className="main-headers">
								<th className="">I. PERSONAL INFORMATION</th>
							</tr>
						</thead>
					</table>
					<br />
					<UserNameInformation formik={pdsOneInputHandler} />
					<br />
					<OtherUserInformation formik={pdsOneInputHandler} />
					<br />
					<EmploymentInformation formik={pdsOneInputHandler} />
					<br />
					<CitizenshipInformation formik={pdsOneInputHandler} />
					<br />
					<ResAddressInformation
						formik={pdsOneInputHandler}
						resCity={resCity}
						resBrgy={resBrgy}
						getResCity={getResCity}
						getResBrgy={getResBrgy}
					/>
					<br />
					<PerAddressInformation
						formik={pdsOneInputHandler}
						perCity={perCity}
						perBrgy={perBrgy}
						getPerCity={getPerCity}
						getPerBrgy={getPerBrgy}
					/>
					<br />
					<UserContactInformation formik={pdsOneInputHandler} />
					<br />
					<br />
					{/* 
              //==========================================
              // CAPTCHA INFORMATION SECTION
              //==========================================
          */}
					<div
						className={"pds-prof-class-two"}
						style={
							item == undefined
								? { justifyContent: "space-between" }
								: { justifyContent: "end" }
						}
					>
						{item === undefined ? (
							<div>
								<ReCAPTCHA
									sitekey="6LdIujEcAAAAAJRdTNTP0jkmHt60fVZMlj7Fn7nT"
									onChange={() => setVerifyCaptcha(true)}
									onExpired={() => {
										if (item === undefined) {
											setVerifyCaptcha(false);
										}
									}}
									onErrored={() => {
										if (item === undefined) {
											setVerifyCaptcha(false);
										}
									}}
								/>
							</div>
						) : undefined}
						<div>
							<PrevNextSubButtons
								page={1}
								onClickNext={() => {
									navigate(`/pds-applicant/form-page-two/${item}`);
									dispatch(setMessageError(undefined));
								}}
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

export default FormPageOne;

//==========================================
// USER NAME INFORMATION SECTION
//==========================================

const UserNameInformation = ({ formik }) => {
	return (
		<React.Fragment>
			<div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
				<div style={{ marginRight: "5px", width: "50%" }}>
					<label>Surname</label>
					<InputComponent
						maxLength="50"
						name="app_nm_last"
						value={formik.values.app_nm_last}
						onChange={formik.handleChange}
					/>
					{formik.touched.app_nm_last && formik.errors.app_nm_last ? (
						<span className="invalid-response">
							{formik.errors.app_nm_last}
						</span>
					) : null}
				</div>

				<div style={{ marginLeft: "5px", width: "50%" }}>
					<label>First Name</label>
					<InputComponent
						maxLength="50"
						name="app_nm_first"
						value={formik.values.app_nm_first}
						onChange={formik.handleChange}
					/>
					{formik.touched.app_nm_first && formik.errors.app_nm_first ? (
						<span className="invalid-response">
							{formik.errors.app_nm_first}
						</span>
					) : null}
				</div>
			</div>
			<div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
				<div style={{ marginRight: "5px", width: "50%" }}>
					<label>Name Extension (Jr., Sr.)</label>
					<InputComponent
						maxLength="10"
						name="app_nm_extn"
						value={formik.values.app_nm_extn}
						onChange={formik.handleChange}
					/>
					{formik.touched.app_nm_extn && formik.errors.app_nm_extn ? (
						<span className="invalid-response">
							{formik.errors.app_nm_extn}
						</span>
					) : null}
				</div>
				<div style={{ marginLeft: "5px", width: "50%" }}>
					<label>Middle Name</label>
					<InputComponent
						maxLength="50"
						name="app_nm_mid"
						value={formik.values.app_nm_mid}
						onChange={formik.handleChange}
					/>
					{formik.touched.app_nm_mid && formik.errors.app_nm_mid ? (
						<span className="invalid-response">{formik.errors.app_nm_mid}</span>
					) : null}
				</div>
			</div>
			<br />
		</React.Fragment>
	);
};

const OtherUserInformation = ({ formik }) => {
	return (
		<React.Fragment>
			<div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
				<div style={{ marginRight: "5px", width: "25%" }}>
					<label> Date of Birth</label>
					<InputComponent
						type="date"
						name="app_birth_date"
						value={formik.values.app_birth_date}
						onChange={formik.handleChange}
					/>
					{formik.touched.app_birth_date && formik.errors.app_birth_date ? (
						<span className="invalid-response">
							{formik.errors.app_birth_date}
						</span>
					) : null}
				</div>

				<div style={{ marginRight: "5px", marginLeft: "5px", width: "45%" }}>
					<label>Place of Birth</label>
					<InputComponent
						maxLength="50"
						name="app_birth_place"
						value={formik.values.app_birth_place}
						onChange={formik.handleChange}
					/>
					{formik.touched.app_birth_place && formik.errors.app_birth_place ? (
						<span className="invalid-response">
							{formik.errors.app_birth_place}
						</span>
					) : null}
				</div>

				<div style={{ marginRight: "5px", marginLeft: "5px", width: "15%" }}>
					<label>Sex</label>
					<SelectComponent
						name="app_sex"
						itemList={formOneInput.sex}
						defaultTitle="Sex"
						value={formik.values.app_sex}
						onChange={formik.handleChange}
					/>
					{formik.touched.app_sex && formik.errors.app_sex ? (
						<span className="invalid-response">{formik.errors.app_sex}</span>
					) : null}
				</div>

				<div style={{ marginLeft: "5px", width: "15%" }}>
					<label>Blood Type</label>
					<SelectComponent
						name="app_blood_type"
						itemList={formOneInput.blood_type}
						defaultTitle="Blood Type"
						value={formik.values.app_blood_type}
						onChange={formik.handleChange}
					/>
					{formik.touched.app_blood_type && formik.errors.app_blood_type ? (
						<span className="invalid-response">
							{formik.errors.app_blood_type}
						</span>
					) : null}
				</div>
			</div>

			<div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
				<div style={{ marginRight: "5px", width: "25%" }}>
					<label>Civil Status</label>
					<SelectComponent
						name="app_civil_status"
						itemList={formOneInput.civil_status}
						defaultTitle="Civil Status"
						value={formik.values.app_civil_status}
						onChange={formik.handleChange}
					/>
					{formik.touched.app_civil_status && formik.errors.app_civil_status ? (
						<span className="invalid-response">
							{formik.errors.app_civil_status}
						</span>
					) : null}
				</div>
				<div style={{ marginRight: "5px", marginLeft: "5px", width: "45%" }}>
					<label>If others, please specify</label>
					<InputComponent
						maxLength="50"
						name="app_civil_others"
						value={formik.values.app_civil_others}
						onChange={formik.handleChange}
					/>
					{formik.touched.app_civil_others && formik.errors.app_civil_others ? (
						<span className="invalid-response">
							{formik.errors.app_civil_others}
						</span>
					) : null}
				</div>
				<div style={{ marginRight: "5px", marginLeft: "5px", width: "15%" }}>
					<label>Height (m)</label>
					<InputComponent
						maxLength="6"
						minLength="3"
						name="app_height"
						value={formik.values.app_height}
						onChange={formik.handleChange}
					/>
					{formik.touched.app_height && formik.errors.app_height ? (
						<span className="invalid-response">{formik.errors.app_height}</span>
					) : null}
				</div>
				<div style={{ marginLeft: "5px", width: "15%" }}>
					<label>Weight (kg)</label>
					<InputComponent
						maxLength="6"
						minLength="3"
						name="app_weight"
						value={formik.values.app_weight}
						onChange={formik.handleChange}
					/>
					{formik.touched.app_weight && formik.errors.app_weight ? (
						<span className="invalid-response">{formik.errors.app_weight}</span>
					) : null}
				</div>
			</div>
		</React.Fragment>
	);
};

const EmploymentInformation = ({ formik }) => {
	return (
		<React.Fragment>
			<div className="pds-prof-class-one">
				<div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
					<div style={{ marginRight: "5px", width: "33%" }}>
						<label>GSIS ID No.</label>
						<InputComponent
							maxLength="20"
							name="app_gsis"
							value={formik.values.app_gsis}
							onChange={formik.handleChange}
						/>
						{formik.touched.app_gsis && formik.errors.app_gsis ? (
							<span className="invalid-response">{formik.errors.app_gsis}</span>
						) : null}
					</div>
					<div style={{ marginRight: "5px", marginLeft: "5px", width: "33%" }}>
						<label>PAG-IBIG ID No</label>
						<InputComponent
							maxLength="20"
							name="app_pagibig"
							value={formik.values.app_pagibig}
							onChange={formik.handleChange}
						/>
						{formik.touched.app_pagibig && formik.errors.app_pagibig ? (
							<span className="invalid-response">
								{formik.errors.app_pagibig}
							</span>
						) : null}
					</div>
					<div style={{ marginLeft: "5px", width: "33%" }}>
						<label>PHILHEALTH No.</label>
						<InputComponent
							page="1"
							maxLength="20"
							name="app_philhealth"
							value={formik.values.app_philhealth}
							onChange={formik.handleChange}
						/>
						{formik.touched.app_philhealth && formik.errors.app_philhealth ? (
							<span className="invalid-response">
								{formik.errors.app_philhealth}
							</span>
						) : null}
					</div>
				</div>
			</div>
			<div className="pds-prof-class-one">
				<div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
					<div style={{ marginRight: "5px", width: "33%" }}>
						<label>SSS No.</label>
						<InputComponent
							maxLength="20"
							name="app_sss"
							value={formik.values.app_sss}
							onChange={formik.handleChange}
						/>
						{formik.touched.app_sss && formik.errors.app_sss ? (
							<span className="invalid-response">{formik.errors.app_sss}</span>
						) : null}
					</div>
					<div style={{ marginRight: "5px", marginLeft: "5px", width: "33%" }}>
						<label>TIN No</label>
						<InputComponent
							maxLength="20"
							name="app_tin"
							value={formik.values.app_tin}
							onChange={formik.handleChange}
						/>
						{formik.touched.app_tin && formik.errors.app_tin ? (
							<span className="invalid-response">{formik.errors.app_tin}</span>
						) : null}
					</div>

					<div style={{ marginLeft: "5px", width: "33%" }}>
						<label>Agency Employee No.</label>
						<InputComponent
							maxLength="20"
							name="app_emp_no"
							value={formik.values.app_emp_no}
							onChange={formik.handleChange}
						/>
						{formik.touched.app_emp_no && formik.errors.app_emp_no ? (
							<span className="invalid-response">
								{formik.errors.app_emp_no}
							</span>
						) : null}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

const CitizenshipInformation = ({ formik }) => {
	return (
		<React.Fragment>
			<div
				className="flex-row items-align-center"
				style={{ marginBottom: "10px" }}
			>
				<h5 style={{ color: "rgba(54, 58, 63, 0.8)" }}>CITIZENSHIP</h5>
				{formik.touched.app_filipino && formik.errors.app_filipino ? (
					<label
						className="invalid-response"
						style={{ fontSize: "small", paddingLeft: "10px" }}
					>
						{formik.errors.app_filipino}
					</label>
				) : null}
			</div>
			<div className="main-citizen-container">
				<div className="secondary-citizen-container">
					<div className="check-list">
						<input
							type="radio"
							value="1"
							name="app_filipino"
							onChange={formik.handleChange}
							checked={
								parseInt(formik.values.app_filipino) === 1 ? true : false
							}
						/>
						<span style={{ paddingLeft: "10px" }}>Filipino</span>
					</div>
					<br />
					<div className="check-list-others">
						<div className="check-list" style={{ width: "30%" }}>
							<input
								type="radio"
								value="0"
								name="app_filipino"
								onChange={formik.handleChange}
								checked={
									parseInt(formik.values.app_filipino) === 0 ? true : false
								}
							/>
							<span style={{ paddingLeft: "10px" }}>Others</span>
						</div>

						{formik.values.app_filipino == 0 ? (
							<div
								className="citizen-select"
								style={{ paddingLeft: "10px", width: "70%" }}
							>
								<SelectComponent
									name="app_dual_cny_id"
									itemList={countryList}
									defaultTitle="Specify Country"
									value={formik.values.app_dual_cny_id}
									onChange={formik.handleChange}
								/>
								{formik.touched.app_dual_cny_id &&
								formik.errors.app_dual_cny_id ? (
									<span className="invalid-response error-position">
										{formik.errors.app_dual_cny_id}
									</span>
								) : null}
							</div>
						) : null}
					</div>
				</div>

				{/* SECONDARY */}
				{formik.values.app_filipino == 1 ? (
					<div className="secondary-citizen-container-two">
						<div className="check-list" style={{ width: "30%" }}>
							<input
								type="checkbox"
								value="1"
								name="app_dual_type_check"
								onChange={formik.handleChange}
								checked={formik.values.app_dual_type_check}
							/>
							<span style={{ paddingLeft: "10px" }}>Dual Citizen</span>
						</div>

						<div
							className="citizen-select"
							style={{ marginLeft: "10px", width: "70%" }}
						>
							<SelectComponent
								name="app_dual_type"
								itemList={formOneInput.dual_citizen_type}
								value={formik.values.app_dual_type}
								onChange={formik.handleChange}
							/>
							{formik.touched.app_dual_type && formik.errors.app_dual_type ? (
								<span className="invalid-response error-position">
									{formik.errors.app_dual_type}
								</span>
							) : null}
						</div>
					</div>
				) : null}
			</div>
			<br />
		</React.Fragment>
	);
};

const ResAddressInformation = ({
	formik,
	resCity,
	resBrgy,
	getResCity,
	getResBrgy,
}) => {
	return (
		<React.Fragment>
			<h5 style={{ color: "rgba(54, 58, 63, 0.8)", marginBottom: "10px" }}>
				RESIDENTIAL ADDRESS
			</h5>
			<div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
				<div style={{ marginRight: "5px", width: "20%" }}>
					<label>House/Block/Lot No.</label>
					<InputComponent
						maxLength="30"
						name="res_block_lot"
						value={formik.values.res_block_lot}
						onChange={formik.handleChange}
					/>
					{formik.touched.res_block_lot && formik.errors.res_block_lot ? (
						<span className="invalid-response">
							{formik.errors.res_block_lot}
						</span>
					) : null}
				</div>
				<div style={{ marginRight: "5px", marginLeft: "5px", width: "25%" }}>
					<label>Street</label>
					<InputComponent
						maxLength="40"
						name="res_street"
						value={formik.values.res_street}
						onChange={formik.handleChange}
					/>
					{formik.touched.res_street && formik.errors.res_street ? (
						<span className="invalid-response">{formik.errors.res_street}</span>
					) : null}
				</div>
				<div style={{ marginRight: "5px", marginLeft: "5px", width: "40%" }}>
					<label>Subdivision/Village</label>
					<InputComponent
						maxLength="40"
						name="res_sub_village"
						value={formik.values.res_sub_village}
						onChange={formik.handleChange}
					/>
					{formik.touched.res_sub_village && formik.errors.res_sub_village ? (
						<span className="invalid-response">
							{formik.errors.res_sub_village}
						</span>
					) : null}
				</div>
				<div style={{ marginLeft: "5px", width: "15%" }}>
					<label>Zip Code</label>

					<InputComponent
						maxLength="4"
						name="res_zip_code"
						value={formik.values.res_zip_code}
						onChange={formik.handleChange}
					/>
					{formik.touched.res_zip_code && formik.errors.res_zip_code ? (
						<span className="invalid-response">
							{formik.errors.res_zip_code}
						</span>
					) : null}
				</div>
			</div>
			<div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
				<div style={{ marginRight: "5px", width: "33%" }}>
					<label>Province</label>
					<SelectComponent
						name="res_province"
						defaultTitle="Province"
						itemList={phil.provinces}
						value={formik.values.res_province}
						onChange={(e) => {
							formik.handleChange(e);
							getResCity(e.target.value);
						}}
					/>
					{formik.touched.res_province && formik.errors.res_province ? (
						<span className="invalid-response">
							{formik.errors.res_province}
						</span>
					) : null}
				</div>
				<div style={{ marginRight: "5px", marginLeft: "5px", width: "33%" }}>
					<label>City/Municipality</label>
					<SelectComponent
						name="res_municipality"
						defaultTitle="City"
						itemList={resCity === null ? [] : resCity}
						value={formik.values.res_municipality}
						onChange={(e) => {
							formik.handleChange(e);
							getResBrgy(e.target.value);
						}}
					/>
					{formik.touched.res_municipality && formik.errors.res_municipality ? (
						<span className="invalid-response">
							{formik.errors.res_municipality}
						</span>
					) : null}
				</div>
				<div style={{ marginLeft: "5px", width: "33%" }}>
					<label>Barangay</label>
					<SelectComponent
						name="res_barangay"
						defaultTitle="Barangay"
						itemList={resBrgy == null ? [] : resBrgy}
						value={formik.values.res_barangay}
						onChange={formik.handleChange}
					/>
					{formik.touched.res_barangay && formik.errors.res_barangay ? (
						<span className="invalid-response">
							{formik.errors.res_barangay}
						</span>
					) : null}
				</div>
			</div>
		</React.Fragment>
	);
};

const PerAddressInformation = ({
	formik,
	perCity,
	perBrgy,
	getPerCity,
	getPerBrgy,
}) => {
	return (
		<React.Fragment>
			<div className="per-address-head">
				<h5 style={{ color: "rgba(54, 58, 63, 0.8)" }}>PERMANENT ADDRESS</h5>
				<label className="res-address-copy" htmlFor="copy_res_addr">
					<IoCopySharp className="copy-icon" size="14px" />
					{formik.values.copy_res_addr === false
						? "Copy Resedential Address"
						: "Input Permanent Address"}
				</label>
				<input
					type="checkbox"
					name="copy_res_addr"
					value={true}
					id="copy_res_addr"
					onChange={formik.handleChange}
					hidden
				/>
			</div>
			{formik.values.copy_res_addr === false ? (
				<div>
					<div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
						<div style={{ marginRight: "5px", width: "20%" }}>
							<label>House/Block/Lot No.</label>
							<InputComponent
								maxLength="30"
								name="per_block_lot"
								value={formik.values.per_block_lot}
								onChange={formik.handleChange}
							/>
							{formik.touched.per_block_lot && formik.errors.per_block_lot ? (
								<span className="invalid-response">
									{formik.errors.per_block_lot}
								</span>
							) : null}
						</div>
						<div
							style={{
								marginRight: "5px",
								marginLeft: "5px",
								width: "25%",
							}}
						>
							<label>Street</label>
							<InputComponent
								maxLength="40"
								name="per_street"
								value={formik.values.per_street}
								onChange={formik.handleChange}
							/>
							{formik.touched.per_street && formik.errors.per_street ? (
								<span className="invalid-response">
									{formik.errors.per_street}
								</span>
							) : null}
						</div>
						<div
							style={{
								marginRight: "5px",
								marginLeft: "5px",
								width: "40%",
							}}
						>
							<label>Subdivision/Village</label>
							<InputComponent
								maxLength="40"
								name="per_sub_village"
								value={formik.values.per_sub_village}
								onChange={formik.handleChange}
							/>
							{formik.touched.per_sub_village &&
							formik.errors.per_sub_village ? (
								<span className="invalid-response">
									{formik.errors.per_sub_village}
								</span>
							) : null}
						</div>
						<div style={{ marginLeft: "5px", width: "15%" }}>
							<label>Zip Code</label>
							<InputComponent
								maxLength="4"
								name="per_zip_code"
								value={formik.values.per_zip_code}
								onChange={formik.handleChange}
							/>
							{formik.touched.per_zip_code && formik.errors.per_zip_code ? (
								<span className="invalid-response">
									{formik.errors.per_zip_code}
								</span>
							) : null}
						</div>
					</div>
					<div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
						<div style={{ marginRight: "5px", width: "33%" }}>
							<label>Province</label>
							<SelectComponent
								name="per_province"
								defaultTitle="Province"
								itemList={phil.provinces}
								value={formik.values.per_province}
								onChange={(e) => {
									formik.handleChange(e);
									getPerCity(e.target.value);
								}}
							/>
							{formik.touched.per_province && formik.errors.per_province ? (
								<span className="invalid-response">
									{formik.errors.per_province}
								</span>
							) : null}
						</div>
						<div
							style={{
								marginRight: "5px",
								marginLeft: "5px",
								width: "33%",
							}}
						>
							<label>City/Municipality</label>
							<SelectComponent
								name="per_municipality"
								defaultTitle="City"
								itemList={perCity == null ? [] : perCity}
								value={formik.values.per_municipality}
								onChange={(e) => {
									formik.handleChange(e);
									getPerBrgy(e.target.value);
								}}
							/>
							{formik.touched.per_municipality &&
							formik.errors.per_municipality ? (
								<span className="invalid-response">
									{formik.errors.per_municipality}
								</span>
							) : null}
						</div>
						<div style={{ marginLeft: "5px", width: "33%" }}>
							<label>Barangay</label>
							<SelectComponent
								name="per_barangay"
								defaultTitle="Barangay"
								itemList={perBrgy == null ? [] : perBrgy}
								value={formik.values.per_barangay}
								onChange={formik.handleChange}
							/>
							{formik.touched.per_barangay && formik.errors.per_barangay ? (
								<span className="invalid-response">
									{formik.errors.per_barangay}
								</span>
							) : null}
						</div>
					</div>
				</div>
			) : null}
		</React.Fragment>
	);
};

const UserContactInformation = ({ formik }) => {
	return (
		<React.Fragment>
			<div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
				<div style={{ marginRight: "5px", width: "30%" }}>
					<label>Telephone No.</label>
					<InputComponent
						maxLength="50"
						name="app_tel_no"
						value={formik.values.app_tel_no}
						onChange={formik.handleChange}
					/>
					{formik.touched.app_tel_no && formik.errors.app_tel_no ? (
						<span className="invalid-response">{formik.errors.app_tel_no}</span>
					) : null}
				</div>
				<div style={{ marginRight: "5px", marginLeft: "5px", width: "30%" }}>
					<label>Mobile No</label>
					<InputComponent
						maxLength="50"
						name="app_mobile_no"
						value={formik.values.app_mobile_no}
						onChange={formik.handleChange}
					/>
					{formik.touched.app_mobile_no && formik.errors.app_mobile_no ? (
						<span className="invalid-response">
							{formik.errors.app_mobile_no}
						</span>
					) : null}
				</div>
				<div style={{ marginLeft: "5px", width: "40%" }}>
					<label>Email Address</label>
					<InputComponent
						maxLength="150"
						name="app_email_addr"
						value={formik.values.app_email_addr}
						onChange={formik.handleChange}
					/>
					{formik.touched.app_email_addr && formik.errors.app_email_addr ? (
						<span className="invalid-response">
							{formik.errors.app_email_addr}
						</span>
					) : null}
				</div>
			</div>
		</React.Fragment>
	);
};
