import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { GroupClusterData } from '../static/input_items';
import { usePopUpHelper } from '../../../../helpers/use_hooks/popup_helper';
import { API_HOST } from '../../../../helpers/global/global_config';
import { setRefresh } from '../../../../features/reducers/popup_response';
import ModalComponent from '../../../common/modal_component/modal_component';
import InputComponent from '../../../common/input_component/input_component/input_component';
import SelectComponent from '../../../common/input_component/select_component/select_component';
import { ALERT_ENUM, popupAlert } from '../../../../helpers/alert_response';

const DocumentaryRequirementsModal = ({ isDisplay, onClose, data, remove }) => {
	const dispatch = useDispatch();
	const { renderBusy, renderFailed, renderSucceed } = usePopUpHelper();
	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			doc_id: data?.doc_id ?? '',
			doc_name: data?.doc_name ?? '',
			doc_group: data?.doc_group ?? '',
			grp_cluster: data?.grp_cluster ?? '',
		},
		validationSchema: Yup.object({
			doc_name: Yup.string()
				.required('This field is required')
				.max(191, 'Invalid input'),
				doc_group: Yup.number()
				.typeError('Must be a number')
				.max(3)
				.required('This field is required'),
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);
			await axios
				.post(API_HOST + 'documentary-requirement', value)
				.then(() => {
					popupAlert({
						message: data?.doc_id
							? 'Documentary Requirement was edited'
							: 'Documentary Requirement was added',
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
				onCloseName={remove === undefined ? 'Close' : 'Delete'}
				onPressed={remove}
				isDisplay={isDisplay}
				onSubmit={form.handleSubmit}
				onSubmitType='submit'
				onClose={onClose}
			>
				<div className='add-office-modal'>

					<div className='middle-input item-modal-1'>
						<label>Group Stage</label>
						<InputComponent
							name='doc_name'
							value={form.values.doc_name}
							onChange={form.handleChange}
							maxLength='30'
						/>
						{form.touched.doc_name && form.errors.doc_name ? (
							<span className='invalid-response'>{form.errors.doc_name}</span>
						) : null}
					</div>
					<div className='right-input item-modal-1'>
						<label>Group Cluster</label>
						<SelectComponent
							name='grp_cluster'
							value={form.values.doc_group}
							onChange={form.handleChange}
							itemList={GroupClusterData}
						/>
						{form.touched.doc_group && form.errors.doc_group ? (
							<span className='invalid-response'>
								{form.errors.doc_group}
							</span>
						) : null}
					</div>
				</div>
			</ModalComponent>
		</React.Fragment>
	);
};
export default DocumentaryRequirementsModal;
