import React, { useMemo, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { API_HOST } from '../../../../helpers/global/global_config.js';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useSelectValueCon } from '../../../../helpers/use_hooks/select_value_cons.js';
import { useToggleHelper } from '../../../../helpers/use_hooks/toggle_helper.js';
import { MdAdd } from 'react-icons/md';
import { usePopUpHelper } from '../../../../helpers/use_hooks/popup_helper.js';
import { setRefresh } from '../../../../features/reducers/popup_response';
import { ALERT_ENUM, popupAlert } from '../../../../helpers/alert_response.js';
import EvaluationBatteryModal from './evaluationBatteryModal.js';
import { GroupClusterData, SGType } from '../../static/library_input_items.js';
import { useIsMounted } from '../../../../helpers/use_hooks/isMounted.js';

const EvaluationBatteryTable = () => {
	const mounted = useIsMounted();
	const dispatch = useDispatch();
	let [toggleOfficeModal, setToggleOfficeModal] = useToggleHelper(false);
	const { renderBusy } = usePopUpHelper();
	const [plotTable, setTable] = useState([]);
	const { refresh } = useSelector((state) => state.popupResponse);
	const { trueValue } = useSelectValueCon();
	const tableData = useCallback(async () => {
		await axios
			.get(API_HOST + 'evaluation-battery')
			.then((response) => {
				let data = response.data.data[0] ?? [];
				let dataPlot = [];
				data.forEach((data) => {
					let sg = data.bat_sg_text.split(',');
					let checker = [];
					let text = '';
					sg.forEach((str) => {
						if (checker.includes(str)) {
						} else {
							text += trueValue(str, SGType) + ', ';
							checker.push(str);
						}
					});
					let values = {
						bat_id: data.bat_id,
						bat_name: data.bat_name,
						bat_points: data.bat_points,
						bat_sg_type: data.bat_sg_type,
						bat_sg_type_text: text,
						bat_grp_id: data.bat_grp_id,
						bat_grp_text: data.grp_name,
						category_group: trueValue(data.grp_cluster, GroupClusterData),
					};
					dataPlot.push(values);
				});
				if (!mounted.current) return;
				setTable(dataPlot);
			})
			.catch((error) => {});
		renderBusy(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh]);

	useEffect(() => {
		tableData();
	}, [tableData]);

	let data = useMemo(() => plotTable, [plotTable]);
	const columns = useMemo(
		() => [
			{
				Header: ' ',
				accessor: 'bat_id',
			},
			{
				Header: 'Battery Group',
				accessor: 'bat_grp_text',
			},
			{
				Header: 'Battery Name',
				accessor: 'bat_name',
			},
			{
				Header: 'Group Cluster',
				accessor: 'category_group',
			},
			{
				Header: 'Group Level',
				accessor: 'bat_sg_type',
			},
			{
				Header: 'Salary Grade',
				accessor: 'bat_sg_type_text',
			},
			{
				Header: 'Group Cluster',
				accessor: 'bat_grp_id',
			},
		],
		[]
	);

	const initialState = {
		hiddenColumns: ['bat_id', 'bat_grp_id', 'bat_sg_type', 'bat_name'],
	};

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable(
			{
				initialState,
				columns,
				data,
			},
			useFilters,
			useGlobalFilter,
			useSortBy
		);
	const removeCategory = async (record) => {
		renderBusy(true);
		await axios
			.delete(API_HOST + `evaluation-battery/${record}`)
			.then(() => {
				popupAlert({
					message: 'Battery was deleted',
					type: ALERT_ENUM.success,
				});
			})
			.catch((err) => {
				popupAlert({
					message: err.message,
					type: ALERT_ENUM.fail,
				});
			});
		renderBusy(false);
		setToggleOfficeModal();
		setDataState(null);
		dispatch(setRefresh());
	};

	const [dataState, setDataState] = useState();
	const passModalData = (param) => {
		setDataState(param);
		setToggleOfficeModal();
	};
	return (
		<div>
			<div style={{ margin: 20 }}>
				<button className='btn-primary' onClick={() => setToggleOfficeModal()}>
					<MdAdd style={{ padding: 0, margin: 0 }} size='14' />
					<span>Evaluation Battery</span>
				</button>
			</div>
			<EvaluationBatteryModal
				isDisplay={toggleOfficeModal}
				onClose={() => {
					setToggleOfficeModal();
					setDataState(null);
				}}
				data={dataState}
				remove={() => {
					console.log(dataState);
					if (dataState !== null) {
						removeCategory(dataState.bat_grp_id);
					} else {
						setToggleOfficeModal();
					}
				}}
				removeName={dataState !== null ? 'Delete' : 'Close'}
			/>

			<div className='default-table'>
				<table className='table-design' {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr
								className='main-header'
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
												''
											)}
										</span>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>

					<tbody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row);
							let officeData = {};
							row.allCells.forEach((cell) => {
								let test = { [cell.column.id]: cell.value };
								officeData = { ...officeData, ...test };
							});

							return (
								<tr
									className='trHoverBody'
									{...row.getRowProps()}
									onClick={() => {
										passModalData(officeData);
									}}
								>
									{row.cells.map((cell) => {
										return (
											<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
				<p
					style={{
						fontSize: 'small',
						color: 'rgba(70, 70, 70, 0.6)',
						marginTop: '10px',
					}}
				>
					Total of {rows.length} entries
				</p>
			</div>
		</div>
	);
};

export default EvaluationBatteryTable;
