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

const DocumentListComponent = ({ applicantId }) => {
	const mounted = useIsMounted();
	const { refresh } = useSelector((state) => state.popupResponse);
	const [requirements, setDocumentRequirements] = useState([]);
	const [uploads, setUploadedRequirements] = useState([]);
	const [otherDocs, setOtherDocs] = useState([]);
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
			.get(API_HOST + 'get-uploaded-documents/3/' + applicantId)
			.then((response) => {
				let options = [];
				let data = response.data.data;
				console.log(data);
				data.forEach((element) => {
					if (element.tbldocumentary_attachments[0] != null) {
						element.tbldocumentary_attachments.forEach((value) => {
							let index = requirements.findIndex((object) => {
								return object.id === value.att_app_doc_id;
							});
							if (index !== -1) {
								requirements[index].att_id = value.att_id;
								setDocumentRequirements(requirements);
							}
							let temp = {
								id: element.doc_id,
								title:
									element.doc_id === 4 ? value.att_app_name : element.doc_name,
								att_id: value.att_id,
								file: value.att_app_file,
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

		uploadedDocs.forEach((element) => {
			let temp = requirements.some((check) => check.title === element.title);
			if (!temp && element.id != null) {
				tempDocs.push({
					id: element.id,
					title: element.title,
					att_id: element.att_id,
					filled: true,
					file: element.file,
				});
				setOtherDocs(tempDocs);
			} else {
				setOtherDocs([]);
			}
			let index = requirements.findIndex((object) => {
				return object.id === element.id;
			});
			if (index !== -1) {
				requirements[index].filled = true;
				requirements[index].file = element.file;
			} else {
				requirements.forEach((value) => {
					value.filled = false;
				});
			}
		});
	};
	useEffect(() => {
		getDocumentRequirements();
		if (applicantId !== undefined) {
			getUploadedDocuments(applicantId);
		}
	}, [applicantId, refresh]);
	useEffect(() => {
		requirements.forEach((value) => {
			value.filled = false;
		});
		setDocumentRequirements(requirements);
		filterUploadedfromRequirements();
	}, [uploads, refresh]);
	return (
		<React.Fragment>
			<table className='documents_table'>
				<tbody>
					<TableList data={requirements ?? []} counter={0} />
					<TableList data={otherDocs ?? []} counter={100} />
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
				if (element.title === 'Other Documents') return null;
				return (
					<tr key={counter}>
						<td
							id={'document_text'}
							data-tip
							data-for={'rc-dc-txt' + counter}
							onClick={() => {
								window.open(
									SANCTUM +
										'storage/applicant/applicant-requirements/' +
										element.file,
									'_blank'
								);
							}}
							className={element.filled === false ? 'col-1 unfilled' : 'col-1'}
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
