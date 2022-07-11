import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { memo, useEffect, useMemo, useState } from "react";
import { ALERT_ENUM, popupAlert } from "../../../../../helpers/alert_response";
import { API_HOST } from "../../../../../helpers/global/global_config";
import { useIsMounted } from "../../../../../helpers/use_hooks/isMounted";
import InputComponent from "../../../../common/input_component/input_component/input_component";
import ModalComponent from "../../../../common/modal_component/modal_component";
import { usePopUpHelper } from "../../../../../helpers/use_hooks/popup_helper";
import { useDispatch } from "react-redux";
import { setRefresh } from "../../../../../features/reducers/popup_response";
import { useFilters, useGlobalFilter, useSortBy, useTable } from "react-table";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import {
	sortCompetencyRating,
	sortCompetencyScore,
} from "../../static/functions";
import TextAreaComponent from "../../../../common/input_component/textarea_input_component/textarea_input_component";

const CompetencyAssessmentModal = ({
	isDisplay,
	onClose,
	jvsRating,
	score,
	appID,
	specific,
	remarks,
}) => {
	const text = ["Education", "Relevant Trainings", "Relevant Experience"];
	const [ratingData, setRatingData] = useState([]);
	const [scores, setScores] = useState([]);
	const mounted = useIsMounted();
	const dispatch = useDispatch();
	const { renderBusy } = usePopUpHelper();

	useEffect(() => {
		let setter = sortCompetencyRating(jvsRating, specific);
		let scoreSetter = sortCompetencyScore(score);

		setRatingData(setter);
		setScores(scoreSetter);
	}, [jvsRating]);
	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			remarks: remarks ?? "",

			AS: scores?.AS ?? 0,
			ASid: scores?.AS_com_id ?? "",
			ASval:
				ratingData?.analytical?.[0]?.rtg_percent !== undefined ? true : false,

			WE: scores?.WE ?? 0,
			WEid: scores?.WE_com_id ?? "",
			WEval: ratingData?.written?.[0]?.rtg_percent !== undefined ? true : false,

			OE: scores?.OE ?? 0,
			OEid: scores?.OE_com_id ?? "",
			OEval: ratingData?.oral?.[0]?.rtg_percent !== undefined ? true : false,

			CW: scores?.CW ?? 0,
			CWid: scores?.CW_com_id ?? "",
			CWval:
				ratingData?.creative?.[0]?.rtg_percent !== undefined ? true : false,

			CS: scores?.CS ?? 0,
			CSid: scores?.CS_com_id ?? "",
			CSval:
				ratingData?.computational?.[0]?.rtg_percent !== undefined
					? true
					: false,

			OT: scores?.OT ?? 0,
			OTid: scores?.OT_com_id ?? "",
			OTval: ratingData?.other?.[0]?.rtg_percent !== undefined ? true : false,
		},
		validationSchema: Yup.object({
			AS: Yup.number().when("ASval", {
				is: true,
				then: Yup.number()
					.typeError("Must be a number")
					.max(
						ratingData["analytical"]?.[0]?.rtg_percent ?? 0,
						"Analytical Skill Score must not be higher than " +
							ratingData?.analytical?.[0]?.rtg_percent
					)
					.required("This field is required"),
			}),
			WE: Yup.number().when("WEval", {
				is: true,
				then: Yup.number()
					.typeError("Must be a number")
					.max(
						ratingData?.written?.[0]?.rtg_percent ?? 0,
						"Written Exam Score must not be higher than " +
							ratingData?.written?.[0]?.rtg_percent
					)
					.required("This field is required"),
			}),
			OE: Yup.number().when("OEval", {
				is: true,
				then: Yup.number()
					.typeError("Must be a number")
					.max(
						ratingData?.oral?.[0]?.rtg_percent ?? 0,
						"Oral Exam Score must not be higher than " +
							ratingData?.oral?.[0]?.rtg_percent
					)
					.required("This field is required"),
			}),
			CW: Yup.number().when("CWval", {
				is: true,
				then: Yup.number()
					.typeError("Must be a number")
					.max(
						ratingData?.creative?.[0]?.rtg_percent ?? 0,
						"Creative Work Score must not be higher than " +
							ratingData?.creative?.[0]?.rtg_percent
					)
					.required("This field is required"),
			}),
			CS: Yup.number().when("CSval", {
				is: true,
				then: Yup.number()
					.typeError("Must be a number")
					.max(
						ratingData?.computational?.[0]?.rtg_percent ?? 0,
						"Computational Skill Score must not be higher than " +
							ratingData?.computational?.[0]?.rtg_percent
					)
					.required("This field is required"),
			}),
			OT: Yup.number().when("OTval", {
				is: true,
				then: Yup.number()
					.typeError("Must be a number")
					.max(
						ratingData?.other?.[0]?.rtg_percent ?? 0,
						"Other Score must not be higher than " +
							ratingData?.other?.[0]?.rtg_percent
					)
					.required("This field is required"),
			}),
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);
			// value.type = ratingType[type];
			value.app_id = appID;
			await axios
				.post(API_HOST + "competency-assessment-score", value)
				.then(() => {
					dispatch(setRefresh());
				})
				.catch((err) => {
					popupAlert({
						message: err.message,
						type: ALERT_ENUM.fail,
					});
				});
			renderBusy(false);
			popupAlert({
				type: ALERT_ENUM.success,
			});
			onClose();
			resetForm();
		},
	});

	return (
		<React.Fragment>
			<ModalComponent
				title="Job Competency"
				isDisplay={isDisplay}
				onClose={onClose}
				onSubmit={form.handleSubmit}
				onSubmitType="submit"
				onSubmitName="Submit"
			>
				<div className="default-table" style={{ margin: "0px" }}>
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							flexDirection: "row",
						}}
					>
						{Object.keys(ratingData).map((key, index) => {
							if (ratingData[key].length !== 0) {
								return (
									<FactorScores
										key={key}
										ratingData={ratingData[key]}
										form={form}
										score={form.values[ratingData[key][0].rtg_com_type]}
									/>
								);
							} else {
								return "";
							}
						})}
					</div>
					<div className="add-office-modal">
						<div className="item-modal-5 right-input">
							<label>Remarks</label>
							<TextAreaComponent
								name="remarks"
								value={form.values.remarks}
								type="Number"
								className
								onChange={form.handleChange}
								maxLength="30"
							/>
							{form.touched?.remarks && form.errors?.remarks ? (
								<span className="invalid-response">{form.errors?.remarks}</span>
							) : null}
						</div>
					</div>

					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							flexDirection: "column",
						}}
					>
						{Object.keys(ratingData).map((key, index) => {
							if (ratingData[key].length !== 0) {
								return (
									<FactorWeightTable key={key} ratingData={ratingData[key]} />
								);
							} else {
								return "";
							}
						})}
					</div>
				</div>
			</ModalComponent>
		</React.Fragment>
	);
};

export default memo(CompetencyAssessmentModal);

const loopFactorWeightComponent = ({}) => {
	return;
};

const FactorScores = ({ ratingData, form, score }) => {
	const typeText = {
		AS: "Analytical Skills",
		WE: "Written Exam",
		OE: "Oral Exam",
		OT: "Other",
		CS: "Computational Skills",
		CW: "Creative Work",
	};
	return (
		<>
			<div style={{ width: "49%", marginLeft: "1%" }}>
				<div className="add-office-modal">
					<div className="item-modal-5">
						<label>
							<b>{typeText[ratingData[0]?.rtg_com_type]} </b>
						</label>
						<InputComponent
							name={ratingData[0]?.rtg_com_type}
							value={score}
							type="Number"
							onChange={(e) => {
								form.setFieldValue(ratingData[0]?.rtg_com_type, e.target.value);
							}}
							maxLength="30"
						/>
						{form.touched?.[ratingData[0]?.rtg_com_type] &&
						form.errors?.[ratingData[0]?.rtg_com_type] ? (
							<span className="invalid-response">
								{form.errors?.[ratingData[0]?.rtg_com_type]}
							</span>
						) : null}
					</div>
				</div>
			</div>
		</>
	);
};

const FactorWeightTable = ({ ratingData }) => {
	let data = useMemo(() => ratingData, [ratingData]);
	const typeText = {
		AS: "Analytical Skills",
		WE: "Written Exam",
		OE: "Oral Exam",
		OT: "Other",
		CS: "Computational Skills",
		CW: "Creative Work",
	};
	const columns = useMemo(
		() => [
			{
				Header: "CALIBRATED SCALE OF FACTOR WEIGHT",
				accessor: "rtg_factor",
			},
			{
				Header: "%",
				accessor: "rtg_percent",
			},
		],
		[]
	);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable(
			{
				columns,
				data,
			},
			useFilters,
			useGlobalFilter
		);
	if (data.length === 0) {
		return null;
	} else {
		return (
			<>
				<div style={{ marginLeft: "1%", marginTop: "20px" }}>
					<label>
						<b>{typeText[ratingData[0]?.rtg_com_type]} </b>
						{ratingData[0].specific !== "default" ||
						ratingData[0].specific !== undefined
							? ratingData[0].specific
							: ""}
					</label>
					<table className="table-design" {...getTableProps()}>
						<thead>
							{headerGroups.map((headerGroup) => (
								<tr
									className="main-header"
									{...headerGroup.getHeaderGroupProps()}
								>
									{headerGroup.headers.map((column, keys) => (
										<th key={keys}>{column.render("Header")}</th>
									))}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()}>
							{rows.map((row, keyrow) => {
								prepareRow(row);
								let officeData = {};
								row.allCells.forEach((cell) => {
									let test = { [cell.column.id]: cell.value };
									officeData = { ...officeData, ...test };
								});

								return (
									<tr key={keyrow} className="trHoverBody">
										{row.cells.map((cell, key) => {
											return (
												<td key={key} {...cell.getCellProps()}>
													{cell.render("Cell")}
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</>
		);
	}
};
