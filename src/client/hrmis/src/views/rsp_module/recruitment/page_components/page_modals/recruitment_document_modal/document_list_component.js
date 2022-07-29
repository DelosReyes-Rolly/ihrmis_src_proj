import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { setRefresh } from "../../../../../../features/reducers/popup_response";
import {
	ALERT_ENUM,
	popupAlert,
	popupConfirmation,
} from "../../../../../../helpers/alert_response";
import {
	API_HOST,
	SANCTUM,
} from "../../../../../../helpers/global/global_config";
import { useIsMounted } from "../../../../../../helpers/use_hooks/isMounted";
import IconComponent from "../../../../../common/icon_component/icon";

const DocumentListComponent = ({ applicantId, isDisplay, level, cluster }) => {
	const mounted = useIsMounted();
	const { refresh } = useSelector((state) => state.popupResponse);
	const [requirements, setDocumentRequirements] = useState([]);

	const getUploadedDocuments = async () => {
		let options = [];

		await axios
			.get(
				API_HOST +
					"get-uploaded-documents/" +
					level +
					"/" +
					cluster +
					"/" +
					applicantId
			)
			.then((response) => {
				let data = response.data.data;
				data.forEach((element) => {
					let temp = {
						id: element.doc_id,
						title: element.doc_name,
						filled: false,
						att_id: "",
						file: [],
					};
					if (element.tbl_applicant_requirements.length !== 0) {
						element.tbl_applicant_requirements.forEach((value) => {
							let splitter = value.req_app_file.split(",");
							temp.file = splitter;
							temp.att_id = value.id;
							if (value.req_app_doc_name != null)
								temp.title = value.req_app_doc_name;
						});
						temp.filled = true;
					}
					options.push(temp);
				});
			})
			.catch((error) => {});
		if (!mounted.current) return;
		if (options.length > 0) {
			setDocumentRequirements(options);
		} else {
			setDocumentRequirements([
				{
					none: "none",
				},
			]);
		}
	};

	useEffect(() => {
		getUploadedDocuments();
	}, [applicantId, refresh, isDisplay]);
	return (
		<React.Fragment>
			<table className="documents_table">
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
			.get(API_HOST + "delete-uploaded-documents/" + att_id)
			.then((response) => {
				popupAlert({
					message: "Documents were Deleted",
					type: ALERT_ENUM.success,
				});
				dispatch(setRefresh());
			})
			.catch((error) => {});
	};
	return (
		<React.Fragment>
			{data.map((element, key) => {
				return (
					<tr key={key}>
						{element?.file?.length !== 0 &&
							element?.file?.map((data, index) => {
								let number = index + 1;
								return (
									<td
										key={index}
										id={"document_text"}
										data-tip
										data-for={"rc-dc-txt" + key}
										onClick={() => {
											window.open(
												SANCTUM + "storage/applicant/applicant-docs/" + data,
												"_blank"
											);
										}}
										className={
											element.filled === false ? "unfilled" : "td-file-list"
										}
									>
										<ReactTooltip
											id={"rc-dc-txt" + key}
											place="top"
											effect="solid"
										>
											Open {element.title} in another Window
										</ReactTooltip>
										{element.title + " - " + number}
									</td>
								);
							})}
						{element?.file?.length === 0 && (
							<td
								id={"document_text"}
								data-tip
								data-for={"rc-dc-txt" + key}
								className={element.filled === false ? "unfilled" : ""}
							>
								{element.title}
							</td>
						)}
						<td
							className="col-2 w5 upload-input-design"
							onClick={() => {
								popupConfirmation({
									title: "Confirmation",
									message: "Are you sure you want to delete this document?",
									type: ALERT_ENUM.fail,
									cancel: true,
									functions: deleteDocument,
									value: element.att_id,
								});
							}}
						>
							<IconComponent
								id={"delete " + key}
								className={
									element.filled === false
										? "padding-left-1 point gone"
										: "padding-left-1 point"
								}
								icon={<BsTrashFill />}
								position="top"
								toolTipId={"rc-vp-mail-" + key}
								textHelper={"Delete this file?"}
							/>
						</td>
					</tr>
				);
			})}
		</React.Fragment>
	);
};
