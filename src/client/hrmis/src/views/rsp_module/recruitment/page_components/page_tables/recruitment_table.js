import { BsArrowDown, BsArrowDownUp, BsArrowUp } from "react-icons/bs";
import { MdAdd, MdMoreHoriz } from "react-icons/md";
import axios from "axios";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useFilters,
	useRowSelect,
} from "react-table";
import {
	recruitmentDisqualifiedMenuItem,
	recruitmentMenuItem,
} from "../../static/menu_items";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { API_HOST } from "../../../../../helpers/global/global_config";
import DropdownViewComponent from "../../../../common/dropdown_menu_custom_component/Dropdown_view.js";
import { useNavigate } from "react-router-dom";
import RecruitmentDocumentModal from "../page_modals/recruitment_document_modal/recruitment_document_modal.js";
import RecruitmentStatusModal from "../page_modals/recruitment_status_modal.js";
import { useSelector } from "react-redux";
import SearchComponent from "../../../../common/input_component/search_input/search_input.js";
import {
	ALERT_ENUM,
	popupAlert,
} from "../../../../../helpers/alert_response.js";
import { useIsMounted } from "../../../../../helpers/use_hooks/isMounted";
const RecruitmentTable = ({ type, setSelectedApplicants, setPosition }) => {
	const mounted = useIsMounted();
	const { refresh } = useSelector((state) => state.popupResponse);
	const [positionsFilter, setPositionsFilter] = useState([]);
	const [plotApplicantData, setApplicantData] = useState([]);
	const [value, setValue] = useState(0);
	const [modalData, setModalData] = useState([]);
	const [documentApplicant, setDocumentApplicant] = useState([]);
	const [position, setPositions] = useState("");
	const navigate = useNavigate();

	const openPositionApi = async () => {
		await axios.get(API_HOST + "get-open-positions").then((response) => {
			const data = response.data.data;
			let positions = [];
			data.forEach((element) => {
				let values2 = [];
				values2 = {
					id: element.itm_id,
					title: element.tblpositions.pos_title,
				};
				let exists = positions.some(
					(position) => position.pos_id === element.itm_id
				);
				if (!exists) {
					positions.push(values2);
				}
			});
			if (!mounted.current) return;

			setPositionsFilter(positions);
		});
	};

	const statusFilters = [
		{
			id: 1,
			title: "Completed",
		},
		{
			id: 2,
			title: "Qualified",
		},
		{
			id: 3,
			title: "Disqualified",
		},
		{
			id: 4,
			title: "Incomplete",
		},
		{
			id: 5,
			title: "Appointed",
		},
		{
			id: 6,
			title: "Deferred",
		},
	];

	const applicantDataApi = useCallback(async () => {
		await axios
			.get(API_HOST + "get-complete-applicant/" + type)
			.then((response) => {
				const data = response.data.data;
				let dataPlot = [];
				if (data === undefined) {
					let values = {
						app_name: "No data available",
					};
					dataPlot.push(values);
				} else {
					for (let i = 0; i < data.length; i++) {
						let profile_message = data[i].profile_message
							.split("\n")
							.map((str, key) => <p key={key}>{str}</p>);
						let qualification_message = data[i].qualification_message
							.split("\n")
							.map((str, key) => <p key={key}>{str}</p>);
						let position_message = data[i].position_message
							.split("\n")
							.map((str, key) => <p key={key}>{str}</p>);
						let sts_remark =
							type === 2 ? `Disqualified ${data[i].fail_message}` : "Qualified";
						let statusID = type === 1 ? 2 : 3;
						let values = {
							app_id: data[i].app_id ?? "N/a",
							app_email: data[i].app_email,
							app_name: data[i].app_name,
							app_profile: profile_message ?? "N/A",
							pos_applied: position_message ?? "N/A",
							position: data[i].plantilla ?? "N/A",
							app_qualifications: qualification_message ?? "N/A",
							sts_App_remarks: data[i].status_message ?? sts_remark ?? "",
							status: data[i].status ?? statusID,
						};
						dataPlot.push(values);
					}
				}
				if (!mounted.current) return;
				setApplicantData(dataPlot);
			})
			.catch((error) => {});
	}, [type]);
	useEffect(() => {
		openPositionApi();
	}, [refresh]);
	useEffect(() => {
		applicantDataApi();
	}, [applicantDataApi, refresh]);
	const columns = useMemo(
		() => [
			{
				Header: "",
				accessor: "app_id",
			},
			{
				Header: "",
				accessor: "app_email",
			},
			{
				Header: "Name",
				accessor: "app_name",
			},
			{
				Header: "Profile",
				accessor: "app_profile",
			},
			{
				Header: "Qualifications",
				accessor: "app_qualifications",
			},
			{
				Header: "Position Applied",
				accessor: "pos_applied",
			},
			{
				Header: "Pos",
				accessor: "position",
			},
			{
				Header: "Status",
				accessor: "sts_App_remarks",
			},
			{
				Header: "Status",
				accessor: "status",
			},
		],
		[]
	);
	const data = useMemo(() => plotApplicantData, [plotApplicantData]);
	const IndeterminateCheckbox = React.forwardRef(
		({ indeterminate, ...rest }, ref) => {
			const defaultRef = React.useRef();
			const resolvedRef = ref || defaultRef;
			React.useEffect(() => {
				resolvedRef.current.indeterminate = indeterminate;
			}, [resolvedRef, indeterminate]);
			return (
				<>
					<input type="checkbox" ref={resolvedRef} {...rest} />
				</>
			);
		}
	);
	const initialState = {
		hiddenColumns: ["app_id", "app_email", "position", "status"],
	};
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		selectedFlatRows,
		setFilter,
		setGlobalFilter,
	} = useTable(
		{
			initialState,
			columns,
			data,
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		useRowSelect,
		(hooks) => {
			hooks.visibleColumns.push((columns) => [
				{
					id: "selection",
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<div>
							<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
						</div>
					),
					Cell: ({ row }) => (
						<div>
							<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
						</div>
					),
				},
				...columns,
			]);
		}
	);
	const openPDS = (data, index, length) => {
		if (index !== length && index !== 0) {
			navigate("/pds-applicant/form-page-one/" + data.app_id);
		}
	};
	useEffect(() => {
		let selectedFlatRowsData = selectedFlatRows.map((d) => d.original);
		let temp_selected = [];
		selectedFlatRowsData.forEach((element) => {
			let sdata = {};
			sdata["app_id"] = element.app_id;
			sdata["app_name"] = element.app_name;
			sdata["app_email"] = element.app_email;
			temp_selected.push(sdata);
		});
		setSelectedApplicants(temp_selected);
	}, [selectedFlatRows, setSelectedApplicants]);
	useEffect(() => {
		if (value === 1) {
			navigate(
				"/rsp/recruitment/comparative-matrix/" +
					modalData.position +
					"/" +
					modalData.app_id
			);
		}
		if (value === 2) {
			setDocumentApplicant(modalData.app_id);
		}
		if (value === 4) {
			navigate("/rsp/dashboard");
		}
	}, [value]);
	return (
		<React.Fragment>
			<div>
				<div className="selector-buttons">
					<div className="selector-container">
						{/* <span className='selector-span-1'> */}
						{/* <ButtonComponent/> */}
						<button
							className="filter_buttons button-components"
							onClick={() => {
								if (position !== "") {
									navigate("/pds-applicant/applicant/" + position);
								} else {
									popupAlert({
										message: "Please Select a Vacant Position",
										type: ALERT_ENUM.fail,
									});
								}
							}}
							style={{
								cursor: "pointer",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								textAlign: "center",
							}}
						>
							<MdAdd style={{ padding: 0, margin: 0 }} size="14" />
							<span>Applicant</span>
						</button>
						{/* </span> */}
						<span className="filter_buttons margin-left-1 selector-span-1">
							<select
								defaultValue={"DEFAULT"}
								onChange={(e) => {
									setFilter("position", e.target.value);
									console.log(e.target.value);
									setPositions(e.target.value);
									setPosition(e.target.value);
								}}
							>
								<option value="">Vacant Position</option>
								{positionsFilter.map((item, key) => {
									return (
										<option
											className="options"
											key={key}
											defaultValue={item.id}
											value={item.id}
										>
											{item.title}
										</option>
									);
								})}
							</select>
						</span>
						<span className="filter_buttons margin-left-1 selector-span-1">
							<select
								defaultValue={"DEFAULT"}
								onChange={(e) => {
									setFilter("status", e.target.value);
								}}
							>
								<option value="">All</option>
								{statusFilters.map((item, key) => {
									return (
										<option
											className="options"
											key={key}
											defaultValue={item.id}
											value={item.id}
										>
											{item.title}
										</option>
									);
								})}
							</select>
						</span>
					</div>
					<div className="width-300">
						<SearchComponent
							onChange={(e) => {
								setGlobalFilter(e.target.value ?? "");
							}}
						/>
					</div>
				</div>
			</div>
			<br />
			<div className="default-table document-table">
				<table className="table-design" {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr
								className="main-header"
								{...headerGroup.getHeaderGroupProps()}
							>
								{headerGroup.headers.map((column, index) => (
									<th {...column.getHeaderProps(column.getSortByToggleProps())}>
										<span>
											{column.isSorted ? (
												column.isSortedDesc ? (
													<BsArrowDown />
												) : (
													<BsArrowUp />
												)
											) : (
												index !== 0 && (
													<BsArrowDownUp style={{ opacity: "60%" }} />
												)
											)}
										</span>
										&nbsp;{column.render("Header")}
									</th>
								))}
							</tr>
						))}
					</thead>

					<tbody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row);
							let applicantData = {};

							row.allCells.forEach((cell) => {
								let test = { [cell.column.id]: cell.value };
								applicantData = { ...applicantData, ...test };
							});
							return (
								<tr
									className="trHoverBody"
									onClick={() => {
										setModalData(applicantData);
									}}
									{...row.getRowProps()}
								>
									{row.cells.map((cell, index, arr) => {
										if (
											index === arr.length - 1 &&
											applicantData.app_name !== "No data to display"
										) {
											return (
												<td {...cell.getCellProps()}>
													<div
														style={{
															display: "flex",
															justifyContent: "space-between",
														}}
													>
														{cell.render("Cell")}
														<DropdownViewComponent
															className={"dropdown-three-dots"}
															itemList={
																type === 1
																	? recruitmentMenuItem
																	: recruitmentDisqualifiedMenuItem
															}
															title={<MdMoreHoriz size="20" />}
															alignItems="end"
															toolTipId="other-actions"
															textHelper="Click to view other actions"
															setValue={setValue}
														/>
													</div>
												</td>
											);
										}
										return (
											<td
												{...cell.getCellProps()}
												style={{ cursor: "pointer" }}
												onClick={() => {
													if (applicantData.app_id !== undefined) {
														openPDS(applicantData, index, arr.length - 1);
													}
												}}
											>
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
			<p
				style={{
					fontSize: "small",
					color: "rgba(70, 70, 70, 0.6)",
					marginTop: "10px",
					marginLeft: "20px",
				}}
			>
				Total of {rows.length} entries
			</p>
			<RecruitmentDocumentModal
				isDisplay={value === 2 ? true : false}
				onClose={() => {
					setValue(0);
				}}
				appID={documentApplicant}
				level={1}
				cluster="RP"
			/>
			<RecruitmentStatusModal
				isDisplay={value === 3 ? true : false}
				onClose={() => {
					setValue(0);
				}}
				rowData={modalData}
			/>
		</React.Fragment>
	);
};
export default React.memo(RecruitmentTable);
