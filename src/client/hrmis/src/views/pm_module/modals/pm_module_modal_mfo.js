import React, { useEffect, useState } from "react";
import ModalComponent from "../../common/modal_component/modal_component";
import InputComponent from "../../common/input_component/input_component/input_component";
import Select from "react-select";

const MajorFinalOutput = ({isDisplay, onClose}) => {
    const [option, setOptions] = useState("Major Final Output 1");
    const selectOptions = [                        
        {value: 'MFO 1', label: 'Major Final Output 1'},
        {value: 'MFO 2', label: 'Major Final Output 2'},
        {value: 'MFO 3', label: 'Major Final Output 3'}
    ]
    return (
        <React.Fragment>
            <ModalComponent
                title = "Major Final Output"
                isDisplay = {isDisplay}
                onClose = {onClose}
                onSubmitType = "submit"
                //onSubmit form handler here (bac
                >
                    <div >
                    <label>Description</label>
                    <InputComponent />
                    </div>
                    <br/>
                    <div>
                    Placement
                    <label className="form-radio-item">
                    <input type="radio" name="radio" />
                    After
                    </label>
                    <label className="form-radio-item">
                        <input type="radio" name="radio"/>
                    Before
                    </label>
                    <br/>
                    <Select 
                    className="dropdown" 
                    value={option}
                    options={selectOptions} 
                    placeholder={option}
                    onInputChange={()=> setOptions}
                    
                    />
                    </div>
            </ModalComponent>
        </React.Fragment>
    )
}

export default MajorFinalOutput;