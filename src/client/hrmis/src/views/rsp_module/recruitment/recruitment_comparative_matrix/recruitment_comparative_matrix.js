import BreadcrumbComponent from '../../../common/breadcrumb_component/Breadcrumb';
import { ComparartiveBreadCrumbs } from '../static/breadcramp_item';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { API_HOST } from '../../../../helpers/global/global_config';
import RecruitmentComparativeTable from './page_tables.js/recruitment_compartative_matrix_table';
import RecruitmentRatingAssessment from './page_tables.js/recruitment_rating_assestment_table';
import { useIsMounted } from '../../../../helpers/use_hooks/isMounted';

const RecruitmentComparativeMatrix = () => {
	const mounted = useIsMounted();
	const urlpath = window.location.pathname;
	const route = urlpath.split('/');
	const plantilla_id = route[5];
	const applicant = route[6];
	const [plantilla, setPlantilla] = useState();
	const [applicantId, setApplicantId] = useState();
	const [page, setPageType] = useState('');
	const [requirements, setRequirements] = useState();
	const getCMData = useCallback(async () => {
		await axios
			.get(API_HOST + 'get-cm-detail/' + plantilla_id)
			.then((response) => {
				if (!mounted.current) return;
				setPlantilla(response.data.data.plantilla);
				setRequirements(response.data.data.requirements);
			});
	}, [plantilla_id]);
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
					<BreadcrumbComponent list={ComparartiveBreadCrumbs} className='' />
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
						<RecruitmentComparativeTable
							setPageType={setPageType}
							setApplicantId={setApplicantId}
						/>
					)}
					{page === 'ra' && (
						<RecruitmentRatingAssessment
							setPageType={setPageType}
							applicant_id={applicantId}
						/>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default RecruitmentComparativeMatrix;
