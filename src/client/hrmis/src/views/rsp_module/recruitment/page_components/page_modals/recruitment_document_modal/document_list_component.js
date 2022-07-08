import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { setRefresh } from '../../../../../../features/reducers/popup_response';
import {
	API_HOST,
	SANCTUM,
} from '../../../../../../helpers/global/global_config';
import { useIsMounted } from '../../../../../../helpers/use_hooks/isMounted';
import IconComponent from '../../../../../common/icon_component/icon';

const DocumentListComponent = ({ applicantId, isDisplay }) => {
	const mounted = useIsMounted();
	const { refresh } = useSelector((state) => state.popupResponse);
	const [requirements, setDocumentRequirements] = useState([]);
	const [uploads, setUploadedRequirements] = useState([]);
	const getDocumentRequirements = async () => {
		await axios
			.get(API_HOST + 'get-documentary-requirements/1/RP')
			.then((response) => {
				let options = [];
				let data = response.data.data;
				data.forEach((element) => {
					let temp = {
						id: element.doc_id,
						title: element.doc_name,
						filled: false,
						att_id: '',
						file: '',
					};
					options.push(temp);
				});
				if (!mounted.current) return;
				setDocumentRequirements(options);
			})
			.catch((error) => {});
	};

	const getUploadedDocuments = async () => {
		await axios
			.get(API_HOST + 'get-uploaded-documents/1/RP/' + applicantId)
			.then((response) => {
				let options = [];
				let data = response.data.data;
				data.forEach((element) => {
					if (element.tbl_applicant_requirements[0] != null) {
						element.tbl_applicant_requirements.forEach((value) => {
							let index = requirements.findIndex((object) => {
								return object.id === value.req_app_doc_id;
							});
							if (index) {
								requirements[index].att_id = value.id;
								setDocumentRequirements(requirements);
							}
							let temp = {
								id: element.doc_id,
								title:
									element.doc_id === 4 ? value.req_app_file : element.doc_name,
								att_id: value.id,
								file: value.req_app_file,
							};
							options.push(temp);
						});
					}
				});
				if (!mounted.current) return;
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

	const filterUploadedfromRequirements = () => {
		let uploadedDocs = uploads;
		let tempDocs = [];
		let requirementsClone = requirements;
		uploadedDocs.forEach((element) => {
			let index = requirementsClone.findIndex((object) => {
				return object.id === element.id;
			});
			if (index !== -1) {
				requirementsClone[index].filled = true;
				let splitter = element.file.split(',');
				requirementsClone[index].file = splitter;
			} else {
				requirementsClone.forEach((value) => {
					value.filled = false;
				});
			}
		});
		setDocumentRequirements(requirementsClone);
	};
	useEffect(() => {
		getDocumentRequirements();
		getUploadedDocuments(applicantId);
	}, [applicantId, refresh, isDisplay]);
	useEffect(() => {
		let requirementClone = requirements;
		requirementClone.forEach((value) => {
			value.filled = false;
		});
		setDocumentRequirements(requirementClone);
		filterUploadedfromRequirements();
	}, [uploads, refresh, isDisplay]);
	return (
		<React.Fragment>
			<table className='documents_table'>
				<tbody>
					<TableList data={requirements ?? []} counter={0} />
				</tbody>
			</table>
		</React.Fragment>
	);
};

export default DocumentListComponent;

const TableList = ({ data, counter }) => {
	const dispatch = useDispatch();
	const deleteDocument = async (att_id) => {
		await axios
			.get(API_HOST + 'delete-uploaded-documents/' + att_id)
			.then((response) => {
				dispatch(setRefresh());
			})
			.catch((error) => {});
	};
	return (
		<React.Fragment>
			{data.map((element) => {
				counter++;
				return (
					<tr key={counter}>
						{element.file !== '' &&
							element?.file.map((data, index) => {
								let number = index + 1;
								return (
									<td
										id={'document_text'}
										data-tip
										data-for={'rc-dc-txt' + counter}
										onClick={() => {
											window.open(
												SANCTUM + 'storage/applicant/applicant-docs/' + data,
												'_blank'
											);
										}}
										className={
											element.filled === false ? 'col-1 unfilled' : 'col-1'
										}
									>
										<ReactTooltip
											id={'rc-dc-txt' + counter}
											place='top'
											effect='solid'
										>
											Open {element.title} in another Window
										</ReactTooltip>
										{element.title + ' - ' + number}
									</td>
								);
							})}
						{element.file === '' && (
							<td
								id={'document_text'}
								data-tip
								data-for={'rc-dc-txt' + counter}
								onClick={() => {
									window.open(
										SANCTUM +
											'storage/applicant/applicant-docs/' +
											element?.file,
										'_blank'
									);
								}}
								className={
									element.filled === false ? 'col-1 unfilled' : 'col-1'
								}
							>
								<ReactTooltip
									id={'rc-dc-txt' + counter}
									place='top'
									effect='solid'
								>
									Open {element.title} in another Window
								</ReactTooltip>
								{element.title}
							</td>
						)}
						<td className='col-2'>
							<IconComponent
								id={'delete ' + counter}
								className={
									element.filled === false
										? 'padding-left-1 point gone'
										: 'padding-left-1 point'
								}
								icon={<BsTrashFill />}
								position='top'
								toolTipId={'rc-vp-mail-' + counter}
								textHelper={'Delete this file?'}
								onClick={() => {
									deleteDocument(element.att_id);
								}}
							/>
						</td>
					</tr>
				);
			})}
		</React.Fragment>
	);
};
