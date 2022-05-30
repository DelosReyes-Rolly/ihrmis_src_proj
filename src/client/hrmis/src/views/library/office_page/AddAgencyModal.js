import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
	apiModelOfficeType,
	apiModelOfficeAreaType,
	apiModelOffices,
	apiModelgetPositions,
	getAgencies,
	apiModelAgencies,
	apiModelAgencyType,
} from './parts/input_items';
import { useDispatch, useSelector } from 'react-redux';
import { useSelectValueCon } from '../../../helpers/use_hooks/select_value_cons';
import { usePopUpHelper } from '../../../helpers/use_hooks/popup_helper';
import { API_HOST } from '../../../helpers/global/global_config';
import { setRefresh } from '../../../features/reducers/popup_response';
import ModalComponent from '../../common/modal_component/modal_component';
import SelectComponent from '../../common/input_component/select_component/select_component';
import InputComponent from '../../common/input_component/input_component/input_component';

const AddAgencyModal = ({ isDisplay, onClose, agencyData }) => {
	const dispatch = useDispatch();
	const { displayData } = useSelectValueCon();
	const { renderBusy, renderFailed, renderSucceed } = usePopUpHelper();
	const { isRefresh } = useSelector((state) => state.popupResponse);
	useEffect(() => {
		console.log(agencyData);
	}, [agencyData]);
	const agencyForm = useFormik({
		enableReinitialize: true,

		initialValues: {
			agn_id: agencyData?.agn_id ?? '',
			agn_name: agencyData?.agn_name ?? '',
			agn_acronym: agencyData?.agn_acronym ?? '',
			agn_sector: agencyData?.agn_sector ?? '',
			agn_head_name: agencyData?.agn_head_name ?? '',
			agn_head_position: agencyData?.agn_head_position ?? '',
			agn_head_email: agencyData?.agn_head_email ?? '',
			agn_address: agencyData?.agn_address ?? '',
		},
		validationSchema: Yup.object({
			agn_name: Yup.string()
				.required('This field is required')
				.max(191, 'Invalid input'),
			agn_acronym: Yup.string()
				.required('This field is required')
				.max(30, 'Invalid input'),
			agn_sector: Yup.string()
				.required('This field is required')
				.max(10, 'Invalid input'),
			agn_head_name: Yup.string()
				.required('This field is required')
				.max(191, 'Invalid input'),
			agn_head_position: Yup.string()
				.required('This field is required')
				.max(191, 'Invalid input'),
			agn_head_email: Yup.string()
				.required('This field is required')
				.max(191, 'Invalid input'),
			agn_address: Yup.string()
				.required('This field is required')
				.max(191, 'Invalid input'),
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);
			await axios
				.post(API_HOST + 'save-agency', value)
				.then(() => {
					renderSucceed({});
					dispatch(setRefresh());
				})
				.catch((err) => {
					// renderFailed();
				});
			renderBusy(false);
			onClose();
			resetForm();
		},
	});

	return (
		<React.Fragment>
			<ModalComponent
				title='Agencies'
				onSubmitName='Save'
				onCloseName='Close'
				isDisplay={isDisplay}
				onSubmit={agencyForm.handleSubmit}
				onSubmitType='submit'
				onClose={onClose}
			>
				<div className='add-documents-modal'>
					<div className='left-input item-modal-1'>
						<label>Agency Name</label>
						{/* <SelectComponent
							name='ofc_ofc_id'
							value={agencyForm.values.ofc_ofc_id}
							onChange={(e) => {
								agencyForm.handleChange(e);
								// getPlantillas(e.target.value);
							}}
							itemList={state.office}
						></SelectComponent> */}
						<InputComponent
							name='agn_name'
							value={agencyForm.values.agn_name}
							onChange={agencyForm.handleChange}
							maxLength='191'
						/>
					</div>
				</div>
				<div className='add-office-modal'>
					<div className='left-input item-modal-6'>
						<label>Agency Acronym</label>
						<InputComponent
							name='agn_acronym'
							value={agencyForm.values.agn_acronym}
							onChange={agencyForm.handleChange}
							maxLength='191'
						/>
					</div>
					<div className='left-input item-modal-6'>
						<label>Agency Sector</label>
						<SelectComponent
							name='agn_sector'
							value={agencyForm.values.agn_sector}
							onChange={(e) => {
								agencyForm.handleChange(e);
							}}
							itemList={apiModelAgencyType}
						></SelectComponent>
					</div>
				</div>
				<div className='add-office-modal'>
					<div className='left-input item-modal-6'>
						<label>Agency Head</label>
						<InputComponent
							name='agn_head_name'
							value={agencyForm.values.agn_head_name}
							onChange={agencyForm.handleChange}
							maxLength='191'
						/>
					</div>
					<div className='right-input item-modal-6'>
						<label>Agency Head Position</label>
						<InputComponent
							name='agn_head_position'
							value={agencyForm.values.agn_head_position}
							onChange={agencyForm.handleChange}
							maxLength='30'
						/>
					</div>
				</div>
				<div className='add-office-modal'>
					<div className='left-input item-modal-6'>
						<label>Agency Head Email</label>
						<InputComponent
							name='agn_head_email'
							value={agencyForm.values.agn_head_email}
							onChange={agencyForm.handleChange}
							maxLength='191'
						/>
					</div>
					<div className='right-input item-modal-6'>
						<label>Agency Address</label>
						<InputComponent
							name='agn_address'
							value={agencyForm.values.agn_address}
							onChange={agencyForm.handleChange}
							maxLength='30'
						/>
					</div>
				</div>
			</ModalComponent>
		</React.Fragment>
	);
};
export default AddAgencyModal;
