import React, { useState } from 'react'
import BreadcrumbConfig, {crumbThirdLevel} from "../../../router/breadcrumb_config";
import { RiPrinterFill} from 'react-icons/ri';
import { IoDocumentsSharp, IoArrowUndoSharp } from 'react-icons/io5'; 
import { GiTrashCan } from 'react-icons/gi'; 
import { AiFillCheckCircle } from 'react-icons/ai'; 
import PeriodModal from '../modal/period_modal';
import IndividualDevelopmentPlanLowerTable from '../components/individual_development_plan_lower_table';
import IndividualDevelopmentPlanUpperTable from '../components/individual_development_plan_upper_table';
import SignatureModal from '../modal/signature_modal';
import ActivityModal from '../modal/activity';

const IndividualDevelopmentPlan = () => {
    const [openSignatureModal, setOpenSignatureModal] = useState(false);
    const { getThirdLevel } = crumbThirdLevel();
    const [username] = useState(window.sessionStorage.getItem("user"));
    const [openPeriodModal, setOpenPeriodModal] = useState(false);
    const [openActivityModal, setOpenActivityModal] = useState(false);
    let iconStyles = { fontSize: "2em", color: "#084c84"};
    return (
        <div>
        <BreadcrumbConfig array={getThirdLevel(4)} />
        <div style={{ marginLeft: 40, marginRight: 40, marginTop: 40, marginBottom: 12 }}>
            <div className='grey-line'>
                <div className='choices'>
                    Individual Developement Plan
                </div>
                <SignatureModal onClose={() => setOpenSignatureModal(false)} isDisplay={openSignatureModal}/>
                <button className="logos" onClick={() => setOpenSignatureModal(true)} style={{cursor:'pointer', marginTop: -30}}><AiFillCheckCircle style={iconStyles}/></button>
                <span className="logos" style={{marginTop: -30}}><a href="#"><IoArrowUndoSharp style={iconStyles}/></a></span>
                <span className="logos" style={{marginTop: -30}}><a href="#"><GiTrashCan style={iconStyles}/></a></span>
                <span className="logos" style={{marginTop: -30}}><a href="#"><IoDocumentsSharp style={iconStyles}/></a></span>
                <span className="logos" style={{marginTop: -30}}><a href="#"><RiPrinterFill style={iconStyles}/></a></span>
            </div>   
            <div style={{textAlign: 'right', paddingBottom: '12px',  marginLeft: 40, marginRight: 40, paddingTop: 10}}>
            For Revision    
            </div>
            <select className="button-dropdown" style={{borderBottomRightRadius: "0px", borderTopRightRadius: "0px"}}>
                <option value="2021-2023">2021-2023</option>
                <option value="2018-2020">2018-2020</option>
                <option value="2015-2017">2015-2017</option>
            </select>
            <PeriodModal onClose={() => setOpenPeriodModal(false)} isDisplay={openPeriodModal}/>
            <button className="buttonPlus" onClick={() => setOpenPeriodModal(true)} >+</button>
            <ActivityModal onClose={() => setOpenActivityModal(false)} isDisplay={openActivityModal}/>
            <button className="buttonActivity" onClick={() => setOpenActivityModal(true)} >+ Activity</button>
            <IndividualDevelopmentPlanUpperTable/>
            <IndividualDevelopmentPlanLowerTable/>
        </div>
        </div>
    )
}

export default IndividualDevelopmentPlan;