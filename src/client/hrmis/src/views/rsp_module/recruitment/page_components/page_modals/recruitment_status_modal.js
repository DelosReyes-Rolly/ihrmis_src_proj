import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { usePopUpHelper } from '../../../../../helpers/use_hooks/popup_helper';
import SelectComponent from '../../../../common/input_component/select_component/select_component';
import ModalComponent from '../../../../common/modal_component/modal_component';
import { setRefresh } from '../../../../../features/reducers/popup_response';
import { useDispatch } from 'react-redux';
import { API_HOST } from '../../../../../helpers/global/global_config';
import TextAreaComponent from '../../../../common/input_component/textarea_input_component/textarea_input_component';
import { ALERT_ENUM, popupAlert } from '../../../../../helpers/alert_response';
import { useIsMounted } from '../../../../../helpers/use_hooks/isMounted';
const RecruitmentStatusModal = ({ isDisplay, onClose, rowData }) => {
	const mounted = useIsMounted();
	const dispatch = useDispatch();
	const { renderBusy } = usePopUpHelper();
	const [transactionSelectOptions, setTransactionSelectOptions] = useState([]);
	const getTransactionSelectOptions = async () => {
		if (!mounted.current) return;
		await axios
			.get(API_HOST + 'get-transaction-stage-select/app')
			.then((response) => {
				let options = [];
				let data = response.data.data;
				data.forEach((element) => {
					let temp = {
						id: element.stg_id,
						title: element.stg_desc,
					};
					options.push(temp);
				});
				if (!mounted.current) return;
				setTransactionSelectOptions(options);
			})
			.catch((error) => {});
	};

	const statusForm = useFormik({
		enableReinitialize: true,
		initialValues: {
			status_id: '1',
			status_remark: '',
		},
		validationSchema: Yup.object({
			status_id: Yup.number()
				.typeError('Must be a number')
				.required('This field is required'),
			status_remark: Yup.string()
				.typeError('Must be Text')
				.required('This Field is required'),
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);
			const formData = new FormData();
			formData.append('status_id', value.status_id);
			formData.append('status_remark', value.status_remark);
			formData.append('applicant_id', rowData.app_id);
			await axios
				.post(API_HOST + 'add-applicant-status', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				.then((res) => {
					popupAlert({
						message: 'Applicant Status was changed',
						type: ALERT_ENUM.success,
					});
					dispatch(setRefresh());
					onClose();
				})
				.catch((err) => {
					popupAlert({
						message: 'Status failed to save',
						type: ALERT_ENUM.fail,
					});
				});
			renderBusy(false);
			resetForm();
		},
	});
	useEffect(() => {
		getTransactionSelectOptions();
	}, []);
	return (
		<React.Fragment>
			<ModalComponent
				title='Status'
				isDisplay={isDisplay}
				onClose={onClose}
				onSubmit={statusForm.handleSubmit}
				onSubmitType='submit'
				onSubmitName='Submit'
				onPressedHidden={true}
			>
				<div className='add-documents-modal'>
					<div className='left-input item-modal-1'>
						<label>Remarks</label>
						<TextAreaComponent
							name='status_remark'
							onChange={statusForm.handleChange}
							value={statusForm.values.status_remark}
						/>
						{statusForm.touched.remarks && statusForm.errors.status_remark ? (
							<p className='error-validation-styles'>
								{statusForm.errors.status_remark}
							</p>
						) : null}
					</div>
				</div>
				<div className='add-documents-modal'>
					<div className='left-input item-modal-1'>
						<label>Status</label>
						<SelectComponent
							name='status_id'
							onChange={statusForm.handleChange}
							itemList={transactionSelectOptions}
						/>
						{statusForm.touched.status_id && statusForm.errors.status_id ? (
							<p className='error-validation-styles'>
								{statusForm.errors.status_id}
							</p>
						) : null}
					</div>
				</div>
			</ModalComponent>
		</React.Fragment>
	);
};

export default RecruitmentStatusModal;
