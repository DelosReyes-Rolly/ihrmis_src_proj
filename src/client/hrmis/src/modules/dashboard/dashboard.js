import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import dostLogo from '../../assets/images/logo.png';
import ButtonComponent from '../../components/button_component/button_component.js';
import AddonInputComponents from '../../components/input_component/addon_input/Addon_input';
import CheckboxComponent from '../../components/input_component/checkbox_input_component/checkbox_input_component';
import InputComponent from '../../components/input_component/input_component/input_component';
import TextAreaComponent from '../../components/input_component/textarea_input_component/textarea_input_component';
import { rjcInputComponentData } from './components/rjc_input_component';
import './dashboard.css'
import { jvsCrwData } from './fake_data/jvs_crw_data';

function DashboardMainView(props){
    const [dataState, setDataState] = useState(jvsCrwData);
    return (
        <div style={{margin:"20px"}}><h1>Dashboard</h1></div>
        // <div className="dashboard-container">
        //     <div className="jvs-crw-container">
        //         <div className="form-header">
        //             <br/>
        //             <img src={dostLogo} width="50px" height="50px" alt="dost-logo"/>
        //             <h3>Department of Science and Technology</h3>
        //             <p>General Santos Avenue, Bicutan Taguig City</p> <br/><br/>
        //             <h2>JOB VACANCY SPECIFICATION & CRITERIA RATING FORM</h2>
        //         </div>
        //         <br/><br/><br/>
        //         <div className="version-dropdown">
        //             <span>Version</span>
        //             <span className="margin-left-1">
        //                 <select defaultValue={'DEFAULT'}  className="select-version">
        //                     <option value="DEFAULT" disabled>Select version</option>
        //                     <option value="1">1</option>
        //                     <option value="2">2</option>
        //                 </select>
        //             </span>
        //         </div>
        //         <br/>
               
        //         {/* TABLE DESIGN VIEW STARTS HERE  */}
        //         <div className="jvs-crw-main-table">
        //             <table  id="custom-table">
        //                 <thead>
        //                     {/* ====================================================================*/}
        //                     <tr className="main-headers">
        //                         <th style={{textAlign: 'center'}} colSpan="4">JOB POSITION</th>
        //                     </tr>
        //                     {/* FIRST HEADER  */}
        //                 </thead>
        //                 <tbody>
        //                     <tr className="secondary-headers">
        //                         <th className="row-percent-50" colSpan="2">POSITION TITLE</th>
        //                         <th className="row-percent-50" colSpan="2">PLANTILLA ITEM NO.</th>
        //                     </tr>
        //                     <tr>
        //                         <td className="row-percent-50" colSpan="2">{dataState.jobDescription.positionTitle}</td>
        //                         <td className="row-percent-50" colSpan="2">{dataState.jobDescription.platillaItemNo}</td>
        //                     </tr>
        //                     {/* SECOND HEADER  */}
        //                     <tr className="secondary-headers">
        //                         <th className="row-percent-50" colSpan="2">OFFICE/UNIT</th>
        //                         <th className="row-percent-50" colSpan="2">PLACE OF ASSIGNMENT</th>
        //                     </tr>
        //                     <tr>
        //                         <td className="row-percent-50" colSpan="2">{dataState.jobDescription.officeUnit}</td>
        //                         <td className="row-percent-50" colSpan="2">{dataState.jobDescription.placeOfAssignment}</td>
        //                     </tr>
        //                     {/* THIRD HEADER  */}
        //                     <tr className="secondary-headers">
        //                         <th className="row-percent-50" colSpan="2">REPORTS TO</th>
        //                         <th className="row-percent-50" colSpan="2">SALARY GRADE</th>
        //                     </tr>
        //                     <tr>
        //                         <td className="row-percent-50" colSpan="2">{dataState.jobDescription.reportsTo}</td>
        //                         <td className="row-percent-50" colSpan="2">{dataState.jobDescription.salaryGrade}</td>
        //                     </tr>
        //                 </tbody>
        //                 {/* ====================================================================*/}
        //                 {/* CSC QUALIFICATION STANDARDS STARTS HERE  */}
        //                 <tbody>
        //                     <tr className="main-headers">
        //                         <th style={{textAlign: 'center'}} colSpan="4">CSC QUALIFICATION STANDARDS</th>
        //                     </tr>
        //                     {/* FIRST HEADER  */}
        //                     <tr className="secondary-headers">
        //                         <th colSpan="4">ELIGIBILITY</th>
        //                     </tr>
        //                     <tr>
        //                         <td colSpan="4">{dataState.cscQStandatard.eligibility}</td>
        //                     </tr>
        //                     {/* SECOND HEADER  */}
        //                     <tr className="row-percent-75x secondary-headers">
        //                         <th colSpan="3">EDUCATION</th>
        //                         <td className="special-row-column row-percent-25" colSpan="1" rowSpan="2">
        //                             <AddonInputComponents label="Min. Factor Weight" addonSign={"%"}/>
        //                         </td>
        //                     </tr>
        //                     <tr>
        //                         <td colSpan="3">{dataState.cscQStandatard.education}</td>
        //                     </tr>
        //                     {/* THIRD HEADER  */}
        //                     <tr className="secondary-headers">
        //                         <th colSpan="3">EXPERIENCE</th>
        //                         <td className="special-row-column" colSpan="1" rowSpan="2">
        //                             <AddonInputComponents label="Min. Factor Weight" addonSign={"%"}/>
        //                         </td>
        //                     </tr>
        //                     <tr>
        //                         <td colSpan="3">{dataState.cscQStandatard.experience}</td>   
        //                     </tr> 
        //                     {/* FOURTH HEADER  */}
        //                     <tr className="secondary-headers">
        //                         <th colSpan="3">TRAINING</th>
        //                         <td className="special-row-column" colSpan="1" rowSpan="2">
        //                             <AddonInputComponents label="Min. Factor Weight" addonSign={"%"}/>
        //                         </td>
        //                     </tr>
        //                     <tr>
        //                         <td colSpan="3">{dataState.cscQStandatard.training}</td>   
        //                     </tr>
        //                 </tbody>
        //             </table>
        //         </div>

        //         <br/>
        //         <div className="jvs-crw-main-table">
        //             <div className="mqsfjc-div">
        //                 <div className="margin-right-1" style={{width: '75%'}}>
        //                 <h3 style={{color: "#4276A4", fontSize:'12px', marginBottom:'6px'}}>MINIMUM QUALIFICATION STANDARDS FOR JOB COMPETENCY</h3>
        //                     <TextAreaComponent />
        //                 </div>
        //                 <div style={{width: '25%'}}>
        //                     <AddonInputComponents label="Min. Factor Weight" addonSign={"%"}/>
        //                 </div>
        //             </div>
        //             <br/><br/>

        //             {/*REQUIRED JOB COMPETENCY */}
        //             <h3 style={{color: "#4276A4", fontSize:'14px', marginBottom:'6px'}}>REQUIRED JOB COMPETENCY 
        //                     <span style={{fontSize:'12px', fontWeight: 'normal'}}> (Please check all that apply)</span>
        //             </h3>
        //             <div className="mqsfjc-div" style={{marginBottom:'6px'}}>
        //                 <div className="margin-right-1 checkbox-mqsfjc" style={{width: '25%'}}>
        //                     <CheckboxComponent className="margin-right-1"/><label>Written Exam</label>
        //                 </div>
        //                 <div style={{width: '75%'}}>
        //                     <InputComponent />
        //                 </div>
        //             </div>
        //             <br/>
        //                 {/* LAST TABLE DISPLAY WITH BUTTON */}
        //                 <table id="custom-table">
        //                     <tbody>
        //                         <tr className="secondary-headers">
        //                             <th className="row-percent-75" colSpan="2" style={{textAlign: "center"}}>CALIBRATED SCALE OF FACTOR WEIGHT</th>
        //                             <th className="row-percent-25" colSpan="2" style={{textAlign: "center"}}>PERCENTAGE (%)</th>
        //                         </tr>
        //                         <tr className="">
        //                             <td className="row-percent-75" colSpan="2">91-100</td>
        //                             <td className="row-percent-25" colSpan="2" style={{textAlign: "center"}}>20</td>
        //                         </tr>
        //                         <tr className="">
        //                             <td className="row-percent-75" colSpan="2">81-90</td>
        //                             <td className="row-percent-25" colSpan="2" style={{textAlign: "center"}}>15</td>
        //                         </tr>
        //                         <tr className="secondary-headers">
        //                             <th className="row-percent-75" colSpan="2" style={{textAlign: "end"}}>MAXIMUM FACTOR WEIGHT</th>
        //                             <th className="row-percent-25" colSpan="2" style={{textAlign: "center"}}>20</th>
        //                         </tr>
        //                     </tbody>
        //                 </table>
        //                 <br/>
        //                 <ButtonComponent buttonName={'ADD'} buttonLogo={<MdAdd size="18"/>}/>
        //             <br/><br/>
        //             {/* LAST FORM PARTS */}
        //             {rjcInputComponentData.map(item => {
        //                 return (
        //                     <div className="mqsfjc-div" style={{marginBottom: "6px"}} key={item.id}>
        //                         <div className="margin-right-1 checkbox-mqsfjc" style={{width: '25%'}}>
        //                             <CheckboxComponent className="margin-right-1"/><label>{item.cbDataType}</label>
        //                         </div>
        //                         <div style={{width: '75%'}}>
        //                             <InputComponent placeholder="Specify..."/>
        //                         </div>
        //                     </div>);
        //             })}

        //             <br/><br/>

        //             <div style={{textAlign: "center"}}>
        //                 <ButtonComponent bgColor="#2A9DF4" buttonName={'Save'}/>
        //             </div>
                    
        //         </div>
        //     </div>
        // </div>
    );
}

export default DashboardMainView