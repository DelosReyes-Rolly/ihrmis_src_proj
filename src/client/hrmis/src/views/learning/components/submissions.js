import React, { useState } from 'react'
// import ButtonComponent from '../../common/button_component/button_component';
import DropdownViewComponent from '../../common/dropdown_menu_custom_component/Dropdown_view';
import PeriodModal from '../modal/period_modal';
import DevelopmentPlan from '../pages/development_plan';
import SubmissionTable from './submissionTable';

const Submissions = () => {
  const [openPeriodModal, setOpenPeriodModal] = useState(false);
  return (
    <div>
      <DevelopmentPlan/>
        <div style={{ margin: 40 }}>
          <select className="button-dropdown" style={{borderBottomRightRadius: "0px", borderTopRightRadius: "0px"}}>
            <option value="2021-2023">2021-2023</option>
            <option value="2018-2020">2018-2020</option>
            <option value="2015-2017">2015-2017</option>
          </select>
          <PeriodModal onClose={() => setOpenPeriodModal(false)} isDisplay={openPeriodModal}/>
          <button className="buttonPlus" onClick={() => setOpenPeriodModal(true)} >+</button>
          <select className="button-dropdown">
            <option value="" hidden>Status</option>
            <option value="0">All</option>
            <option value="1">In Preparation</option>
            <option value="2">For Revision</option>
            <option value="3">Recommendation</option>
            <option value="4">For Review</option>
            <option value="5">For Approval</option>
            <option value="6">Approved</option>
            <option value="7">Compiled/Received</option>
          </select>
          <SubmissionTable/>
        </div>
    </div>
    
  )
}
export default Submissions;