import React, { useEffect, useState } from "react";
import ModalComponent from "../../common/modal_component/modal_component";
import InputComponent from "../../common/input_component/input_component/input_component";
import Select from "react-select";
import { RadioComponent } from "../../common/input_component/checkbox_input_component/checkbox_input_component";

const MoSuccesIndicator = ({isDisplay, onClose}) => {
    
    return (
        <React.Fragment>
            <ModalComponent
                title = "Success Indicator"
                isDisplay = {isDisplay}
                onClose = {onClose}
                onSubmitType = "submit"
                //onSubmit form handler here (bac
                >
                <div>
                    Placement
                    
                    <label className = "form-radio-item">
                    <RadioComponent name="radio"/>
                    After
                    </label>
                    <label className ="form-radio-item">
                    <RadioComponent  name="radio"/>
                    Before
                    </label>
                    <br/>
                    
                    <div>
                    <div className="scroll-div">  
                        <div>Success Indicator 1</div>
                        <div>Success Indicator 2</div>
                        <div>Success Indicator 3</div>
                        <div>Success Indicator 4</div>
                        <div>Success Indicator 5</div>
                        <div>Success Indicator 6</div>
                        <div>Success Indicator 7</div>
                        <div>Success Indicator 8</div>
                        <div>Success Indicator 9</div>
                    </div>
                    </div>

                    <div className="success-indicator">
                        <div>
                        MEASURES
                        </div>
                        <div>
                        TARGET
                        </div>
                    </div>

                    <div className="eff-qual-time" style={{'flex-direction':'column'}}>
                        <div className="eff-qual-time">
                            <div style={{'flex':'20px'}}>
                                    Efficiency
                            </div>
                                <InputComponent style={{'margin':'5px', 'flex-basis': '400px'}}/>
                                <InputComponent style={{'margin':'5px', 'flex-basis': '400px'}}/>
                            
                        </div>


                        <div className="eff-qual-time">
                            <div style={{'flex':'20px'}}>
                                Quality
                            </div>
                                <InputComponent style={{'margin':'5px', 'flex-basis': '400px'}}/>
                                <InputComponent style={{'margin':'5px', 'flex-basis': '400px'}}/>
                        </div>

                        <div className="eff-qual-time">
                            <div style={{'flex':'20px'}}>
                                Timeliness
                            </div>
                                <InputComponent style={{'margin':'5px', 'flex-basis': '400px'}}/>
                                <InputComponent style={{'margin':'5px', 'flex-basis': '400px'}}/>                  
                        </div> 
                    </div>


                    <div className="eff-qual-time">
                        <div style={{'margin':'auto'}}>
                            Success Indicator
                        </div>
                            <InputComponent style={{'margin-left': '10px', 'height': '50px'}}/>
                    </div>
                    <br/>
                    STANDARDS FOR EFFICIENCY

                    <div className="success-indicator" style={{'justify-content':'center', 'margin-left':'25px',}} >
                        <div style={{'flex':'100px'}}>
                        Description
                        </div>
                        <div>
                        Measured Values
                        </div>
                        
                        <div className = "form-radio-item" style={{'flex-basis':'15px'}}>
                            <RadioComponent name="radio1"/>
                            Date
                            <RadioComponent  name="radio1"/>
                            Number
                        </div>

                    </div>

                    <div className="eff-qual-time">
                        <div style={{'margin':'auto', 'flex':'30px'}}>
                            5
                        </div>
                
                            <InputComponent style={{'margin-left': '10px'}}/>
                            <InputComponent style={{'margin-left': '10px', 'flex-basis': '200px'}}/>
                            <InputComponent style={{'margin-left': '10px', 'flex-basis': '200px'}}/>
                        
                    </div>

                    <div className="eff-qual-time">
                        <div style={{'margin':'auto', 'flex':'30px'}}>
                            4
                        </div>
                
                            <InputComponent style={{'margin-left': '10px'}}/>
                            <InputComponent style={{'margin-left': '10px', 'flex-basis': '200px'}}/>
                            <InputComponent style={{'margin-left': '10px', 'flex-basis': '200px'}}/>
                        
                    </div>

                    <div className="eff-qual-time">
                        <div style={{'margin':'auto', 'flex':'30px'}}>
                            3
                        </div>
                
                            <InputComponent style={{'margin-left': '10px'}}/>
                            <InputComponent style={{'margin-left': '10px', 'flex-basis': '200px'}}/>
                            <InputComponent style={{'margin-left': '10px', 'flex-basis': '200px'}}/>
                    </div>

                </div>
            </ModalComponent>
        </React.Fragment>
    )
}

export default MoSuccesIndicator;