import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { usePopUpHelper } from '../../../../helpers/use_hooks/popup_helper';
import { API_HOST } from '../../../../helpers/global/global_config';
import { setRefresh } from '../../../../features/reducers/popup_response';
import ModalComponent from '../../../common/modal_component/modal_component';
import InputComponent from '../../../common/input_component/input_component/input_component';
import SelectComponent from '../../../common/input_component/select_component/select_component';
import { ALERT_ENUM, popupAlert } from '../../../../helpers/alert_response';
import { UserAccountLevel } from '../../static/library_input_items';

const UserAccountModal = ({ isDisplay, onClose, data, remove, removeName }) => {
	const dispatch = useDispatch();
	const { renderBusy } = usePopUpHelper();
	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			user_id: data?.user_id ?? '',
			username: data?.username ?? '',
			email: data?.email ?? '',
			name: data?.name ?? '',
			password: '',
			user_level: data?.user_level ?? '',
		},
		validationSchema: Yup.object({
			username: Yup.string()
				.required('This field is required')
				.max(191, 'Invalid input'),
			email: Yup.string()
				.email('Not a proper email')
				.required('This field is required'),
			name: Yup.string()
				.required('This field is required')
				.max(191, 'Invalid input'),
			password: Yup.string()
				.required('This field is required')
				.max(191, 'Invalid input'),
			user_level: Yup.number().required('This field is required'),
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);
			if (data?.user_id !== undefined) {
				await axios
					.post(API_HOST + 'update-user', value)
					.then(() => {
						popupAlert({
							message: 'User Account was edited',
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
			} else {
				await axios
					.post(API_HOST + 'register', value)
					.then(() => {
						popupAlert({
							message: 'User Account was added',
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
			}

			renderBusy(false);
			onClose();
			resetForm();
		},
	});

	return (
		<React.Fragment>
			<ModalComponent
				title='User Accounts'
				onSubmitName='Save'
				onCloseName={removeName}
				onPressed={remove}
				isDisplay={isDisplay}
				onSubmit={form.handleSubmit}
				onSubmitType='submit'
				onClose={onClose}
			>
				<div className='add-office-modal'>
					<div className='left-input item-modal-1'>
						<label>Group Name</label>
						<InputComponent
							name='username'
							value={form.values.username}
							onChange={form.handleChange}
							maxLength='191'
						/>
						{form.touched.username && form.errors.username ? (
							<span className='invalid-response'>{form.errors.username}</span>
						) : null}
					</div>
					<div className='middle-input item-modal-1'>
						<label>Level</label>
						<InputComponent
							name='email'
							value={form.values.email}
							onChange={form.handleChange}
							maxLength='30'
						/>
						{form.touched.email && form.errors.email ? (
							<span className='invalid-response'>{form.errors.email}</span>
						) : null}
					</div>
				</div>
				<div className='add-office-modal'>
					<div className='left-input item-modal-1'>
						<label>Name</label>
						<InputComponent
							name='name'
							value={form.values.name}
							onChange={form.handleChange}
							maxLength='191'
						/>
						{form.touched.name && form.errors.name ? (
							<span className='invalid-response'>{form.errors.name}</span>
						) : null}
					</div>
					<div className='middle-input item-modal-1'>
						<label>Password</label>
						<InputComponent
							name='password'
							value={form.values.password}
							type='password'
							onChange={form.handleChange}
							maxLength='30'
						/>
						{form.touched.password && form.errors.password ? (
							<span className='invalid-response'>{form.errors.password}</span>
						) : null}
					</div>
				</div>
				<div className='middle-input item-modal-4'>
					<label>User Account Level</label>
					<SelectComponent
						name='user_level'
						value={form.values.user_level}
						onChange={form.handleChange}
						itemList={UserAccountLevel}
					/>
					{form.touched.user_level && form.errors.user_level ? (
						<span className='invalid-response'>{form.errors.user_level}</span>
					) : null}
				</div>
			</ModalComponent>
		</React.Fragment>
	);
};
export default UserAccountModal;
