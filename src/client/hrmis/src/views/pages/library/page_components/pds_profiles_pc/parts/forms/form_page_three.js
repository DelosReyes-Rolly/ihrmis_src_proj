import React, { useEffect, useState } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import ButtonComponent from './../../../../../../common/button_component/button_component.js';
import { MdAdd } from 'react-icons/md';
import { useToggleService } from '../../../../../../../services/toggle_service';
import ThreeAddEducationModal from '../add_modals/three_add_educ';
import ThreeAddCivilServiceModal from '../add_modals/three_add_csc';
import ThreeAddWorkExperienceModal from '../add_modals/three_add_workexp';
import ThreeAddVoluntrayWorkModal from '../add_modals/three_add_voluntary';
import ThreeAddInterventionModal from '../add_modals/three_add_intervention';
import axios from 'axios';
import { API_HOST } from '../../../../../../../helpers/global/global_config';
import { useParams } from 'react-router';
import { formThreeInput } from '../../../../static/input_items';
import { useDispatch } from 'react-redux';
import { setBusy } from '../../../../../../../features/reducers/loading_slice';
import { useDelayService } from '../../../../../../../services/delay_service.js';


const FormPageThree = (props) => {
    
    return (
        <React.Fragment>
            <br/><br/>
            <div className="pds-profile-main-view">
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
    // ===========================================
    // CUSTOM HOOK SERVICE
    // ===========================================
    const [failed, succeed] = useDelayService();
    let [showData, setShowData] = useToggleService(false);
    
    let [ render ,setRender ] = useToggleService(); // For rendering whenever recieve an update
    let [ toogleAddModal, setToogleAddModal ] = useToggleService(false); // toogle for popping up modals
    let [ toogleUpdateModal, setToogleUpdateModal ] = useToggleService(false); // toogle for popping up modals
    
    const [educationRecord, setEducationRecord] = useState([]);
    const [state, setstate] = useState(null);
    
    const { item } = useParams();

    const getEducationRecord = async () => {

        await axios.get(API_HOST + `/new-education/${item}`).then((response) => {
            // console.log(response.data.data);
            setEducationRecord(response.data.data)
        }).catch(error => {
            console.log(error);
        })
    }

    const dispatch = useDispatch();

    const removeEducationRecord = async (record) => {
        dispatch(setBusy(true));
        await axios.delete(API_HOST + `/new-education/${record}`).then(response => {
            console.log(response);
            succeed();
        });
        setRender();
        dispatch(setBusy(false));
    }

    useEffect(() => {
        getEducationRecord();
    }, [toogleAddModal, render, toogleUpdateModal])
    
    return (
        <React.Fragment>
            
            <ThreeAddEducationModal 
                isDisplay={ toogleAddModal } 
                onClose={ () => {
                    setToogleAddModal(!toogleAddModal)
                } }
            />

            <ThreeAddEducationModal 
                isDisplay={ toogleUpdateModal } 
                onPressed ={ () => {
                    removeEducationRecord(state.item);
                    setToogleUpdateModal(!toogleUpdateModal);
                } }
                onClose={ () => {
                    setToogleUpdateModal(!toogleUpdateModal);
                } }
                data = { state }
            />
            
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
                        <React.Fragment>
                            {educationRecord.map((item, key)=> {
                                return (
                                    <React.Fragment key={key} >
                                        <tbody>
                                            
                                            <tr className="tr-education-record" onClick={ () => {   setstate(item); setToogleUpdateModal(!toogleUpdateModal);   }}>
                                                <td colSpan="5" style={{textAlign:"center"}}>
                                                    {item.school}
                                                </td>
                                                <td colSpan="4" style={{textAlign:"center"}}>
                                                    { formThreeInput.add_educ_level[item.level].title }
                                                </td>
                                                <td colSpan="1" style={{textAlign:"center"}}>
                                                    {item.from}
                                                </td>
                                                <td colSpan="1" style={{textAlign:"center"}}>
                                                    {item.to}
                                                </td>
                                                <td colSpan="1" style={{textAlign:"center"}}>
                                                    {item.unit_earned}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </React.Fragment>
                                );
                            })}
                            
                        </React.Fragment>
                    }
                </table>
            </div>
            <div style={{marginTop:'10px'}}>
                <ButtonComponent buttonLogoStart={<MdAdd size="14px"/>} buttonName="Add Record" onClick={()=>{setToogleAddModal(!toogleAddModal)}}/>
            </div>

        </React.Fragment>
    );
}

const TableTwo = () => {
    let [showData, setShowData] = useToggleService(false);
    let [toogleAddData, setToogleAddData] = useToggleService(false);

    return (
        <React.Fragment>
            <ThreeAddCivilServiceModal 
                isDisplay={ toogleAddData } 
                onClose={ () => setToogleAddData(!toogleAddData) }
            />
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
                <ButtonComponent buttonLogoStart={<MdAdd size="14px"/>} buttonName="Add Record" onClick={ () => { setToogleAddData(!toogleAddData)}}/>
            </div>
            

            
        </React.Fragment>
    );
}

const TableThree = () => {
    let [showData, setShowData] = useToggleService(false);
    let [toogleAddData, setToogleAddData] = useToggleService(false);
    return (
        <React.Fragment>
            <ThreeAddWorkExperienceModal 
                isDisplay={ toogleAddData } 
                onClose={ () => setToogleAddData(!toogleAddData) }
            />
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
                                Department / Agency / Office / Company
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
                <ButtonComponent buttonLogoStart={<MdAdd size="14px"/>} buttonName="Add Record" onClick={ ()=>{setToogleAddData(!toogleAddData)}}/>
            </div>

            
        </React.Fragment>
    );
}

const TableFour = () => {
    let [showData, setShowData] = useToggleService(false);
    let [toogleAddData, setToogleAddData] = useToggleService(false);

    return (
        <React.Fragment>

            <ThreeAddVoluntrayWorkModal 
                isDisplay={ toogleAddData } 
                onClose={ () => setToogleAddData(!toogleAddData) }
            />

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
                <ButtonComponent buttonLogoStart={<MdAdd size="14px"/>} buttonName="Add Record" onClick={ ()=>setToogleAddData(!toogleAddData) }/>
            </div>

            
        </React.Fragment>
    );
}

const TableFive = () => {
    let [showData, setShowData] = useToggleService(false);
    let [toogleAddData, setToogleAddData] = useToggleService(false);

    return (
        <React.Fragment>
            <ThreeAddInterventionModal 
                isDisplay={ toogleAddData } 
                onClose={ () => setToogleAddData(!toogleAddData) }
            />
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
                <ButtonComponent buttonLogoStart={<MdAdd size="14px"/>} buttonName="Add Record" onClick={ ()=>{setToogleAddData(!toogleAddData)} }/>
            </div>

            
        </React.Fragment>
    );
}

export default FormPageThree;