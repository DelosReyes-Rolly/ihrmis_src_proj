import React, { useLayoutEffect, useMemo, useState } from "react";
import { API_HOST } from "../../../../../helpers/global/global_config";
import { statusDisplay } from "../../static/display_option";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useFilters,
	useRowSelect,
} from "react-table";
import axios from "axios";
import { useSelector } from "react-redux";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import FilterPlantillaItems from "./filter_plantilla_items";
import SelectTableComponent from "./select_table_component.js";

/**
 * PlantillaDataTableDisplay
 * @param type
 * @returns
 */
export const PlantillaDataTableDisplay = ({ type }) => {
	const refresh = useSelector((state) => state.popupResponse.refresh);
	const [plotData, setPlotData] = useState([]);
	const plantillaItemApi = async () => {
		await axios
			.get(API_HOST + "vacantpositions/" + type)
			.then((response) => {
				//console.log(response.data);
				let data = response.data.data ?? [];

				if (data.length > 0) {
					let dataPlot = [];
					data?.forEach((element) => {
						dataPlot.push({
							itm_id: element.itm_id,
							itm_no: element.itm_no,
							pos_short_name: element.position.pos_short_name,
							ofc_acronym: element.office.ofc_acronym,
							itm_status: statusDisplay[element.itm_status],
							pos_category: element.position.pos_category,
						});
					});

					setPlotData(dataPlot);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useLayoutEffect(() => {
		plantillaItemApi();
	}, [refresh]);

	let data = useMemo(() => plotData, [plotData]);

	const columns = useMemo(
		() => [
			{
				Header: "Item ID.",
				accessor: "itm_id", // accessor is the "key" in the data
			},
			{
				Header: "Item No.",
				accessor: "itm_no", // accessor is the "key" in the data
			},
			{
				Header: "Position",
				accessor: "pos_short_name",
			},
			{
				Header: "Office",
				accessor: "ofc_acronym",
			},
			{
				Header: "Status",
				accessor: "itm_status",
			},
			{
				Header: "Category",
				accessor: "pos_category",
			},
		],
		[]
	);

	const initialState = { hiddenColumns: ["pos_category", "itm_id"] };

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state,
		state: { selectedRowIds },
		setGlobalFilter,
		setFilter,
		selectedFlatRows,
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
				// Let's make a column for selection
				{
					id: "selection",
					// The header can use the table's getToggleAllRowsSelectedProps method
					// to render a checkbox
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<div>
							<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
						</div>
					),
					// The cell can use the individual row's getToggleRowSelectedProps method
					// to the render a checkbox
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

	const { globalFilter } = state;

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

	return (
		<React.Fragment>
			<FilterPlantillaItems
				type={type}
				search={globalFilter}
				setSearch={setGlobalFilter}
				statusFilter={setFilter}
			/>

			{/* <SelectTableComponent list={plotData} /> */}
			<div className="default-table">
				<table className="table-design" {...getTableProps()}>
					<thead>
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
							prepareRow(row);
							return (
								<tr className="trHoverBody" {...row.getRowProps()}>
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
				<p
					style={{
						fontSize: "small",
						color: "rgba(70, 70, 70, 0.6)",
						marginTop: "10px",
					}}
				>
					Total of {rows.length} entries
				</p>
			</div>

			{console.log(
				JSON.stringify(
					{
						selectedRowIds: selectedRowIds,
						"selectedFlatRows[].original": selectedFlatRows.map(
							(d) => d.original
						),
					},
					null,
					2
				)
			)}
		</React.Fragment>
	);
};
