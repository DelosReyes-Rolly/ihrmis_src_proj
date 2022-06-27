import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BsArrowDown, BsArrowLeft, BsArrowUp } from 'react-icons/bs';
import { IoRefreshCircle } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table';
import {
	setBusy,
	setRefresh,
} from '../../../../../features/reducers/popup_response';
import { API_HOST } from '../../../../../helpers/global/global_config';
import IconComponent from '../../../../common/icon_component/icon';
import {
	recruitmentCMHeaders,
	recruitmentEligbilities,
} from '../../static/table_items';

const RecruitmentComparativeTable = ({ setPageType, setApplicantId }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const urlpath = window.location.pathname;
	const route = urlpath.split('/');
	const plantilla_id = route[5];
	const [applicants, setApplicants] = useState([]);
	const { refresh } = useSelector((state) => state.popupResponse);
	const getCMData = useCallback(async () => {
		dispatch(setBusy(true));
		await axios
			.get(API_HOST + 'get-cm-data/' + plantilla_id)
			.then((response) => {
				let data = response.data.data.applicants ?? [];
				let dataPlot = [];
				let count = 1;
				data.forEach((data) => {
					let eligibilites = '';
					data.tblapplicant_eligibility.forEach((eligibility) => {
						eligibilites +=
							' ' + recruitmentEligbilities[eligibility.cse_app_title];
					});
					let values = {
						app_id: data?.tblapplicants_profile?.app_id,
						no: count++,
						applicant_name:
							data?.tblapplicants_profile?.app_nm_last +
							' ' +
							data?.tblapplicants_profile?.app_nm_first +
							' ' +
							data?.tblapplicants_profile?.app_nm_mid +
							' (' +
							data?.tblapplicants_profile?.app_sex +
							')',
						elig: eligibilites,
						edu: data?.tbl_assessments?.ass_education,
						exp: data?.tbl_assessments?.ass_experience,
						trn: data?.tbl_assessments?.ass_training,
						cmptncy: 0,
						subtotal:
							data?.tbl_assessments?.ass_education +
							data?.tbl_assessments?.ass_experience +
							data?.tbl_assessments?.ass_training,
						attrbts: 0,
						accom: 0,
						perfor: 0,
						subtotal2: 0,
						total: 0,
					};
					dataPlot.push(values);
				});
				setApplicants(dataPlot);
				dispatch(setBusy(false));
			});
	}, [plantilla_id, dispatch]);

	useEffect(() => {
		getCMData();
	}, [getCMData, refresh]);
	const initialState = {
		hiddenColumns: ['app_id'],
	};
	let data = useMemo(() => applicants, [applicants]);
	const columns = useMemo(() => recruitmentCMHeaders, []);

	const { getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
		{
			columns,
			data,
			initialState,
		},
		useFilters,
		useGlobalFilter,
		useSortBy
	);

	return (
		<div>
			<div className='default-table document_table'>
				<table className='table-design comparative-matrix'>
					<thead>
						<tr className='no-border'>
							<th className='w5'>
								<IconComponent
									id='comparative_matrix_back'
									className='pointer'
									icon={<BsArrowLeft size='25' />}
									toolTipId='cm_back_tooltip'
									onClick={() => navigate('/rsp/recruitment')}
									textHelper={'Go Back'}
								/>
							</th>
							<th className='main-header' colSpan={11}>
								APPLICANTS' SUMMARY RATING
							</th>
							<th className='w5'>
								<IconComponent
									id='comparative_matrix_refresh'
									className=''
									icon={<IoRefreshCircle size='30' />}
									toolTipId='cm_refresh_tooltip'
									onClick={() => dispatch(setRefresh())}
									textHelper={'Reload'}
								/>
							</th>
						</tr>
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
							return (
								<tr
									className='trHoverBody pointer'
									onClick={() => {
										setPageType('ra');
										setApplicantId(row.allCells[0].value);
									}}
									{...row.getRowProps()}
								>
									{row.cells.map((cell, key) => {
										return <td key={key}>{cell.render('Cell')}</td>;
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
export default RecruitmentComparativeTable;
