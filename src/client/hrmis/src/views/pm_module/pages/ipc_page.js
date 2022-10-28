import axios from 'axios';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonComponent from '../../common/button_component/button_component'
import MfoTable from '../modals/pm_module_modal';
import MajorFinalOutput from '../modals/pm_module_modal_mfo';
import Project_Activity from '../modals/pm_module_project';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';


const IpcrPage = () => {
  
  const [modal, setModal] = useState(false);
  const [Major_Final_Output, setMajor_Final_Output] = useState(false);
  const [Proj_Act, setProj_Act] = useState(false);
  return(
    <div style={{margin: "20px 20px"}}>
      <MfoTable isDisplay={modal} onClose={() => setModal(false)} />
      <div >
        <ButtonComponent buttonName="MFO Table" onClick={() => setModal(true)}/>
      </div>
      <br />
      <div>
        <MajorFinalOutput isDisplay={Major_Final_Output} onClose = {()=>setMajor_Final_Output(false)}/>
        <ButtonComponent buttonName="Major Final Output" onClick={() => setMajor_Final_Output(true)}/>
      </div>
      <br/>
      <div>
        <Project_Activity isDisplay={Proj_Act} onClose = {()=>setProj_Act(false)}/>
        <ButtonComponent buttonName="Project/Activity" onClick={()=>setProj_Act(true)}/>
      </div>
      
    </div>
  );

}

export default IpcrPage

