import React from 'react'
import InputComponent from '../../../../../../common/input_component/input_component/input_component';
import ModalComponent from '../../../../../../common/modal_component/modal_component';

// ===========================================================
// USED IN FORM PAGE THREE
// ===========================================================

const ThreeAddCivilServiceModal = (props) => {
    return (
        <React.Fragment>
            <ModalComponent
                title="Civil Service Eligibility"
                onSubmitName="Save"
                onCloseName="Delete" 
                isDisplay={props.isDisplay}
                // onSubmit={ submitHandler }
                onSubmitType="submit"
                onClose={props.onClose}
            >
                <div className="add-csc-modal-container">
                    
                    <div className="first-type-div">
                        <label>Career Service/RA 1080 (Board Bar) Under Special Law/ CES/ CSEE Barangay Eligibility, Driver's License</label>
                        <InputComponent />
                    </div>

                    <div className="second-type-div">
                        <div className="rating">
                            <label>Rating (if applicable)</label>
                            <InputComponent />
                        </div>
                        <div className="examination-date">
                            <label>Date of Examination Conferment</label>
                            <InputComponent />
                        </div>
                    </div>

                    <div className="first-type-div">
                        <label>Place of Examination/Confernment</label>
                        <InputComponent />
                    </div>

                    <div  className ="second-type-div">
                        <div className="license-number">
                            <label>License Number (if applicable)</label>
                            <InputComponent />
                        </div>
                        <div className="validity">
                            <label>Date of Validity</label>
                            <InputComponent type="date" />
                        </div>
                    </div>
                </div>
            </ModalComponent>
        </React.Fragment>
    )
}

export default ThreeAddCivilServiceModal;
