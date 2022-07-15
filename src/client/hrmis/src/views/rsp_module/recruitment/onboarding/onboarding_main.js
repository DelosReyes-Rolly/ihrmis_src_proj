import BreadcrumbComponent from '../../../common/breadcrumb_component/Breadcrumb';
import { OnboardingBreadCrumbs } from '../static/breadcramp_item';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { API_HOST } from '../../../../helpers/global/global_config';
import { useIsMounted } from '../../../../helpers/use_hooks/isMounted';
import { useDispatch, useSelector } from 'react-redux';
import IconComponent from '../../../common/icon_component/icon';
import { IoAdd, IoGlobe } from 'react-icons/io5';
import InputComponent from '../../../common/input_component/input_component/input_component';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ALERT_ENUM, popupAlert } from '../../../../helpers/alert_response';
import { setRefresh } from '../../../../features/reducers/popup_response';
import { usePopUpHelper } from '../../../../helpers/use_hooks/popup_helper';
import ButtonComponent from '../../../common/button_component/button_component.js';
import { MdMenu } from 'react-icons/md';
import { BiGridVertical } from 'react-icons/bi';
import OnBoardingComponent from './draggable_components/onboarding_onboard_component';

const OnboardingMain = () => {
	const mounted = useIsMounted();
	const { renderBusy, renderFailed, renderSucceed } = usePopUpHelper();
	const dispatch = useDispatch();

	const [fakeSection, setFakeSection] = useState([
		{ title: 'sectionName1', id: '1' },
		{ title: 'sectionName2', id: '2' },
		{ title: 'sectionName3', id: '3' },
	]);
	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			section_name: '',
			section_order: '',
		},
		validationSchema: Yup.object({
			doc_type: Yup.number()
				.typeError('Must be a number')
				.required('This field is required'),
			doc_name: Yup.string().typeError('Must be Text'),
			documents: Yup.string().required('This field is required'),
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);

			// await axios
			// 	.post(API_HOST + 'new-requirement/' + rowData.app_id, formData, {
			// 		headers: { 'Content-Type': 'multipart/form-data' },
			// 	})
			// 	.then((res) => {
			// 		popupAlert({
			// 			message: 'Document saved successfully',
			// 			type: ALERT_ENUM.success,
			// 		});
			// 		dispatch(setRefresh());
			// 	})
			// 	.catch((err) => {
			// 		popupAlert({
			// 			message: 'Document failed to save',
			// 			type: ALERT_ENUM.fail,
			// 		});
			// 	});
			renderBusy(false);
		},
	});
	return (
		<React.Fragment>
			<div className='documents-view'>
				<BreadcrumbComponent list={OnboardingBreadCrumbs} className='' />
				<div className='onboarding-page'>
					<div className='regular-tab-component'>
						<div className='reg-tab-container'>
							<p
								// onClick={() => toggleTab(1)}
								className='reg-tab'
							>
								Orientation Topics
							</p>
							<p
								// onClick={() => toggleTab(2)}
								className='reg-tab'
							>
								Orientation Schedule
							</p>
						</div>
					</div>
					<hr className='solid' />

					<div className='whole-container'>
						<div className='half'>
							<div className='nowrap'>
								<div className='section-add'>
									<label>Section</label>
								</div>
								<div className='section-icon'>
									<IconComponent
										id='recruitment_all_docs'
										className='margin-left-1'
										icon={<IoGlobe size='26' />}
										toolTipId='rc-ap-docs'
										textHelper='Open Onboarding resource page'
									/>
								</div>
							</div>
							<div className='section_name'>
								<InputComponent
									name='section_name'
									onChange={form.handleChange}
									placeholder='Enter Name'
									value={form.values.section_name}
								/>
								<ButtonComponent
									className={'ft-button'}
									type='submit'
									border='1px solid rgba(70, 70, 70, 0.8)'
									onClick={() => {}}
									buttonName={<IoAdd size={13} />}
								/>
							</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									marginBottom: '-10px',
									marginTop: '10px',
									marginLeft: '5px',
								}}
							>
								<OnBoardingComponent />
							</div>
						</div>
						<div className='half'>test</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default OnboardingMain;
