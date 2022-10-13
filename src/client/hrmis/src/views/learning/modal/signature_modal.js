import React from "react";
import CheckboxComponent from "../../common/input_component/checkbox_input_component/checkbox_input_component";
import InputComponent from "../../common/input_component/input_component/input_component";
import TextAreaComponent from "../../common/input_component/textarea_input_component/textarea_input_component";
import ModalComponent from "../../common/modal_component/modal_component";
import { BsArrowsFullscreen, BsUpload } from "react-icons/bs";
import SelectComponent from "../../common/input_component/select_component/select_component";


const SignatureModal = ({isDisplay, onClose}) => {
    let iconStyles = { fontSize: "1.4em", color: "#084c84"};
    return (
        <React.Fragment>
            <ModalComponent isDisplay={isDisplay} onClose={() => onClose()} title={'Signature'}>
                <label>Name of Signatory</label>
                <div style={{float:"right"}}>
                    Show all
                </div>
                <SelectComponent/><br/><br/>
                <TextAreaComponent/><br/><br/>
                <CheckboxComponent/>
                Remember
                <div style={{float: "right"}}>
                    <span style={{ marginRight: 20}}><a href="#" target="_blank" rel="noreferrer"><BsUpload style={iconStyles}/></a></span>
                    <span style={{ marginRight: 20}}><a href="#" target="_blank" rel="noreferrer"><BsArrowsFullscreen style={iconStyles}/></a></span>
                </div>
            </ModalComponent>
        </React.Fragment>
    );
};
export default SignatureModal;