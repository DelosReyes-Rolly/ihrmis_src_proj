import axios from 'axios';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonComponent from '../../common/button_component/button_component'
import MfoTable from '../modals/pm_module_modal';
import MajorFinalOutput from '../modals/pm_module_modal_mfo';
import Project_Activity from '../modals/pm_module_project';
import PerfMet212 from '../modals/pm_module_modal_pm_212';
import MoSuccesIndicator from '../modals/pm_module_modal_succ_indi';
import CasSuccIndi from '../modals/pm_module_modal_cas_succ_indi';
import Pm212Mfo from '../modals/pm_module_pm_212_mfo';
import 'react-datepicker/dist/react-datepicker.css';
import Pm213SIT from '../modals/pm_module_modal_pm_213_succ_indi_targ';
import Pm213SIA from '../modals/pm_module_pm_213_succ_indi_acco';
import PcrSetting from '../modals/pm_module_modal_pm_214_PCR-settings';


const IpcrPage = () => {
  
  const [modal, setModal] = useState(false);
  const [Major_Final_Output, setMajor_Final_Output] = useState(false);
  const [Proj_Act, setProj_Act] = useState(false);
  const [Pm212, setPm212] = useState(false);
  const [SuccIndi, setSuccIndi] = useState(false);
  const [CSuccIndi, setCSuccIndi] = useState(false);
  const [Pm212Maj_fin_out, setPm212Maj_fin_out] = useState(false);
  const [Pm213SITarget, setPm213SITarget] = useState(false);
  const [Pm213SIAcco, setPm213SIAcco] = useState(false);
  const [PcrSettings, setPcrSettings] = useState(false);

  return(
    <div style={{margin: "20px 20px"}}>
      
      <h2>MO-130</h2>
      <div className='modal-container'>
      <div className='modals-row'>
        <MfoTable isDisplay={modal} onClose={() => setModal(false)} />
        <ButtonComponent buttonName="MFO Table" onClick={() => setModal(true)}/>
      </div> 
      <div className='modals-row'>
        <MajorFinalOutput isDisplay={Major_Final_Output} onClose = {()=>setMajor_Final_Output(false)}/>
        <ButtonComponent buttonName="Major Final Output" onClick={() => setMajor_Final_Output(true)}/>
      </div>
      <div className='modals-row'>
        <Project_Activity isDisplay={Proj_Act} onClose = {()=>setProj_Act(false)}/>
        <ButtonComponent buttonName="Project/Activity" onClick={()=>setProj_Act(true)}/>
      </div>
      </div>

      <h2>MO-131</h2>
      <div className='modal-container'>
      <div className='modals-row'>
        <MoSuccesIndicator isDisplay={SuccIndi} onClose ={()=>setSuccIndi(false)}/>
        <ButtonComponent buttonName="Success Indicator" onClick={()=>setSuccIndi(true)}/>
      </div>
      <div className='modals-row'>
        <CasSuccIndi isDisplay = {CSuccIndi} onClose = {()=>setCSuccIndi(false)}/>
        <ButtonComponent buttonName="Cascaded Success Indicator" onClick={()=>setCSuccIndi(true)}/>
      </div>
      </div>

      <h2>PM-212</h2>
      <div className='modals-container'>
        <div className='modals-row'>
          <PerfMet212 isDisplay={Pm212} onClose = {()=>setPm212(false)}/>
          <ButtonComponent buttonName="PCR" onClick = {()=>setPm212(true)}/>
        </div>
        <div className='modals-row'>
          <Pm212Mfo isDisplay = {Pm212Maj_fin_out} onClose = {()=>setPm212Maj_fin_out(false)}/>
          <ButtonComponent buttonName="Major Final Output" onClick = {()=>setPm212Maj_fin_out(true)}/>
        </div>
      </div>

      <h2>PM-213</h2>
      <div className='modals-container'>
        <div className='modals-row'>
          <Pm213SIT isDisplay={Pm213SITarget} onClose={()=>setPm213SITarget(false)}/>
          <ButtonComponent buttonName="Success Indicator Target" onClick = {()=>setPm213SITarget(true)}/>
        </div>
        <div className='modals-row'>
          <Pm213SIA isDisplay={Pm213SIAcco} onClose={()=>setPm213SIAcco(false)}/>
          <ButtonComponent buttonName="Success Indicator Accomplishment"  onClick={()=>setPm213SIAcco(true)}/>
        </div>
      </div>

      <h2>PM-214</h2>
      <div className='modals-container'>
        <div className='modals-row'>
          <PcrSetting isDisplay={PcrSettings} onClose={()=>setPcrSettings(false)}/>
          <ButtonComponent buttonName="PCR Settings" onClick={()=>setPcrSettings(true)}/>
        </div>
      </div>

    </div>
    
  );

}

export default IpcrPage;

