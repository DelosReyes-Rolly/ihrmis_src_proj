import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import {
	BsArrowDown,
	BsArrowDownUp,
	BsArrowLeft,
	BsArrowUp,
} from "react-icons/bs";
import { IoRefreshCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFilters, useGlobalFilter, useSortBy, useTable } from "react-table";
import {
	setBusy,
	setRefresh,
} from "../../../../../features/reducers/popup_response";
import { ALERT_ENUM, popupAlert } from "../../../../../helpers/alert_response";
import { API_HOST } from "../../../../../helpers/global/global_config";
import { useIsMounted } from "../../../../../helpers/use_hooks/isMounted";
import IconComponent from "../../../../common/icon_component/icon";
import {
	recruitmentCMHeaders,
	recruitmentEligbilities,
} from "../../static/table_items";
import InputComponent from "../../../../common/input_component/input_component/input_component";
import { competencyScore, competencyToMessage } from "../../static/functions";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import { format, setHours, setMinutes } from "date-fns";

const RecruitmentComparativeTable = ({
	setPageType,
	setApplicantId,
	itm_state,
	deadline,
	setDeadline,
}) => {
	const mounted = useIsMounted();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const urlpath = window.location.pathname;
	const route = urlpath.split("/");
	const plantilla_id = route[5];
	const [applicants, setApplicants] = useState([]);
	const { refresh } = useSelector((state) => state.popupResponse);
	const closeOpenEvaluation = async (state) => {
		const formData = new FormData();
		formData.append("state", state);
		formData.append("plantilla", plantilla_id);
		const date = format(new Date(startDate), "yyyy-MM-dd HH:mm:ss");
		formData.append("deadline", date);
		let evalText = "opened";
		if (state === 2) {
			evalText = "closed";
		}
		await axios
			.post(API_HOST + "update-evaluation", formData)
			.then(() => {
				popupAlert({
					message: "Evaluation has been " + evalText,
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
	};

	const getCMData = useCallback(async () => {
		dispatch(setBusy(true));
		await axios
			.get(API_HOST + "get-cm-data/" + plantilla_id)
			.then((response) => {
				let data = response.data.data.applicants ?? [];
				let dataPlot = [];
				let count = 1;
				data.forEach((data) => {
					let eligibilites = "";
					data.tblapplicant_eligibility.forEach((eligibility) => {
						eligibilites +=
							" " + recruitmentEligbilities[eligibility.cse_app_title];
					});
					let competency = competencyToMessage(data?.tblcmptncy_ratings);
					let cmptncyTotal = competencyScore(data?.tbl_cmptcy_score);
					let raSubTotal =
						cmptncyTotal +
						data?.tbl_assessments?.ass_education +
						data?.tbl_assessments?.ass_experience +
						data?.tbl_assessments?.ass_training;
					let attributesAverage = 0;
					let commendableAverage = 0;
					let performanceAverage = 0;
					let total = 0;
					let attributeCount = 0;
					let commendableCount = 0;
					let performanceCount = 0;
					data?.tbl_hrmpsb_score.forEach((scores) => {
						switch (scores.hrmpsb_type) {
							case 1:
								attributeCount++;
								attributesAverage += scores?.hrmpsb_score;
								break;
							case 2:
								commendableCount++;
								commendableAverage += scores?.hrmpsb_score;
								break;
							case 3:
								performanceCount++;
								performanceAverage += scores?.hrmpsb_score;
								break;
							default:
								break;
						}
					});
					let attributes = attributesAverage / attributeCount;
					let commendable = commendableAverage / commendableCount;
					let performance = performanceAverage / performanceCount;
					let hrmTotal = attributes + commendable + performance;
					let actualTotal = hrmTotal + raSubTotal;
					let values = {
						app_id: data?.tblapplicants_profile?.app_id,
						no: count++,
						applicant_name:
							data?.tblapplicants_profile?.app_nm_last +
							" " +
							data?.tblapplicants_profile?.app_nm_first +
							" " +
							data?.tblapplicants_profile?.app_nm_mid +
							" (" +
							data?.tblapplicants_profile?.app_sex +
							")",
						elig: eligibilites,
						edu: data?.tbl_assessments?.ass_education,
						exp: data?.tbl_assessments?.ass_experience,
						trn: data?.tbl_assessments?.ass_training,
						cmptncy: cmptncyTotal,
						subtotal: raSubTotal,
						attrbts: !isNaN(attributes) ? attributes : "",
						accom: !isNaN(commendable) ? commendable : "",
						perfor: !isNaN(performance) ? performance : "",
						subtotal2: !isNaN(hrmTotal) ? hrmTotal : "",
						total: actualTotal,
					};
					dataPlot.push(values);
				});
				if (!mounted.current) return;
				setApplicants(dataPlot);
			});

		dispatch(setBusy(false));
	}, [plantilla_id, dispatch]);
	const [startDate, setStartDate] = useState(deadline);

	useEffect(() => {
		setStartDate(deadline);
	}, [deadline]);
	useEffect(() => {
		getCMData();
	}, [getCMData, refresh]);
	const initialState = {
		hiddenColumns: ["app_id"],
	};
	let data = useMemo(() => applicants, [applicants]);
	const columns = useMemo(() => recruitmentCMHeaders, []);

	const { getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
		{
			columns,
			data,
			initialState,
		},
		useFilters,
		useGlobalFilter,
		useSortBy
	);
	return (
		<>
			<div className="default-table document_table">
				<table className="table-design comparative-matrix">
					<thead>
						<tr className="no-border">
							<th className="w5">
								<IconComponent
									id="comparative_matrix_back"
									className="pointer"
									icon={<BsArrowLeft size="25" />}
									toolTipId="cm_back_tooltip"
									onClick={() => navigate("/rsp/recruitment")}
									textHelper={"Go Back"}
								/>
							</th>
							<th className="main-header" colSpan={11}>
								APPLICANTS' SUMMARY RATING
							</th>
							<th className="w5">
								<IconComponent
									id="comparative_matrix_refresh"
									className=""
									icon={<IoRefreshCircle size="30" />}
									toolTipId="cm_refresh_tooltip"
									onClick={() => dispatch(setRefresh())}
									textHelper={"Reload"}
								/>
							</th>
						</tr>
						{headerGroups.map((headerGroup) => (
							<tr
								className="main-header"
								{...headerGroup.getHeaderGroupProps()}
							>
								{headerGroup.headers.map((column, index) => (
									<th {...column.getHeaderProps(column.getSortByToggleProps())}>
										<div style={{ width: "100%", textAlign: "center" }}>
											<span>
												{column.isSorted ? (
													column.isSortedDesc ? (
														<BsArrowDown />
													) : (
														<BsArrowUp />
													)
												) : (
													column.id !== "END - USER_4" &&
													column.id !== "HRMPSB_9" &&
													column.id !== " _0" && (
														<BsArrowDownUp style={{ opacity: "60%" }} />
													)
												)}
											</span>
											&nbsp;{column.render("Header")}
										</div>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row);
							return (
								<tr
									className="trHoverBody pointer"
									onClick={() => {
										setPageType("ra");
										setApplicantId(row.allCells[0].value);
									}}
									{...row.getRowProps()}
								>
									{row.cells.map((cell, key) => {
										return <td key={key}>{cell.render("Cell")}</td>;
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div
				className="default-table"
				style={{ display: "flex", justifyContent: "end" }}
			>
				<div
					style={{
						width: "13rem",
						display: "flex",
						justifyContent: "end",
						alignItems: "center",
						gap: "12px",
					}}
				>
					<button
						className={
							itm_state === 2 ? "button-components" : "delete-button-color"
						}
						style={{
							cursor: "pointer",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							textAlign: "center",
						}}
						onClick={() => {
							closeOpenEvaluation(itm_state === 2 ? 3 : 2);
						}}
					>
						{itm_state === 2 && (
							<>
								<AiFillUnlock style={{ padding: 0, margin: 0 }} size="14" />
								<span> Open</span>
							</>
						)}
						{itm_state === 3 && (
							<>
								<AiFillLock style={{ padding: 0, margin: 0 }} size="14" />
								<span> Close</span>
							</>
						)}
					</button>
					{itm_state === 3 && (
						<>
							<label
								style={{ fontSize: "small", color: "rgba(70, 70, 70, 0.8)" }}
							>
								Deadline
							</label>

							<ReactDatePicker
								selected={startDate}
								onChange={(date) => setStartDate(date)}
								showTimeSelect
								includeTimes={[
									setHours(setMinutes(new Date(), 0), 17),
									setHours(setMinutes(new Date(), 30), 18),
									setHours(setMinutes(new Date(), 30), 19),
									setHours(setMinutes(new Date(), 30), 17),
								]}
								dateFormat="MMMM d, yyyy h:mm aa"
							/>
						</>
					)}
				</div>
			</div>
		</>
	);
};
export default RecruitmentComparativeTable;
