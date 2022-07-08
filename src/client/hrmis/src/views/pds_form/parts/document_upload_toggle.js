import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsMounted } from '../../../helpers/use_hooks/isMounted';
import { usePopUpHelper } from '../../../helpers/use_hooks/popup_helper';

import * as Yup from 'yup';
import axios from 'axios';
import { API_HOST, SANCTUM } from '../../../helpers/global/global_config';
import { ALERT_ENUM, popupAlert } from '../../../helpers/alert_response';
import { setRefresh } from '../../../features/reducers/popup_response';
import ToggleSwitchComponent from '../../common/toggle_switch_component/toggle_switch';
import { useParams } from 'react-router-dom';
import ButtonComponent from '../../common/button_component/button_component.js';

const DocumentUploadToggle = ({ label, docID, uploadedFiles }) => {
	const { item } = useParams();
	const mounted = useIsMounted();
	const dispatch = useDispatch();
	const { renderBusy } = usePopUpHelper();
	const { refresh } = useSelector((state) => state.popupResponse);
	const [files, setFiles] = useState([]);
	const [fileArray, setFileArray] = useState([]);
	const [checkedValue, setCheckedValue] = useState(false);
	const file = useRef();
	const checkboxRef = useRef();

	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			// doc_id: data?.doc_id ?? '',
			// doc_name: data?.doc_name ?? '',
			// doc_group: data?.doc_group ?? '',
		},
		validationSchema: Yup.object({
			// doc_name: Yup.string()
			// 	.required('This field is required')
			// 	.max(191, 'Invalid input'),
			// doc_group: Yup.number()
			// 	.typeError('Must be a number')
			// 	.max(999)
			// 	.required('This field is required'),
		}),
		onSubmit: async (value, { resetForm }) => {
			const formData = new FormData();
			formData.append('app_id', item);
			formData.append('doc_id', docID);
			if (files.length > 0) {
				for (let index = 0; index < files.length; index++) {
					formData.append('files[]', files[index]);
				}
			}
			renderBusy(true);
			await axios
				.post(API_HOST + 'new-requirement/' + item, formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				.then((res) => {
					popupAlert({
						message: 'Document saved successfully',
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
			resetForm();
		},
	});

	const checkIfCancelled = () => {
		if (uploadedFiles !== undefined) {
			checkboxRef.current.checked = true;
			setCheckedValue(true);
		} else {
			checkboxRef.current.checked = false;
			setCheckedValue(false);
		}
	};

	const deleteDocs = async () => {
		renderBusy(true);
		await axios
			.delete(API_HOST + `documentary-applicant-requirement/${docID}`)
			.then(() => {
				popupAlert({
					message: 'Document was deleted',
					type: ALERT_ENUM.success,
				});
			})
			.catch((err) => {
				popupAlert({
					message: err.message,
					type: ALERT_ENUM.fail,
				});
			});
		dispatch(setRefresh());
		renderBusy(false);
		checkIfCancelled();
		checkboxRef.current.checked = false;
		setCheckedValue(false);
	};

	useEffect(() => {
		if (uploadedFiles?.filename !== undefined) {
			const localfileArray = uploadedFiles?.filename.split(',');
			setFileArray(localfileArray);
			checkIfCancelled();
		}
	}, [uploadedFiles]);
	return (
		<React.Fragment>
			<form onSubmit={form.handleSubmit} onClick={(e) => e.stopPropagation()}>
				<div className='documentary-toggle'>
					<div className='margin-right-1'>
						<ToggleSwitchComponent
							checked={checkedValue}
							checkboxRef={checkboxRef}
							onClick={() => {
								if (checkboxRef.current.checked === true) {
									file.current.click();
								}
							}}
						/>

						<input
							ref={file}
							id='props.filename'
							type='file'
							name='appName[]'
							onChange={(e) => {
								setFiles(e.target.files);
								form.handleSubmit();
							}}
							onFocus={() => {
								checkIfCancelled();
							}}
							onBlur={() => {
								checkIfCancelled();
							}}
							accept='application/pdf, application/zip'
							hidden
							multiple={true}
						/>
						<span>
							<span className='margin-right-1'> {label}</span>
						</span>
					</div>
				</div>
				<div className='file-item-container'>
					{uploadedFiles !== undefined &&
						fileArray.map((file, key) => {
							return <Uploaded name={file} key={key} doc={docID} />;
						})}
					{uploadedFiles !== undefined && (
						<div className='button-remove-file'>
							<ButtonComponent
								onClick={() => {
									deleteDocs();
								}}
								type='button'
								buttonName='Remove'
							/>
						</div>
					)}
				</div>
				<br />
			</form>
		</React.Fragment>
	);
};
const Uploaded = ({ name }) => {
	return (
		<>
			<div className='file-item'>
				<a
					href={SANCTUM + 'storage/applicant/applicant-docs/' + name}
					target='_blank'
					rel='noreferrer'
				>
					{name}
				</a>
			</div>
		</>
	);
};
export default DocumentUploadToggle;
