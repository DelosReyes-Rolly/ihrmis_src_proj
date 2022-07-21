import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { SyncLoader } from "react-spinners";
import InputComponent from "../../../../common/input_component/input_component/input_component";
import ModalComponent from "../../../../common/modal_component/modal_component";
// import RichTextEditorComponent from "../../../../common/rich_text_editor_component/rich_text_editor_component";
// import useSweetAlertHelper from "../../../../../helpers/use_hooks/sweetalert_helper";
import useAxiosCallHelper from "../../../../../helpers/use_hooks/axios_call_helper";
import { API_HOST } from "../../../../../helpers/global/global_config";
// import { useSelector } from "react-redux";
import { noticeOfVacancyTemplate } from "./notice_vacancy_template";
import TinyMceEditorComponent from "../../../../common/tinymce/tinymce_component";

const PostingOnJobVacancyModal = ({ isDisplay, onClose }) => {
	// const [arrSample, setArrSample] = useState([
	// 	{ date: "2022-12-23", message: "World Hello" },
	// 	{ date: "2022-12-05", message: "Hello WOrld" },
	// ]);
	const [plantilla_items, setPlantillaItems] = useState([]);
	const [axiosCall] = useAxiosCallHelper();

	const getPlantillaItemDetails = async () => {
		axiosCall("get", API_HOST + "getPlantillaItemDetails").then(
			(response) => {
				setPlantillaItems(response.data.data);
				console.log(response.data);
			},
			(error) => {
				console.log(error);
			}
		);
	};

	useMemo(() => {
		getPlantillaItemDetails();
	}, [isDisplay]);

	const [page, setPage] = useState(0);

	const pageNavigator = (isNext) => {
		if (isNext === false) {
			if (page === 0) return setPage(0);
			return setPage(page - 1);
		}
		if (isNext === true) {
			if (page === plantilla_items.length - 1)
				return setPage(plantilla_items.length - 1);
			return setPage(page + 1);
		}
	};

	const formDataHandler = (isMessage, index, value) => {
		let newFormData = plantilla_items;
		if (isMessage === true) newFormData[index].content = value;
		if (isMessage === false) newFormData[index].deadline = value;
		setPlantillaItems(newFormData);
	};

	const removeFormData = (index) => {};

	return (
		<React.Fragment>
			<ModalComponent
				style={{ zIndex: "101" }}
				title="Posting On Job Vacancy"
				isDisplay={isDisplay}
				onClose={onClose}
				onCloseName="Remove"
				onSubmitName="Submit"
			>
				<div className="posting-job-vacancy-main">
					{plantilla_items?.map((data, index) => {
						// console.log(data);
						return (
							<React.Fragment key={index}>
								{index === page ? (
									<EditableContentTemplate
										item={noticeOfVacancyTemplate(data)}
										navigate={pageNavigator}
										setForm={formDataHandler}
										index={index}
										currentPage={page}
										count={plantilla_items.length}
									/>
								) : null}
							</React.Fragment>
						);
					})}
				</div>
			</ModalComponent>
		</React.Fragment>
	);
};

export default PostingOnJobVacancyModal;

const EditableContentTemplate = ({
	item,
	navigate,
	currentPage,
	count,
	setForm,
	index,
}) => {
	const [state, setState] = useState(false);
	const [itemData, setItemData] = useState(item);

	useEffect(() => {
		setTimeout(() => {
			setState(true);
		}, 500);
	}, []);

	const onChangeHandler = (value, isMessage) => {
		const arrHolder = itemData;
		if (isMessage === false) {
			arrHolder.deadline = value;
			setItemData(arrHolder);
			setForm(false, index, arrHolder.deadline ?? "");
		}
		if (isMessage === true) {
			arrHolder.content = value;
			setItemData(arrHolder);
			setForm(true, index, arrHolder.content ?? "");
		}
	};

	if (state === false) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					gap: 25,
					alignItems: "center",
				}}
			>
				<SyncLoader size={10} color="rgba(0, 78, 135, 1)" />{" "}
				<p style={{ fontSize: "17px" }}>Please Wait</p>
			</div>
		);
	}

	return (
		<React.Fragment>
			<TinyMceEditorComponent
				setFieldValue={(val) => {
					onChangeHandler(val, true);
				}}
				initialValue={itemData?.content}
				// value={itemData?.content}
				// value={}
				// toolbar={{
				// 	options: [
				// 		"inline",
				// 		"fontFamily",
				// 		"fontSize",
				// 		"list",
				// 		"textAlign",
				// 		"link",
				// 		"history",
				// 	],
				// 	inline: { inDropdown: true },
				// 	list: {
				// 		inDropdown: false,
				// 		options: ["unordered", "ordered", "indent", "outdent"],
				// 	},
				// 	textAlign: { inDropdown: true },
				// 	link: { inDropdown: true },
				// 	history: { inDropdown: false },
				// }}
			/>

			<div className="posting-job-vacancy">
				<span>
					<span
						onClick={() => navigate(false)}
						className={`posting-job-vacancy-anchor ${
							currentPage === 0 && "on-last-page"
						}`}
						href="#"
					>
						{"<<"}
					</span>
				</span>
				<span style={{ paddingLeft: "20px" }}>
					<span
						onClick={() => navigate(true)}
						className={`posting-job-vacancy-anchor ${
							currentPage === count - 1 && "on-last-page"
						}`}
						href="#"
					>
						{">>"}
					</span>
				</span>
			</div>
			<div className="posting-job-vacancy-deadline">
				<label htmlFor="deadline_label">Deadline</label>
				<InputComponent
					className="margin-left"
					type="date"
					value={itemData?.deadline ?? ""}
					onChange={(e) => onChangeHandler(e.target.value, false)}
				/>
			</div>
		</React.Fragment>
	);
};
