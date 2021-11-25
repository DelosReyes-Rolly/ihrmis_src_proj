// --------------------------------------------------------------------------------------
// DEVELOPER: SEAN TERRENCE A. CALZADA
// PAGE COMPONENT: LB-110
// COMPANY: DEPARTMENT OF SCIENCE AND TECHNOLOGY
// DATE: SEPTEMBER 1-2 2021
// --------------------------------------------------------------------------------------

import React, { useState } from 'react';
import ButtonComponent from '../../common/button_component/button_component.js.js';
import ModalComponent from '../../common/modal_component/modal_component';
import InputComponent from '../../common/input_component/input_component/input_component.js';
import SelectComponent from '../../common/input_component/select_component/select_component';
import TextAreaComponent from '../../common/input_component/textarea_input_component/textarea_input_component.js';
import {AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import TagsInputComponent from '../../common/input_component/tags_input_component/tags_input_component';
import { educationInputItem } from './static/input_items.js';
import { useToggleService } from '../../../services/toggle_service.js';

//Main Component
const LibraryView = () => {
    //STATES/HOOK
    const [showModal, setShowModal] = useToggleService(false); //SHOW MODAL HOOK
    const [arrayDataState, setArrayDataState] = useState([]); //ARRAY EDUC DATA HOOK
    const [intSelectState, setIntSelectState] =  useState(null); //EDUC DEGREE HOOK
    const [strCourseState, setStrCourseState] = useState(null); // INPUT EDUC DEGREE HOOK
    // const [stringInputState, setInputState] = useState([]); //INPUT ELIGIBILITY HOOK
    //METHODS
    const addArrayDataState = () => { // For adding new education data
        setArrayDataState([...arrayDataState, {
            intSelect: intSelectState,
            strCourse: strCourseState,
        }]);
        setStrCourseState("");
        setIntSelectState("DEFAULT");
    };

    const deleteArrayDataState = (e) => { // For Deleting education data
        setIntSelectState(arrayDataState.splice(e, 1));
    };
    
    return (
        <div style={{margin:"20px"}}>
            <h1>Library</h1>
            <br/>
            <ButtonComponent onClick={()=> setShowModal()} buttonName="Position"/>

            <div className="for-position-modal">
                <ModalComponent 
                    onClose={()=> setShowModal()} 
                    onCloseName="Delete"
                    onSubmitName="Save"
                    isDisplay={showModal}
                    title={"Position"}>
                    
                    {_displayTitleEligibilitySection()}<br/>
                    
                    {_displayEducationSection({ //METHOD'S PARAMETERS;
                        arrayDataState, intSelectState, strCourseState, // STATES
                        addArrayDataState, deleteArrayDataState, //METHOD ADD AND DELETE
                        setIntSelectState, setStrCourseState //METHOD FOR UPDATING STATE
                    })}<br/>
                    
                    {_displayExperienceSection()}<br/> 
                    
                    {_displayTrainingSection()}

                </ModalComponent>
            </div>

            <br/>
            <TagsInputComponent />
        </div>
    );
}

//Display First Section Title and Eligibility
function _displayTitleEligibilitySection() {
    return (
        <React.Fragment>
            <div className="position-modal-container-2">
                <label htmlFor="ip-title">Title</label>
                <InputComponent id="ip-title" maxLength={150}/>
            </div>
            <div className="position-modal-container-1">
                <div style={{width:"35% ", marginRight:"5px"}}>
                    <label htmlFor="ipm-short-name">Short Name</label>
                    <InputComponent id="ipm-short-name" maxLength={150}/>
                </div>
                <div style={{width:"25%", marginRight:"5px", marginLeft:"5px"}}>
                    <label htmlFor="ipm-salary-grade">Salary Grade</label>
                    <InputComponent maxLength="2" id="ipm-salary-grade" />
                </div>
                <div style={{width:"40%", marginLeft:"5px"}}>
                    <label htmlFor="ipm-category-level">Category Level</label>
                    <SelectComponent id="ipm-category-level"/>
                </div>
            </div>
            
            <br/>

            {/* ELIGIBILITY SECTION */}
            <div className="position-modal-container-2">
                <h3 style={{marginBottom:"10px"}}>ELIGIBILITY</h3>
                    <TagsInputComponent />
                <div style={{marginBottom:"5px"}}>
                    {/* <InputComponent id="ip-eligibility-text" maxLength={150}/> */}
                </div>
                <TextAreaComponent id="ip-eligibility-textarea" row={2} placeHolder="Specific details..."/>
            </div>
        </React.Fragment>
    );
}

//Display education Section
function _displayEducationSection({
    arrayDataState, intSelectState, strCourseState, 
    addArrayDataState, deleteArrayDataState, //METHOD ADD AND DELETE
    setIntSelectState, setStrCourseState
}) {
    return (
        <div className="position-modal-container-2">
            <h3 style={{marginBottom:"3px"}}>EDUCATION</h3>
            <hr style={{marginBottom:"10px"}}/>
            <div className="position-modal-container-1" style={{marginBottom:"5px"}}>
                <div>
                    {/* LABEL PART */}
                    <div className="position-modal-container-1" style={{marginTop:"0px"}}>
                        <div style={{width:"20% ", marginRight:"5px"}}>
                            <label htmlFor="ipm-education-level">Level</label>
                        </div>
                        <div style={{width:"84%", marginLeft:"5px", display:"flex", justifyContent: "flex-start"}}>
                            <label htmlFor="ipm-education-keyword">Course/Keywords</label>
                        </div>
                    </div>

                    {/* LIST PART */}
                    {(arrayDataState === null) ? null : _displayAddedItems(arrayDataState, deleteArrayDataState)}

                    {/* INPUT PART */}
                    <div className="position-modal-container-1" style={{marginTop:"0px"}} >
                        <div style={{width:"20% ", marginRight:"5px"}}>
                            <SelectComponent 
                                onChange={(event)=> setIntSelectState(event.target.value)}
                                value={intSelectState === null ? 'DEFAULT' : intSelectState}
                                id="ipm-education-level"
                                itemList={educationInputItem}
                                />
                        </div>
                        <div style={{width:"80% ", marginLeft:"5px"}}>
                            <InputComponent 
                                onChange={(event)=>{
                                    setStrCourseState(event.target.value);
                                }}
                                value={strCourseState === null ? "" : strCourseState}
                                id="ipm-education-keyword" 
                                maxLength={150}/>
                        </div>
                        <div style={{ display:"flex", alignItems: 'flex-end', justifyContent:'flex-end',marginLeft:"5px", marginBottom:"4px"}}>
                            <AiOutlinePlusCircle onClick={addArrayDataState} className="pmc-hover-over-icon-plus" size="23px" />
                        </div>
                    </div>
            
                </div>
            </div>
            <TextAreaComponent id="ipm-education-textarea" row={2} placeHolder="Specific details..."/>
        </div>
    );
}

//Display experience Section
function _displayExperienceSection(){
    return (
        <div className="position-modal-container-2">
            <h3 style={{marginBottom:"3px"}}>EXPERIENCE</h3>
            <hr style={{marginBottom:"10px"}}/>
            <div className="position-modal-container-1" style={{marginBottom:"5px"}}>
                <div style={{width:"20% ", marginRight:"5px"}}>
                    <label htmlFor="ipm-experience-years">Years</label>
                    <InputComponent id="ipm-experience-years" maxLength={150}/>
                </div>
                <div style={{width:"80% ", marginLeft:"5px"}}>
                    <label htmlFor="ipm-experience-keyword">Keywords</label>
                    <InputComponent id="ipm-experience-keyword" maxLength={150}/>
                </div>
            </div>
                        
            <TextAreaComponent id="ipm-experience-textarea" row={2} placeHolder="Specific details..."/>
        </div>
    );
}

//Display training Section
function _displayTrainingSection(){
    return(
        <div className="position-modal-container-2">
            <h3 style={{marginBottom:"3px"}}>TRAINING</h3>
            <hr style={{marginBottom:"10px"}}/>
            <div className="position-modal-container-1" style={{marginBottom:"5px"}}>
                <div style={{width:"20% ", marginRight:"5px"}}>
                    <label htmlFor="ipm-training-hours">Hours</label>
                    <InputComponent id="ipm-training-hours" maxLength={150}/>
                </div>
                <div style={{width:"80% ", marginLeft:"5px"}}>
                    <label htmlFor="ipm-training-keyword">Keywords</label>
                    <InputComponent id="ipm-training-keyword" maxLength={150}/>
                </div>
            </div>
            
            <TextAreaComponent id="ipm-training-textarea" row={2} placeHolder="Specific details..."/>
        </div>
    );
}

// Displaying added items in education section 
function _displayAddedItems(passItem, deleteLine) {
        
            return (
                passItem.map((item, index) => {
                 return <div className="position-modal-container-1" 
                    style={{marginTop:"0px"}} key={index}>
                    
                    <div style={{width:"20% ", marginRight:"5px"}}>
                        <SelectComponent 
                            value={item.intSelect}
                            readOnly={true}
                            itemList={educationInputItem}
                            id="ipm-education-level"/>
                    </div>
                    
                    <div style={{width:"80% ", marginLeft:"5px"}}>
                        <InputComponent 
                            readOnly={true}
                            value={item.strCourse} 
                            id="ipm-education-keyword" 
                            maxLength={150}/>
                    </div>
                                                    
                    <div style={{ display:"flex", alignItems: 'flex-end', justifyContent:'flex-end',marginLeft:"5px", marginBottom:"4px"}}>
                        <AiOutlineMinusCircle onClick={()=>deleteLine(index)} className="pmc-hover-over-icon-minus" size="23px" />
                    </div>
                </div>   
            
        }));
}


export default LibraryView;