import BreadcrumbComponent from '../../../common/breadcrumb_component/Breadcrumb';
import { recruitmentBreadCramp } from '../static/breadcramp_item';
import React, { useEffect, useState } from 'react';
import {
	recruitmentEmailTemplateList,
	recruitmentReportList,
} from '../static/menu_items';

import RecruitmentTable from './page_tables/recruitment_table';
import IconComponent from '../../../common/icon_component/icon';
import {
	BsFillEnvelopeFill,
	BsFillStarFill,
	BsPrinterFill,
} from 'react-icons/bs';
import { IoDocuments } from 'react-icons/io5';
import RecruitmentEmail from './page_modals/recruitment_email';
import DropdownViewComponent from '../../../common/dropdown_menu_custom_component/Dropdown_view';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import RecruitmentStatusModal from './page_modals/recruitment_status_modal';
import { API_HOST } from '../../../../helpers/global/global_config';
import axios from 'axios';
import { ALERT_ENUM, popupAlert } from '../../../../helpers/alert_response';
import RecruitmentDateSelector from './page_modals/recruitment_date_selector';

const RecruitmentBaseComponent = () => {
	const [toggleState, setToggleState] = useState(1);
	const [emailModalToggleState, setEmailModalToggle] = useState('0');
	const [value, setValue] = useState('');
	const [position, setPosition] = useState(0);
	const [reportValue, setReportValue] = useState(null);
	const toggleTab = (index) => {
		setToggleState(index);
	};
	const [selectedApplicants, setSelectedApplicants] = useState([]);
	useEffect(() => {
		if (reportValue === 'POA') {
			if (position !== 0) {
				window.open(
					API_HOST + 'generate-' + reportValue + '/' + position,
					'_self'
				);
			} else {
				popupAlert({
					message: 'Please Select a Vacant Position',
					type: ALERT_ENUM.fail,
				});
			}
		}

		// setReportValue(null);
	}, [reportValue]);
	return (
		<React.Fragment>
			<div className='documents-view'>
				<div className='container-plantilla'>
					<BreadcrumbComponent list={recruitmentBreadCramp} className='' />
				</div>

				<div className='container-vacant-position'>
					<div className='three-idiot'>
						<DropdownViewComponent
							itemList={recruitmentReportList}
							id='applicant_print_reports'
							title={<BsPrinterFill size='22' />}
							className='plantilla-icon margin-left-1 unstyled-button'
							toolTipId='applicant_print_reports-tooltip'
							position='top'
							alignItems='end'
							textHelper='Click to view printable reports'
							setValue={setReportValue}
						/>
						<DropdownViewComponent
							itemList={recruitmentEmailTemplateList}
							title={<BsFillEnvelopeFill size='22' />}
							className='plantilla-icon margin-left-1 unstyled-button'
							alignItems='end'
							toolTipId='other-actions'
							position='top'
							textHelper='Click to view email templates'
							setValue={setEmailModalToggle}
						/>
						<IconComponent
							id='recruitment_all_docs'
							className='margin-left-1'
							icon={<IoDocuments />}
							toolTipId='rc-ap-docs'
							textHelper='Show attachments for selected position'
						/>
						<IconComponent
							id='recruitment_all_ratings'
							className='margin-left-1'
							icon={<BsFillStarFill />}
							toolTipId='rc-ap-ratings'
							textHelper='Show ratings of Selected Applicants'
						/>
						<IconComponent
							id='recruitment_all_disqualify'
							className='margin-left-1'
							icon={
								toggleState === 1 ? <AiFillMinusCircle /> : <AiFillPlusCircle />
							}
							toolTipId='rc-ap-disq'
							textHelper={
								toggleState === 1
									? 'Disqualify selected Applicants'
									: 'Qualify selected Applicants'
							}
						/>
					</div>
					<div className='regular-tab-component'>
						<div className='reg-tab-container'>
							<button
								onClick={() => toggleTab(1)}
								className={toggleState === 1 ? 'reg-tab-activate' : 'reg-tab'}
							>
								Qualified
							</button>

							<button
								onClick={() => toggleTab(2)}
								className={toggleState === 2 ? 'reg-tab-activate' : 'reg-tab'}
							>
								Disqualified
							</button>
						</div>

						<hr className='solid' />
					</div>
				</div>
				{/* TAB MENU STARTS HERE  */}
				<div>
					<div>
						<RecruitmentTable
							type={toggleState}
							setSelectedApplicants={setSelectedApplicants}
							setPosition={setPosition}
						/>
					</div>
					<div>
						<RecruitmentEmail
							isDisplay={emailModalToggleState !== '0' ? true : false}
							onClose={() => {
								setEmailModalToggle('0');
							}}
							data={selectedApplicants}
							type={emailModalToggleState}
							endpoint={API_HOST + 'recruitment-common-email'}
						/>
						<RecruitmentStatusModal
							isDisplay={value === 3 ? true : false}
							onClose={() => {
								setValue(0);
							}}
							rowData={selectedApplicants}
						/>
						<RecruitmentDateSelector
							isDisplay={reportValue === 'RAI' ? true : false}
							title={reportValue === 'RAI' ? "Select month and year of the Report" : 'Date Selector'}
							onClose={() => {
								setReportValue('');
							}}
						/>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default RecruitmentBaseComponent;
