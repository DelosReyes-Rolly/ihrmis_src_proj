import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { FiPaperclip } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { ALERT_ENUM, popupAlert } from '../../../../../helpers/alert_response';
import { API_HOST } from '../../../../../helpers/global/global_config';
import { useIsMounted } from '../../../../../helpers/use_hooks/isMounted';
import { usePopUpHelper } from '../../../../../helpers/use_hooks/popup_helper';
import ButtonComponent from '../../../../common/button_component/button_component.js.js';
import InputComponent from '../../../../common/input_component/input_component/input_component.js';
import { setRefresh } from '../../../../../features/reducers/popup_response';
import BatteryExamModal from '../page_modals/battery_exam_modal';
import { useToggleHelper } from '../../../../../helpers/use_hooks/toggle_helper';

const RecruitmentOtherAssessment = ({
	setAttachmentModalDetails,
	regular,
	sg,
	appID,
	applicant,
}) => {
	const mounted = useIsMounted();
	const { renderBusy, renderFailed, renderSucceed } = usePopUpHelper();
	const [appointed, setAppointed] = useState(0);
	const dispatch = useDispatch();
	const { refresh } = useSelector((state) => state.popupResponse);
	const [score, setScore] = useState(0);
	const [exam, setExam] = useState([]);
	const [initials, setInitials] = useState([]);
	const [validation, setValidation] = useState([]);

	const form = useFormik({
		enableReinitialize: true,
		initialValues: initials,
		validationSchema: Yup.object(validation),
		onSubmit: async (value, { resetForm }) => {
			value.appID = appID;
			console.log(Yup.object());
			// renderBusy(true);
			await axios
				.post(API_HOST + 'save-appointment', value)
				.then(() => {
					popupAlert({
						message: 'Appointment was saved.',
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

	const calculate = useCallback(() => {
		let examScore = 0;
		exam.forEach((data) => {
			examScore = examScore + data.score;
		});
		setScore(examScore);
	}, [exam]);
	useEffect(() => {
		calculate();
	}, [calculate]);
	const [examModal, setExamModalToggle] = useToggleHelper(false);

	// Appointment
	const getApplicantData = useCallback(async () => {
		document.querySelector('.appointed').checked =
			applicant?.app_appointed === 1 ? true : false;
		if (regular === 0) {
			form.setFieldValue('effectivityFrom', applicant?.app_period_from ?? '');
			form.setFieldValue('effectivityTo', applicant?.app_period_to ?? '');
			form.setFieldValue('assumption', applicant?.app_assmptn ?? '');
			setValidation({
				appointed: Yup.boolean().required('This field must be checked'),
				effectivityFrom: Yup.date().required('This field is required'),
				effectivityTo: Yup.date().required('This field is required'),
				assumption: Yup.date().required('This field is required'),
			});
			setInitials({
				appointed: applicant?.app_appointed === 1 ? true : false,
				effectivityFrom: applicant?.app_period_from ?? '',
				effectivityTo: applicant?.app_period_to ?? '',
				assumption: applicant?.app_assmptn ?? '',
			});
		} else if (regular === 1) {
			setInitials({
				appointed: applicant?.app_appointed === 1 ? true : false,
				effectivity: applicant?.effectivity ?? '',
				assumption: applicant?.app_assmptn ?? '',
			});
			form.setFieldValue('effectivity', applicant?.app_appntmnt ?? '');
			form.setFieldValue('assumption', applicant?.app_assmptn ?? '');
			setValidation({
				appointed: Yup.boolean().required('This field must be checked'),
				effectivity: Yup.date().required('This field is required'),
				assumption: Yup.date().required('This field is required'),
			});
		}
		console.log(applicant);
	}, [applicant, regular]);
	useEffect(() => {
		getApplicantData();
	}, [getApplicantData]);
	return (
		<>
			<table className='table-design comparative-matrix'>
				<thead>
					<tr className='no-border'>
						<th className='main-header' colSpan={6}>
							OTHER ASSESSMENTS
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th className=' center'>
							<div className='assessments-header'>
								Pre-employment Exam
								<div>
									<ButtonComponent
										buttonLogoStart={<FiPaperclip />}
										onClick={() => setAttachmentModalDetails(4)}
										buttonName='Attach'
									/>
								</div>
							</div>
						</th>
						<td>
							{exam.map((data, key) => {
								return (
									<p key={key}>
										{data?.title} : {data?.score}
									</p>
								);
							})}
						</td>
						<td className='w5'>
							<ButtonComponent
								onClick={() => setExamModalToggle(true)}
								buttonName='Score'
							/>
							<b>{score}</b>
						</td>
						<th className=''>
							<div className='assessments-header'>
								Psychological Exam
								<div>
									<ButtonComponent
										buttonLogoStart={<FiPaperclip />}
										onClick={() => setAttachmentModalDetails(5)}
										buttonName='Attach'
									/>
								</div>
							</div>
						</th>
						<td>Emotional Stability: A</td>
						<td className='w5'>
							<ButtonComponent
								// onClick={() => setTogModal(true)}
								buttonName='Score'
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<BatteryExamModal
				isDisplay={examModal}
				onClose={setExamModalToggle}
				type={''}
				sg={sg}
				appID={appID}
				exam={exam}
				setExam={setExam}
			/>
			<div className='center-items'>
				<form onSubmit={form.handleSubmit} onClick={(e) => e.stopPropagation()}>
					<table className='table-design page-end'>
						<thead>
							<tr>
								<th className=''>APPOINTED</th>
								<td>
									<div className='center-items'>
										<label className='switch'>
											<input
												type='checkbox'
												name={'appointed'}
												className={'appointed'}
												value={true}
												onChange={form.handleChange}
											/>
											<span className='slider round'></span>
										</label>
										{form.touched.appointed && form.errors.appointed ? (
											<span className='invalid-response'>
												{form.errors.appointed}
											</span>
										) : null}
									</div>
								</td>
								{regular !== undefined && regular === 1 && (
									<td>
										<label htmlFor='effectivity'>Date of Effectivity</label>
										<InputComponent
											name='effectivity'
											value={form.values.effectivity}
											onChange={form.handleChange}
											maxLength='30'
											type='date'
										/>
										{form.touched.effectivity && form.errors.effectivity ? (
											<span className='invalid-response'>
												{form.errors.effectivity}
											</span>
										) : null}
									</td>
								)}
								{regular !== undefined && regular === 0 && (
									<td>
										<div style={{ display: 'flex', flexDirection: 'row' }}>
											<div style={{ display: 'flex', width: '7rem' }}>
												Period of Employement
											</div>
											<div
												style={{
													display: 'flex',
													flexDirection: 'column',
												}}
											>
												<label>From</label>

												<InputComponent
													name='effectivityFrom'
													value={form.values.effectivityFrom}
													onChange={(e) => {
														form.setFieldValue(
															'effectivityFrom',
															e.target.value
														);
													}}
													type='date'
													min={new Date().toLocaleDateString('en-ca')}
												/>
												{form.touched.effectivityFrom &&
												form.errors.effectivityFrom ? (
													<span className='invalid-response'>
														{form.errors.effectivityFrom}
													</span>
												) : null}
											</div>
											<div
												style={{
													display: 'flex',
													flexDirection: 'column',
												}}
											>
												<label>To</label>
												<InputComponent
													name='effectivityTo'
													value={form.values.effectivityTo}
													onChange={(e) => {
														form.setFieldValue('effectivityTo', e.target.value);
													}}
													type='date'
													min={new Date().toLocaleDateString('en-ca')}
												/>
												{form.touched.effectivityTo &&
												form.errors.effectivityTo ? (
													<span className='invalid-response'>
														{form.errors.effectivityTo}
													</span>
												) : null}
											</div>
										</div>
									</td>
								)}
								<td>
									<label htmlFor='assumption'>Date of Assumption</label>
									<InputComponent
										className='assumption'
										name='assumption'
										value={form.values.assumption}
										onChange={(e) => {
											form.setFieldValue('assumption', e.target.value);
										}}
										maxLength='30'
										type='date'
									/>
									{form.touched.assumption && form.errors.assumption ? (
										<span className='invalid-response'>
											{form.errors.assumption}
										</span>
									) : null}
								</td>
								<td>
									<div className='center-items'>
										<ButtonComponent type='submit' buttonName='Save' />
									</div>
								</td>
							</tr>
						</thead>
					</table>
				</form>
			</div>
		</>
	);
};
export default RecruitmentOtherAssessment;
