import React, { useEffect, useState } from "react";
import ModalComponent from "../../common/modal_component/modal_component";
import TextAreaComponent from "../../common/input_component/textarea_input_component/textarea_input_component";
import Select from "react-select";

const Pm213SIA = ({ isDisplay, onClose }) => {
    const rating = [...new Array(11)].map((each, index) => ({ label: index, value: index }))
    
return (
    <React.Fragment>
        <ModalComponent
            title = "Success Indicator Accomplishment"
            isDisplay = {isDisplay}
            onClose = {onClose}
            onSubmitType = "submit" 
            >
            High-end Router installed and configured by EO June with no negative feedback
            <br/>
            <div style={{"margin-top": "10px"}}>           
                Accomplishment
                <TextAreaComponent maxLength = "65535" row="3"/>            
            </div>

            <div className="modal-container" >
                <div className="modals-row" style={{"flex-basis": "300px"}}>
                    Quality
                    <Select
                    options={rating}
                    />
                </div>
                <div className="modals-row" style={{"flex-basis": "300px"}}>
                    Efficiency
                    <Select
                    options={rating}
                    />
                </div>
                <div className="modals-row" style={{"flex-basis": "300px"}}>
                    Timeliness
                    <Select
                    options={rating}
                    />
                </div>
            </div>

            <div style={{"margin-top": "10px"}}>           
                Remarks
                <TextAreaComponent maxLength = "65535" row="3"/>            
            </div>

        </ModalComponent>
    </React.Fragment>
);
};

export default Pm213SIA;