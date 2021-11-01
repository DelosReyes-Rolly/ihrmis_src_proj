import React from 'react'
import InputComponent from '../../../../../../common/input_component/input_component/input_component';
import ModalComponent from '../../../../../../common/modal_component/modal_component';
import TextAreaComponent from '../../../../../../common/input_component/textarea_input_component/textarea_input_component';

const ThreeAddVoluntrayWorkModal = (props) => {
    return (
        <React.Fragment>
            <ModalComponent
                title="Voluntary Work"
                onSubmitName="Save"
                onCloseName="Delete" 
                isDisplay={props.isDisplay}
                // onSubmit={ submitHandler }
                onSubmitType="submit"
                onClose={props.onClose}
            >
                <div className="add-volwork-modal-container">
                    
                    <div className="first-type-div">
                        <label>Name of Organization (write in full)</label>
                        <InputComponent />
                    </div>

                    <div className="first-type-div">
                        <label>Address</label>
                        <TextAreaComponent />
                    </div>

                    <div className="first-type-div">
                        <label><strong>INCLUSIVE DATES</strong></label>
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
                        <div className="position">
                            <label>Position/Nature of Work</label>
                            <InputComponent />
                        </div>
                        <div className="hours">
                            <label>Number of Hours</label>
                            <InputComponent />
                        </div>
                    </div>
                </div>
            </ModalComponent>

        </React.Fragment>
    )
}

export default ThreeAddVoluntrayWorkModal;
