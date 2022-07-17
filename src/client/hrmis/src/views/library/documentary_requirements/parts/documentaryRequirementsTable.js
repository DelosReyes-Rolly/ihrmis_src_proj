import React, { useMemo, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { API_HOST } from '../../../../helpers/global/global_config.js';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useToggleHelper } from '../../../../helpers/use_hooks/toggle_helper.js';
import { MdAdd } from 'react-icons/md';
import { usePopUpHelper } from '../../../../helpers/use_hooks/popup_helper.js';
import { setRefresh } from '../../../../features/reducers/popup_response';
import { ALERT_ENUM, popupAlert } from '../../../../helpers/alert_response.js';
import DocumentaryRequirementsModal from './documentaryRequirementsModal.js';
import { useIsMounted } from '../../../../helpers/use_hooks/isMounted.js';
import SearchComponent from '../../../common/input_component/search_input/search_input.js';
import { GroupClusterData } from '../../static/library_input_items.js';
import { useSelectValueCon } from '../../../../helpers/use_hooks/select_value_cons.js';
import DocumentRequirementsModalTest from './documentRequirements.js';

const DocumentaryRequirementsTable = () => {
	const mounted = useIsMounted();
	const dispatch = useDispatch();
	let [toggleOfficeModal, setToggleOfficeModal] = useToggleHelper(false);
	const { renderBusy } = usePopUpHelper();
	const [plotDocument, setDocuments] = useState([]);
	const { refresh } = useSelector((state) => state.popupResponse);
	const { trueValue } = useSelectValueCon();
	const documentRequirmentsData = useCallback(async () => {
		await axios
			.get(API_HOST + 'documentary-requirements')
			.then((response) => {
				let data = response.data ?? [];
				let dataPlot = [];

				data.forEach((data) => {
					let values = {
						doc_name: data.doc_name,
						doc_group: data.grp_id,
						doc_group_text: data.grp_name,
						doc_group_cluster: trueValue(data.grp_cluster, GroupClusterData),
					};
					dataPlot.push(values);
				});

				if (!mounted.current) return;
				setDocuments(dataPlot);
			})
			.catch((error) => {});
	}, [refresh]);

	useEffect(() => {
		documentRequirmentsData();
	}, [documentRequirmentsData]);

	let data = useMemo(() => plotDocument, [plotDocument]);
	const columns = useMemo(
		() => [
			{
				Header: 'Document Names',
				accessor: 'doc_name',
			},
			{
				Header: 'Document Group',
				accessor: 'doc_group',
			},
			{
				Header: 'Document Group Text',
				accessor: 'doc_group_text',
			},
			{
				Header: 'Document Cluster',
				accessor: 'doc_group_cluster',
			},
		],
		[]
	);

	const initialState = {
		hiddenColumns: ['doc_group'],
	};

	const {
		getTableProps,
		getTableBodyProps,
		setGlobalFilter,
		headerGroups,
		rows,
		prepareRow,
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
	const removeCategory = async (record) => {
		renderBusy(true);
		await axios
			.delete(API_HOST + `documentary-requirements/${record}`)
			.then(() => {
				popupAlert({
					message: 'Document Requirement was deleted',
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
		<>
			<div className='selector-buttons'>
				<div className='selector-container'>
					{/* <span className='selector-span-1'> */}
					{/* <ButtonComponent/> */}
					<button
						className='filter_buttons button-components'
						onClick={() => setToggleOfficeModal()}
						style={{
							cursor: 'pointer',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							textAlign: 'center',
						}}
					>
						<MdAdd style={{ padding: 0, margin: 0 }} size='14' />
						<span>Documentary Requirement</span>
					</button>
				</div>
				<div className='search-container'>
					<span className='margin-right-1 selector-search-label'>
						<label>Search</label>
					</span>
					<span>
						<SearchComponent
							placeholder='Search'
							onChange={(e) => {
								setGlobalFilter(e.target.value ?? '');
							}}
						/>
					</span>
				</div>
			</div>
			<DocumentRequirementsModalTest
				isDisplay={toggleOfficeModal}
				onClose={() => {
					setToggleOfficeModal();
					setDataState(null);
				}}
				data={dataState}
				remove={() => {
					if (dataState !== null) {
						removeCategory(dataState.doc_group);
					} else {
						setToggleOfficeModal();
					}
				}}
				removeName={dataState !== null ? 'Delete' : 'Close'}
			/>
			<div
				className='default-table'
				style={{ maxHeight: '68vh', overflowY: 'auto' }}
			>
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
									{row.cells.map((cell, key) => {
										return (
											<td key={key} {...cell.getCellProps()}>
												{cell.render('Cell')}
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
					fontSize: 'small',
					color: 'rgba(70, 70, 70, 0.6)',
					width: '100%',
					margin: '0px 20px',
				}}
			>
				Total of {rows.length} entries
			</p>
		</>
	);
};

export default DocumentaryRequirementsTable;
