import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { format } from "date-fns";
import TextAreaComponent from "../../../../common/input_component/textarea_input_component/textarea_input_component";

const HRMPSBEvaluationModal = ({
	isDisplay,
	onClose,
	type,
	appID,
	title,
	remarks,
}) => {
	const tyoePercent = ["", "25%", "5%", "5%"];
	const [evaluations, setEvaluations] = useState([]);
	const [date, setDate] = useState();
	const [average, setAverage] = useState();
	const mounted = useIsMounted();
	const dispatch = useDispatch();
	const urlpath = window.location.pathname;
	const route = urlpath.split("/");
	const plantilla_id = route[5];
	const { renderBusy } = usePopUpHelper();

	const getHRMPSBEvaluation = useCallback(async (applicant, evalType) => {
		await axios
			.get(API_HOST + "get-hrmpsb-evaluation/" + applicant + "/" + evalType)
			.then((response) => {
				const data = response.data?.data;
				let evaluation = [];
				let totalScore = 0;
				let count = 0;
				let date = "";
				data.forEach((data) => {
					count++;
					let values = {
						score: data?.hrmpsb_score,
						name: data?.tbl_user.name,
						remark: data?.hrmpsb_remarks,
					};
					totalScore += data?.hrmpsb_score;
					evaluation.push(values);
					date = data?.tbl_assessment?.ass_psb_eval_date;
				});
				let averages = totalScore / count;
				setEvaluations(evaluation);
				setDate(date);
				setAverage(averages);
			})
			.catch();
	}, []);

	useEffect(() => {
		if (isDisplay) {
			getHRMPSBEvaluation(appID, type);
		}
	}, [isDisplay, type]);

	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			remarks: remarks ?? "",
		},
		// validationSchema: Yup.object({
		// 	Score: Yup.number()
		// 		.typeError('Must be a number')
		// 		.max(ratingData[0]?.rtg_percent ?? 15)
		// 		.required('This field is required'),
		// }),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);
			value.app_id = appID;
			value.plantilla = plantilla_id;
			value.type = type;
			await axios
				.post(API_HOST + "save-hrmpsb-remarks", value)
				.then(() => {
					popupAlert({
						message: "Remark was saved.",
						type: ALERT_ENUM.success,
					});
					dispatch(setRefresh());
				})
				.catch((err) => {
					popupAlert({
						message: err.message,
						type: ALERT_ENUM.fail,
					});
				});
			renderBusy(false);
			onClose();
			resetForm();
		},
	});

	let data = useMemo(() => evaluations, [evaluations]);
	const columns = useMemo(
		() => [
			{
				Header: "HRMPSB MEMBER",
				accessor: "name",
				Cell: ({ row: { original } }) => (
					<div style={{ display: "flex", flexDirection: "column" }}>
						<p>{original.name}</p>
						<p style={{ fontSize: "10px" }}>{original.remark}</p>
					</div>
				),
			},
			{
				Header: "RATE (" + tyoePercent[type] + ")",
				accessor: "score",
				Cell: ({ row: { original } }) => (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyItems: "center",
							alignItems: "center",
						}}
					>
						<p>{original.score}</p>
					</div>
				),
			},
		],
		[type]
	);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable(
			{
				columns,
				data,
			},
			useFilters,
			useGlobalFilter,
			useSortBy
		);
	const dateChecker = (date) => {
		return !Number.isNaN(new Date(date).getTime());
	};
	return (
		<React.Fragment>
			<ModalComponent
				title={title}
				isDisplay={isDisplay}
				onClose={onClose}
				onSubmit={form.handleSubmit}
				onSubmitType="submit"
				onSubmitName="Submit"
			>
				<div className="default-table" style={{ margin: "0px" }}>
					<div className="add-office-modal">
						<div className="item-modal-5">
							<label className="main-header">
								{dateChecker(date) &&
									(format(new Date(date), "MMMM dd, yyyy") ?? "")}
								{/* {format(new Date(date ?? ''), 'MMMM dd, yyyy') ?? ''} */}
							</label>
						</div>
					</div>
					<table
						className="table-design comparative-matrix"
						{...getTableProps()}
					>
						<thead>
							{headerGroups.map((headerGroup) => (
								<tr
									className="main-header no-border center"
									{...headerGroup.getHeaderGroupProps()}
								>
									{headerGroup.headers.map((column) => (
										<th
											{...column.getHeaderProps(column.getSortByToggleProps())}
										>
											<span>
												{column.isSorted ? (
													column.isSortedDesc ? (
														<BsArrowDown />
													) : (
														<BsArrowUp />
													)
												) : (
													""
												)}
											</span>
											{column.render("Header")}
										</th>
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
												<td
													className={key === 1 ? "w15" : ""}
													key={key}
													{...cell.getCellProps()}
												>
													{cell.render("Cell")}
												</td>
											);
										})}
									</tr>
								);
							})}
							<tr className="">
								<th className="main-header" style={{ textAlign: "right" }}>
									Average
								</th>
								<th className="no-border" style={{ textAlign: "center" }}>
									{average}
								</th>
							</tr>
						</tbody>
					</table>
					<div className="add-office-modal">
						<div className="item-modal-5">
							<label>Remarks</label>
							<TextAreaComponent
								name="remarks"
								value={form.values.remarks}
								onChange={form.handleChange}
								maxLength="30"
							/>
							{form.touched.remarks && form.errors.remarks ? (
								<span className="invalid-response">{form.errors.remarks}</span>
							) : null}
						</div>
					</div>
				</div>
			</ModalComponent>
		</React.Fragment>
	);
};

export default HRMPSBEvaluationModal;
