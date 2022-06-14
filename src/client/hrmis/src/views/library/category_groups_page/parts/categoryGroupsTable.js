import React, { useMemo, useEffect, useState, useLayoutEffect } from 'react';
import axios from 'axios';
import { API_HOST } from '../../../../helpers/global/global_config.js';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useSelectValueCon } from '../../../../helpers/use_hooks/select_value_cons.js';
import BreadcrumbConfig, {
	crumbSecondLevel,
} from '../../../../router/breadcrumb_config';
import { useToggleHelper } from '../../../../helpers/use_hooks/toggle_helper.js';
import { Outlet } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { usePopUpHelper } from '../../../../helpers/use_hooks/popup_helper.js';
import { GroupClusterData } from '../static/input_items.js';

const CategoryGroupsTable = ({}) => {
	let [toggleOfficeModal, setToggleOfficeModal] = useToggleHelper(false);
	const { renderBusy, renderFailed, renderSucceed } = usePopUpHelper();
	const { getSecondLevel } = crumbSecondLevel();
	const [plotCategories, setCategories] = useState([]);
	const { refresh } = useSelector((state) => state.popupResponse);
	const { trueValue } = useSelectValueCon();
	const [toggleState, setToggleState] = useState(1);
	const toggleTab = (index) => {
		setToggleState(index);
	};
	const categoryGroupsData = async () => {
		await axios
			.get(API_HOST + 'category-groups')
			.then((response) => {
				let data = response.data.data ?? [];
				let dataPlot = [];
				data.map((data) => {
					let values = {
						grp_id: data.grp_id,
						grp_name: data.grp_name,
						grp_level: data.grp_level,
						grp_cluster: data.grp_cluster,
						grp_cluster_text: trueValue(data.grp_cluster, GroupClusterData),
						// parent: trueValue(data.ofc_ofc_id, apiModelOffices),
					};

					dataPlot.push(values);
				});
				setCategories(dataPlot);
			})
			.catch((error) => {});
		renderBusy(false);
	};
	useEffect(() => {
		categoryGroupsData();
	}, [refresh]);
	let data = useMemo(() => plotCategories, [plotCategories]);
	const columns = useMemo(
		() => [
			{
				Header: 'Group ID',
				accessor: 'grp_id',
			},
			{
				Header: 'Group Name',
				accessor: 'grp_name',
			},
			{
				Header: 'Group Level',
				accessor: 'grp_level',
			},
			{
				Header: 'Group Clister',
				accessor: 'grp_cluster',
			},
			{
				Header: 'Group Clister',
				accessor: 'grp_cluster_text',
			},
		],
		[]
	);

	const initialState = {
		hiddenColumns: ['grp_id', 'grp_cluster'],
	};

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state,
		setGlobalFilter,
		setFilter,
	} = useTable(
		{
			initialState,
			columns,
			data,
		},
		useFilters,
		useGlobalFilter,
		useSortBy
	);
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
					<span>Office</span>
				</button>
			</div>
			{/* <AddOfficeModal
				isDisplay={toggleOfficeModal}
				onClose={() => {
					setToggleOfficeModal();
					setDataState(null);
				}}
				officeData={dataState}
			/> */}

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
							row.allCells.map((cell) => {
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

export default CategoryGroupsTable;
