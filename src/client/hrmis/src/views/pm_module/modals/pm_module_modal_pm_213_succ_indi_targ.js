import React, { useEffect, useState } from "react";
import ModalComponent from "../../common/modal_component/modal_component";
import InputComponent from "../../common/input_component/input_component/input_component";
import TextAreaComponent from "../../common/input_component/textarea_input_component/textarea_input_component";

const Pm213SIT = ({ isDisplay, onClose }) => {

return (
    <React.Fragment>
        <ModalComponent
            title = "Success Indicator Target"
            isDisplay = {isDisplay}
            onClose = {onClose}
            onSubmitType = "submit" 
            >
            High-end Router installed and configured by EO June with no negative feedback
            <br/>
            <div  style={{"margin-top": "10px"}}>
            <div>
                Alloted Budget
                <InputComponent/>
            </div>

            <div>
                Remarks
                <TextAreaComponent maxLength = "65535" row="5"/>
            </div>
            </div>
        </ModalComponent>
    </React.Fragment>
);
};

export default Pm213SIT;