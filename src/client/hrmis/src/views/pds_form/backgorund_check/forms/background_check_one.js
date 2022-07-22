import React, { useEffect, useState, Component } from 'react';
import { useDispatch } from 'react-redux';
import { usePopUpHelper } from '../../../../helpers/use_hooks/popup_helper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { useScrollToTop } from '../../../../helpers/use_hooks/useScollTop';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { setMessageError } from '../../../../features/reducers/error_handler_slice';
import { API_HOST } from '../../../../helpers/global/global_config';
import { ALERT_ENUM, popupAlert } from '../../../../helpers/alert_response';
import { setRefresh } from '../../../../features/reducers/popup_response';
import PrevNextSubButtons from '../../parts/prev_next_sub_buttons';
import dostLogo from '../../../../assets/images/logo.png';
import InputComponent from '../../../common/input_component/input_component/input_component';

const BackgroundCheckFormOne = () => {
	useScrollToTop();

	const dispatch = useDispatch();

	const { item } = useParams();
	const navigate = useNavigate();

	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: '',
			oneOne: '',
			oneTwo: '',
		},
		// validationSchema: Yup.object(validation),
		onSubmit: async (value, { resetForm }) => {
			// value.appID = appID;
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
	return (
		<React.Fragment>
			<div className='pds-profile-main-view'>
				<div className='form-header'>
					<img src={dostLogo} width='50px' height='50px' alt='dost-logo' />
					<h3>Department of Science and Technology</h3>
					<p>General Santos Avenue, Bicutan Taguig City</p> <br />
					<br />
					<h2>BACKGROUND CHECK</h2>
					<br />
				</div>

				<div style={{ paddingTop: '3rem' }}>
					<p>
						Good Day! We wish to inform you that {/* name */} has identified you
						as a character reference in relation to {/* last name */}
						recent job application as {/* Position Title */} at
						{/* office and agency */}. We shall appreciate it very much if you
						could take a few moments to answer the questions in this employment
						background check. Rest assured that all information you will
						disclose will be held in strict confidence (
						<strong style={{ color: 'red' }}>* </strong>Required)
					</p>
				</div>
				<br />
				<br />
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div className='add-office-modal'>
						<div className='item-modal-5'>
							<label>
								<strong style={{ color: 'red' }}>* </strong> Please type your
								full name below:
							</label>
							<InputComponent
								name='name'
								value={form.values.name}
								onChange={form.handleChange}
								maxLength='30'
							/>
							{form.touched.name && form.errors.name ? (
								<span className='invalid-response'>{form.errors.name}</span>
							) : null}
						</div>
					</div>
					<div className='add-office-modal'>
						<div className='item-modal-5'>
							<label>
								<strong style={{ color: 'red' }}>* </strong> 1.1 How long have
								you known the candidate?
							</label>
							<InputComponent
								name='oneOne'
								value={form.values.oneOne}
								onChange={form.handleChange}
								maxLength='30'
							/>
							{form.touched.oneOne && form.errors.oneOne ? (
								<span className='invalid-response'>{form.errors.oneOne}</span>
							) : null}
						</div>
					</div>
					<div className='add-office-modal'>
						<div className='item-modal-5'>
							<label>
								<strong style={{ color: 'red' }}>* </strong> 1.1 What is/was
								your relationship with the candidate?
							</label>
							<InputComponent
								name='oneTwo'
								value={form.values.oneTwo}
								onChange={form.handleChange}
								maxLength='30'
							/>
							{form.touched.oneTwo && form.errors.oneTwo ? (
								<span className='invalid-response'>{form.errors.oneTwo}</span>
							) : null}
						</div>
					</div>
				</div>
				<form style={{ boxSizing: 'border-box' }} onSubmit={form.handleSubmit}>
					<div>
						<PrevNextSubButtons
							page={1}
							onClickNext={() => {
								navigate(`/pds-applicant/form-page-two/${item}`);
								dispatch(setMessageError(undefined));
							}}
						/>
					</div>
				</form>

				<br />
				<br />
			</div>
		</React.Fragment>
	);
};

export default BackgroundCheckFormOne;
