import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import {
	setMessageError,
	setObjectError,
} from '../../../../features/reducers/error_handler_slice';
import { setBusy } from '../../../../features/reducers/popup_response';
import { ALERT_ENUM, popupAlert } from '../../../../helpers/alert_response';
import { API_HOST, SANCTUM } from '../../../../helpers/global/global_config';
import useAxiosRequestHelper from '../../../../helpers/use_hooks/axios_request_helper';
import { useFormHelper } from '../../../../helpers/use_hooks/form_helper';
import { useIsMounted } from '../../../../helpers/use_hooks/isMounted';
import { usePopUpHelper } from '../../../../helpers/use_hooks/popup_helper';
import { useScrollToTop } from '../../../../helpers/use_hooks/useScollTop';
import ButtonComponent from '../../../common/button_component/button_component.js';
import InputComponent from '../../../common/input_component/input_component/input_component';
import ValidationComponent from '../../../common/response_component/validation_component/validation_component';
import DocumentaryToggle from '../documentary_toggle';
import DostHeader from '../dost_header';
import PrevNextSubButtons from '../prev_next_sub_buttons';

const FormPageSix = () => {
	useScrollToTop();
	const mounted = useIsMounted();
	const dispatch = useDispatch();
	const errorObj = useSelector((state) => state.error.objectError);
	const errorMsg = useSelector((state) => state.error.messageError);
	const [dataListofObjectFiles, setObjectFiles] = useState([]);
	// const dataListOfObjectFiles = [
	// 	{
	// 		doc_id: 1,
	// 		label: 'Letter of Application',
	// 		checkboxName: 'app_letter',
	// 		filename: 'app_letter_file',
	// 		error: errorObj ? errorObj.app_letter_file : '',
	// 	},
	// 	{
	// 		doc_id: 2,
	// 		label:
	// 			'Personal Data Sheet (CSC FORM 212, Revised 2017) with latest passport-size ID picture and name tag',
	// 		checkboxName: 'app_pds',
	// 		filename: 'app_pds_file',
	// 		error: errorObj ? errorObj.app_pds_file : '',
	// 	},
	// 	{
	// 		doc_id: 3,
	// 		label: 'Work Experience Sheet',
	// 		checkboxName: 'app_work',
	// 		filename: 'app_work_file',
	// 		linkLabel: '(CS Form 212 Attachments Sample Sheet)',
	// 		link: `${process.env.PDS_FORM}`,
	// 		error: errorObj ? errorObj.app_work_file : '',
	// 	},
	// 	{
	// 		doc_id: 4,
	// 		label: 'Photocopy of Diploma',
	// 		checkboxName: 'app_diploma',
	// 		filename: 'app_diploma_file',
	// 		error: errorObj ? errorObj.app_diploma_file : '',
	// 	},
	// 	{
	// 		doc_id: 5,
	// 		label: 'Photocopy of Transcript of Records',
	// 		checkboxName: 'app_tor',
	// 		filename: 'app_tor_file',
	// 		error: errorObj ? errorObj.app_tor_file : '',
	// 	},
	// 	{
	// 		doc_id: 6,
	// 		label: 'Authenticated Certificate of Eligibility/Board Exam',
	// 		checkboxName: 'app_eligibility',
	// 		filename: 'app_eligibility_file',
	// 		error: errorObj ? errorObj.app_eligibility_file : '',
	// 	},
	// 	{
	// 		doc_id: 7,
	// 		label: 'Certificate/s of Trainings/Seminars and Awards',
	// 		checkboxName: 'app_training',
	// 		filename: 'app_training_file',
	// 		error: errorObj ? errorObj.app_training_file : '',
	// 	},
	// 	{
	// 		doc_id: 8,
	// 		label:
	// 			'Performance Evaluation Rating in the last rating period or its equivalent',
	// 		checkboxName: 'app_evaluation',
	// 		filename: 'app_evaluation_file',
	// 		error: errorObj ? errorObj.app_evaluation_file : '',
	// 	},
	// 	{
	// 		doc_id: 9,
	// 		label:
	// 			'Certificate/s of Previous Employment with No Pending Administrative Charge',
	// 		checkboxName: 'app_coe',
	// 		filename: 'app_coe_file',
	// 		error: errorObj ? errorObj.app_coe_file : '',
	// 	},
	// 	{
	// 		doc_id: 10,
	// 		label: 'Copy of valid NBI Clearance',
	// 		checkboxName: 'app_nbi',
	// 		filename: 'app_nbi_file',
	// 		error: errorObj ? errorObj.app_nbi_file : '',
	// 	},
	// ];

	const getRequiredDocuments = async () => {
		await axios
			.get(API_HOST + 'get-documentary-requirements/1/RP')
			.then((response) => {
				let options = [];
				let data = response.data?.data[0]?.applicant_requirements;
				data.forEach((element) => {
					let temp = {
						doc_id: element.doc_id,
						label: element.doc_name,
						checkboxName: 'app[]',
						filename: 'appName[]',
						error: errorObj ? errorObj[element.doc_name] : '',
					};
					options.push(temp);
				});
				if (!mounted.current) return;
				setObjectFiles(options);
			})
			.catch();
	};

	useEffect(() => {
		getRequiredDocuments();
	}, []);

	const [fileItems, setFileItems] = useState();
	const [uploaded, setUploaded] = useState([]);
	const [dataState, dataStateInput, cusDataStateInput, setter] =
		useFormHelper();

	const { item } = useParams();
	const navigate = useNavigate();
	const ref = useRef([]);
	const mapFilesToState = (name, files) => {
		setFileItems({ ...fileItems, [name]: Array.from(files) });
	};

	const removeFilesToState = (name) => {
		const reference = document.getElementById(name);
		reference.value = null;
		reference.files = null;
		const validNameStr = name + '[]';
		setter((prevData) => {
			const newData = { ...prevData };
			delete newData[validNameStr];
			return newData;
		});
		setFileItems({ ...fileItems, [name]: null });
		console.log(reference.value);
		console.log(name);
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		console.log(document.getElementById('app_others_file').files);
		dispatch(setBusy(true));
		await useAxiosRequestHelper
			.post(dataState, 'new-requirement', item, true)
			.then(() => {
				popupAlert({
					message: 'Success',
					type: ALERT_ENUM.success,
				});
				dispatch(setObjectError({}));
				dispatch(setMessageError(undefined));
			})
			.catch((error) => {
				popupAlert({
					message: error.message,
					type: ALERT_ENUM.fail,
				});
				console.log(error);
				if (typeof error === 'object') {
					dispatch(setObjectError(error));
					dispatch(setMessageError('Unprocessable Entity'));
				} else {
					dispatch(setMessageError(error));
				}
			});
		dispatch(setBusy(false));
	};

	const getDocs = async () => {
		let uploadedDocs = {};
		await axios
			.get(API_HOST + 'get-document-requirements/' + item)
			.then((response) => {
				const data = response.data.data;
				data.forEach((data) => {
					let doc = {
						[data.req_app_doc_id]: {
							filename: data.req_app_file,
							fileType: data.req_app_doc_id,
						},
					};
					uploadedDocs = {
						...uploadedDocs,
						...doc,
					};
				});
				if (!mounted.current) return;
			});
		setUploaded(uploadedDocs);
	};

	useEffect(() => {
		getDocs();
	}, []);

	return (
		<React.Fragment>
			{console.log(uploaded)}
			<div className='pds-profile-main-view'>
				<DostHeader />
				<br />
				<div className='pds-prof-class-one'>
					<div>
						<br />
						<h1>Documentary Requirements</h1>
						<br />
						For online applications, it is expected that original copies will be
						presented to the Personnel Division for verification within 10
						calendar day. Only those applications with complete requirements as
						enumarated below shall be entertained. Accepts files in portable
						Document Format (PDF) or zip file with a maximum size of 5MB.
						<br />
						<br />
						{errorMsg && (
							<ValidationComponent title='FAILED TO SUBMIT'>
								<p>- {errorMsg} </p>
							</ValidationComponent>
						)}
						<br />
						<form onSubmit={submitHandler}>
							{dataListofObjectFiles.map((item, keys) => {
								return (
									<React.Fragment key={keys}>
										<DocumentaryToggle
											error={item.error}
											togglename={item.checkboxName}
											filename={'app' + item.doc_id}
											onToggleChange={(e) =>
												cusDataStateInput(
													item.checkboxName,
													e.target.value,
													true
												)
											}
											onFileChange={(e) => {
												mapFilesToState('app' + item.doc_id, e.target.files);
												cusDataStateInput(
													`${'app' + item.doc_id}[]`,
													Array.from(e.target.files)
												);
											}}
											link={item.link}
											label={item.label}
											linkLabel={item.linkLabel ?? undefined}
											file={uploaded[item.doc_id]}
										/>
										<br />
										<UploadedFileComponent
											file={uploaded[item.doc_id]}
											onClick={() => removeFilesToState}
											setter={setter}
											setFileItems={setFileItems}
											fileItems={fileItems}
											remover={'app' + item.doc_id}
											name={
												fileItems ? fileItems['app' + item.doc_id] : undefined
											}
										/>
									</React.Fragment>
								);
							})}
							<br />
							<div>
								<label>Others</label>
								<span className='invalid-response'>
									{errorObj ? errorObj.app_others : ''}
								</span>
							</div>
							<UploadOtherFileComponent
								onInputChange={(e) => {
									dataStateInput(e);
								}}
								onFileChange={(e) => {
									mapFilesToState('app_others_file', e.target.files);
									cusDataStateInput(
										'app_others_file[]',
										Array.from(e.target.files)
									);
								}}
							/>
							<br />
							<UploadedFileComponent
								name={fileItems ? fileItems.app_others_file : undefined}
								onClick={() => removeFilesToState('app_others_file')}
							/>
							<br />
							<br />
							<div className='buttons-pos-right'>
								<PrevNextSubButtons
									page={6}
									onClickBack={() =>
										navigate(`/pds-applicant/form-page-five/${item}`)
									}
								/>
							</div>
						</form>
						<br />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default FormPageSix;

/**
 * Display of filename functional components
 * @param {*} props { name } an array or list of filenames
 * @returns display of filename
 */

const Uploaded = ({ name }) => {
	return (
		<div className='file-item'>
			<a
				href={SANCTUM + 'storage/applicant/applicant-docs/' + name}
				target='_blank'
				rel='noreferrer'
			>
				{name}
			</a>
		</div>
	);
};
const UploadedFileComponent = (props) => {
	const removeFilesToState = (name) => {
		const reference = document.getElementById(name);
		reference.value = null;
		reference.files = null;
		const validNameStr = name + '[]';
		props.setter((prevData) => {
			const newData = { ...prevData };
			delete newData[validNameStr];
			return newData;
		});
		props.setFileItems({ ...props.fileItems, [name]: null });
		console.log(reference.value);
		console.log(name);
	};

	const [fileArray, setFileArray] = useState([]);
	const { renderBusy } = usePopUpHelper();

	const deleteDocs = async (type_id) => {
		renderBusy(true);
		await axios
			.delete(API_HOST + `documentary-applicant-requirement/${type_id}`)
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
		renderBusy(false);
	};
	useEffect(() => {
		if (props.file?.filename !== undefined) {
			const localfileArray = props.file?.filename.split(',');
			setFileArray(localfileArray);
		}
	}, [props?.file]);
	return (
		<React.Fragment>
			<div className='file-item-container'>
				{props.file !== undefined &&
					fileArray.map((file, key) => {
						return <Uploaded name={file} key={key} />;
					})}
				{props.name &&
					props.name.map((file, key) => {
						return (
							<div key={key} className='file-item'>
								<p>{file.name}</p>
							</div>
						);
					})}
				{(props.name || props.file !== undefined) && (
					<div className='button-remove-file'>
						<ButtonComponent
							onClick={() => {
								if (props.file !== undefined) {
									deleteDocs(props.file?.fileType);
								} else {
									console.log(props.remover);
									removeFilesToState(props.remover);
								}
							}}
							type='button'
							buttonName='Remove'
						/>
					</div>
				)}
			</div>
			{(props.name || props.file !== undefined) && (
				<React.Fragment>
					<br />
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

/**
 * Dislay input and Upload file button
 * @returns functional components for OTHERS file upload
 */
const UploadOtherFileComponent = (props) => {
	return (
		<React.Fragment>
			<div className='upload-other-file'>
				<div className='input-width'>
					<InputComponent name='app_others' onChange={props.onInputChange} />
				</div>
				<div className='others-button'>
					<label htmlFor='app_others_file'>Upload Image</label>
					<input
						id='app_others_file'
						name='app_others_file'
						type='file'
						accept='application/pdf, application/zip'
						multiple={true}
						hidden
						onChange={props.onFileChange}
					/>
				</div>
			</div>
		</React.Fragment>
	);
};
