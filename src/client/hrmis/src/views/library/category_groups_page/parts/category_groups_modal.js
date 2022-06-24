import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { GroupClusterData } from '../static/input_items';
import { usePopUpHelper } from '../../../../helpers/use_hooks/popup_helper';
import { API_HOST } from '../../../../helpers/global/global_config';
import { setRefresh } from '../../../../features/reducers/popup_response';
import ModalComponent from '../../../common/modal_component/modal_component';
import InputComponent from '../../../common/input_component/input_component/input_component';
import SelectComponent from '../../../common/input_component/select_component/select_component';
import { ALERT_ENUM, popupAlert } from '../../../../helpers/alert_response';

const GroupClusterModal = ({
	isDisplay,
	onClose,
	data,
	remove,
	removeName,
}) => {
	const dispatch = useDispatch();
	const { renderBusy } = usePopUpHelper();
	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			grp_id: data?.grp_id ?? '',
			grp_name: data?.grp_name ?? '',
			grp_level: data?.grp_level ?? '',
			grp_cluster: data?.grp_cluster ?? '',
		},
		validationSchema: Yup.object({
			grp_name: Yup.string()
				.required('This field is required')
				.max(191, 'Invalid input'),
			grp_level: Yup.number()
				.typeError('Must be a number')
				.max(999)
				.required('This field is required'),
			grp_cluster: Yup.string().required('This field is required'),
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);
			await axios
				.post(API_HOST + 'category-groups', value)
				.then(() => {
					popupAlert({
						message: data?.grp_id
							? 'Category was edited'
							: 'Category was added',
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
			renderBusy(false);
			onClose();
			resetForm();
		},
	});

	return (
		<React.Fragment>
			<ModalComponent
				title='Category Groups'
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
							name='grp_name'
							value={form.values.grp_name}
							onChange={form.handleChange}
							maxLength='191'
						/>
						{form.touched.grp_name && form.errors.grp_name ? (
							<span className='invalid-response'>{form.errors.grp_name}</span>
						) : null}
					</div>
					<div className='middle-input item-modal-1'>
						<label>Level</label>
						<InputComponent
							name='grp_level'
							value={form.values.grp_level}
							onChange={form.handleChange}
							maxLength='30'
						/>
						{form.touched.grp_level && form.errors.grp_level ? (
							<span className='invalid-response'>{form.errors.grp_level}</span>
						) : null}
					</div>
				</div>
				<div className='middle-input item-modal-4'>
					<label>Group Cluster</label>
					<SelectComponent
						name='grp_cluster'
						value={form.values.grp_cluster}
						onChange={form.handleChange}
						itemList={GroupClusterData}
					/>
					{form.touched.grp_cluster && form.errors.grp_cluster ? (
						<span className='invalid-response'>{form.errors.grp_cluster}</span>
					) : null}
				</div>
			</ModalComponent>
		</React.Fragment>
	);
};
export default GroupClusterModal;
