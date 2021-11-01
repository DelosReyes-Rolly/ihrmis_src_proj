import React from 'react'
import InputComponent from '../../../../../../common/input_component/input_component/input_component';
import SelectComponent from '../../../../../../common/input_component/select_component/select_component';
import ModalComponent from '../../../../../../common/modal_component/modal_component';

// ===========================================================
// USED IN FORM PAGE THREE
// ===========================================================

const ThreeAddWorkExperienceModal = (props) => {
    return (
        <React.Fragment>
             <ModalComponent
                title="Work Experience"
                onSubmitName="Save"
                onCloseName="Delete" 
                isDisplay={props.isDisplay}
                // onSubmit={ submitHandler }
                onSubmitType="submit"
                onClose={props.onClose}
            >
                <div className="add-workexp-modal-container">
                    
                    <div className="first-type-div">
                        <label>Position Title (write in full/do not abbreviate)</label>
                        <InputComponent />
                    </div>

                    <div className="first-type-div">
                        <label>Department/Agency/Office/Company (write in full/do not abbreviate)</label>
                        <InputComponent />
                    </div>

                    <div className="third-type-div">
                        <div className="salary">
                            <label>Monthly Salary</label>
                            <InputComponent />
                        </div>
                        <div className="grade">
                            <label>(if applicable) Salary/Job/Grade</label>
                            <SelectComponent />
                        </div>
                        <div className="increment">
                            <label>Step Increment</label>
                            <SelectComponent />
                        </div>
                    </div>

                    <div className="first-type-div">
                        <label>Place of Examination/Confernment</label>
                        <InputComponent />
                    </div>

                    <div  className ="second-type-div">
                        <div className="status">
                            <label>Status of Appointment</label>
                            <SelectComponent />
                        </div>
                        <div className="service">
                            <label>Government Service</label>
                            <SelectComponent />
                        </div>
                    </div>

                    <div className="first-type-div">
                        <label>Related Field of Work</label>
                        <InputComponent />
                    </div>
                </div>
            </ModalComponent>
        </React.Fragment>
    )
}

export default ThreeAddWorkExperienceModal;
