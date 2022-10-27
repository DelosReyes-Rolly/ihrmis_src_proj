import React, { useEffect, useState } from "react";
import ModalComponent from "../../common/modal_component/modal_component";
import DatePicker from 'react-datepicker';
import { useFormik } from 'formik'; 
import * as Yup from 'yup';
import Select from "react-select";
import { useTable } from "react-table";
import CheckboxComponent from "../../common/input_component/checkbox_input_component/checkbox_input_component";

const Pm212Mfo = ({ isDisplay, onClose }) => {
    const [option, setOptions] = useState("Select existing MFO");
    const selectOptions = [                        
      {value: 'MFO 1', label: '2016'},
      {value: 'MFO 2', label: '2017'},
      {value: 'MFO 3', label: '2018'},
      {value: 'MFO 4', label: '2019'},
      {value: 'MFO 5', label: '2020'},
  ]
    

return (
    <React.Fragment>
        <ModalComponent
            title = "Major Final Output"
            isDisplay = {isDisplay}
            onClose = {onClose}
            onSubmitType = "submit" 
            >
                <div>
                    Select
                    <Select 
                    className="dropdown" 
                    value={option}
                    options={selectOptions} 
                    placeholder={option}
                    onInputChange={()=> setOptions}
                    
                    />
                </div>

                <div>
                    <div>
                    Success Indicators
                    </div>
                    <div className="scroll-div">  
                        <CheckboxComponent name = "SuccessIndicator"/>
                        High End Router installed and configured by EO June with no negative feedback
                    </div>
                </div>
        </ModalComponent>
    </React.Fragment>
);
};

export default Pm212Mfo;