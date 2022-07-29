import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ALERT_ENUM, popupAlert } from '../../../../helpers/alert_response';
import { API_HOST } from '../../../../helpers/global/global_config';
import { useIsMounted } from '../../../../helpers/use_hooks/isMounted';
import IconComponent from '../../../common/icon_component/icon';
import { setRefresh } from '../../../../features/reducers/popup_response';
import InputComponent from '../../../common/input_component/input_component/input_component';
import TextAreaComponent from '../../../common/input_component/textarea_input_component/textarea_input_component';
import ButtonComponent from '../../../common/button_component/button_component.js';

const HRMPSBEvaluationForm = ({ hrmpsbScore, applicantID }) => {
	const mounted = useIsMounted();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			attRate: hrmpsbScore[1]?.score ?? '',
			attRemarks: hrmpsbScore[1]?.remark ?? '',
			comRate: hrmpsbScore[2]?.score ?? '',
			comRemarks: hrmpsbScore[2]?.remark ?? '',
			perRate: hrmpsbScore[3]?.score ?? '',
			perRemarks: hrmpsbScore[3]?.remark ?? '',
			assPSBDate: hrmpsbScore?.assPSBDate ?? '',
		},
		validationSchema: Yup.object({
			attRate: Yup.number()
				.typeError('Must be a number')
				.max(25, 'Rate must be less than or equal to 25')
				.required('This field is required'),
			comRate: Yup.number()
				.typeError('Must be a number')
				.max(5, 'Rate must be less than or equal to 5')
				.required('This field is required'),
			perRate: Yup.number()
				.typeError('Must be a number')
				.max(5, 'Rate must be less than or equal to 5')
				.required('This field is required'),
		}),
		onSubmit: async (value, { resetForm }) => {
			value.hrmpsb_user_id = window.sessionStorage.getItem('user_id');
			// renderBusy(true);
			let formData = new FormData();
			let data = [
				{
					type: 1,
					score: value.attRate,
					remark: value.attRemarks,
				},
				{
					type: 2,
					score: value.comRate,
					remark: value.comRemarks,
				},
				{
					type: 3,
					score: value.perRate,
					remark: value.perRemarks,
				},
			];
			formData.append('appID', applicantID);
			formData.append(
				'hrmpsb_user_id',
				window.sessionStorage.getItem('user_id')
			);
			formData.append('evaluation', JSON.stringify(data));
			console.log(formData.values);
			await axios
				.post(API_HOST + 'save-hrmpsb-evaluation', formData)
				.then(() => {
					popupAlert({
						message: 'Evaluation was saved.',
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
			// renderBusy(false);
			resetForm();
		},
	});
	return (
		<>
			<form onSubmit={form.handleSubmit} onClick={(e) => e.stopPropagation()}>
				<table className='no-borders'>
					<thead></thead>
					<tbody className='no-borders'>
						<tr>
							<th className='main-header'>Date</th>
							<th className='no-borders'>
								<InputComponent
									name='assPSBDate'
									type='date'
									style={{ maxWidth: '10rem' }}
									value={form.values.assPSBDate}
									onChange={form.handleChange}
									disabled={
										window.sessionStorage.getItem('user_level') === '2'
											? false
											: true
									}
									maxLength='191'
								/>
							</th>
						</tr>
						<tr>
							<td colSpan={2}></td>
							<th className='main-header'>Rate</th>
							<th className='main-header'>Remarks</th>
						</tr>
						<tr>
							<th className='main-header' colSpan={2}>
								<p>Attributes (25%)</p>
								<ol type='a' style={{ marginLeft: '1rem' }}>
									<li>Pleasing Personality;</li>
									<li>Sharpness of Mind;</li>
									<li>Ability to express ideas/communication skills;</li>
									<li>Good quality of response;</li>
									<li>Self-confidence;</li>
									<li>Judgement and logical thinking;</li>
									<li>Initiative;</li>
									<li>Willingness and ability to learn;</li>
									<li>Other relevant attributes;</li>
								</ol>
							</th>
							<th className='main-header' style={{ verticalAlign: 'top' }}>
								<InputComponent
									name='attRate'
									style={{ maxWidth: '5rem', marginTop: '3px' }}
									value={form.values.attRate}
									onChange={form.handleChange}
									maxLength='191'
								/>
								{form.touched.attRate && form.errors.attRate ? (
									<span className='invalid-response'>
										{form.errors.attRate}
									</span>
								) : null}
							</th>
							<th className='main-header' style={{ verticalAlign: 'top' }}>
								<TextAreaComponent
									name='attRemarks'
									value={form.values.attRemarks}
									onChange={(e) => {
										form.setFieldValue('attRemarks', e.target.value);
									}}
									maxLength='191'
								/>
							</th>
						</tr>
						<tr>
							<th className='main-header' colSpan={2}>
								Commendable Accomplishments (5%)
							</th>
							<th className='main-header' style={{ verticalAlign: 'top' }}>
								<InputComponent
									style={{ maxWidth: '5rem', marginTop: '3px' }}
									name='comRate'
									value={form.values.comRate}
									onChange={form.handleChange}
									maxLength='191'
								/>
								{form.touched.comRate && form.errors.comRate ? (
									<span className='invalid-response'>
										{form.errors.comRate}
									</span>
								) : null}
							</th>
							<th className='main-header' style={{ verticalAlign: 'top' }}>
								<TextAreaComponent
									name='comRemarks'
									value={form.values.comRemarks}
									onChange={form.handleChange}
									maxLength='191'
								/>
							</th>
						</tr>
						<tr>
							<th className='main-header' colSpan={2}>
								Performance (5%)
							</th>
							<th className='main-header' style={{ verticalAlign: 'top' }}>
								<InputComponent
									style={{ maxWidth: '5rem', marginTop: '3px' }}
									name='perRate'
									value={form.values.perRate}
									onChange={form.handleChange}
									maxLength='191'
								/>
								{form.touched.perRate && form.errors.perRate ? (
									<span className='invalid-response'>
										{form.errors.perRate}
									</span>
								) : null}
							</th>
							<th className='main-header' style={{ verticalAlign: 'top' }}>
								<TextAreaComponent
									name='perRemarks'
									value={form.values.perRemarks}
									onChange={form.handleChange}
									maxLength='191'
								/>
							</th>
						</tr>
					</tbody>
				</table>
				<div
					className='mcf-footer'
					style={{
						justifyContent: 'end',
						display: 'flex',
						paddingRight: '10px',
					}}
				>
					<div className=''>
						<ButtonComponent type='submit' buttonName='Submit' />
					</div>
				</div>
			</form>
		</>
	);
};
export default HRMPSBEvaluationForm;
