import React, { useEffect, useState } from "react";
import ModalComponent from "../../common/modal_component/modal_component";
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css'

const MfoTable = ({ isDisplay, onClose }) => {
    const [startDate, setStartDate] = useState(new Date())
    const [startDate1, setStartDate1] = useState(new Date())
return (
    <React.Fragment>
        <ModalComponent
            title = "MFO Table"
            isDisplay = {isDisplay}
            onClose = {onClose}
            onSubmitType = "submit"
            //onSubmit form handler here (backend)
            >
               
                <div className="flex-container">
                    <div>
                    Year
                    <DatePicker
                    selected ={startDate}
                    onChange = {(date) => setStartDate(date)}
                    showYearPicker
                    dateFormat="yyyy"
                    />
                    </div>
                    <div>
                    Copy from Year
                    <DatePicker
                    selected ={startDate1}
                    onChange = {(date) => setStartDate1(date)}
                    showYearPicker
                    dateFormat="yyyy"
                    />
                    </div>

                </div>
        </ModalComponent>
    </React.Fragment>
);
};

export default MfoTable;