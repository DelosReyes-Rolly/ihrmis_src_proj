import BreadcrumbComponent from '../../../common/breadcrumb_component/Breadcrumb';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { API_HOST } from '../../../../helpers/global/global_config';
import { useIsMounted } from '../../../../helpers/use_hooks/isMounted';
import { useSelector } from 'react-redux';
import HRMPSBComapartiveMatrix from './hrmpsb_comparative_matrix';
import { ComparartiveBreadCrumbs } from '../../recruitment/static/breadcramp_item';
import RecruitmentRatingAssessment from '../../recruitment/recruitment_comparative_matrix/page_tables.js/recruitment_rating_assestment_table';

const HRMPSBDetails = () => {
	const mounted = useIsMounted();
	const urlpath = window.location.pathname;
	const route = urlpath.split('/');
	const plantilla_id = route[4];
	const applicant = route[5];
	const [plantilla, setPlantilla] = useState();
	const [applicantId, setApplicantId] = useState();
	const [page, setPageType] = useState('');
	const { refresh } = useSelector((state) => state.popupResponse);
	const [requirements, setRequirements] = useState();
	const getCMData = useCallback(async () => {
		await axios
			.get(API_HOST + 'get-cm-detail/' + plantilla_id)
			.then((response) => {
				if (!mounted.current) return;
				setPlantilla(response.data.data.plantilla);
				setRequirements(response.data.data.requirements);
			});
	}, [plantilla_id, refresh]);
	useEffect(() => {
		if (applicant !== undefined) {
			setApplicantId(applicant);
			setPageType('ra');
		}
		getCMData();
	}, [getCMData]);
	return (
		<React.Fragment>
			<div className='documents-view'>
				<div className='container-plantilla'>
					<div className='default-table document-table'>
						<table className='table-design'>
							<tbody>
								<tr>
									<th className='main-header'>Office / Division</th>
									<td>{plantilla?.tbloffices?.ofc_name}</td>
									<th className='main-header' colSpan={2}>
										Qualification Standards (as Published)
									</th>
								</tr>
								<tr>
									<th rowSpan={2} className='main-header'>
										Position Title / Salary Grade
									</th>
									<td rowSpan={2}>
										{plantilla?.tbl_positions?.pos_title +
											' / ' +
											plantilla?.tbl_positions?.pos_salary_grade}
									</td>
									<th className='main-header'>a. Education</th>
									<td>{requirements?.edu}</td>
								</tr>
								<tr>
									<th className='main-header'>b. Experience</th>
									<td>{requirements?.exp}</td>
								</tr>
								<tr>
									<th className='main-header'>Item No.</th>
									<td>{plantilla?.itm_no}</td>
									<th className='main-header'>c. Training</th>
									<td>{requirements?.trn}</td>
								</tr>
								<tr>
									<th className='main-header'>Salary per Month</th>
									<td>N/A</td>
									<th className='main-header'>d. Eligibility</th>
									<td>{requirements?.eli}</td>
								</tr>
							</tbody>
						</table>
					</div>
					{page === '' && (
						<HRMPSBComapartiveMatrix
							setPageType={setPageType}
							setApplicantId={setApplicantId}
							itm_state={plantilla?.itm_state}
							deadline={plantilla?.deadline}
						/>
					)}
					{page === 'ra' && (
						<RecruitmentRatingAssessment
							setPageType={setPageType}
							applicant_id={applicantId}
							plantilla={plantilla}
						/>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default HRMPSBDetails;
