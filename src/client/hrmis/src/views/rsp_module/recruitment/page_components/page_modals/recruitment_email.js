import React, { useEffect, useState } from 'react';
import ModalComponent from '../../../../common/modal_component/modal_component';
import TextAreaComponent from '../../../../common/input_component/textarea_input_component/textarea_input_component';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import SelectComponent from '../../../../common/input_component/select_component/select_component';
import UploadAttachmentComponent from '../../../../common/input_component/upload_attachment_component/upload_attachment_component';
import InputComponent from '../../../../common/input_component/input_component/input_component';
import { useFormik } from 'formik';
import { API_HOST } from '../../../../../helpers/global/global_config';
import * as Yup from 'yup';
import axios from 'axios';
import RichTextEditorComponent from '../../../../common/rich_text_editor_component/rich_text_editor_component';
import { usePopUpHelper } from '../../../../../helpers/use_hooks/popup_helper';
import { EditorState, ContentState } from 'draft-js';
import { convertFromHTML } from 'draft-convert';

const RecruitmentEmail = ({ isDisplay, onClose, applicantData, type }) => {
	const [mType, setmType] = useState([]);
	const { renderBusy, renderFailed, renderSucceed } = usePopUpHelper();
	const [imageValue, setImageValue] = useState();
	const [emailData, setEmailData] = useState();
	const [selectedMsg, setSelectedMsg] = useState(null);
	const selectedType = (value) => {
		mType?.forEach((element) => {
			if (value === element.title) {
				setSelectedMsg(element.message);
			}
		});
	};

	useEffect(() => {
		let recepients = '';
		applicantData?.forEach((data) => {
			recepients += data.app_email + ',';
		});
		setEmailData(recepients);
	}, [applicantData, type]);

	

	const getMessageType = async () => {
		await axios
			.get(API_HOST + 'mail-template')
			.then((res) => {
				let arrHolder = [];
				const dataMType = res?.data?.data;
				dataMType.forEach((element) => {
					arrHolder.push({
						id: element.eml_name,
						title: element.eml_name,
						message: element.eml_message,
						data_id: element.eml_id,
					});
				});
				setmType(arrHolder);
			})
			.catch((err) => {});
	};

    useEffect(() => {
        getMessageType();
    }, [type]);

	const emailFormik = useFormik({
		enableReinitialize: true,
		initialValues: {
			recepient: emailData ?? '',
			message_type: '',
			message: '',
			sender: '',
			image_upload: '',
		},
		validationSchema: Yup.object({
			recepient: Yup.string().required('This field is required'),
			message_type: Yup.string().required('This field is required'),
			message: Yup.string().required('This field is required'),
			sender: Yup.string().required('This field is required'),
			image_upload: Yup.string().required('This field is required'),
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);
			const formData = new FormData();
			formData.append('recepient', value.recepient);
			formData.append('message_type', value.message_type);
			formData.append('message', value.message);
			formData.append('sender', value.sender);

			if (imageValue != null) {
				for (let index = 0; index < imageValue.length; index++) {
					formData.append('image_upload[]', imageValue[index]);
				}
			}

			await axios
				.post(API_HOST + 'notify-vacant-office', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				.then((res) => {
					renderSucceed({ content: 'Email Sent' });
				})
				.catch((err) => {
					renderFailed({ content: 'Failed' });
				});
			renderBusy(false);
		},
	});

	return (
		<React.Fragment>
			<ModalComponent
				title='Email Notification'
				isDisplay={isDisplay}
				onSubmit={emailFormik.handleSubmit}
				onSubmitType='submit'
				onClose={onClose}
				onSubmitName='Send'
			>
				<div>
					<label>Recepient:</label>
					<InputComponent
						name='recepient'
						value={emailFormik.values.recepient}
						onChange={emailFormik.handleChange}
					/>

					{emailFormik.touched.recepient && emailFormik.errors.recepient ? (
						<p className='error-validation-styles'>
							{emailFormik.errors.recepient}
						</p>
					) : null}
				</div>
				<br />
				<div>
					<label>Message:</label>
					<SelectComponent
						name='message_type'
						itemList={mType}
						value={emailFormik.values.message_type}
						onChange={(e) => {
							emailFormik.handleChange(e);
							selectedType(e.target.value);
						}}
						defaultTitle='Subject'
					/>
					{emailFormik.touched.message_type &&
					emailFormik.errors.message_type ? (
						<p className='error-validation-styles'>
							{emailFormik.errors.message_type}
						</p>
					) : null}
				</div>
				<br />
				<div>
					<div className='email-modal-plantilla'>
						<RichTextEditorComponent
							setFieldValue={(val) => emailFormik.setFieldValue('message', val)}
							value={selectedMsg}
						/>
					</div>
					{emailFormik.touched.message && emailFormik.errors.message ? (
						<p className='error-validation-styles'>
							{emailFormik.errors.message}
						</p>
					) : null}
				</div>

				<br />
				<div>
					<label>Sender:</label>
					<TextAreaComponent
						style={{ whiteSpace: 'pre-line' }}
						name='sender'
						value={
							emailFormik.values.sender == ''
								? 'Personnel Division, Administrative and Legal Service\nDepartment of Science and Technology\nGen. Santos Avenue. Bicutan, Taguig City'
								: emailFormik.values.sender
						}
						onChange={emailFormik.handleChange}
					/>
					{emailFormik.touched.sender && emailFormik.errors.sender ? (
						<p className='error-validation-styles'>
							{emailFormik.errors.sender}
						</p>
					) : null}
				</div>
				<br />
				<div>
					<label>Attachment:</label>
					<UploadAttachmentComponent
						name='image_upload'
						formik={emailFormik}
						accept='image/png, image/jpeg'
						isMulti={true}
						onChange={(e) => {
							const files = Array.prototype.slice.call(e.target.files);
							setImageValue(e.target.files);
						}}
					/>
					{emailFormik.touched.image_upload &&
					emailFormik.errors.image_upload ? (
						<p className='error-validation-styles'>
							{emailFormik.errors.image_upload}
						</p>
					) : null}
				</div>
			</ModalComponent>
		</React.Fragment>
	);
};

export default RecruitmentEmail;
