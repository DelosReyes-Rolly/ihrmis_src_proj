import React from "react";
import TextAreaComponent from "../../common/input_component/textarea_input_component/textarea_input_component";
import ModalComponent from "../../common/modal_component/modal_component";


const RemarksModal = ({isDisplay, onClose}) => {
    return (
        <div>
            <React.Fragment>
                <ModalComponent isDisplay={isDisplay} onClose={() => onClose()} title={'Remarks'}>
                    <div style={{marginLeft: 20, marginRight: 20}}>
                        <TextAreaComponent/>
                    </div>
                </ModalComponent>
            </React.Fragment>
        </div>
    );
};

export default RemarksModal;