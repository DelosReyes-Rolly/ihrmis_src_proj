import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useMemo, useState } from 'react';
import { ALERT_ENUM, popupAlert } from '../../../../../helpers/alert_response';
import { API_HOST } from '../../../../../helpers/global/global_config';
import { useIsMounted } from '../../../../../helpers/use_hooks/isMounted';
import InputComponent from '../../../../common/input_component/input_component/input_component';
import ModalComponent from '../../../../common/modal_component/modal_component';
import { usePopUpHelper } from '../../../../../helpers/use_hooks/popup_helper';
import { useDispatch } from 'react-redux';
import { setRefresh } from '../../../../../features/reducers/popup_response';
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

const AssessmentsModal = ({
	isDisplay,
	onClose,
	type,
	jvsRating,
	score,
	appID,
}) => {
	const text = ['Education', 'Relevant Trainings', 'Relevant Experience'];
	const ratingType = ['ED', 'TR', 'EX'];
	const [ratingData, setRatingData] = useState([]);
	const mounted = useIsMounted();
	const dispatch = useDispatch();
	const { renderBusy } = usePopUpHelper();

	useEffect(() => {
		let setterData = [];
		jvsRating?.forEach((data) => {
			if (data.rtg_com_type === ratingType[type]) {
				let values = {
					rtg_factor: data.rtg_factor,
					rtg_percent: data.rtg_percent,
					rtg_seq_order: data.rtg_seq_order,
				};
				setterData.push(values);
			}
		});
		setRatingData(setterData);
	}, [type]);

	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			Score: score ?? '',
		},
		validationSchema: Yup.object({
			Score: Yup.number()
				.typeError('Must be a number')
				.max(ratingData[0]?.rtg_percent ?? 15)
				.required('This field is required'),
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);
			value.type = ratingType[type];
			value.app_id = appID;
			await axios
				.post(API_HOST + 'assessment-score', value)
				.then(() => {
					popupAlert({
						message: text[type] + ' score was saved.',
						type: ALERT_ENUM.success,
					});
					dispatch(setRefresh());
				})
				.catch((err) => {
					popupAlert({
						message: err.message,
						type: ALERT_ENUM.fail,
					});
				});
			renderBusy(false);
			onClose();
			resetForm();
		},
	});

	let data = useMemo(() => ratingData, [ratingData]);
	const columns = useMemo(
		() => [
			{
				Header: 'CALIBRATED SCALE OF FACTOR WEIGHT',
				accessor: 'rtg_factor',
			},
			{
				Header: '%',
				accessor: 'rtg_percent',
			},
		],
		[]
	);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable(
			{
				columns,
				data,
			},
			useFilters,
			useGlobalFilter,
			useSortBy
		);
	return (
		<React.Fragment>
			<ModalComponent
				title={text[type]}
				isDisplay={isDisplay}
				onClose={onClose}
				onSubmit={form.handleSubmit}
				onSubmitType='submit'
				onSubmitName='Submit'
			>
				<div className='default-table' style={{ margin: '0px' }}>
					<div className='add-office-modal'>
						<div className='item-modal-5'>
							<label>Score</label>
							<InputComponent
								name='Score'
								value={form.values.Score}
								onChange={form.handleChange}
								maxLength='30'
							/>
							{form.touched.Score && form.errors.Score ? (
								<span className='invalid-response'>{form.errors.Score}</span>
							) : null}
						</div>
					</div>
					<table className='table-design' {...getTableProps()}>
						<thead>
							{headerGroups.map((headerGroup) => (
								<tr
									className='main-header'
									{...headerGroup.getHeaderGroupProps()}
								>
									{headerGroup.headers.map((column) => (
										<th
											{...column.getHeaderProps(column.getSortByToggleProps())}
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
							{rows.map((row, keyrow) => {
								prepareRow(row);
								let officeData = {};
								row.allCells.forEach((cell) => {
									let test = { [cell.column.id]: cell.value };
									officeData = { ...officeData, ...test };
								});

								return (
									<tr key={keyrow} className='trHoverBody'>
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
			</ModalComponent>
		</React.Fragment>
	);
};

export default AssessmentsModal;
