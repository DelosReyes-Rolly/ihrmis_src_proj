import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { FiPaperclip } from 'react-icons/fi';
import { IoInformationCircle, IoRefreshCircle } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ALERT_ENUM, popupAlert } from '../../../../helpers/alert_response';
import { API_HOST } from '../../../../helpers/global/global_config';
import { useIsMounted } from '../../../../helpers/use_hooks/isMounted';
import IconComponent from '../../../common/icon_component/icon';

import {
	setBusy,
	setRefresh,
} from '../../../../features/reducers/popup_response';
import {
	competencyToMessage,
	educationToMessage,
	eligibilityToMessage,
	experienceToMessage,
	trainingToMessage,
	competencyScore,
} from '../../recruitment/static/functions';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import HRMPSBEvaluationForm from './evaluation_form';

const HRMPSBEvaluation = ({}) => {
	const mounted = useIsMounted();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [applicant, setApplicant] = useState([]);
	const [hidden, setHidden] = useState(false);
	const [hrmpsbScore, setHrmpsbScore] = useState({
		1: { score: 0, remark: '' },
		2: { score: 0, remark: '' },
		3: { score: 0, remark: '' },
		assPSBDate: '',
		total: 0,
	});
	const urlpath = window.location.pathname;
	const route = urlpath.split('/');
	const plantilla_id = route[4];
	const app_route = route[5];
	const { refresh } = useSelector((state) => state.popupResponse);
	const getCMData = useCallback(async () => {
		setBusy(true);
		await axios
			.get(API_HOST + 'get-ra-data/' + plantilla_id + '/' + app_route)
			.then((response) => {
				let data = response.data?.data[0] ?? [];
				let score = Object.assign({}, hrmpsbScore);
				score.total = 0;
				data?.tbl_hrmpsb_score.forEach((scores) => {
					if (
						scores.hrmpsb_user_id ===
						parseInt(window.sessionStorage.getItem('user_id'))
					) {
						score[scores.hrmpsb_type].score = scores.hrmpsb_score;
						score.total += scores.hrmpsb_score;
						score[scores.hrmpsb_type].remark = scores?.hrmpsb_remarks;
						score.assPSBDate = data?.tbl_assessments?.ass_psb_eval_date;
					}
				});
				setHrmpsbScore(score);
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
					attrbts: 0,
					accom: 0,
					perfor: 0,
					subtotal2: 0,
					total: 0,
					app_appointed: data?.app_appointed,
					app_appntmnt: data?.app_appntmnt,
					app_assmptn: data?.app_assmptn,
					app_period_from: data?.app_period_from,
					app_period_to: data?.app_period_to,
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
	}, [app_route, plantilla_id, dispatch]);

	useEffect(() => {
		getCMData();
	}, [getCMData, refresh]);

	return (
		<>
			<div
				className='default-table document_table'
				style={{ marginBottom: '5rem' }}
			>
				<table className='table-design comparative-matrix' style={{}}>
					<thead>
						<tr className='no-border'>
							<th className='w5'>
								<IconComponent
									id='ra_back'
									className=''
									icon={<BsArrowLeft size='25' />}
									toolTipId='ra_back_tooltip'
									onClick={() => {
										navigate('/hrmpsb/');
									}}
									textHelper={'Go Back'}
								/>
							</th>
							<th
								className='main-header'
								style={{ textAlign: 'left' }}
								colSpan={3}
							>
								RATINGS AND ASSESSMENT
							</th>
							<th style={{ textAlign: 'right' }}>
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
							<td colSpan={hidden ? 1 : 2}>{applicant?.elig}</td>
						</tr>
						<tr className='no-border'>
							<th
								className='main-header'
								style={{ display: hidden ? 'none' : '' }}
								colSpan={3}
							>
								END-USER ASSESSMENT
							</th>
							<th className='w5'>
								<IconComponent
									id='hrmpsbClose'
									className=''
									icon={hidden ? <BiLogIn size='30' /> : <BiLogOut size='30' />}
									onClick={() => {
										setHidden(!hidden);
									}}
								/>
							</th>
							<th className='main-header' colSpan={hidden ? 4 : 2}>
								HRMPSB Evaluation
							</th>
						</tr>
						<tr>
							<th style={{ display: hidden ? 'none' : '' }}>Education (10%)</th>
							<td style={{ display: hidden ? 'none' : '' }}>
								{applicant?.edu}
							</td>
							<td className='center' style={{ display: hidden ? 'none' : '' }}>
								Score <br />
								<b>{applicant?.edu_score}</b>
							</td>
							<td colSpan={5} rowSpan={4}>
								<div
									style={{
										width: '96.5%',
										display: 'flex',
										flexDirection: 'column',
										minHeight: hidden ? '' : '60vh',
									}}
								>
									<HRMPSBEvaluationForm
										hrmpsbScore={hrmpsbScore}
										applicantID={app_route}
									/>
								</div>
							</td>
						</tr>
						<tr style={{ display: hidden ? 'none' : '' }}>
							<th className=''>Relevant Trainings (10%)</th>
							<td style={{ width: '35%' }}>{applicant?.trn}</td>
							<td className='center'>
								Score <br />
								<b>{applicant?.trn_score}</b>
							</td>
						</tr>
						<tr style={{ display: hidden ? 'none' : '' }}>
							<th className=''>Relevant Experience (15%)</th>
							<td>{applicant?.exp}</td>
							<td className='center'>
								Score <br />
								<b>{applicant?.exp_score}</b>
							</td>
						</tr>
						<tr style={{ display: hidden ? 'none' : '' }}>
							<th className=''>
								<div className='assessments-header'>Job Competency (30%)</div>
							</th>
							<td>{applicant?.cmptncy}</td>
							<td className='center'>
								Score <br />
								<b>{applicant?.cmptncyScore}</b>
							</td>
						</tr>
						<tr style={{ display: hidden ? 'none' : '' }}>
							<th style={{ textAlign: 'right' }} colSpan={2}>
								Total
							</th>
							<th className='center'>{applicant?.subtotal}</th>
							<th style={{ textAlign: 'right' }}>Total</th>
							<th className='center'>{hrmpsbScore?.total}</th>
						</tr>
					</tbody>
				</table>
				<table style={{ display: hidden ? '' : 'none', marginTop: '-1rem' }}>
					<thead></thead>
					<tbody>
						<tr>
							<th style={{ textAlign: 'right' }}>Total</th>
							<th className='center'>{hrmpsbScore?.total}</th>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};
export default HRMPSBEvaluation;
