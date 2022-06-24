import axios from "axios";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRowSelect, useTable } from "react-table";
import { setNextRank } from "../../../../../features/reducers/plantilla_item_slice";
import { setRefresh } from "../../../../../features/reducers/popup_response";
import { ALERT_ENUM, popupAlert } from "../../../../../helpers/alert_response";
import { API_HOST } from "../../../../../helpers/global/global_config";
import ModalComponent from "../../../../common/modal_component/modal_component";
import { setSelectedEmployee } from "../../../../../features/reducers/plantilla_item_slice";

const ContextMenuModal = ({ isDisplay, onClose }) => {
	const dispatch = useDispatch();
	const [selectedItems, setSelectedItems] = useState([]);
	const { selected_employee } = useSelector((state) => state.plantillaItem);

	const returnPreviousModal = () => {
		onClose();
		dispatch(setNextRank());
	};

	// const { next_rank_list } = useSelector((state) => state.plantillaItem);

	const submitHandler = async () => {
		if (selected_employee.length !== 0) {
			console.log(selected_employee);
			await axios
				.post(API_HOST + "add-to-next-rank", { emp_list: selected_employee })
				.then(() => {
					popupAlert({ message: "Successfully added to Next-in-Rank List" });

					dispatch(setRefresh());
					onClose();
					dispatch(setNextRank());
					dispatch(setSelectedEmployee([]));
				})
				.catch((err) => {
					popupAlert({ message: err.message, type: ALERT_ENUM.fail });
				});
			return;
		}
		popupAlert({
			message: "Please Select Next-in-Rank Employee",
			type: ALERT_ENUM.fail,
		});
	};

	return (
		<React.Fragment>
			<ModalComponent
				title="Agency Employees"
				isDisplay={isDisplay}
				onClose={onClose}
				onClickSubmit={submitHandler}
				onPressed={returnPreviousModal}
				onCloseName="Back"
				onSubmitName="Add to Next in Rank"
			>
				<div className="next-rank-modal-container">
					<ListEmployeeTable />
				</div>
			</ModalComponent>
		</React.Fragment>
	);
};

export default ContextMenuModal;

const ListEmployeeTable = () => {
	const { refresh } = useSelector((state) => state.popupResponse);
	const [fetchData, setFetchData] = useState([]);
	const dispatch = useDispatch();

	const data = useMemo(() => fetchData, [fetchData]);

	const { selected_agency_rank, item_id } = useSelector(
		(state) => state.plantillaItem
	);

	const getAgencyEmployees = async () => {
		let arrHolder = [];
		await axios
			.get(
				API_HOST + "get-agency-employee/" + selected_agency_rank + "/" + item_id
			)
			.then((res) => {
				const rawData = res.data.data;
				console.log(rawData);
				rawData.map((item) => {
					arrHolder.push(item);
				});
			})
			.catch((err) => console.log(err));
		setFetchData(arrHolder);
	};

	useEffect(() => {
		getAgencyEmployees();
	}, [refresh]);

	const columns = useMemo(
		() => [
			{
				Header: "Name",
				accessor: "nir_name",
			},
			{
				Header: "Position",
				accessor: "nir_pos_title",
			},
			{
				Header: "Office",
				accessor: "nir_office",
			},
			{
				Header: "Email",
				accessor: "nir_email",
			},
			{
				Header: "Emp ID",
				accessor: "nir_emp_id",
			},
			{
				Header: "Office ID",
				accessor: "nir_ofc_id",
			},
			{
				Header: "Agency ID",
				accessor: "nir_agn_id",
			},
			{
				Header: "Item ID",
				accessor: "nir_itm_id",
			},
		],
		[]
	);

	const initialState = {
		hiddenColumns: [
			"nir_email",
			"nir_emp_id",
			"nir_ofc_id",
			"nir_agn_id",
			"nir_itm_id",
		],
	};
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		selectedFlatRows,
		state: { selectedRowIds },
	} = useTable(
		{
			initialState,
			columns,
			data,
		},
		useRowSelect,
		(hooks) => {
			hooks.visibleColumns.push((columns) => [
				{
					id: "selection",
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<div>
							<TableCheckboxComponent {...getToggleAllRowsSelectedProps()} />
						</div>
					),
					Cell: ({ row }) => (
						<div>
							<TableCheckboxComponent {...row.getToggleRowSelectedProps()} />
						</div>
					),
				},
				...columns,
			]);
		}
	);

	useEffect(() => {
		let selectedFlatRowsData = selectedFlatRows.map((d) => d.original);
		console.log(selectedFlatRowsData);
		if (selectedFlatRows) {
			dispatch(setSelectedEmployee(selectedFlatRowsData));
		}
		console.log(selectedFlatRows);
	}, [selectedFlatRows]);

	// const dispatch = useDispatch();

	return (
		<React.Fragment>
			<table className="next-rank-table" {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr
							style={{ textAlign: "left", border: "1px solid black" }}
							{...headerGroup.getHeaderGroupProps()}
						>
							{headerGroup.headers.map((column) => {
								return (
									<th {...column.getHeaderProps()}>
										{column.render("Header")}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<br />
			<p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
		</React.Fragment>
	);
};

const TableCheckboxComponent = React.forwardRef(
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
