import CheckboxComponent from '../../../../common/input_component/checkbox_input_component/checkbox_input_component';
import InputComponent from '../../../../common/input_component/input_component/input_component';
import React, { useState} from 'react';
import dostLogo from './../../../../../assets/images/logo.png';
import { rjcInputItem } from '../../static/input_items';
import { jvsCrwRelevantData, jvsCrwTableData } from '../../fake_data/table_data';
import WeightingTable from './parts/weight_table';

const JvsCrwPageComponentView = (props) =>{
    const [dataState, _] = useState(jvsCrwTableData);
    return (
        
            <div className="jvs-crw-container">
                <div className="form-header">
                    <br/>
                    <img src={dostLogo} width="50px" height="50px" alt="dost-logo"/>
                    <h3>Department of Science and Technology</h3>
                    <p>General Santos Avenue, Bicutan Taguig City</p> <br/><br/>
                    <h2>JOB VACANCY SPECIFICATION & CRITERIA RATING FORM</h2>
                </div>
                <br/><br/><br/>
                <div className="version-dropdown">
                    <span>Version</span>
                    <span className="margin-left-1">
                        <select defaultValue={'DEFAULT'}  className="select-version">
                            <option value="DEFAULT" disabled>Select version</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </span>
                </div>
                <br/>
               
                {/* TABLE DESIGN VIEW STARTS HERE  */}
                <div className="jvs-crw-main-table">
                    <table  id="custom-table">
                        <thead>
                            {/* ====================================================================*/}
                            <tr className="main-headers">
                                <th style={{textAlign: 'center'}} colSpan="4">JOB POSITION</th>
                            </tr>
                            {/* FIRST HEADER  */}
                        </thead>
                        <tbody>
                            <tr className="secondary-headers">
                                <th className="row-percent-50" colSpan="2">POSITION TITLE</th>
                                <th className="row-percent-50" colSpan="2">PLANTILLA ITEM NO.</th>
                            </tr>
                            <tr>
                                <td className="row-percent-50" colSpan="2">{dataState.jobDescription.positionTitle}</td>
                                <td className="row-percent-50" colSpan="2">{dataState.jobDescription.platillaItemNo}</td>
                            </tr>
                            {/* SECOND HEADER  */}
                            <tr className="secondary-headers">
                                <th className="row-percent-50" colSpan="2">OFFICE/UNIT</th>
                                <th className="row-percent-50" colSpan="2">PLACE OF ASSIGNMENT</th>
                            </tr>
                            <tr>
                                <td className="row-percent-50" colSpan="2">{dataState.jobDescription.officeUnit}</td>
                                <td className="row-percent-50" colSpan="2">{dataState.jobDescription.placeOfAssignment}</td>
                            </tr>
                            {/* THIRD HEADER  */}
                            <tr className="secondary-headers">
                                <th className="row-percent-50" colSpan="2">REPORTS TO</th>
                                <th className="row-percent-50" colSpan="2">SALARY GRADE</th>
                            </tr>
                            <tr>
                                <td className="row-percent-50" colSpan="2">{dataState.jobDescription.reportsTo}</td>
                                <td className="row-percent-50" colSpan="2">{dataState.jobDescription.salaryGrade}</td>
                            </tr>
                        </tbody>
                        {/* ====================================================================*/}
                        {/* CSC QUALIFICATION STANDARDS STARTS HERE  */}
                        <tbody>
                            <tr className="main-headers">
                                <th style={{textAlign: 'center'}} colSpan="4">CSC QUALIFICATION STANDARDS</th>
                            </tr>
                            {/* FIRST HEADER  */}
                            <tr className="secondary-headers">
                                <th colSpan="4">ELIGIBILITY</th>
                            </tr>
                            <tr>
                                <td colSpan="4">{dataState.cscQStandatard.eligibility}</td>
                            </tr>
                            {/* SECOND HEADER  */}
                            <tr className="row-percent-75x secondary-headers">
                                <th colSpan="3">EDUCATION</th>
                            </tr>
                            <tr>
                                <td colSpan="3">{dataState.cscQStandatard.education}</td>
                            </tr>
                            {/* THIRD HEADER  */}
                            <tr className="secondary-headers">
                                <th colSpan="3">EXPERIENCE</th>
                            </tr>
                            <tr>
                                <td colSpan="3">{dataState.cscQStandatard.experience}</td>   
                            </tr> 
                            {/* FOURTH HEADER  */}
                            <tr className="secondary-headers">
                                <th colSpan="3">TRAINING</th>
                            </tr>
                            <tr>
                                <td colSpan="3">{dataState.cscQStandatard.training}</td>   
                            </tr>
                        </tbody>
                    </table>
                </div>

                <br/>

                <WeightingTable 
                    title="EDUCATION"
                    min={jvsCrwRelevantData.education.min}
                    max={jvsCrwRelevantData.education.max}
                    data={jvsCrwRelevantData.education.data}/>

                <br/>

                <WeightingTable title="RELEVANT TRAINING"
                    min={jvsCrwRelevantData.relTraining.min}
                    max={jvsCrwRelevantData.relTraining.max}
                    data={jvsCrwRelevantData.relTraining.data}/>

                <br/>

                <WeightingTable title="RELEVANT EXPERIENCE"
                    min={jvsCrwRelevantData.relExperience.min}
                    max={jvsCrwRelevantData.relExperience.max}
                    data={jvsCrwRelevantData.relExperience.data}/>
                <br/>


                {/*REQUIRED JOB COMPETENCY */}
                <h3 style={{color: "#4276A4", fontSize:'14px', marginBottom:'6px'}}>REQUIRED JOB COMPETENCY 
                            <span style={{fontSize:'12px', fontWeight: 'normal'}}> (Please check all that apply)</span>
                    </h3>
                    <div className="mqsfjc-div" style={{marginBottom:'6px'}}>
                        <div className="margin-right-1 checkbox-mqsfjc" style={{width: '25%'}}>
                            <CheckboxComponent className="margin-right-1"/><label>Written Exam</label>
                        </div>
                        <div style={{width: '75%'}}>
                            <InputComponent />
                        </div>
                    </div>
                    <br/>
                        <WeightingTable 
                        min={jvsCrwRelevantData.relExperience.min}
                        max={jvsCrwRelevantData.relExperience.max}
                        data={jvsCrwRelevantData.relExperience.data}/>
                    <br/>
                    {/* LAST FORM PARTS */}
                    {rjcInputItem.map(item => {
                        return (
                            <div className="mqsfjc-div" style={{marginBottom: "6px"}} key={item.id}>
                                <div className="margin-right-1 checkbox-mqsfjc" style={{width: '25%'}}>
                                    <CheckboxComponent className="margin-right-1"/><label>{item.cbDataType}</label>
                                </div>
                                <div style={{width: '75%'}}>
                                    <InputComponent placeholder="Specify..."/>
                                </div>
                            </div>);
                    })}
                    <br/><br/>
            </div>
    
    );
}

export default JvsCrwPageComponentView;
