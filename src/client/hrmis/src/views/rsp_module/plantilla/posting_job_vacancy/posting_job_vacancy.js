import React from "react";
import ModalComponent from "../../../common/modal_component/modal_component";

const PostingOnJobVacancyModal = ({ isDisplay, onClose }) => {
	return (
		<React.Fragment>
			<ModalComponent
				style={{ zIndex: "101" }}
				title="Posting On Job Vacancy"
				isDisplay={isDisplay}
				onClose={onClose}
				onPressedHidden={true}
				onSubmitName="Save"
				children={<b>Gago!</b>}
			></ModalComponent>
		</React.Fragment>
	);
};

export default PostingOnJobVacancyModal;
