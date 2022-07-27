import React, { useMemo, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { API_HOST } from '../../../../helpers/global/global_config.js';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useSelectValueCon } from '../../../../helpers/use_hooks/select_value_cons.js';
import { useToggleHelper } from '../../../../helpers/use_hooks/toggle_helper.js';
import { MdAdd } from 'react-icons/md';
import UserAccountModal from './user_accounts_modal.js';
import { usePopUpHelper } from '../../../../helpers/use_hooks/popup_helper.js';
import { setRefresh } from '../../../../features/reducers/popup_response';
import { ALERT_ENUM, popupAlert } from '../../../../helpers/alert_response.js';
import { UserAccountLevel } from '../../static/library_input_items.js';
import { useIsMounted } from '../../../../helpers/use_hooks/isMounted.js';

const UserAccountsTable = () => {
	const mounted = useIsMounted();
	const dispatch = useDispatch();
	let [toggleOfficeModal, setToggleOfficeModal] = useToggleHelper(false);
	const { renderBusy } = usePopUpHelper();
	const [plotCategories, setCategories] = useState([]);
	const { refresh } = useSelector((state) => state.popupResponse);
	const { trueValue } = useSelectValueCon();
	const getLibraryData = useCallback(async () => {
		await axios
			.get(API_HOST + 'user-accounts')
			.then((response) => {
				let data = response.data.data ?? [];
				let dataPlot = [];
				data.forEach((data) => {
					let values = {
						user_id: data.user_id,
						username: data.username,
						email: data.email,
						name: data.name,
						user_level: data.user_level,
						user_level_text: trueValue(data.user_level, UserAccountLevel),
					};

					dataPlot.push(values);
				});
				if (!mounted.current) return;
				setCategories(dataPlot);
			})
			.catch((error) => {});
		renderBusy(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh]);
	useEffect(() => {
		getLibraryData();
	}, [getLibraryData]);

	let data = useMemo(() => plotCategories, [plotCategories]);
	const columns = useMemo(
		() => [
			{
				Header: 'User ID',
				accessor: 'user_id',
			},
			{
				Header: 'Name',
				accessor: 'name',
			},
			{
				Header: 'Username',
				accessor: 'username',
			},
			{
				Header: 'Email',
				accessor: 'email',
			},
			{
				Header: 'User Level',
				accessor: 'user_level',
			},
			{
				Header: 'User Level',
				accessor: 'user_level_text',
			},
		],
		[]
	);

	const initialState = {
		hiddenColumns: ['user_id', 'user_level'],
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
			.delete(API_HOST + `category-groups/${record}`)
			.then(() => {
				popupAlert({
					message: 'Category was deleted',
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
					<span>User Account</span>
				</button>
			</div>
			<UserAccountModal
				isDisplay={toggleOfficeModal}
				onClose={() => {
					setToggleOfficeModal();
					setDataState(null);
				}}
				data={dataState}
				remove={() => {
					if (dataState !== null) {
						removeCategory(dataState.user_id);
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

export default UserAccountsTable;
