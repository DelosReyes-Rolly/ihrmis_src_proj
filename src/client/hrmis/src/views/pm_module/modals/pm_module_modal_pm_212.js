import React, { useEffect, useState } from "react";
import ModalComponent from "../../common/modal_component/modal_component";
import InputComponent from "../../common/input_component/input_component/input_component";
import Select from "react-select";
import DatePicker from "react-datepicker";


const PerfMet212 = ({isDisplay, onClose}) => {
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
                title = "PCR"
                isDisplay = {isDisplay}
                onClose = {onClose}
                onSubmitType = "submit"
                //onSubmit form handler here (backend)
                >
                    <div>
                        <div className="pm-212">
                    <label >
                    <input type="radio" name="radio" />
                    OPCR
                    </label>
                    <label >
                        <input type="radio" name="radio"/>
                    DPCR
                    </label>
                    <label >
                    <input type="radio" name="radio" />
                    IPCR
                    </label>
                    </div>
                    <br/>
                    <div className="container">
                        <div className="pm-212-text">
                            Period From
                            <div className="pm-212">
                    
                            <DatePicker
                            className = "datePicker"
                            selected ={startDate}
                            onChange = {(date) => setStartDate(date)} 
                            showYearPicker
                            dateFormat="yyyy"
                        />
                    </div>
                        </div>
                        <div className="pm-212-text" >
                            To
                            <div>
                            <DatePicker
                            className = "datePicker"
                            selected ={startDate1}
                            onChange = {(date) => setStartDate1(date)}
                            showYearPicker
                            dateFormat="yyyy"
                            
                    />
                    </div>
                        </div>
                    </div>
                    <br/>

                    Copy from Period
                    <Select 
                    className="dropdown" 
                    value={option}
                    options={selectOptions} 
                    placeholder={option}
                    onInputChange={()=> setOptions}
                    
                    />


                    
                    <br/>
                    Title
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

export default PerfMet212;