import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { API_HOST } from '../../../../helpers/global/global_config';
import { useIsMounted } from '../../../../helpers/use_hooks/isMounted';
import DostHeader from '../dost_header';
import DocumentUploadToggle from '../document_upload_toggle';
import PrevNextSubButtons from '../prev_next_sub_buttons';
import { useNavigate, useParams } from 'react-router-dom';

const FormSix = () => {
	const navigate = useNavigate();
	const mounted = useIsMounted();
	const [uploaded, setUploaded] = useState([]);
	const [dataListofObjectFiles, setObjectFiles] = useState([]);
	const { refresh } = useSelector((state) => state.popupResponse);
	const { item } = useParams();

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
					};
					options.push(temp);
				});
				if (!mounted.current) return;
				setObjectFiles(options);
			})
			.catch();
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
		getRequiredDocuments();
		getDocs();
	}, [refresh]);

	return (
		<React.Fragment>
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
						<br />
						{dataListofObjectFiles.map((data) => {
							return (
								<DocumentUploadToggle
									key={data.doc_id}
									label={data.label}
									docID={data.doc_id}
									uploadedFiles={uploaded[data.doc_id]}
								/>
							);
						})}
						<div className='buttons-pos-right'>
							<PrevNextSubButtons
								page={6}
								onClickBack={() =>
									navigate(`/pds-applicant/form-page-five/${item}`)
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default FormSix;
