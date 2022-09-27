import React from "react";
import ModalComponent from "../../common/modal_component/modal_component";

const PeriodModal = ({isDisplay, onClose}) => {
    return (
        <React.Fragment>
            <ModalComponent isDiplay={isDisplay} onClose={() => onClose()}>
                <h1>Hello World</h1>
            </ModalComponent>
        </React.Fragment>
    );
};

export default PeriodModal;