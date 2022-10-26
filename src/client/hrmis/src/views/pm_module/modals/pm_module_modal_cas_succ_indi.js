import React, { useEffect, useState } from "react";
import ModalComponent from "../../common/modal_component/modal_component";
import InputComponent from "../../common/input_component/input_component/input_component";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { RadioComponent } from "../../common/input_component/checkbox_input_component/checkbox_input_component";
import ToggleSwitchComponent from "../../common/toggle_switch_component/toggle_switch";
import TextAreaComponent from "../../common/input_component/textarea_input_component/textarea_input_component";


const CasSuccIndi = ({isDisplay, onClose}) => {
    const [option, setOptions] = useState("Major Final Output 1");
    const [startDate, setStartDate] = useState(new Date());
    const [startDate1, setStartDate1] = useState(new Date());
    const selectOptions = [                        
        {value: 'MFO 1', label: 'Major Final Output 1'},
        {value: 'MFO 2', label: 'Major Final Output 2'},
        {value: 'MFO 3', label: 'Major Final Output 3'}
    ]
    return (
        <React.Fragment>
            <ModalComponent
                title = "Cascaded Success Indicator"
                isDisplay = {isDisplay}
                onClose = {onClose}
                onSubmitType = "submit"
                //onSubmit form handler here (backend)
                >
                    <div >
                        <div className = "form-radio-item" style={{'float':'left'}}>
                            <RadioComponent name="radio1"/>
                            Office
                            <RadioComponent  name="radio1"/>
                            Employee
                    </div>
                    <br/>
                    <div className="success-indicator" style={{'justify-content':'center','margin-top':'20px',}} >
                        <div style={{'flex':'340px'}}>
                        Responsible
                        </div>
                        
                        <div className = "form-radio-item">
                            <ToggleSwitchComponent/>Show All
                        </div>

                    </div>
                    <div style={{'margin-top': '5px'}}>
                    <Select
                    className="dropdown" 
                    value={option}
                    options={selectOptions} 
                    placeholder={option}
                    onInputChange={()=> setOptions}
                    />
                    </div>
                    <div style={{'margin-top': '30px'}}>
                        <div style={{'margin-bottom': '7px'}}>
                        Major Final Output
                        </div>
                        <TextAreaComponent row="3"/>
                    </div>
                    <div style={{'margin-top': '30px'}}>
                        <div style={{'margin-bottom': '7px'}}>
                        Success Indicator
                        </div>
                        <TextAreaComponent row="3" />
                    </div>
                    
                    <div className="container">

                        <div className="pm-212-text">
                            Period From
                            <div className="pm-212">
                    
                            <DatePicker
                            className = "slim-datePicker"
                            selected ={startDate}
                            onChange = {(date) => setStartDate(date)}
                            dateFormat="MM/dd/yyyy"
                        />
                            </div>
                        </div>

                        <div className="pm-212-text">
                            To
                            <div>
                            <DatePicker
                            className = "slim-datePicker"
                            selected ={startDate1}
                            onChange = {(date) => setStartDate1(date)}
                            dateFormat="MM/dd/yyyy"
                    />
                            </div>
                        </div>
                    </div>

                    </div>
            </ModalComponent>
        </React.Fragment>
    )
}

export default CasSuccIndi;