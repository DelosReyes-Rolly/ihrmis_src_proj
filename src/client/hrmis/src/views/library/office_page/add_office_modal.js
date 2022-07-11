import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
	apiModelOfficeType,
	apiModelOfficeAreaType,
} from './parts/input_items';
import { usePopUpHelper } from '../../../helpers/use_hooks/popup_helper';
import { API_HOST } from '../../../helpers/global/global_config';
import ModalComponent from '../../common/modal_component/modal_component';
import SelectComponent from '../../common/input_component/select_component/select_component';
import InputComponent from '../../common/input_component/input_component/input_component';
import { useAxiosHeadHelper } from '../../../helpers/use_hooks/axios_head_helper';
import { useIsMounted } from '../../../helpers/use_hooks/isMounted';

const AddOfficeModal = ({ isDisplay, onClose, officeData }) => {
	const mounted = useIsMounted();
	const { renderBusy, renderSucceed } = usePopUpHelper();
	const [positions, setPositionState] = useState([]);
	const [office, setOfficeState] = useState([]);
	const [agency, setAgencyState] = useState([]);

	const AXIOS_HEADER = useAxiosHeadHelper();

	const getPositions = async (ofc_id) => {
		let positions = [];
		await axios
			.get(API_HOST + 'plantilla-positions/' + ofc_id)
			.then((response) => {
				response.data.data.forEach((data) => {
					let obj = {};
					obj['id'] = data.itm_id;
					obj['title'] = data.pos_title;
					positions.push(obj);
				});
			})
			.catch((error) => console.log(error));
		if (!mounted.current) return;
		setPositionState(positions);
	};

	const getOffice = async () => {
		let offices = [];
		await axios
			.get(API_HOST + 'office')
			.then((response) => {
				response.data.data.forEach((data) => {
					let obj = {};
					obj['id'] = data.ofc_id;
					obj['title'] = data.ofc_acronym;
					offices.push(obj);
				});
			})
			.catch((error) => {});
		if (!mounted.current) return;
		setOfficeState(offices);
	};

	const getAgency = async () => {
		let agencies = [];
		await axios
			.get(API_HOST + 'agency')
			.then((response) => {
				response.data.data.forEach((data) => {
					let obj = {};
					obj['id'] = data.agn_id;
					obj['title'] = data.agn_name;
					agencies.push(obj);
				});
				console.log(response.data.data);
				if (!mounted.current) return;
				setAgencyState(agencies);
			})
			.catch((error) => {});
	};

	useEffect(() => {
		if (isDisplay) {
			getPositions(officeData?.ofc_id ?? '');
			getOffice();
			getAgency();
		}
	}, [isDisplay]);

	const officeForm = useFormik({
		enableReinitialize: true,
		initialValues: {
			ofc_id: officeData?.ofc_id ?? '',
			ofc_type: officeData?.ofc_type ?? '',
			ofc_name: officeData?.ofc_name ?? '',
			ofc_agn_id: officeData?.ofc_agn_id ?? '',
			ofc_acronym: officeData?.ofc_acronym ?? '',
			ofc_area_code: officeData?.ofc_area_code ?? '',
			ofc_area_type: officeData?.ofc_area_type ?? '',
			ofc_head_itm_id: officeData?.ofc_head ?? '',
			ofc_email_addr: officeData?.ofc_email_addr ?? '',
			ofc_ofc_id: officeData?.ofc_ofc_id ?? '',
		},
		validationSchema: Yup.object({
			ofc_type: Yup.number()
				.typeError('Must be a number')
				.required('This field is required'),
			ofc_name: Yup.string()
				.required('This field is required')
				.max(191, 'Invalid input'),
			ofc_acronym: Yup.string()
				.required('This field is required')
				.max(30, 'Invalid input'),
			ofc_area_code: Yup.string()
				.required('This field is required')
				.max(10, 'Invalid input'),
			ofc_area_type: Yup.string()
				.required('This field is required')
				.max(1, 'Invalid input'),
			ofc_ofc_id: Yup.number()
				.typeError('Must be a number')
				.required('This field is required'),
			ofc_agn_id: Yup.number()
				.typeError('Must be a number')
				.required('This field is required'),
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);
			await axios
				.post(API_HOST + 'offices', value, AXIOS_HEADER)
				.then(() => {
					renderSucceed({});
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
				title='Office'
				onSubmitName='Save'
				onCloseName='Close'
				isDisplay={isDisplay}
				onSubmit={officeForm.handleSubmit}
				onSubmitType='submit'
				onClose={onClose}
			>
				<div className='add-documents-modal'>
					<div className='left-input item-modal-1'>
						<label>Name</label>
						<InputComponent
							name='ofc_name'
							value={officeForm.values.ofc_name}
							onChange={officeForm.handleChange}
							maxLength='191'
						/>
					</div>
				</div>
				<div className='add-documents-modal'>
					<div className='left-input item-modal-1'>
						<label>Short Name/Acronym</label>
						<InputComponent
							name='ofc_acronym'
							value={officeForm.values.ofc_acronym}
							onChange={officeForm.handleChange}
							maxLength='30'
						/>
					</div>
					<div className='middle-input item-modal-2'>
						<label>Type</label>
						<SelectComponent
							name='ofc_type'
							value={officeForm.values.ofc_type}
							onChange={officeForm.handleChange}
							itemList={apiModelOfficeType}
						/>
					</div>
				</div>
				<div className='add-office-modal'>
					<div className='left-input item-modal-2'>
						<label>Area Code</label>
						<InputComponent
							name='ofc_area_code'
							value={officeForm.values.ofc_area_code}
							onChange={officeForm.handleChange}
							maxLength='191'
						/>
					</div>
					<div className='left-input item-modal-1'>
						<label>Area Type</label>
						<SelectComponent
							name='ofc_area_type'
							value={officeForm.values.ofc_area_type}
							onChange={officeForm.handleChange}
							itemList={apiModelOfficeAreaType}
						/>
					</div>
				</div>
				<div className='add-office-modal'>
					<div className='left-input item-modal-5'>
						<label>Parent Office</label>
						<SelectComponent
							name='ofc_ofc_id'
							value={officeForm.values.ofc_ofc_id}
							onChange={(e) => {
								officeForm.handleChange(e);
							}}
							itemList={office}
						/>
					</div>
				</div>
				<div className='add-office-modal'>
					<div className='left-input item-modal-5'>
						<label>Office Agency</label>
						<SelectComponent
							name='ofc_agn_id'
							value={officeForm.values.ofc_agn_id}
							onChange={officeForm.handleChange}
							itemList={agency}
						/>
					</div>
				</div>
				<div className='add-documents-modal'>
					<div className='left-input item-modal-1'>
						<label>Email Address</label>
						<InputComponent
							name='ofc_email_addr'
							value={officeForm.values.ofc_email_addr}
							onChange={officeForm.handleChange}
							maxLength='191'
						/>
					</div>
				</div>
				<div className='add-office-modal'>
					<div className='left-input item-modal-5'>
						<label>Office Head</label>
						<SelectComponent
							name='ofc_head_itm_id'
							value={officeForm.values.ofc_head_itm_id}
							onChange={officeForm.handleChange}
							itemList={positions}
						/>
					</div>
				</div>
			</ModalComponent>
		</React.Fragment>
	);
};
export default AddOfficeModal;
