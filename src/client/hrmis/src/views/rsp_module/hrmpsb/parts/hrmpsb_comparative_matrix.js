import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { BsArrowDown, BsArrowLeft, BsArrowUp } from "react-icons/bs";
import { IoRefreshCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFilters, useGlobalFilter, useSortBy, useTable } from "react-table";
import {
	setBusy,
	setRefresh,
} from "../../../../features/reducers/popup_response";
import { ALERT_ENUM, popupAlert } from "../../../../helpers/alert_response";
import { API_HOST } from "../../../../helpers/global/global_config";
import { useIsMounted } from "../../../../helpers/use_hooks/isMounted";
import IconComponent from "../../../common/icon_component/icon";
import {
	competencyScore,
	competencyToMessage,
} from "../../recruitment/static/functions";
import {
	recruitmentCMHeaders,
	recruitmentEligbilities,
} from "../../recruitment/static/table_items";

const HRMPSBComapartiveMatrix = ({
	setPageType,
	setApplicantId,
	itm_state,
	deadline,
}) => {
	const mounted = useIsMounted();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const urlpath = window.location.pathname;
	const route = urlpath.split("/");
	const plantilla_id = route[4];
	const [applicants, setApplicants] = useState([]);
	const { refresh } = useSelector((state) => state.popupResponse);

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
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
						{rows.map((row) => {
							let officeData = {};
							prepareRow(row);
							row.allCells.forEach((cell) => {
								let test = { [cell.column.id]: cell.value };
								officeData = { ...officeData, ...test };
							});
							return (
								<tr
									className="trHoverBody pointer"
									onClick={() => {
										navigate(
											"/hrmpsb/evaluation/" +
												plantilla_id +
												"/" +
												officeData.app_id
										);
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
			></div>
		</>
	);
};
export default HRMPSBComapartiveMatrix;