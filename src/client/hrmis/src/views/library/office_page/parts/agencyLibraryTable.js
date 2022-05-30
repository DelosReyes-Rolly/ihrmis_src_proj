import React, { useMemo, useEffect, useState } from 'react';
import ButtonComponent from '../../../common/button_component/button_component.js.js';
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
import { MdAdd } from 'react-icons/md';
import { usePopUpHelper } from '../../../../helpers/use_hooks/popup_helper.js';
import AddAgencyModal from '../AddAgencyModal.js';

const AgencyLibraryTable = ({}) => {
	let [toggleOfficeModal, setToggleOfficeModal] = useToggleHelper(false);
	const { getSecondLevel } = crumbSecondLevel();
	const [plotAgencyData, setAgencyData] = useState([]);
	const { renderBusy, renderFailed, renderSucceed } = usePopUpHelper();
	const { refresh } = useSelector((state) => state.popupResponse);
	const { trueValue } = useSelectValueCon();
	const [toggleState, setToggleState] = useState(1);
	const toggleTab = (index) => {
		setToggleState(index);
	};
	const offceDataApi = async () => {
		renderBusy(true);
		await axios
			.get(API_HOST + 'agency')
			.then((response) => {
				let data = response.data.data ?? [];
				let dataPlot = [];
				data.map((data) => {
					let values = {
						agn_id: data.agn_id,
						agn_name: data.agn_name,
						agn_acronym: data.agn_acronym,
						agn_sector: data.agn_sector,
						agn_head_name: data.agn_head_name,
						agn_head_position: data.agn_head_position,
						agn_head_email: data.agn_head_email,
						agn_address: data.agn_address,
					};

					dataPlot.push(values);
				});
				setAgencyData(dataPlot);
			})
			.catch((error) => {});
		renderBusy(false);
	};

	useEffect(() => {
		offceDataApi();
	}, [refresh]);

	let data = useMemo(() => plotAgencyData, [plotAgencyData]);

	const columns = useMemo(
		() => [
			{
				Header: 'Agency ID',
				accessor: 'agn_id',
			},
			{
				Header: 'Agency Name',
				accessor: 'agn_name',
			},
			{
				Header: 'Agency Acronym',
				accessor: 'agn_acronym',
			},
			{
				Header: 'Agency Sector',
				accessor: 'agn_sector',
			},
			{
				Header: 'Agency Head',
				accessor: 'agn_head_name',
			},
			{
				Header: 'Agency Head Position',
				accessor: 'agn_head_position',
			},
			{
				Header: 'Agency Head Email',
				accessor: 'agn_head_email',
			},
			{
				Header: 'Agency Address',
				accessor: 'agn_address',
			},
		],
		[]
	);

	const initialState = {
		hiddenColumns: ['agn_id'],
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

	// const { globalFilter } = state;
	return (
		<div>
			<div style={{ margin: 20 }}>
				<button className='btn-primary' onClick={() => setToggleOfficeModal()}>
					<MdAdd style={{ padding: 0, margin: 0 }} size='14' />
					<span>Agency</span>
				</button>
			</div>
			<AddAgencyModal
				isDisplay={toggleOfficeModal}
				onClose={() => {
					setToggleOfficeModal();
					setDataState(null);
				}}
				agencyData={dataState}
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
							let agencyData = {};
							row.allCells.map((cell) => {
								let test = { [cell.column.id]: cell.value };
								agencyData = { ...agencyData, ...test };
							});

							return (
								<tr
									className='trHoverBody'
									{...row.getRowProps()}
									onClick={() => {
										passModalData(agencyData);
										// console.log(officeData);
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

export default AgencyLibraryTable;
