import React from 'react'
import ModalComponent from '../../../../../../common/modal_component/modal_component';
import InputComponent from '../../../../../../common/input_component/input_component/input_component'
import SelectComponent from '../../../../../../common/input_component/select_component/select_component'

const ThreeAddEducationModal = (props) => {
    return (
        <React.Fragment>
            <ModalComponent
                title="Educational Background"
                onSubmitName="Save"
                onCloseName="Delete" 
                isDisplay={props.isDisplay}
                // onSubmit={ submitHandler }
                onSubmitType="submit"
                onClose={props.onClose}
            >
                <div className="add-educ-modal-container">
                    <div className="first-level-div">
                        <label>Level</label>
                        <SelectComponent />
                    </div>
                    <div className="first-level-div">
                        <label>Name of School (write in full)</label>
                        <InputComponent />
                    </div>
                    <div className="first-level-div">
                        <label>Basic Education/Degree/Course</label>
                        <InputComponent />
                    </div>

                    <div className="first-level-div">
                        <div className="second-level-div">
                            <label><strong>PERIOD OF ATTENDANCE</strong></label>
                        </div>

                        <div className="year-from-to">
                            <div className="from">
                                <label>From</label>
                                <InputComponent />
                            </div>
                            <div className="to">
                                <label>To</label>
                                <InputComponent />
                            </div>
                        </div>
                        <div  className ="year-graduated">
                            <div className="yearend">
                                <label>Year Graduated</label>
                                <InputComponent />
                            </div>
                            <div className="highest">
                                <label>Highest Level/Units Earned (If not graduated)</label>
                                <InputComponent />
                            </div>
                        </div>
                        <div className="second-level-div">
                            <label>Scholarship / Academic Honors Recieved</label>
                            <InputComponent />
                        </div>
                    </div>
                    
                </div>
            </ModalComponent>
        </React.Fragment>
    )
}

export default ThreeAddEducationModal;
