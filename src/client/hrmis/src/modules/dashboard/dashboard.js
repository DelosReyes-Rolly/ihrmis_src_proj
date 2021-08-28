import React, { useState, useEffect } from 'react';
import dostLogo from '../../assets/images/logo.png';
import AddonInputComponents from '../../components/input_component/addon_input/Addon_input';
import './dashboard.css'
import { jvsCrwData } from './fake_data/jvs_crw_data';

function DashboardMainView(props){
    const [dataState, setDataState] = useState(jvsCrwData);
    return (
        <div className="dashboard-container">
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
                        <select className="select-version">
                            <option value="" disabled>Select version</option>
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
                            <td className="special-row-column row-percent-25" colSpan="1" rowSpan="2">
                                <AddonInputComponents label="Min. Factor Weight" addonSign={"%"}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">{dataState.cscQStandatard.education}</td>
                        </tr>
                        {/* THIRD HEADER  */}
                        <tr className="secondary-headers">
                            <th colSpan="3">EXPERIENCE</th>
                            <td className="special-row-column" colSpan="1" rowSpan="2">
                                <AddonInputComponents label="Min. Factor Weight" addonSign={"%"}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">{dataState.cscQStandatard.experience}</td>   
                        </tr> 
                        {/* FOURTH HEADER  */}
                        <tr className="secondary-headers">
                            <th colSpan="3">TRAINING</th>
                            <td className="special-row-column" colSpan="1" rowSpan="2">
                                <AddonInputComponents label="Min. Factor Weight" addonSign={"%"}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">{dataState.cscQStandatard.training}</td>   
                        </tr>

                    </table>
                </div>

                <br/>
                <div className="jvs-crw-main-table">
                    <h3 style={{color: "#4276A4", fontSize:'14px'}}>MINIMUM QUALIFICATION STANDARDS FOR JOB COMPETENCY</h3>
                    <table id="custom-table">
                        <tbody>
                            <tr>
                                <td className="row-percent-75" colSpan="3">Hello World</td>
                                <td className="row-percent-25" colSpan="1">Hi World</td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>
    );
}

export default DashboardMainView