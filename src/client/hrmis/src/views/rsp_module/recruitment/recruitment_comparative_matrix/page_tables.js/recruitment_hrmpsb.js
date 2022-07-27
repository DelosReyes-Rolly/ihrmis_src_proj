import { useCallback, useEffect, useState } from 'react';
import ButtonComponent from '../../../../common/button_component/button_component.js';
import { useToggleHelper } from '../../../../../helpers/use_hooks/toggle_helper';
import HRMPSBEvaluationModal from '../page_modals/hrmpsb_evaluation_modal';

const RecruitmentHRMPSB = ({ hrmpsbScore, appID, applicant }) => {
	const urlpath = window.location.pathname;
	const route = urlpath.split('/');

	const [evaluationType, setEvaluationType] = useState(1);
	const [title, setTitle] = useState(1);
	const [remarks, setRemarks] = useState(1);
	const [modalToggle, setModalToggle] = useToggleHelper(false);
	const setHRMPSBData = (type, title, remarks) => {
		setEvaluationType(type);
		setTitle(title);
		setRemarks(remarks);
		setModalToggle();
	};
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
						<td rowSpan={2} style={{ width: '35%' }}>
							{applicant?.app_hrmpsb_attribute}
						</td>
						<td rowSpan={2} className='w5'>
							<ButtonComponent
								onClick={() => {
									setHRMPSBData(
										1,
										'Attributes',
										applicant?.app_hrmpsb_attribute
									);
								}}
								buttonName='Score'
							/>
							<b>{Number.isNaN(hrmpsbScore[1]) ? '' : hrmpsbScore[1]}</b>
						</td>
						<th className=''>Commendable Accomplishments (5%)</th>
						<td style={{ width: '35%' }}>
							{applicant?.app_hrmpsb_accomplishment}
						</td>
						<td className='w5'>
							<ButtonComponent
								onClick={() => {
									setHRMPSBData(
										2,
										'Commendable Accomplishmments',
										applicant?.app_hrmpsb_accomplishment
									);
								}}
								buttonName='Score'
							/>
							<b>{Number.isNaN(hrmpsbScore[2]) ? '' : hrmpsbScore[2]}</b>
						</td>
					</tr>
					<tr>
						<th className=''>Performance (5%)</th>
						<td className=''>{applicant?.app_hrmpsb_performance}</td>
						<td className='w5'>
							<ButtonComponent
								onClick={() => {
									setHRMPSBData(
										3,
										'Performance',
										applicant?.app_hrmpsb_performance
									);
								}}
								buttonName='Score'
							/>
							<b>{Number.isNaN(hrmpsbScore[3]) ? '' : hrmpsbScore[3]}</b>
						</td>
					</tr>
					<tr>
						<th className=' assessments-header'>Sub-total</th>
						<th className='' colSpan={5}>
							{hrmpsbScore.hrmTotal}
						</th>
					</tr>
					<tr>
						<th className=' assessments-header'>TOTAL (100%)</th>
						<th className='' colSpan={5}>
							{hrmpsbScore.total}
						</th>
					</tr>
				</tbody>
			</table>
			<HRMPSBEvaluationModal
				isDisplay={modalToggle}
				type={evaluationType}
				onClose={setModalToggle}
				appID={appID}
				title={title}
				remarks={remarks}
			/>
		</>
	);
};

export default RecruitmentHRMPSB;
