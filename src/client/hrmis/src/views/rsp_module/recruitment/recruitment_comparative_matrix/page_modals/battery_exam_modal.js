import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ALERT_ENUM, popupAlert } from '../../../../../helpers/alert_response';
import { API_HOST } from '../../../../../helpers/global/global_config';
import { useIsMounted } from '../../../../../helpers/use_hooks/isMounted';
import InputComponent from '../../../../common/input_component/input_component/input_component';
import ModalComponent from '../../../../common/modal_component/modal_component';
import { usePopUpHelper } from '../../../../../helpers/use_hooks/popup_helper';
import { useDispatch, useSelector } from 'react-redux';
import { setRefresh } from '../../../../../features/reducers/popup_response';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import {
	SGType1,
	SGType2,
	SGType3,
} from '../../../../library/static/library_input_items';
import TextAreaComponent from '../../../../common/input_component/textarea_input_component/textarea_input_component';

const BatteryExamModal = ({ isDisplay, onClose, sg, appID, exam, setExam }) => {
	const [initialVals, setVals] = useState([]);
	const [validationData, setValidationData] = useState({});
	const mounted = useIsMounted();
	const dispatch = useDispatch();
	const { renderBusy } = usePopUpHelper();
	const { refresh } = useSelector((state) => state.popupResponse);

	const getAssessmentData = useCallback(async () => {
		await axios.get(API_HOST + 'get-assessment/' + appID).then((response) => {
			let data = response.data?.data ?? [];
			getBattery(data);
		});
	}, [isDisplay, sg]);

	const getBattery = async (assessment) => {
		let sgType = 0;
		if (SGType1.includes(sg)) sgType = 1;
		if (SGType2.includes(sg)) sgType = 2;
		if (SGType3.includes(sg)) sgType = 3;
		if (sgType === 0 || appID === undefined) return;
		renderBusy(true);
		await axios
			.get(API_HOST + 'get-battery-exam/3/' + sgType + '/' + appID)
			.then((response) => {
				let data = response.data?.data ?? [];
				let dataPlot = [];
				let initials = [];
				let yupValidation = {
					date: Yup.date().required('This field is required'),
				};
				data.forEach((data) => {
					let value = {
						points: data.bat_points,
						name: data.bat_id,
						title: data.bat_name,
						score: data?.battery?.exam_score,
					};
					let vals = {
						[data.bat_id]: data?.battery?.exam_score ?? 0,
					};
					dataPlot.push(value);
					yupValidation[data.bat_id] = Yup.number()
						.typeError('Must be a number')
						.max(data.bat_points)
						.required('This field is required');
					setVals(...initials, vals);
				});
				setExam(dataPlot);
				setValidationData(yupValidation);
				let vals = {
					date: assessment.ass_exam_date ?? '',
					remarks: assessment.ass_exam_remarks ?? '',
				};
				setVals(...initials, vals);
			});
		renderBusy(false);
	};

	useEffect(() => {
		getAssessmentData();
	}, [getAssessmentData]);

	const form = useFormik({
		enableReinitialize: true,
		initialValues: initialVals,
		validationSchema: Yup.object(validationData),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);
			let formData = new FormData();
			exam.forEach((data) => {
				console.log(data);
				formData.append([data.name], form.values[data.name]);
			});
			formData.append('date', form.values.date);
			formData.append('remarks', form.values.remarks);
			formData.append('app_id', appID);
			await axios
				.post(API_HOST + 'employement-exam', formData)
				.then(() => {
					popupAlert({
						message: 'Exam score was saved.',
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

	return (
		<React.Fragment>
			<ModalComponent
				title='Pre-employment Exam'
				isDisplay={isDisplay}
				onClose={onClose}
				onSubmit={form.handleSubmit}
				onSubmitType='submit'
				onSubmitName='Submit'
			>
				<div className='default-table' style={{ margin: '0px' }}>
					<div className='battery'>
						<div className='container'>
							<div className='item-modal-3'>
								<label>Date</label>
								<InputComponent
									name='date'
									type='date'
									value={form.values.date}
									onChange={form.handleChange}
									min={new Date().toLocaleDateString('en-ca')}
								/>
								{form.errors.date ? (
									<span className='invalid-response'>{form.errors.date}</span>
								) : null}
							</div>
						</div>
						<div className='container'>
							<div className='item-modal-1'>BATTERY</div>
							<div className='item-modal-2'>RATE</div>
						</div>
						{exam?.map((data, key) => {
							return (
								<div className='container' key={key}>
									<div className='item-modal-1'>
										<label>{data.title}</label>
									</div>
									<div className='item-modal-2'>
										<InputComponent
											name={data.name}
											type='number'
											value={form.values[data.name]}
											onChange={form.handleChange}
											maxLength='30'
											key={key}
										/>
										{form.errors[data.name] ? (
											<span className='invalid-response'>
												{form.errors[data.name]}
											</span>
										) : null}
									</div>
								</div>
							);
						})}
						<div className='container'>
							<div className='item-modal-3'>
								<label>Remarks</label>
								<TextAreaComponent
									name='remarks'
									value={form.values.remarks}
									type='Number'
									onChange={form.handleChange}
									maxLength='30'
								/>
							</div>
						</div>
					</div>
				</div>
			</ModalComponent>
		</React.Fragment>
	);
};

export default BatteryExamModal;
