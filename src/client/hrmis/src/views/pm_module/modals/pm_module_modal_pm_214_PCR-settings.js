import React, { useEffect, useState } from "react";
import CollapsibleComponent from "../../common/collapsible_component/collapsible_component";
import CheckboxComponent from "../../common/input_component/checkbox_input_component/checkbox_input_component";
import ModalComponent from "../../common/modal_component/modal_component";
import {HiInformationCircle} from "react-icons/hi"
import ReactTooltip from "react-tooltip";

const PcrSetting = ({isDisplay, onClose}) => {

    return (
        <React.Fragment>
            <ModalComponent
                title = "PCR Settings"
                isDisplay = {isDisplay}
                onClose = {onClose}
                onSubmitType = "submit"
                //onSubmit form handler here (backend)
                >
                    <div className="modal-container">
                        <div className="modals-row">
                        <CollapsibleComponent title="DOST CO GOALS">
                            <label id="coGoals" className="brbottom">
                                <CheckboxComponent/> 1. Dynamic People <HiInformationCircle data-tip data-for="dostCoOneTip"/>
                                <ReactTooltip id="dostCoOneTip" place="right" effect="solid">Recruit and retain highly competent and engaged human resources.</ReactTooltip>
                            </label>
                            <br/>
                            <label id="coGoals" className="brbottom">
                                <CheckboxComponent/> 2. Enabling Organizational Culture <HiInformationCircle/>
                            </label>
                            <br/>
                            <label id="coGoals" className="brbottom">
                                <CheckboxComponent/> 3. Empowering Leadership <HiInformationCircle/>
                            </label>
                            <br/>
                            <label id="coGoals" className="brbottom">
                                <CheckboxComponent/> 4. Collaborative STI Governance <HiInformationCircle/>
                            </label>
                            <br/>
                            <label id="coGoals" className="brbottom">
                                <CheckboxComponent/> 5. Seamless Operational Mechanisms <HiInformationCircle/>
                            </label>
                            <br/>
                            <label id="coGoals" className="brbottom">
                                <CheckboxComponent/> 6. Excellent STI Services <HiInformationCircle/>
                            </label>
                        </CollapsibleComponent>
                    </div>
                    
                    </div>
                    
                    <CollapsibleComponent title="DOST CO STRATEGIC INITIATIVES">
                        1. Development of Science, Technology and Innovation (STI) Policies, plans and programs
                        <label className="brbottom" style={{"margin-top":"10px"}}>
                            &emsp;<CheckboxComponent/> Planning and Evaluation for STI-based Development <HiInformationCircle/>
                        </label>
                        <br/>
                        <label className="brbottom">
                            &emsp;<CheckboxComponent/> DOST Portfolio Management System (R&D, Regional Operations, & STI Services)<HiInformationCircle/>
                        </label>
                    </CollapsibleComponent>
                    
            </ModalComponent>
        </React.Fragment>
    )
}

export default PcrSetting;