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
import { ALERT_ENUM, popupAlert } from '../../../../../helpers/alert_response';
import { API_HOST } from '../../../../../helpers/global/global_config';
import { useIsMounted } from '../../../../../helpers/use_hooks/isMounted';
import { useToggleHelper } from '../../../../../helpers/use_hooks/toggle_helper';
import ButtonComponent from '../../../../common/button_component/button_component.js.js';
import IconComponent from '../../../../common/icon_component/icon';
import RecruitmentDocumentModal from '../../page_components/page_modals/recruitment_document_modal/recruitment_document_modal';
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
import RecruitmentHRMPSB from './recruitment_hrmpsb';
import RecruitmentOtherAssessment from './recruitment_other_assessment';

const RecruitmentRatingAssessment = ({
	applicant_id,
	plantilla,
	setPageType,
}) => {
	const mounted = useIsMounted();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [applicant, setApplicant] = useState([]);
	const [hrmpsbScore, setHrmpsbScore] = useState({
		1: 0,
		attRemark: '',
		2: 0,
		accomRemark: '',
		3: 0,
		perRemark: '',
		assPSBDate: '',
		hrmTotal: 0,
		total: 0,
	});
	const urlpath = window.location.pathname;
	const route = urlpath.split('/');
	const plantilla_id = route[5];
	const app_route = route[6];
	const { refresh } = useSelector((state) => state.popupResponse);
	const getCMData = useCallback(async () => {
		setBusy(true);
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
					data?.tbl_assessments?.ass_education +
					data?.tbl_assessments?.ass_experience +
					data?.tbl_assessments?.ass_training;
				let score = Object.assign({}, hrmpsbScore);
				score.total = 0;
				let attributesAverage = 0;
				let commendableAverage = 0;
				let performanceAverage = 0;
				let total = 0;
				let attributeCount = 0;
				let commendableCount = 0;
				let performanceCount = 0;
				data?.tbl_hrmpsb_score.forEach((scores) => {
					switch (scores.hrmpsb_type) {
						case 1:
							attributeCount++;
							attributesAverage += scores?.hrmpsb_score;
							break;
						case 2:
							commendableCount++;
							commendableAverage += scores?.hrmpsb_score;
							break;
						case 3:
							performanceCount++;
							performanceAverage += scores?.hrmpsb_score;
							break;
						default:
							break;
					}
				});
				score[1] = attributesAverage / attributeCount;
				score[2] = commendableAverage / commendableCount;
				score[3] = performanceAverage / performanceCount;
				score.hrmTotal = score[1] + score[2] + score[3];
				score.total = score.hrmTotal + raSubTotal;
				score.attRemark = data?.tbl_assessments?.ass_attribute;
				score.accomRemark = data?.tbl_assessments?.ass_accomplishment;
				score.perRemark = data?.tbl_assessments?.ass_performance;
				score.assPSBDate = data?.tbl_assessments?.ass_psb_eval_date;
				setHrmpsbScore(score);

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
					edu_score: data?.tbl_assessments?.ass_education,
					exp: experience,
					exp_score: data?.tbl_assessments?.ass_experience,
					trn: training,
					trn_score: data?.tbl_assessments?.ass_training,
					cmptncy: competency,
					cmptncyScore: cmptncyTotal,
					cmptncyScores: data?.tbl_cmptcy_score,
					cmptncySpecific: data?.tbl_cmptcy,
					cmptncyRemarks: data?.tbl_assessments.ass_remarks,
					jvs: data?.tblcmptncy_ratings,
					subtotal: raSubTotal,
					app_appointed: data?.app_appointed,
					app_appntmnt: data?.app_appntmnt,
					app_assmptn: data?.app_assmptn,
					app_period_from: data?.app_period_from,
					app_period_to: data?.app_period_to,
					app_hrmpsb_attribute: data?.tbl_assessments.ass_attribute,
					app_hrmpsb_accomplishment: data?.tbl_assessments.ass_accomplishment,
					app_hrmpsb_performance: data?.tbl_assessments.ass_performance,
				};
				if (!mounted.current) return;
				setApplicant(values);
			})
			.catch((err) => {
				popupAlert({
					message: err.message,
					type: ALERT_ENUM.fail,
				});
			});
		setBusy(false);
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

	const [attachmentsModal, setAttachmentsModalToggle] = useToggleHelper(false);
	const [level, setLevel] = useState(3);
	const setAttachmentModalDetails = (level) => {
		setLevel(level);
		setAttachmentsModalToggle();
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
							<th className=''>
								<div className='assessments-header'>
									Job Competency (30%)
									<div>
										<ButtonComponent
											buttonLogoStart={<FiPaperclip />}
											onClick={() => setAttachmentModalDetails(3)}
											buttonName='Attach'
										/>
									</div>
								</div>
							</th>
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
				<RecruitmentHRMPSB
					hrmpsbScore={hrmpsbScore}
					appID={applicant_id}
					applicant={applicant}
				/>
				<RecruitmentOtherAssessment
					regular={plantilla?.itm_regular}
					sg={plantilla?.tbl_positions?.pos_salary_grade}
					appID={applicant_id}
					setAttachmentModalDetails={setAttachmentModalDetails}
					applicant={applicant}
				/>
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
			<RecruitmentDocumentModal
				isDisplay={attachmentsModal}
				onClose={setAttachmentsModalToggle}
				appID={applicant_id}
				title={'Attachments'}
				level={level ?? 3}
				cluster='RP'
			/>
		</>
	);
};
export default RecruitmentRatingAssessment;
