import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import InputComponent from "../../../../common/input_component/input_component/input_component";
import ModalComponent from "../../../../common/modal_component/modal_component";
import RichTextEditorComponent from "../../../../common/rich_text_editor_component/rich_text_editor_component";

const PostingOnJobVacancyModal = ({ isDisplay, onClose }) => {
	const [arrSample, setArrSample] = useState([
		{ date: "2022-12-23", message: "World Hello" },
		{ date: "2022-12-05", message: "Hello WOrld" },
	]);

	const [page, setPage] = useState(0);

	const pageNavigator = (isNext) => {
		if (isNext === false) {
			if (page === 0) return setPage(0);
			return setPage(page - 1);
		}
		if (isNext === true) {
			if (page === arrSample.length - 1) return setPage(arrSample.length - 1);
			return setPage(page + 1);
		}
	};

	const formDataHandler = (isMessage, index, value) => {
		let newFormData = arrSample;
		if (isMessage === true) newFormData[index].message = value;
		if (isMessage === false) newFormData[index].date = value;
		setArrSample(newFormData);
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
					{arrSample?.map((data, index) => {
						return (
							<React.Fragment key={index}>
								{index === page ? (
									<EditableContentTemplate
										item={data}
										navigate={pageNavigator}
										setForm={formDataHandler}
										index={index}
										currentPage={page}
										count={arrSample.length}
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
			arrHolder.date = value;
			setItemData(arrHolder);
			setForm(false, index, arrHolder.date);
		}
		if (isMessage === true) {
			arrHolder.message = value;
			setItemData(arrHolder);
			setForm(true, index, arrHolder.message);
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
			<RichTextEditorComponent
				setFieldValue={(val) => {
					onChangeHandler(val, true);
				}}
				value={itemData?.message}

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
				// 	list: { inDropdown: true },
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
					value={itemData?.date}
					onChange={(e) => onChangeHandler(e.target.value, false)}
				/>
			</div>
		</React.Fragment>
	);
};
