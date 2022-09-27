import React, { useState } from 'react'
import ButtonComponent from '../../common/button_component/button_component';
import PeriodModal from '../modal/period_modal';
import DevelopmentPlan from '../pages/development_plan';
import SubmissionTable from './submissionTable';

const Submissions = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <DevelopmentPlan/>
        <div style={{ margin: 40 }}>
          <PeriodModal onClose={() => setOpenModal(false)} isDisplay={openModal}/>
          <ButtonComponent 
            onClick={() => setOpenModal(true)} 
            buttonName="Open Modal" 
          />

          <SubmissionTable/>
        </div>
    </div>
    
  )
}
export default Submissions;