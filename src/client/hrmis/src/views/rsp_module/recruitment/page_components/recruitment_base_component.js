import BreadcrumbComponent from '../../../common/breadcrumb_component/Breadcrumb';
import SearchComponent from '../../../common/input_component/search_input/search_input';
import { recruitmentBreadCramp } from '../static/breadcramp_item';
import React, { useEffect, useState } from 'react';
import {
	recruitmentEmailTemplateList,
	recruitmentSelectItem,
} from '../static/menu_items';
import { recruitmentSelectFilter } from '../static/filter_items';

import RecruitmentTable from './page_tables/recruitment_table';
import IconComponent from '../../../common/icon_component/icon';
import {
	BsFillEnvelopeFill,
	BsFillStarFill,
	BsGlobe,
	BsPrinterFill,
} from 'react-icons/bs';
import { IoDocuments } from 'react-icons/io5';
import { useToggleHelper } from '../../../../helpers/use_hooks/toggle_helper';
import RecruitmentEmail from './page_modals/recruitment_email';
import DropdownViewComponent from '../../../common/dropdown_menu_custom_component/Dropdown_view';
import { useNavigate } from 'react-router-dom';
import { AiFillMinusCircle } from 'react-icons/ai';

const RecruitmentBaseComponent = () => {
	const [toggleState, setToggleState] = useState(1);
	const [emailModalToggleState, setEmailModalToggle] = useToggleHelper(true);
	const modalToggle = () => {
		setEmailModalToggle(!emailModalToggleState);
	};
	const [modalStates, setModalStates] = useState({
		documentModalState: false,
	});

	const updateModalStates = (key, value) => {
		setModalStates({
			...modalStates,
			[key]: value,
		});
	};

	const toggleTab = (index) => {
		setToggleState(index);
	};

	const navigate = useNavigate();

	const [selectedApplicants, setSelectedApplicants] = useState([]);
	const [selectedEmailTemplate, setEmailTemplate] = useState([]);

	useEffect(() => {
		modalToggle();
	}, [selectedEmailTemplate]);

	return (
		<React.Fragment>
			<div className='plantilla-view'>
				<div className='container-plantilla'>
					<BreadcrumbComponent list={recruitmentBreadCramp} className='' />
				</div>

				<div className='container-vacant-position'>
					<div className='three-idiot'>
						<IconComponent
							id='applicant_print_reports'
							className='padding-left-1'
							icon={<BsPrinterFill />}
							toolTipId='rc-ap-print'
							textHelper='View/Edit Selected 	 Position'
							onClick={() => {}}
						/>
						<DropdownViewComponent
							itemList={recruitmentEmailTemplateList}
							title={<BsFillEnvelopeFill size='22' />}
							className='plantilla-icon margin-left-1 unstyled-button'
							alignItems='end'
							toolTipId='other-actions'
							position='top'
							textHelper='Click to view email templates'
							clickFunction={setEmailTemplate}
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
							icon={<AiFillMinusCircle />}
							toolTipId='rc-ap-disq'
							textHelper='Disqualify selected Applicants'
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
					<div className='selector-buttons'>
						<div className='selector-container'>
							{/* <span className='selector-span-1'> */}
							{/* <ButtonComponent/> */}
							<button
								className='button-components'
								onClick={() => navigate('/pds-applicant')}
								style={{
									cursor: 'pointer',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									textAlign: 'center',
								}}
							>
								<p>Applicant</p>
							</button>
							{/* </span> */}
							<span className='margin-left-1 selector-span-1'>
								<select defaultValue={'DEFAULT'}>
									<option value='DEFAULT' disabled>
										Vacant Position
									</option>
									{recruitmentSelectFilter.map((item) => {
										return (
											<option
												className='options'
												key={item.value}
												defaultValue={item.value}
											>
												{item.title}
											</option>
										);
									})}
								</select>
							</span>
							<span className='margin-left-1 selector-span-1'>
								<select defaultValue={'DEFAULT'}>
									<option value='DEFAULT' disabled>
										Filter By
									</option>
									{recruitmentSelectItem.map((item) => {
										return (
											<option
												className='options'
												key={item.value}
												defaultValue={item.value}
											>
												{item.title}
											</option>
										);
									})}
								</select>
							</span>
						</div>

						<div className='search-container'>
							<span className='margin-right-1 selector-search-label'>
								<label>Search</label>
							</span>
							<span>
								<SearchComponent placeholder='Search' />
							</span>
						</div>
					</div>
					<div className={toggleState === 1 ? 'current-tab' : 'show-none'}>
						<RecruitmentTable
							type={1}
							setSelectedApplicants={setSelectedApplicants}
							updateModalStates={setModalStates}
						/>
					</div>
					<div className={toggleState === 2 ? 'current-tab' : 'show-none'}>
						<RecruitmentTable
							type={2}
							setSelectedApplicants={setSelectedApplicants}
							updateModalStates={setModalStates}
						/>
					</div>
					<div>
						<RecruitmentEmail
							onClose={setEmailModalToggle}
							isDisplay={emailModalToggleState}
							applicantData={selectedApplicants}
							type={selectedEmailTemplate}
						/>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default RecruitmentBaseComponent;
