import React from "react";
import TextAreaComponent from "../../common/input_component/textarea_input_component/textarea_input_component";
import ModalComponent from "../../common/modal_component/modal_component";


const RemarksModal = ({isDisplay, onClose}) => {
    return (
        <React.Fragment>
            <ModalComponent isDisplay={isDisplay} onClose={() => onClose()} title={'Remarks'}>
                <TextAreaComponent/>
            </ModalComponent>
        </React.Fragment>
    );
};

export default RemarksModal;