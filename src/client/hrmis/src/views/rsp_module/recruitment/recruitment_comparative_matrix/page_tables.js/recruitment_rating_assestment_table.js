import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { FiPaperclip } from 'react-icons/fi';
import { IoInformationCircle, IoRefreshCircle } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	setBusy,
	setRefresh,
} from '../../../../../features/reducers/popup_response';
import { API_HOST } from '../../../../../helpers/global/global_config';
import { useIsMounted } from '../../../../../helpers/use_hooks/isMounted';
import { useToggleHelper } from '../../../../../helpers/use_hooks/toggle_helper';
import ButtonComponent from '../../../../common/button_component/button_component.js.js';
import IconComponent from '../../../../common/icon_component/icon';
import InputComponent from '../../../../common/input_component/input_component/input_component';
import ToggleSwitchComponent from '../../../../common/toggle_switch_component/toggle_switch';
import {
	competencyScore,
	competencyToMessage,
	educationToMessage,
	eligibilityToMessage,
	experienceToMessage,
	trainingToMessage,
} from '../../static/functions';
import AssessmentsModal from '../page_modals/assessments_modal';
import CompetencyAssessmentModal from '../page_modals/competency_assessment_modal';

const RecruitmentRatingAssessment = ({ applicant_id, setPageType }) => {
	const mounted = useIsMounted();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [applicant, setApplicant] = useState([]);
	const urlpath = window.location.pathname;
	const route = urlpath.split('/');
	const plantilla_id = route[5];
	const app_route = route[6];
	const { refresh } = useSelector((state) => state.popupResponse);
	const getCMData = useCallback(async () => {
		dispatch(setBusy(true));
		await axios
			.get(API_HOST + 'get-ra-data/' + plantilla_id + '/' + applicant_id)
			.then((response) => {
				let data = response.data?.data[0] ?? [];
				let eligibilites = eligibilityToMessage(data.tblapplicant_eligibility);
				let education = educationToMessage(data?.tblapplicant_education);
				let training = trainingToMessage(data?.tblapplicant_trainings);
				let experience = experienceToMessage(data?.tblapplicant_experience);
				let competency = competencyToMessage(data?.tblcmptncy_ratings);
				let cmptncyTotal = competencyScore(data?.tbl_cmptcy_score);
				let raSubTotal =
					cmptncyTotal +
					data?.tbl_assessments.ass_education +
					data?.tbl_assessments.ass_experience +
					data?.tbl_assessments.ass_training;
				let values = {
					app_id: data?.tblapplicants_profile?.app_id,
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
					edu: education,
					edu_score: data?.tbl_assessments.ass_education,
					exp: experience,
					exp_score: data?.tbl_assessments.ass_experience,
					trn: training,
					trn_score: data?.tbl_assessments.ass_training,
					cmptncy: competency,
					cmptncyScore: cmptncyTotal,
					cmptncyScores: data?.tbl_cmptcy_score,
					cmptncySpecific: data?.tbl_cmptcy,
					cmptncyRemarks: data?.tbl_assessments.ass_remarks,
					jvs: data?.tblcmptncy_ratings,
					subtotal: raSubTotal,
					attrbts: 0,
					accom: 0,
					perfor: 0,
					subtotal2: 0,
					total: 0,
				};
				if (!mounted.current) return;
				setApplicant(values);
			});
		dispatch(setBusy(false));
	}, [applicant_id, plantilla_id, dispatch]);

	useEffect(() => {
		getCMData();
	}, [getCMData, refresh]);

	// ============== Educ, Training, EXP Modal ==================
	const [assessmentType, setAssessmentType] = useState('');
	const [modalToggle, setModalToggle] = useToggleHelper(false);
	const [competencyModal, setCompetencyModalToggle] = useToggleHelper(false);
	const [score, setScore] = useState(0);
	const setAssessmentModalDetails = (type, score) => {
		setAssessmentType(type);
		// array.forEach((element) => {});
		setModalToggle();
		setScore(score);
	};

	// ================ Competency Assessment Modal ==================
	const setCompetencyAssessmentModalDetails = (type, score) => {
		setAssessmentType(type);
		// array.forEach((element) => {});
		setCompetencyModalToggle();
		setScore(score);
	};

	return (
		<>
			<div className='default-table document_table'>
				<table className='table-design comparative-matrix'>
					<thead>
						<tr className='no-border'>
							<th className='w5'>
								<IconComponent
									id='ra_back'
									className=''
									icon={<BsArrowLeft size='25' />}
									toolTipId='ra_back_tooltip'
									onClick={() => {
										if (app_route !== undefined) {
											navigate('/rsp/recruitment');
										}
										setPageType('');
									}}
									textHelper={'Go Back'}
								/>
							</th>
							<th className='main-header' colSpan={4}>
								RATINGS AND ASSESSMENT
							</th>
							<th className='w5'>
								<IconComponent
									id='ra_refresh'
									className=''
									icon={<IoRefreshCircle size='30' />}
									toolTipId='ra_refresh_tooltip'
									onClick={() => dispatch(setRefresh())}
									textHelper={'Reload'}
								/>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th className=''>Name of Applicant</th>
							<td style={{ width: '35%' }}>{applicant?.applicant_name}</td>
							<td className='w5'>
								<IconComponent
									id='ra_pds'
									className=''
									icon={<IoInformationCircle size='30' />}
									toolTipId='ra_pds_tooltip'
									// TODO: Connect Sean Employee PDS to this button,
									// need to create
									onClick={() => console.log('view_pds')}
									textHelper={'View PDS'}
								/>
							</td>
							<th className=''>Eligibility</th>
							<td colSpan={2}>{applicant?.elig}</td>
						</tr>
						<tr>
							<th className=''>Education (10%)</th>
							<td>{applicant?.edu}</td>
							<td className='center'>
								<ButtonComponent
									onClick={() => {
										setAssessmentModalDetails(0, applicant?.edu_score);
									}}
									buttonName='Score'
								/>
								<b>{applicant?.edu_score}</b>
							</td>
							<th className=''>Relevant Trainings (10%)</th>
							<td style={{ width: '35%' }}>{applicant?.trn}</td>
							<td className='center'>
								<ButtonComponent
									onClick={() => {
										setAssessmentModalDetails(1, applicant?.trn_score);
									}}
									buttonName='Score'
								/>
								<b>{applicant?.trn_score}</b>
							</td>
						</tr>
						<tr>
							<th className=''>Relevant Experience (15%)</th>
							<td>{applicant?.exp}</td>
							<td className='center'>
								<ButtonComponent
									onClick={() => {
										setAssessmentModalDetails(2, applicant?.exp_score);
									}}
									buttonName='Score'
								/>
								<b>{applicant?.exp_score}</b>
							</td>
							<th className=''>Job Competency (30%)</th>
							<td>{applicant?.cmptncy}</td>
							<td className='center'>
								<ButtonComponent
									onClick={() => {
										setCompetencyAssessmentModalDetails(
											3,
											applicant?.cmptncyScore
										);
									}}
									buttonName='Score'
								/>
								<b>{applicant?.cmptncyScore}</b>
							</td>
						</tr>
						<tr>
							<th className=' assessments-header'>Sub-total</th>
							<th className='' colSpan={5}>
								{applicant?.subtotal}
							</th>
						</tr>
					</tbody>
				</table>
				<RecruitmentHRMPSB />
				<RecruitmentOtherAssessment />
				<AssessmentsModal
					isDisplay={modalToggle}
					type={assessmentType}
					onClose={setModalToggle}
					score={score}
					jvsRating={applicant?.jvs}
					appID={applicant_id}
				/>
				<CompetencyAssessmentModal
					isDisplay={competencyModal}
					type={assessmentType}
					onClose={setCompetencyModalToggle}
					score={applicant.cmptncyScores}
					jvsRating={applicant?.jvs}
					specific={applicant?.cmptncySpecific}
					remarks={applicant?.cmptncyRemarks}
					appID={applicant_id}
				/>
			</div>
		</>
	);
};
export default RecruitmentRatingAssessment;

const RecruitmentHRMPSB = ({}) => {
	return (
		<>
			<table className='table-design comparative-matrix'>
				<thead>
					<tr className='no-border'>
						<th className='main-header' colSpan={6}>
							HRMPSB
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th className='' rowSpan={2}>
							Attributes (25%)
							<div className='fs-small'>
								<ol type='a'>
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
							</div>
						</th>
						<td rowSpan={2} style={{ width: '35%' }}></td>
						<td rowSpan={2} className='w5'>
							<ButtonComponent
								// onClick={() => setTogModal(true)}
								buttonName='Score'
							/>
						</td>
						<th className=''>Commendable Accomplishments (5%)</th>
						<td style={{ width: '35%' }}></td>
						<td className='w5'>
							<ButtonComponent
								// onClick={() => setTogModal(true)}
								buttonName='Score'
							/>
						</td>
					</tr>
					<tr>
						<th className=''>Performance (5%)</th>
						<td></td>
						<td>
							<ButtonComponent
								// onClick={() => setTogModal(true)}
								buttonName='Score'
							/>
						</td>
					</tr>
					<tr>
						<th className=' assessments-header'>Sub-total</th>
						<th className='' colSpan={5}></th>
					</tr>
					<tr>
						<th className=' assessments-header'>TOTAL (100%)</th>
						<th className='' colSpan={5}></th>
					</tr>
				</tbody>
			</table>
		</>
	);
};

const RecruitmentOtherAssessment = ({}) => {
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
										// onClick={() => setTogModal(true)}
										buttonName='Attach'
									/>
								</div>
							</div>
						</th>
						<td>Numerical Ability: 20</td>
						<td className='w5'>
							<ButtonComponent
								// onClick={() => setTogModal(true)}
								buttonName='Score'
							/>
						</td>
						<th className=''>
							<div className='assessments-header'>
								Psychological Exam
								<div>
									<ButtonComponent
										buttonLogoStart={<FiPaperclip />}
										// onClick={() => setTogModal(true)}
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
			<div className='center-items'>
				<table className='table-design page-end' style={{ width: '60%' }}>
					<thead>
						<tr>
							<th className=''>APPOINTED</th>
							<td>
								<div className='center-items'>
									<ToggleSwitchComponent className />
								</div>
							</td>
							<td>
								<label htmlFor='effectivity'>Date of Effectivity</label>
								<InputComponent
									name='effectivity'
									// value={form.values.doc_name}
									// onChange={form.handleChange}
									maxLength='30'
									type='date'
								/>
								{/* {form.touched.doc_name && form.errors.doc_name ? (
									<span className='invalid-response'>{form.errors.doc_name}</span>
								) : null} */}
							</td>
							<td>
								<label htmlFor='effectivity'>Date of Assumption</label>
								<InputComponent
									name='effectivity'
									// value={form.values.doc_name}
									// onChange={form.handleChange}
									maxLength='30'
									type='date'
								/>
								{/* {form.touched.doc_name && form.errors.doc_name ? (
									<span className='invalid-response'>{form.errors.doc_name}</span>
								) : null} */}
							</td>
							<td>
								<div className='center-items'>
									<ButtonComponent
										// onClick={() => setTogModal(true)}
										buttonName='Save'
									/>
								</div>
							</td>
						</tr>
					</thead>
				</table>
			</div>
		</>
	);
};