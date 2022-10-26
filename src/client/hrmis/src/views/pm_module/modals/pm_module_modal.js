import React, { useEffect, useState } from "react";
import ModalComponent from "../../common/modal_component/modal_component";
import DatePicker from 'react-datepicker';
import { useFormik } from 'formik'; 
import * as Yup from 'yup';
import Select from "react-select";

const customStyles = {
  control: base => ({
    ...base,
    width: 200,
    height: 50
    
  })
};

const MfoTable = ({ isDisplay, onClose }) => {
    const [startDate, setStartDate] = useState(new Date())
    const [option, setOptions] = useState("Select existing MFO");
    const selectOptions = [                        
      {value: 'MFO 1', label: '2016'},
      {value: 'MFO 2', label: '2017'},
      {value: 'MFO 3', label: '2018'},
      {value: 'MFO 4', label: '2019'},
      {value: 'MFO 5', label: '2020'},
  ]
    const formHandler = useFormik({
        initialValues: {
          startDate: "",
        },
        validationSchema: Yup.object({
          startDate: Yup.date().required("This field is required")
        }),
      });

return (
    <React.Fragment>
        <ModalComponent
            title = "MFO Table"
            isDisplay = {isDisplay}
            onClose = {onClose}
            onSubmitType = "submit" 
            onSubmit={formHandler.handleSubmit}
            >
               
                <div className="flex-container">
                    <div>
                      <h3>Year</h3>

                      <DatePicker
                      name="startDate"
                      className = "datePicker"
                      selected ={startDate}
                      onChange = {(date) => setStartDate(date)}
                      showYearPicker
                      dateFormat="yyyy"
                      />

                      {formHandler.touched.startDate && formHandler.errors.startDate ? (
                                  <p className="error-validation-styles">
                                    {formHandler.errors.startDate}
                                  </p>
                                ) : null}
                    </div>

                    <div>
                      <h3>Copy from Year</h3>
                      <Select 
                      className="modals-row" 
                      value={option}
                      options={selectOptions} 
                      placeholder={option}
                      onInputChange={()=> setOptions}
                      styles={customStyles}
                      />
                    </div>

                </div>
        </ModalComponent>
    </React.Fragment>
);
};

export default MfoTable;