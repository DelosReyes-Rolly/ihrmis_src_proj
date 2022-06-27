import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { API_HOST } from '../../../../../../helpers/global/global_config';
import { usePopUpHelper } from '../../../../../../helpers/use_hooks/popup_helper';
import InputComponent from '../../../../../common/input_component/input_component/input_component';
import SelectComponent from '../../../../../common/input_component/select_component/select_component';
import UploadAttachmentComponent from '../../../../../common/input_component/upload_attachment_component/upload_attachment_component';
import ModalComponent from '../../../../../common/modal_component/modal_component';
import DocumentListComponent from './document_list_component';
import { setRefresh } from '../../../../../../features/reducers/popup_response';
import { useDispatch } from 'react-redux';
const RecruitmentDocumentModal = ({ isDisplay, onClose, rowData }) => {
	const dispatch = useDispatch();
	const { renderBusy, renderFailed, renderSucceed } = usePopUpHelper();
	const [documentRequirements, setDocumentRequirements] = useState([]);
	const getDocumentRequirements = async () => {
		await axios
			.get(API_HOST + 'get-documentary-requirements/3')
			.then((response) => {
				let options = [];
				let data = response.data.data;
				data.forEach((element) => {
					let temp = {
						id: element.doc_id,
						title: element.doc_name,
						filled: false,
						att_id: element.doc_id,
					};
					options.push(temp);
				});
				setDocumentRequirements(options);
			})
			.catch((error) => {});
	};

	const documentForm = useFormik({
		enableReinitialize: true,
		initialValues: {
			doc_type: '1',
			doc_name: '',
			documents: '',
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
			const formData = new FormData();
			formData.append('doc_type', value.doc_type);
			formData.append('doc_name', value.doc_name);
			formData.append('applicant_id', rowData.app_id);
			
			if (documentValue.length > 0) {
				for (let index = 0; index < documentValue.length; index++) {
					formData.append('documents[]', documentValue[index]);
				}
			}
			await axios
				.post(API_HOST + 'add-applicant-document', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				.then((res) => {
					renderSucceed({ content: 'Document saved successfully' });
					dispatch(setRefresh());
				})
				.catch((err) => {
					renderFailed({ content: 'Document failed to save' });
				});
			renderBusy(false);
		},
	});
	const [documentValue, setDocumentValue] = useState();
	useEffect(() => {
		getDocumentRequirements();
	}, []);
	return (
		<React.Fragment>
			<ModalComponent
				title='Documents'
				isDisplay={isDisplay}
				onClose={onClose}
				onSubmit={documentForm.handleSubmit}
				onSubmitType='submit'
				onSubmitName='Send'
				onPressedHidden={true}
			>
				<div className='add-documents-modal'>
					<div className='left-input item-modal-1'>
						<label>Document Type</label>
						<SelectComponent
							name='doc_type'
							onChange={documentForm.handleChange}
							itemList={documentRequirements}
						/>
					</div>
				</div>
				<div className='add-documents-modal'>
					<div className='left-input item-modal-4'>
						<label>Document Name</label>
						<InputComponent
							name='doc_name'
							style={{ margin: '5px 0px' }}
							onChange={documentForm.handleChange}
							value={documentForm.values.doc_name}
						/>
					</div>
					<div className='right-input item-modal-5'>
						<label>Document</label>
						<UploadAttachmentComponent
							name='documents'
							formik={documentForm}
							accept='*'
							isMulti={false}
							onChange={(e) => {
								setDocumentValue(e.target.files);
							}}
						/>
						{documentForm.touched.image_upload &&
						documentForm.errors.image_upload ? (
							<p className='error-validation-styles'>
								{documentForm.errors.image_upload}
							</p>
						) : null}
					</div>
				</div>
				<DocumentListComponent applicantId={rowData.app_id} />
			</ModalComponent>
		</React.Fragment>
	);
};

export default RecruitmentDocumentModal;
