import React from 'react'
import { useState } from "react";
import { NavLink } from "react-router-dom";
import BreadcrumbConfig, {
  crumbThirdLevel,
} from "../../../router/breadcrumb_config";
import { RiPrinterFill, RiEditBoxFill } from 'react-icons/ri';
import { IoIosMail } from 'react-icons/io'; 
import RemarksModal from '../modal/remarks_modal';
import ButtonComponent from '../../common/button_component/button_component';

const DevelopmentPlan = () => {
  const [openRemarksModal, setOpenRemarksModal] = useState(false);
  const { getThirdLevel } = crumbThirdLevel();
  const [username] = useState(window.sessionStorage.getItem("user"));
  let iconStyles = { fontSize: "2em", color: "#084c84"};
  return (
    <div>
      <BreadcrumbConfig array={getThirdLevel(4)} />
      <div style={{ marginLeft: 40, marginRight: 40, marginTop: 40, marginBottom: 12 }}>
        <div className='grey-line'>
          <NavLink to="/learning/development/submissions" className='choices' style={({ isActive }) => ({ 
            color: isActive ? '#084c84' : 'grey', borderBottom: isActive ? '4px solid #084c84' : '',
            paddingBottom: isActive ? '16px' : ''})}>
            <span><a className='hover'>Submissions</a></span>
          </NavLink> 
          <NavLink to="/learning/development/consolidated" className='choices' style={({ isActive }) => ({ 
            color: isActive ? '#084c84' : 'grey', borderBottom: isActive ? '4px solid #084c84' : '',
            paddingBottom: isActive ? '16px' : ''}) }>
            <span><a className='hover'>Consolidated</a></span>
          </NavLink> 
          <RemarksModal onClose={() => setOpenRemarksModal(false)} isDisplay={openRemarksModal}/>
          <button className="logos" style={{marginTop:-20}} onClick={() => setOpenRemarksModal(true)}><RiEditBoxFill style={iconStyles}/></button>
          <span className="logos" style={{marginTop:-20}}><a href="#"><IoIosMail style={iconStyles}/></a></span>
          <span className="logos" style={{marginTop:-20}}><a href="#"><RiPrinterFill style={iconStyles}/></a></span>
        </div>       
      </div>
    </div>
  )
}

export default DevelopmentPlan;