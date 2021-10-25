import TextAreaComponent from '../../../../../../common/input_component/textarea_input_component/textarea_input_component'
import dostLogo from '../../../../../../../assets/images/logo.png'
import { jvsCrwRelevantData, jvsCrwTableData } from '../../../../fake_data/table_data'
import WeightingTable from '../weight_table'
import React, { useState } from 'react';
import CheckJobCompetency from '../check_job_competency';
import { RiPenNibFill } from 'react-icons/ri';
import ButtonComponent from '../../../../../../common/button_component/button_component.js';
import RemarksForm from '../remarks_form';

const JvsFormOne = () => {
    const [dataState, _] = useState(jvsCrwTableData);
    const [checkState, setCheckState] = useState(

    );
    return ( 
        <React.Fragment>
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
                 <h3 style={{color: "#4276A4", fontSize:'14px', marginBottom:'6px'}}>REQUIRED JOB COMPETENCY</h3>
                    <div style={{ marginBottom:"5px" }}>
                        <TextAreaComponent row="2"/>
                    </div>
                    
                    <span style={{color: "#4276A4", fontSize:'12px', fontWeight: 'normal'}}> (Please check all that apply)</span>


                    <CheckJobCompetency title="Written Exam"/>
                    <CheckJobCompetency title="Oral Exam"/>
                    <CheckJobCompetency title="Creative Work"/>
                    <CheckJobCompetency title="Analytical Skills"/>
                    <CheckJobCompetency title="Computation Skills"/>
                    <CheckJobCompetency title="Others"/>
                    <br/><br/>
                    <div className='scoring-div' >
                        <div>
                            <h6 style={{color: "#4276A4", fontSize:'14px', marginBottom:'6px'}}>Total Minimum Factor Weight (%):
                                <span>
                                    <strong>22</strong>
                                </span>
                            </h6>
                        </div>
                        <div>
                            <h6 style={{color: "#4276A4", fontSize:'14px', marginBottom:'6px'}}>Total Maximum Factor Weight (%):
                                <span>
                                    <strong>38</strong>
                                </span>
                            </h6> 
                            
                        </div>       
                    </div>
                    <div className='scoring-div'>
                        <div>
                            <h6 style={{}}>TOTAL OVERALL FACTOR WEIGHT (%): 
                                <span>
                                    <strong>38</strong>
                                </span>
                            </h6>
                        </div>
                    </div>                    
            <br/><br/>
            <table id="custom-table">
                <thead>
                    <tr className='main-headers'>
                        <th style={{ textAlign:"center" }}>DUTIES AND RESPONSIBILITIES</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div style = {{ margin:'10px 40px 10px 40px' }}>
                                1. Administer programs, projects and activities of the division in pursuit of the objectives and goals of the Department.<br/>
                                2. Exercise final authority with regard to commitment and execution of plans, programs, projects or activities of division.<br/>
                                3. Control Work Operations through the establishment of objectives, policies, rules, practice, methods and standards realating to the functions and taskjs of division.<br/>
                                4. Coordinate and cooperatie with other organizational units within the Department; and<br/>
                                5. Perform other related tasks as maybe assigned.<br/>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style={{ marginTop:"10px", display:'flex', justifyContent:"right"}}>
                <ButtonComponent buttonLogoStart={<RiPenNibFill size="14"/>} buttonName="Update"/>
            </div>
            
            <br/><br/>
            <RemarksForm />
            <br/><br/>
        </React.Fragment>
     );
}
 
export default JvsFormOne;