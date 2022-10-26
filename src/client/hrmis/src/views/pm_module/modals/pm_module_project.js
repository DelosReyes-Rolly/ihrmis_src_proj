import React, { useEffect, useState } from "react";
import ModalComponent from "../../common/modal_component/modal_component";
import InputComponent from "../../common/input_component/input_component/input_component";
import Select from "react-select";
import { RadioComponent } from "../../common/input_component/checkbox_input_component/checkbox_input_component";
const Project_Activity = ({isDisplay, onClose}) => {
    const [option, setOptions] = useState("Project/Activity 1");
    const selectOptions = [                        
        {value: 'PRO 1', label: 'Project/Activity 1'},
        {value: 'PRO 2', label: 'Project/Activity 2'},
        {value: 'PRO 3', label: 'Project/Activity 3'}
    ]
    return (
        <React.Fragment>
            <ModalComponent
                title = "Project/Activity"
                isDisplay = {isDisplay}
                onClose = {onClose}
                onSubmitType = "submit"
                //onSubmit form handler here (bac
                >
                    <div>
                        Title/Name
                        <InputComponent/>
                    </div>
                    <br/>
                        <div >
                            <label>Function</label>
                                <InputComponent />
                        </div>
                    <br/>
                        <div>
                        Placement
                            <label className = "form-radio-item">
                            <RadioComponent name="radio"/>
                            After
                            </label>
                            <label className ="form-radio-item">
                            <RadioComponent  name="radio"/>
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

export default Project_Activity;