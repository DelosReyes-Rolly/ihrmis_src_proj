import React, { useState } from 'react'
import BreadcrumbConfig, {
  crumbThirdLevel,
} from "../../../router/breadcrumb_config";
import { RiPrinterFill} from 'react-icons/ri';
import { IoDocumentsSharp, IoArrowUndoSharp } from 'react-icons/io5'; 
import { GiTrashCan } from 'react-icons/gi'; 
import { AiFillCheckCircle } from 'react-icons/ai'; 
import TeamDevelopmentPlanTable from '../components/team_development_plan_table';
import PeriodModal from '../modal/period_modal';

const TeamDevelopment = () => {
  const [openPeriodModal, setOpenPeriodModal] = useState(false);
  const { getThirdLevel } = crumbThirdLevel();
  const [username] = useState(window.sessionStorage.getItem("user"));
  let iconStyles = { fontSize: "2em", color: "#084c84"};
  return (
    <div>
      <BreadcrumbConfig array={getThirdLevel(4)} />
      <div style={{ marginLeft: 40, marginRight: 40, marginTop: 40, marginBottom: 12 }}>
        <div className='grey-line'>
          <div className='choices'>
            Team Developement Plan
          </div>
          <span className="logos" style={{marginTop: -30}}><a href="#"><AiFillCheckCircle style={iconStyles}/></a></span>
          <span className="logos" style={{marginTop: -30}}><a href="#"><IoArrowUndoSharp style={iconStyles}/></a></span>
          <span className="logos" style={{marginTop: -30}}><a href="#"><GiTrashCan style={iconStyles}/></a></span>
          <span className="logos" style={{marginTop: -30}}><a href="#"><IoDocumentsSharp style={iconStyles}/></a></span>
          <span className="logos" style={{marginTop: -30}}><a href="#"><RiPrinterFill style={iconStyles}/></a></span>
        </div>   
        <div style={{textAlign: 'right', paddingBottom: '12px',  marginLeft: 40, marginRight: 40, paddingTop: 10}}>
          2021-2023 : For Revisions   
        </div>
        <select className="button-dropdown" style={{borderBottomRightRadius: '0px', borderTopRightRadius: '0px'}}>
          <option value="2021-2023">2021-2023</option>
          <option value="2018-2020">2018-2020</option>
          <option value="2015-2017">2015-2017</option>
        </select>
        <PeriodModal onClose={() => setOpenPeriodModal(false)} isDisplay={openPeriodModal}/>
        <button className="buttonPlus" onClick={() => setOpenPeriodModal(true)} >+</button>
        <select className="button-dropdown">
          <option value="" hidden>Development Activity</option>
          <option value="0">All</option>
        </select> 
        <TeamDevelopmentPlanTable/>
      </div>
    </div>
  )
}

export default TeamDevelopment;