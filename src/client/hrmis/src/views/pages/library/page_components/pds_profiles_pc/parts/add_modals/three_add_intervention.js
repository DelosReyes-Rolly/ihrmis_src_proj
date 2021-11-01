import React from 'react'
import InputComponent from '../../../../../../common/input_component/input_component/input_component';
import SelectComponent from '../../../../../../common/input_component/select_component/select_component';
import TextAreaComponent from '../../../../../../common/input_component/textarea_input_component/textarea_input_component';
import ModalComponent from '../../../../../../common/modal_component/modal_component';

const ThreeAddInterventionModal = (props) => {
    return (
        <React.Fragment>
            <ModalComponent
                title="Learning and Development Interventions"
                onSubmitName="Save"
                onCloseName="Delete" 
                isDisplay={props.isDisplay}
                // onSubmit={ submitHandler }
                onSubmitType="submit"
                onClose={props.onClose}
            >
                <div className="add-intervention-modal-container">
                    
                    <div className="first-type-div">
                        <label>Title of Learning and DEvelopment Interventions/Training Programs (write in full)</label>
                        <InputComponent />
                    </div>

                    <div className="first-type-div">
                        <label><strong>INCLUSIVE DATES OF ATTENDANCE</strong></label>
                    </div>

                    <div className="second-type-div">
                        <div className="from">
                            <label>From</label>
                            <InputComponent type="date"/>
                        </div>
                        <div className="to">
                            <label>To</label>
                            <InputComponent type="date"/>
                        </div>
                    </div>

                    <div  className ="second-type-div">
                        <div className="type">
                            <label>Type of Learning and Development</label>
                            <SelectComponent />
                        </div>
                        <div className="hours">
                            <label>Number of Hours</label>
                            <InputComponent />
                        </div>
                    </div>

                    <div className="first-type-div">
                        <label>Conducted/Sponsored bY (write in full)</label>
                        <TextAreaComponent />
                    </div>

                    <div className="first-type-div">
                        <label>Competency Addressed</label>
                        <InputComponent />
                    </div>

                    
                </div>
            </ModalComponent>
        </React.Fragment>
    )
}

export default ThreeAddInterventionModal;
