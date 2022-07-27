import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useIsMounted } from '../../../../helpers/use_hooks/isMounted';
import { useSelector } from 'react-redux';
import { API_HOST } from '../../../../helpers/global/global_config';
import BreadcrumbComponent from '../../../common/breadcrumb_component/Breadcrumb';
import { ComparartiveBreadCrumbs } from '../../recruitment/static/breadcramp_item';
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const HRMPSBpositions = () => {
	const mounted = useIsMounted();
	const { refresh } = useSelector((state) => state.popupResponse);
	const navigate = useNavigate();
	const [plotTable, setPlotTable] = useState([]);
	const getAllPositions = useCallback(async () => {
		await axios.get(API_HOST + 'getAllPositions/').then((response) => {
			if (!mounted.current) return;
			const data = response.data.data.filter((data) => {
				data.ofc_name = data?.office?.ofc_name;
				return data.itm_state === 2 || data.itm_state === 3;
			});
			if (data.length === 1) {
				navigate('/hrmpsb/details/' + data[0].itm_id);
			}
			setPlotTable(data);
			// setPlantilla(response.data.data.plantilla);
			// setRequirements(response.data.data.requirements);
		});
	}, [refresh]);
	useEffect(() => {
		getAllPositions();
	}, [getAllPositions]);

	let data = useMemo(() => plotTable, [plotTable]);
	const columns = useMemo(
		() => [
			{
				Header: '',
				accessor: 'itm_id',
			},
			{
				Header: 'Item No.',
				accessor: 'itm_no',
			},
			{
				Header: 'Position',
				accessor: 'pos_title',
			},
			{
				Header: 'Office',
				accessor: 'ofc_name',
			},
		],
		[]
	);

	const initialState = {
		hiddenColumns: ['itm_id'],
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
	return (
		<React.Fragment>
			<div className='documents-view'>
				<div className='container-plantilla'>
					<div className='default-table document-table'>
						<table className='table-design' {...getTableProps()}>
							<thead>
								{headerGroups.map((headerGroup) => (
									<tr
										className='main-header'
										{...headerGroup.getHeaderGroupProps()}
									>
										{headerGroup.headers.map((column) => (
											<th
												{...column.getHeaderProps(
													column.getSortByToggleProps()
												)}
											>
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
												navigate('/hrmpsb/details/' + officeData.itm_id);
											}}
										>
											{row.cells.map((cell) => {
												return (
													<td {...cell.getCellProps()}>
														{cell.render('Cell')}
													</td>
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
			</div>
		</React.Fragment>
	);
};

export default HRMPSBpositions;
