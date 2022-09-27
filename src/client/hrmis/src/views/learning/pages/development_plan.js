import React from 'react'
import { useState } from "react";
import { NavLink } from "react-router-dom";
import BreadcrumbConfig, {
  crumbThirdLevel,
} from "../../../router/breadcrumb_config";
import { RiPrinterFill, RiEditBoxFill } from 'react-icons/ri';
import { IoIosMail } from 'react-icons/io'; 

const DevelopmentPlan = () => {
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
          <span className="logos"><a href="#" target="_blank" rel="noreferrer"><RiEditBoxFill style={iconStyles}/></a></span>
          <span className="logos"><a href="#" target="_blank" rel="noreferrer"><IoIosMail style={iconStyles}/></a></span>
          <span className="logos"><a href="#" target="_blank" rel="noreferrer"><RiPrinterFill style={iconStyles}/></a></span>
        </div>       
      </div>
    </div>
  )
}

export default DevelopmentPlan;