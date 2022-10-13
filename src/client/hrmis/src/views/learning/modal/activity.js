import React from "react";
import CheckboxComponent from "../../common/input_component/checkbox_input_component/checkbox_input_component";
import InputComponent from "../../common/input_component/input_component/input_component";
import TextAreaComponent from "../../common/input_component/textarea_input_component/textarea_input_component";
import ModalComponent from "../../common/modal_component/modal_component";
import SelectComponent from "../../common/input_component/select_component/select_component";


const ActivityModal = ({isDisplay, onClose}) => {
    let iconStyles = { fontSize: "1.4em", color: "#084c84"};
    return (
        <React.Fragment>
            <ModalComponent isDisplay={isDisplay} onClose={() => onClose()} title={'Individual Developement Activity'}>
                <div className="flex-container">
                    <div style={{paddingRight: 20}}>
                        <span><label>For the Year </label></span>
                    </div>
                    <div style={{paddingRight: 40}}>
                        <SelectComponent
                            name="date"
                            type={"date"}
                        />
                    </div>
                </div><br/>
                <label>Performance Gap </label>
                <SelectComponent/><br/><br/>
                <label>Developement Activity</label>
                <SelectComponent/><br/><br/>
                <label>Developement Type</label>
                <SelectComponent/>
                <TextAreaComponent/><br/><br/>
                <label>Support Needed</label>
                <InputComponent/><br/><br/>
                <label>Completion Date</label>
                <InputComponent/>
            </ModalComponent>
        </React.Fragment>
    );
};
export default ActivityModal;