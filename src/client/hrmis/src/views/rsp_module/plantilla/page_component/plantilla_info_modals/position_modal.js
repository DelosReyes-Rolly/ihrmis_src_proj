import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import ModalComponent from "../../../../common/modal_component/modal_component";
import InputComponent from "../../../../common/input_component/input_component/input_component";
import SelectComponent from "../../../../common/input_component/select_component/select_component";
import {
	categoryInputCategory,
	educationInputItem,
} from "../../../library/static/input_items";
import axios from "axios";
import { API_HOST } from "../../../../../helpers/global/global_config";
import { usePopUpHelper } from "../../../../../helpers/use_hooks/popup_helper";
import TextAreaComponent from "../../../../common/input_component/textarea_input_component/textarea_input_component";
import Creatable from "react-select/creatable";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setRefresh } from "../../../../../features/reducers/popup_response";

const customStyles = {
	option: (provided, state) => ({
		...provided,
		borderBottom: "1px dotted pink",
		color: state.isSelected ? "red" : "blue",
		padding: 20,
	}),
	control: () => ({
		// none of react-select's styles are passed to <Control />
		width: 200,
	}),
	singleValue: (provided, state) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = "opacity 300ms";

		return { ...provided, opacity, transition };
	},
};

const PositionModal = ({ isDisplay, onClose, id = null }) => {
	const { renderBusy, renderFailed, renderSucceed } = usePopUpHelper();
	const [arrayValues, setArrayValues] = useState([]); // Object value
	const [officeStandard, setOfficeStandard] = useState();
	const dispatch = useDispatch();
	const getEditOfficeCscStandard = async () => {
		if (id !== null) {
			await axios
				.get(API_HOST + "get-position/" + id)
				.then((res) => {
					setOfficeStandard(res.data.data);
					setArrayValues(res.data.data.education.std_keyword ?? []);
				})
				.catch((err) => {});
		}
	};

	const positionFormik = useFormik({
		enableReinitialize: true,
		initialValues: {
			pos_id: officeStandard?.pos_id ?? "",
			pos_title: officeStandard?.pos_title ?? "",
			pos_short_name: officeStandard?.pos_short_name ?? "",
			pos_salary_grade: officeStandard?.pos_salary_grade ?? "",
			pos_category: officeStandard?.pos_category ?? "",
			eligibility: officeStandard?.csc?.std_keyword ?? "",
			eli_specify: officeStandard?.csc?.std_specifics ?? "",

			education: officeStandard?.education?.std_keyword ?? [],

			edu_level: "",
			edu_keyword: "",
			edu_specify: officeStandard?.education?.std_specifics ?? "",

			exp_year: officeStandard?.experience?.std_quantity ?? "",
			exp_keyword: officeStandard?.experience?.std_keyword ?? "",
			exp_specify: officeStandard?.experience?.std_specifics ?? "",

			trn_hour: officeStandard?.training?.std_quantity ?? "",
			trn_keyword: officeStandard?.training?.std_keyword ?? "",
			trn_specify: officeStandard?.training?.std_specifics ?? "",
		},
		validationSchema: Yup.object({
			pos_title: Yup.string().required("This field is required"),
			pos_short_name: Yup.string().required("This field is required"),
			pos_salary_grade: Yup.string().required("This field is required"),
			pos_category: Yup.string().required("This field is required"),
			eligibility: Yup.array().required("This field is required"),
			// eligibility: Yup.array().required("This field is required"),
			eli_specify: Yup.string().required("This field is required"),

			education: Yup.array(),

			edu_level: Yup.string().when("education", {
				is: (education) => education?.length === 0,
				then: Yup.string().required("This field is required"),
			}),
			edu_keyword: Yup.string().when("education", {
				is: (education) => education?.length === 0,
				then: Yup.string().required("This field is required"),
			}),
			edu_specify: Yup.string().required("This field is required"),

			exp_year: Yup.number().required("This field is required"),
			exp_keyword: Yup.string().required("This field is required"),
			exp_specify: Yup.string().required("This field is required"),

			trn_hour: Yup.number().required("This field is required"),
			trn_keyword: Yup.string().required("This field is required"),
			trn_specify: Yup.string().required("This field is required"),
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);
			await axios
				.post(API_HOST + "create-position", value)
				.then((res) => {
					renderSucceed({});
					setArrayValues([]);
					dispatch(setRefresh());
					resetForm();
					onClose();
				})
				.catch((err) => {
					renderFailed({ content: err.message });
				});
			renderBusy(false);
		},
	});

	useEffect(() => {
		if (id) {
			getEditOfficeCscStandard();
		}
	}, [id]);

	return (
		<React.Fragment>
			<ModalComponent
				title="Position"
				isDisplay={isDisplay}
				onClose={onClose}
				onSubmit={positionFormik.handleSubmit}
				// onSubmitType="submit"
				onClickSubmit={positionFormik.handleSubmit}
			>
				<div className="position-modal-container-1">
					<label>Title</label>
					<InputComponent
						name="pos_title"
						value={positionFormik.values.pos_title}
						maxLength={150}
						onChange={positionFormik.handleChange}
					/>

					{positionFormik.touched.pos_title &&
					positionFormik.errors.pos_title ? (
						<p className="error-validation-styles">
							{positionFormik.errors.pos_title}
						</p>
					) : null}
				</div>

				<div className="position-modal-container-2">
					<div style={{ width: "35% ", marginRight: "5px" }}>
						<label>Short Name</label>
						<InputComponent
							name="pos_short_name"
							value={positionFormik.values.pos_short_name}
							maxLength={150}
							onChange={positionFormik.handleChange}
						/>
						{positionFormik.touched.pos_short_name &&
						positionFormik.errors.pos_short_name ? (
							<p className="error-validation-styles">
								{positionFormik.errors.pos_short_name}
							</p>
						) : null}
					</div>
					<div style={{ width: "25%", marginRight: "5px", marginLeft: "5px" }}>
						<label>Salary Grade</label>
						<InputComponent
							maxLength="2"
							name="pos_salary_grade"
							value={positionFormik.values.pos_salary_grade}
							onChange={positionFormik.handleChange}
						/>
						{positionFormik.touched.pos_salary_grade &&
						positionFormik.errors.pos_salary_grade ? (
							<p className="error-validation-styles">
								{positionFormik.errors.pos_salary_grade}
							</p>
						) : null}
					</div>
					<div style={{ width: "40%", marginLeft: "5px" }}>
						<label>Category Level</label>
						<SelectComponent
							name="pos_category"
							onChange={positionFormik.handleChange}
							value={positionFormik.values.pos_category}
							itemList={categoryInputCategory}
							defaultTitle="Category Level"
						/>
						{positionFormik.touched.pos_category &&
						positionFormik.errors.pos_category ? (
							<p className="error-validation-styles">
								{positionFormik.errors.pos_category}
							</p>
						) : null}
					</div>
				</div>

				<br />
				<div className="position-modal-container-1">
					<EligibilityInput formik={positionFormik} />
					<br />

					<EducationInput
						formik={positionFormik}
						values={arrayValues}
						setValues={setArrayValues}
					/>
					<br />
					<ExperienceTraining
						title="EXPERIENCE"
						labelOne="Years"
						labelTwo="Keyword"
						formik={positionFormik}
						nameOne="exp_year"
						nameTwo="exp_keyword"
						nameThree="exp_specify"
					/>
					<br />
					<br />
					<ExperienceTraining
						title="TRAINING"
						labelOne="Hours"
						labelTwo="Keyword"
						formik={positionFormik}
						nameOne="trn_hour"
						nameTwo="trn_keyword"
						nameThree="trn_specify"
					/>
				</div>
			</ModalComponent>
		</React.Fragment>
	);
};

export default PositionModal;

const EligibilityInput = ({ formik }) => {
	const options = [
		{ value: "Csc Professional", label: "Csc Professional" },
		{ value: "Board Exam Passer", label: "Board Exam Passer" },
	];

	return (
		<React.Fragment>
			<h4>ELIGIBILITY</h4>
			<br />
			<div className="">
				<Creatable
					isClearable
					value={formik?.values?.eligibility}
					error={formik?.errors?.eligibility}
					name="eligibility"
					simpleValue
					options={options}
					styles={style}
					isMulti
					onChange={(value) => {
						formik.setFieldValue("eligibility", value);
					}}
				/>
				{formik.touched.eligibility && formik.errors.eligibility ? (
					<p className="error-validation-styles">{formik.errors.eligibility}</p>
				) : null}
			</div>

			<div className="">
				<TextAreaComponent
					placeHolder="Specific details"
					name="eli_specify"
					value={formik?.values?.eli_specify}
					onChange={formik.handleChange}
				/>
				{formik.touched.eli_specify && formik.errors.eli_specify ? (
					<p className="error-validation-styles">{formik.errors.eli_specify}</p>
				) : null}
			</div>
		</React.Fragment>
	);
};

const EducationInput = ({ formik, values, setValues, stataValue }) => {
	const [keyword, setKeyword] = useState(""); // Formik keyword value
	const [level, setLevel] = useState(""); // Formik Level value

	const setOrAddValue = () => {
		if (keyword != "") {
			if (level != "") {
				// arrHolder = []
				// arrHolder.push({ keyword, level });
				// setValues(arrHolder);
				setValues((prev) => [...prev, { keyword, level }]);
				setKeyword("");
				setLevel("");
			}
		}
	};

	const removeValue = (index) => {
		setValues([...values.slice(0, index), ...values.slice(index + 1)]);
	};

	useEffect(() => {
		formik.setFieldValue("education", values);
	}, [values]);

	return (
		<React.Fragment>
			<h4>EDUCATION</h4>
			<hr />

			{formik.values.education &&
				formik.values.education.map((value, index) => {
					return (
						<div key={index} className="position-modal-container-3">
							<div style={{ width: "30%", marginRight: "5px" }}>
								<SelectComponent
									readOnly={true}
									itemList={educationInputItem}
									value={value?.level}
								/>
							</div>

							<div style={{ width: "70%", marginLeft: "5px" }}>
								<InputComponent value={value?.keyword} readOnly={true} />
							</div>

							<div
								style={{
									display: "flex",
									alignItems: "flex-end",
									justifyContent: "flex-end",
									margin: "6px 0px 0px 5px",
								}}
							>
								<AiOutlineMinusCircle
									size="23px"
									style={{ color: "red" }}
									onClick={() => {
										removeValue(index);
									}}
								/>
							</div>
						</div>
					);
				})}

			<div className="position-modal-container-3">
				<div style={{ width: "30%", marginRight: "5px" }}>
					<SelectComponent
						name="edu_level"
						itemList={educationInputItem}
						value={level}
						onChange={(e) => setLevel(e.target.value)}
					/>
					{formik.touched.edu_level && formik.errors.edu_level ? (
						<p className="error-validation-styles">{formik.errors.edu_level}</p>
					) : null}
				</div>

				<div style={{ width: "70%", marginLeft: "5px" }}>
					<InputComponent
						name="edu_keyword"
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
					/>
					{formik.touched.edu_keyword && formik.errors.edu_keyword ? (
						<p className="error-validation-styles">
							{formik.errors.edu_keyword}
						</p>
					) : null}
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "flex-end",
						justifyContent: "flex-end",
						margin: "6px 0px 0px 5px",
					}}
				>
					<AiOutlinePlusCircle
						size="23px"
						style={{ color: "green" }}
						onClick={() => setOrAddValue()}
					/>
				</div>
			</div>

			<div className="">
				<TextAreaComponent
					placeHolder="Specific details"
					name="edu_specify"
					onChange={formik.handleChange}
				/>
				{formik.touched.edu_specify && formik.errors.edu_specify ? (
					<p className="error-validation-styles">{formik.errors.edu_specify}</p>
				) : null}
			</div>
		</React.Fragment>
	);
};

const ExperienceTraining = ({
	title,
	labelOne,
	labelTwo,
	formik,
	nameOne,
	nameTwo,
	nameThree,
}) => {
	return (
		<React.Fragment>
			<h4>{title}</h4>
			<hr />
			<div className="position-modal-container-3">
				<div style={{ width: "30%", marginRight: "5px" }}>
					<label>{labelOne}</label>
					<InputComponent
						type="number"
						value={formik?.values[nameOne]}
						name={nameOne}
						onChange={formik?.handleChange}
					/>
					{formik?.touched[nameOne] && formik?.errors[nameOne] ? (
						<p className="error-validation-styles">{formik?.errors[nameOne]}</p>
					) : null}
				</div>
				<div style={{ width: "70%", marginLeft: "5px" }}>
					<label>{labelTwo}</label>
					<InputComponent
						value={formik?.values[nameTwo]}
						name={nameTwo}
						onChange={formik?.handleChange}
					/>
					{formik?.touched[nameTwo] && formik?.errors[nameTwo] ? (
						<p className="error-validation-styles">{formik?.errors[nameTwo]}</p>
					) : null}
				</div>
			</div>

			<div>
				<TextAreaComponent
					value={formik?.values[nameThree]}
					name={nameThree}
					onChange={formik?.handleChange}
				/>
				{formik?.touched[nameThree] && formik?.errors[nameThree] ? (
					<p className="error-validation-styles">{formik?.errors[nameThree]}</p>
				) : null}
			</div>
		</React.Fragment>
	);
};

const style = {
	control: (provided, state) => ({
		backgroundColor: "white",
		border: state.isFocused
			? "1px solid 	#A9A9A9 !important"
			: "1px solid #DCDCDC !important",
		borderRadius: 5,
		fontSize: "small",
		...provided,
		boxShadow: "none",
	}),
	singleValue: (provided, state) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = "opacity 300ms";
		return {
			...provided,
			opacity,
			transition,
		};
	},
};
