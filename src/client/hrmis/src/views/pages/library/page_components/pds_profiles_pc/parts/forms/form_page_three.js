import React from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { educationalBackgroundData } from '../../../../fake_data/table_data';
import ButtonComponent from './../../../../../../common/button_component/button_component.js';
import { MdAdd } from 'react-icons/md';
import { useToggleService } from '../../../../../../../services/toggle_service';

const FormPageThree = (props) => {
    return (
        <React.Fragment>
            <div>
                <TableOne />
                <br/><br/>
                <TableTwo />
                <br/><br/>
                <TableThree />
                <br/><br/>
                <TableFour />
                <br/><br/>
                <TableFive />
            </div>
            <br/><br/>
        </React.Fragment>
    );
}

const TableOne = () => {
    let [showData, setShowData] = useToggleService(false);
    return (
        <React.Fragment>
            <div className="scrollable-div-table" >
                <table id="custom-table">
                    <thead>
                        <tr className="fixed-label-table main-headers">
                            <th colSpan="12">

                                <span style={{float:"left"}}>III. EDUCATIONAL BACKGROUND</span>
                                <span style={{float:"right"}} onClick={()=>setShowData()}> { showData ? <AiOutlineArrowUp size="18px"/>: <AiOutlineArrowDown size="18px"/>}</span>
                            
                            </th>
                        </tr>
                        <tr className="fixed-label-table secondary-headers tr-header">
                            <th colSpan="5" rowSpan="2" style={{textAlign:"center", width:"40%"}}>
                                Name of School
                            </th>
                            <th colSpan="4" rowSpan="2" style={{textAlign:"center", width:"30%"}}>
                                Level of Education/Basic Education/Degree/Course
                            </th>
                            <th colSpan="2" rowSpan="1" style={{textAlign:"center", width:"20%"}}>
                                Period of Attendance
                            </th >
                            <th colSpan="1" rowSpan="2" style={{textAlign:"center", width:"10%"}}>
                                Units Earned
                            </th>
                        </tr> 
                        <tr className="fixed-label-table secondary-headers tr-header">
                            <th colSpan="1" rowSpan="1" style={{textAlign:"center", width:"10%"}}>
                                From
                            </th>
                            <th colSpan="1" rowSpan="1" style={{textAlign:"center", width:"10%"}}>
                                To
                            </th>
                        </tr>
                    </thead>
                    {showData && 
                        <tbody>
                            {educationalBackgroundData.map((item, key)=> {
                                return (
                                    <tr key={key}>
                                        <td colSpan="5" style={{textAlign:"center"}}>
                                            {item.school}
                                        </td>
                                        <td colSpan="4" style={{textAlign:"center"}}>
                                            {item.level}
                                        </td>
                                        <td colSpan="1" style={{textAlign:"center"}}>
                                            {item.year.from}
                                        </td>
                                        <td colSpan="1" style={{textAlign:"center"}}>
                                            {item.year.to}
                                        </td>
                                        <td colSpan="1" style={{textAlign:"center"}}>
                                            {item.unitEarned}
                                        </td>
                                    </tr>
                                );
                            })}
                            
                        </tbody>
                    }
                </table>
            </div>
            <div style={{marginTop:'10px'}}>
                <ButtonComponent buttonLogoStart={<MdAdd size="14px"/>} buttonName="ADD"/>
            </div>

            
        </React.Fragment>
    );
}

const TableTwo = () => {
    let [showData, setShowData] = useToggleService(false);
    return (
        <React.Fragment>
            <div className="scrollable-div-table" >
                <table id="custom-table">
                    <thead>
                        <tr className="fixed-label-table main-headers">
                            <th colSpan="12">

                                <span style={{float:"left"}}>IV. CIVIL SERVICE ELIGIBILITY</span>
                                <span style={{float:"right"}} onClick={()=>setShowData()}> { showData ? <AiOutlineArrowUp size="18px"/>: <AiOutlineArrowDown size="18px"/>}</span>
                            
                            </th>
                        </tr>
                        <tr className="fixed-label-table secondary-headers tr-header">
                            <th colSpan="4" rowSpan="2" style={{textAlign:"center", width:"30%"}}>
                                Civil Service Eligibility
                            </th>
                            <th colSpan="1" rowSpan="2" style={{textAlign:"center", width:"10%"}}>
                                Rating
                            </th>
                            <th colSpan="4" rowSpan="2" style={{textAlign:"center", width:"30%"}}>
                                Place of Examination
                            </th >
                            <th colSpan="1" rowSpan="2" style={{textAlign:"center", width:"10%"}}>
                                Date
                            </th>
                            <th colSpan="2" rowSpan="1" style={{textAlign:"center", width:"20%"}}>
                                License
                            </th>
                        </tr> 
                        <tr className="fixed-label-table secondary-headers tr-header">
                            <th colSpan="1" rowSpan="1" style={{textAlign:"center", width:"10%"}}>
                                Number
                            </th>
                            <th colSpan="1" rowSpan="1" style={{textAlign:"center", width:"10%"}}>
                                Validity
                            </th>
                        </tr>
                    </thead>
                    {showData && 
                        <tbody>
                            {/* {educationalBackgroundData.map((item, key)=> {
                                return (
                                    <tr key={key}>
                                        <td colSpan="4" style={{textAlign:"center"}}>
                                            {item.school}
                                        </td>
                                        <td colSpan="1" style={{textAlign:"center"}}>
                                            {item.school}
                                        </td>
                                        <td colSpan="4" style={{textAlign:"center"}}>
                                            {item.level}
                                        </td>
                                        <td colSpan="1" style={{textAlign:"center"}}>
                                            {item.year.from}
                                        </td>
                                        <td colSpan="1" style={{textAlign:"center"}}>
                                            {item.year.to}
                                        </td>
                                        <td colSpan="1" style={{textAlign:"center"}}>
                                            {item.unitEarned}
                                        </td>
                                    </tr>
                                );
                            })} */}
                            
                        </tbody>
                    }
                </table>
            </div>
            <div style={{marginTop:'10px'}}>
                <ButtonComponent buttonLogoStart={<MdAdd size="14px"/>} buttonName="ADD"/>
            </div>
            

            
        </React.Fragment>
    );
}

const TableThree = () => {
    let [showData, setShowData] = useToggleService(false);
    return (
        <React.Fragment>
            <div className="scrollable-div-table" >
                <table id="custom-table">
                    <thead>
                        <tr className="fixed-label-table main-headers">
                            <th colSpan="12">

                                <span style={{float:"left"}}>III. WORK EXPERIENCE</span>
                                <span style={{float:"right"}} onClick={()=>setShowData()}> { showData ? <AiOutlineArrowUp size="18px"/>: <AiOutlineArrowDown size="18px"/>}</span>
                            
                            </th>
                        </tr>
                        <tr className="fixed-label-table secondary-headers tr-header">
                            <th colSpan="1" rowSpan="1" style={{textAlign:"center", width:"10%"}}>
                                Inclusive Dates
                            </th>
                            <th colSpan="3" rowSpan="1" style={{textAlign:"center", width:"25%"}}>
                                Position Title
                            </th>
                            <th colSpan="3" rowSpan="1" style={{textAlign:"center", width:"25%"}}>
                                Department/Agency/Office/Company
                            </th >
                            <th colSpan="2" rowSpan="1" style={{textAlign:"center", width:"15%"}}>
                                Monthly Salary / SG & Increment
                            </th>
                            <th colSpan="2" rowSpan="1" style={{textAlign:"center", width:"15%"}}>
                                Status of Appointment
                            </th>
                            <th colSpan="1" rowSpan="1" style={{textAlign:"center", width:"10%"}}>
                                Government Service
                            </th>

                        </tr> 
                    </thead>
                    {showData && 
                        <tbody>
                            {/* {educationalBackgroundData.map((item, key)=> {
                                return (
                                    <tr key={key}>
                                        <td colSpan="1" style={{textAlign:"center"}}>
                                            {item.school}
                                        </td>
                                        <td colSpan="3" style={{textAlign:"center"}}>
                                            {item.school}
                                        </td>
                                        <td colSpan="3" style={{textAlign:"center"}}>
                                            {item.school}
                                        </td>
                                        <td colSpan="2" style={{textAlign:"center"}}>
                                            {item.level}
                                        </td>
                                        <td colSpan="2" style={{textAlign:"center"}}>
                                            {item.year.from}
                                        </td>
                                        <td colSpan="1" style={{textAlign:"center"}}>
                                            {item.year.to}
                                        </td>
                                    </tr>
                                );
                            })} */}
                            
                        </tbody>
                    }
                </table>
            </div>
            <div style={{marginTop:'10px'}}>
                <ButtonComponent buttonLogoStart={<MdAdd size="14px"/>} buttonName="ADD"/>
            </div>

            
        </React.Fragment>
    );
}

const TableFour = () => {
    let [showData, setShowData] = useToggleService(false);
    return (
        <React.Fragment>
            <div className="scrollable-div-table" >
                <table id="custom-table">
                    <thead>
                        <tr className="fixed-label-table main-headers">
                            <th colSpan="12">

                                <span style={{float:"left"}}>III. VOLUNTARY WORK OR INVOLVEMENT IN CIVIC/NON-GOVERNMENT/PEOPLE/VOLUNTARY ORGANIZATION</span>
                                <span style={{float:"right"}} onClick={()=>setShowData()}> { showData ? <AiOutlineArrowUp size="18px"/>: <AiOutlineArrowDown size="18px"/>}</span>
                            
                            </th>
                        </tr>
                        <tr className="fixed-label-table secondary-headers tr-header">
                            <th colSpan="5" rowSpan="2" style={{textAlign:"center", width:"30%"}}>
                                Name & Address of Organization
                            </th>
                            <th colSpan="4" rowSpan="1" style={{textAlign:"center", width:"20%"}}>
                                Inclusive Dates
                            </th>
                            <th colSpan="1" rowSpan="2" style={{textAlign:"center", width:"20%"}}>
                                Number of Hours
                            </th >
                            <th colSpan="2" rowSpan="2" style={{textAlign:"center", width:"30%"}}>
                                Position / Nature of Work
                            </th>
                        </tr> 
                        <tr className="fixed-label-table secondary-headers tr-header">
                            <th colSpan="2" rowSpan="1" style={{textAlign:"center", width:"10%"}}>
                                From
                            </th>
                            <th colSpan="2" rowSpan="1" style={{textAlign:"center", width:"10%"}}>
                                To
                            </th>
                        </tr>
                    </thead>
                    {showData && 
                        <tbody>
                            {/* {educationalBackgroundData.map((item, key)=> {
                                return (
                                    <tr key={key}>
                                        <td colSpan="5" style={{textAlign:"center"}}>
                                            {item.school}
                                        </td>
                                        <td colSpan="2" style={{textAlign:"center"}}>
                                            {item.level}
                                        </td>
                                        <td colSpan="2" style={{textAlign:"center"}}>
                                            {item.year.from}
                                        </td>
                                        <td colSpan="1" style={{textAlign:"center"}}>
                                            {item.year.to}
                                        </td>
                                        <td colSpan="2" style={{textAlign:"center"}}>
                                            {item.unitEarned}
                                        </td>
                                    </tr>
                                );
                            })} */}
                            
                        </tbody>
                    }
                </table>
            </div>
            <div style={{marginTop:'10px'}}>
                <ButtonComponent buttonLogoStart={<MdAdd size="14px"/>} buttonName="ADD"/>
            </div>

            
        </React.Fragment>
    );
}

const TableFive = () => {
    let [showData, setShowData] = useToggleService(false);
    return (
        <React.Fragment>
            <div className="scrollable-div-table" >
                <table id="custom-table">
                    <thead>
                        <tr className="fixed-label-table main-headers">
                            <th colSpan="12">

                                <span style={{float:"left"}}>VII. LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING PROGRAMS ATTENDED</span>
                                <span style={{float:"right"}} onClick={()=>setShowData()}> { showData ? <AiOutlineArrowUp size="18px"/>: <AiOutlineArrowDown size="18px"/>}</span>
                            
                            </th>
                        </tr>
                        <tr className="fixed-label-table secondary-headers tr-header">
                            <th colSpan="4" rowSpan="2" style={{textAlign:"center", width:"30%"}}>
                                Tittle
                            </th>
                            <th colSpan="2" rowSpan="1" style={{textAlign:"center", width:"20%"}}>
                                Inclusive Dates
                            </th>
                            <th colSpan="1" rowSpan="2" style={{textAlign:"center", width:"10%"}}>
                                Number of Hours
                            </th >
                            <th colSpan="2" rowSpan="2" style={{textAlign:"center", width:"10%"}}>
                                Type of L&D
                            </th>
                            <th colSpan="4" rowSpan="2" style={{textAlign:"center", width:"30%"}}>
                                Conducted/ Sponsored By
                            </th>
                        </tr> 
                        <tr className="fixed-label-table secondary-headers tr-header">
                            <th colSpan="1" rowSpan="1" style={{textAlign:"center", width:"10%"}}>
                                From
                            </th>
                            <th colSpan="1" rowSpan="1" style={{textAlign:"center", width:"10%"}}>
                                To
                            </th>
                        </tr>
                    </thead>
                    {showData && 
                        <tbody>
                            {/* {educationalBackgroundData.map((item, key)=> {
                                return (
                                    <tr key={key}>
                                        <td colSpan="4" style={{textAlign:"center"}}>
                                            {item.school}
                                        </td>
                                        <td colSpan="1" style={{textAlign:"center"}}>
                                            {item.level}
                                        </td>
                                        <td colSpan="1" style={{textAlign:"center"}}>
                                            {item.year.from}
                                        </td>
                                        <td colSpan="1" style={{textAlign:"center"}}>
                                            {item.year.to}
                                        </td>
                                        <td colSpan="1" style={{textAlign:"center"}}>
                                            {item.year.to}
                                        </td>
                                        <td colSpan="4" style={{textAlign:"center"}}>
                                            {item.unitEarned}
                                        </td>
                                    </tr>
                                );
                            })} */}
                            
                        </tbody>
                    }
                </table>
            </div>
            <div style={{marginTop:'10px'}}>
                <ButtonComponent buttonLogoStart={<MdAdd size="14px"/>} buttonName="ADD"/>
            </div>

            
        </React.Fragment>
    );
}

export default FormPageThree;