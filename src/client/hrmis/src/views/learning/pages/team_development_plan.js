import React, { useState } from 'react'
import BreadcrumbConfig, {
  crumbThirdLevel,
} from "../../../router/breadcrumb_config";
import { RiPrinterFill} from 'react-icons/ri';
import { IoDocumentsSharp, IoArrowUndoSharp } from 'react-icons/io5'; 
import { GiTrashCan } from 'react-icons/gi'; 
import { AiFillCheckCircle } from 'react-icons/ai'; 
import TeamDevelopmentPlanTable from '../components/team_development_plan_table';

const TeamDevelopmentPlan = () => {
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
          <span className="logos" style={{marginTop: -30}}><a href="#" target="_blank" rel="noreferrer"><AiFillCheckCircle style={iconStyles}/></a></span>
          <span className="logos" style={{marginTop: -30}}><a href="#" target="_blank" rel="noreferrer"><IoArrowUndoSharp style={iconStyles}/></a></span>
          <span className="logos" style={{marginTop: -30}}><a href="#" target="_blank" rel="noreferrer"><GiTrashCan style={iconStyles}/></a></span>
          <span className="logos" style={{marginTop: -30}}><a href="#" target="_blank" rel="noreferrer"><IoDocumentsSharp style={iconStyles}/></a></span>
          <span className="logos" style={{marginTop: -30}}><a href="#" target="_blank" rel="noreferrer"><RiPrinterFill style={iconStyles}/></a></span>
        </div>   
        <div style={{textAlign: 'right', paddingBottom: '12px',  marginLeft: 40, marginRight: 40, paddingTop: 10}}>
          2021-2023 : For Revision    
        </div>
        <select className="button-dropdown">
          <option value="" hidden>Development Activity</option>
          <option value="0">All</option>
        </select> 
        <TeamDevelopmentPlanTable/>
      </div>
    </div>
  )
}

export default TeamDevelopmentPlan;