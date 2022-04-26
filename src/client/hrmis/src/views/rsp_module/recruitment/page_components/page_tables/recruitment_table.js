import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { MdMoreHoriz } from 'react-icons/md';
import axios from 'axios';
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useFilters,
	useRowSelect,
} from 'react-table';
import { useSelectValueCon } from '../../../../../helpers/use_hooks/select_value_cons.js';
import { recruitmentMenuItem } from '../../static/menu_items';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { API_HOST } from '../../../../../helpers/global/global_config';
import DropdownViewComponent from '../../../../common/dropdown_menu_custom_component/Dropdown_view.js';
import { recrutmentTableHeaders } from '../../static/table_items.js';
import { useNavigate } from 'react-router-dom';
import RecruitmentDocumentModal from '../page_modals/recruitment_document_modal/recruitment_document_modal.js';
const RecruitmentTable = ({ type, setSelectedApplicants }) => {
	const [plotApplicantData, setApplicantData] = useState([]);
	const { trueValue, displayData } = useSelectValueCon();
	const [value, setValue] = useState(0);
	const [modalData, setModalData] = useState([]);
	const navigate = useNavigate();
	const applicantDataApi = async () => {
		await axios
			.get(API_HOST + 'get-complete-applicant/' + type)
			.then((response) => {
				const data = response.data.data;
				let dataPlot = [];
				if (data.length === 0) {
					let values = {
						app_name: 'No data available',
					};
					dataPlot.push(values);
				} else {
					for (let i = 0; i < data.length; i++) {
						let profile_message = data[i].profile_message
							.split('\n')
							.map((str, key) => <p key={key}>{str}</p>);
						let qualification_message = data[i].qualification_message
							.split('\n')
							.map((str, key) => <p key={key}>{str}</p>);
						let position_message = data[i].position_message
							.split('\n')
							.map((str, key) => <p key={key}>{str}</p>);
						let values = {
							app_id: data[i].app_id ?? 'N/a',
							app_email: data[i].app_email,
							app_name: data[i].app_name,
							app_profile: profile_message ?? 'N/A',
							pos_applied: position_message ?? 'N/A',
							app_qualifications: qualification_message ?? 'N/A',
							sts_App_remarks: 'To be done',
						};

						dataPlot.push(values);
					}
				}

				setApplicantData(dataPlot);
			})
			.catch((error) => {});
	};
	useEffect(() => {
		applicantDataApi();
	}, []);
	const columns = useMemo(
		() => [
			{
				Header: '',
				accessor: 'app_id',
			},
			{
				Header: '',
				accessor: 'app_email',
			},
			{
				Header: 'Name',
				accessor: 'app_name',
			},
			{
				Header: 'Profile',
				accessor: 'app_profile',
			},
			{
				Header: 'Qualifications',
				accessor: 'app_qualifications',
			},
			{
				Header: 'Position Applied',
				accessor: 'pos_applied',
			},
			{
				Header: 'Status',
				accessor: 'sts_App_remarks',
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
					<input type='checkbox' ref={resolvedRef} {...rest} />
				</>
			);
		}
	);
	const initialState = {
		hiddenColumns: ['app_id', 'app_email'],
	};
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		selectedFlatRows,
		state,
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
					id: 'selection',
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
	const setSelectedRowsData = (selectedFlatRowsData) => {
		let temp_selected = [];
		selectedFlatRowsData?.forEach((element) => {
			let sdata = {};
			sdata['app_id'] = element.app_id;
			sdata['app_name'] = element.app_name;
			sdata['app_email'] = element.app_email;
			temp_selected.push(sdata);
		});
		setSelectedApplicants(temp_selected);
	};
	const openPDS = (data, index, length) => {
		if (index !== length && index !== 0) {
			navigate('/pds-applicant/form-page-one/' + data.app_id);
		}
	};
	useLayoutEffect(() => {
		let selectedFlatRowsData = selectedFlatRows.map((d) => d.original);
		setSelectedRowsData(selectedFlatRowsData);
	}, [selectedFlatRows]);
	return (
		<React.Fragment>
			<br />
			{/* <AddPlantillaItems
          type={type}
          search={globalFilter}
          setSearch={setGlobalFilter}
          statusFilter={setFilter}
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
							let applicantData = {};
							row.allCells.map((cell) => {
								let test = { [cell.column.id]: cell.value };
								applicantData = { ...applicantData, ...test };
							});
							return (
								<tr
									className='trHoverBody'
									onClick={() => {
										setModalData(applicantData);
									}}
									{...row.getRowProps()}
								>
									{row.cells.map((cell, index, arr) => {
										if (
											index === arr.length - 1 &&
											applicantData.app_name !== 'No data to display'
										) {
											return (
												<td {...cell.getCellProps()}>
													<div
														style={{
															display: 'flex',
															justifyContent: 'space-between',
														}}
													>
														<div>{cell.render('Cell')}</div>
														<div>
															<DropdownViewComponent
																itemList={recruitmentMenuItem}
																title={<MdMoreHoriz size='15' />}
																alignItems='end'
																toolTipId='other-actions'
																textHelper='Click to view other actions'
																setValue={setValue}
															/>
														</div>
													</div>
												</td>
											);
										}
										return (
											<td
												{...cell.getCellProps()}
												style={{ cursor: 'pointer' }}
												onClick={() => {
													openPDS(applicantData, index, arr.length - 1);
												}}
											>
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
			<RecruitmentDocumentModal
				isDisplay={value === 2 ? true : false}
				onClose={() => {
					setValue(0);
				}}
				rowData={modalData}
			/>
		</React.Fragment>
	);
};
export default React.memo(RecruitmentTable);
