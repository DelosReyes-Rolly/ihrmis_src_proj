import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { API_HOST } from '../../../../../../helpers/global/global_config';
import { usePopUpHelper } from '../../../../../../helpers/use_hooks/popup_helper';
import ButtonComponent from '../../../../../common/button_component/button_component.js.js';
import InputComponent from '../../../../../common/input_component/input_component/input_component';
import SelectComponent from '../../../../../common/input_component/select_component/select_component';
import UploadAttachmentComponent from '../../../../../common/input_component/upload_attachment_component/upload_attachment_component';
import ModalComponent from '../../../../../common/modal_component/modal_component';
import DocumentListComponent from './document_list_component';
const RecruitmentDocumentModal = ({ isDisplay, onClose, rowData }) => {
	const { renderBusy, renderFailed, renderSucceed } = usePopUpHelper();
	const [documentRequirements, setDocumentRequirements] = useState([]);
	const [uploadedRequirements, setUploadedRequirements] = useState([]);
	const documentForm = useFormik({
		enableReinitialize: true,
		initialValues: {
			doc_type: '1',
			documents: '',
		},
		validationSchema: Yup.object({
			doc_type: Yup.number()
				.typeError('Must be a number')
				.required('This field is required'),
			documents: Yup.string().required('This field is required'),
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);
			const formData = new FormData();
			formData.append('recepient', value.recepient);
			formData.append('applicant_id', rowData.app_id);
			if (documentValue != null) {
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
				})
				.catch((err) => {
					renderFailed({ content: 'Document failed to save' });
				});
			renderBusy(false);
		},
	});
	const [documentValue, setDocumentValue] = useState();

	const getDocumentRequirements = async () => {
		await axios
			.get(API_HOST + 'get-documentary-requirements/2')
			.then((response) => {
				let options = [];
				let data = response.data.data;
				data.forEach((element) => {
					let temp = {
						id: element.doc_id,
						title: element.doc_name,
						filled: false,
					};
					options.push(temp);
				});
				setDocumentRequirements(options);
			})
			.catch((error) => {});
	};

	const getUploadedDocuments = async (applicant_id) => {
		await axios
			.get(API_HOST + 'get-uploaded-documents/2/' + applicant_id)
			.then((response) => {
				let options = [];
				let data = response.data.data;
				data.forEach((element) => {
					if (element.tbldocumentary_attachments[0] != null) {
						element.tbldocumentary_attachments.forEach((value) => {
							let temp = {
								id: element.doc_id,
								title:
									element.doc_name === 'Other Documents'
										? value.att_app_name
										: element.doc_name,
							};
							options.push(temp);
						});
					}
				});
				if (options.length > 0) {
					setUploadedRequirements(options);
				} else {
					setUploadedRequirements([
						{
							none: 'none',
						},
					]);
				}
			})
			.catch((error) => {});
	};
	useEffect(() => {
		getUploadedDocuments(rowData.app_id);
	}, [rowData]);
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
						<SelectComponent name='doc_type' itemList={documentRequirements} />
					</div>
				</div>
				<div className='add-documents-modal'>
					<div className='left-input item-modal-1'>
						<label>Document</label>
						<UploadAttachmentComponent
							name='documents'
							formik={documentForm}
							accept='image/png, image/jpeg'
							isMulti={true}
							onChange={(e) => {
								const files = Array.prototype.slice.call(e.target.files);
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
				<DocumentListComponent
					documentRequirements={{ documentRequirements }}
					uploadedRequirements={{ uploadedRequirements }}
				/>
			</ModalComponent>
		</React.Fragment>
	);
};

export default RecruitmentDocumentModal;
