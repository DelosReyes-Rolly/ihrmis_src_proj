import React from "react";
import InputComponent from "../../../../common/input_component/input_component/input_component";
import ModalComponent from "../../../../common/modal_component/modal_component";
import RichTextEditorComponent from "../../../../common/rich_text_editor_component/rich_text_editor_component";

const PostingOnJobVacancyModal = ({ isDisplay, onClose }) => {
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
					<RichTextEditorComponent
						setFieldValue={(val) => ""}
						value={""}
						toolbar={{
							options: [
								"inline",
								"fontFamily",
								"fontSize",
								"list",
								"textAlign",
								"link",
								"history",
							],
							inline: { inDropdown: true },
							list: { inDropdown: true },
							textAlign: { inDropdown: true },
							link: { inDropdown: true },
							history: { inDropdown: false },
						}}
					/>
					<div className="posting-job-vacancy">
						<span>
							<a className="posting-job-vacancy-anchor" href="#">
								{"<<"}
							</a>
						</span>
						<span style={{ paddingLeft: "20px" }}>
							<a s className="posting-job-vacancy-anchor" href="#">
								{">>"}
							</a>
						</span>
					</div>
					<div className="posting-job-vacancy-deadline">
						<label htmlFor="deadline_label">Deadline</label>
						<InputComponent
							className="margin-left"
							id="deadline_label"
							placeholder={"mm/dd/yyyy"}
							readOnly={true}
						/>
					</div>
				</div>
			</ModalComponent>
		</React.Fragment>
	);
};

export default PostingOnJobVacancyModal;
