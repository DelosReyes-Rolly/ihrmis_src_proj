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
import DropdownViewComponent from '../../common/dropdown_menu_custom_component/Dropdown_view';

const IndividualDevelopmentPlan = () => {
    const [openSignatureModal, setOpenSignatureModal] = useState(false);
    const { getThirdLevel } = crumbThirdLevel();
    const [username] = useState(window.sessionStorage.getItem("user"));
    const [openPeriodModal, setOpenPeriodModal] = useState(false);
    const [openActivityModal, setOpenActivityModal] = useState(false);
    const YEAR_DROPDOWN = [                        
        {id: '1', label: '2021-2023'},
        {id: '2', label: '2018-2020'},
        {id: '3', label: '2015-2017'}
    ]
    const [value,setValue] = useState(0);
    let iconStyles = { fontSize: "2em", color: "#084c84"};
    return (
        <div>
            <BreadcrumbConfig array={getThirdLevel(4)} />
            <div style={{ marginLeft: 40, marginRight: 40, marginTop: 40, marginBottom: 12 }}>
                <div className='grey-line'>
                    <span className='choices'>
                        Individual Developement Plan
                    </span>
                    <SignatureModal onClose={() => setOpenSignatureModal(false)} isDisplay={openSignatureModal}/>
                    <button className="logos" onClick={() => setOpenSignatureModal(true)}><AiFillCheckCircle style={iconStyles}/></button>
                    <span className="logos"><a href="#"><IoArrowUndoSharp style={iconStyles}/></a></span>
                    <span className="logos"><a href="#"><GiTrashCan style={iconStyles}/></a></span>
                    <span className="logos"><a href="#"><IoDocumentsSharp style={iconStyles}/></a></span>
                    <span className="logos"><a href="#"><RiPrinterFill style={iconStyles}/></a></span>
                </div>   
                <div style={{textAlign: 'right', paddingBottom: '12px',  marginLeft: 40, marginRight: 40, paddingTop: 10}}>
                    For Revision    
                </div>
                <select className="button-dropdown" style={{borderBottomRightRadius: "0px", borderTopRightRadius: "0px"}}>
                    <option value="2021-2023">2021-2023</option>
                    <option value="2018-2020">2018-2020</option>
                    <option value="2015-2017">2015-2017</option>
                </select>
                {/* <DropdownViewComponent
                    title={"year"}
                    itemList={YEAR_DROPDOWN}
                    style={{borderBottomRightRadius: "0px", borderTopRightRadius: "0px"}}
                    className="button-dropdown" 
                    setValue={setValue}/> */}
                <PeriodModal onClose={() => setOpenPeriodModal(false)} isDisplay={openPeriodModal}/>
                <button className="buttonPlus" onClick={() => setOpenPeriodModal(true)} >+</button>
                <ActivityModal onClose={() => setOpenActivityModal(false)} isDisplay={openActivityModal}/>
                <button className="buttonActivity" onClick={() => setOpenActivityModal(true)} >+ Activity</button>
                <IndividualDevelopmentPlanUpperTable/><br/>
                <IndividualDevelopmentPlanLowerTable/>
            </div>
        </div>
    )
}

export default IndividualDevelopmentPlan;