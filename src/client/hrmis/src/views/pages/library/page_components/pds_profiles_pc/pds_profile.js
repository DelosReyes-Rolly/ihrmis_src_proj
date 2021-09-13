import React, { useState } from 'react';
import ButtonComponent from '../../../../common/button_component/button_component.js';
import FormPageThree from './parts/forms/form_page_three';
import FormPageOne from './parts/forms/form_page_one';
import FormPageTwo from './parts/forms/form_page_two';
import FormPageFour from './parts/forms/form_page_four';
import FormPageFive from './parts/forms/form_page_five';
import FormPageSix from './parts/forms/form_page_six';
import { useDelayService } from '../../../../../services/delay_service.js';
import { useDispatch } from 'react-redux';
import { setBusy } from '../../../../../features/reducers/loading_slice.js';


const PdsProfilePageComponetView = (props) => {
    //STATES HOOK
    const [formState, setformState] = useState(1);
    let dispatch = useDispatch();
    let [delayLit] = useDelayService();

    //METHODS
    const nextFormState = () =>{
        if(formState >= 6) return;
        setformState(formState + 1);
    }

    const previusFormState = () =>{
        if(formState <= 1) return;
        setformState(formState - 1);
    }

    return (
   

            <div className="pds-profile-main-view">
                {formState === 1 && <FormPageOne /> }
                {formState === 2 && <FormPageTwo /> }
                {formState === 3 && <FormPageThree/>}
                {formState === 4 && <FormPageFour/>}
                {formState === 5 && <FormPageFive/>}
                {formState === 6 && <FormPageSix />}
                <br/><br/>
                <div className="pds-profile-button-selection">
                    {formState > 1 && <div className="margin-right-1">
                        <ButtonComponent 
                            onClick={previusFormState}
                            className = "hover-over-button"
                            buttonName = "Previous" 
                            bgColor="white" 
                            color="rgba(54, 58, 63, 1)"
                            border="1px solid rgba(54, 58, 63, 0.8)"/>
                    </div>}
                    {/* <div><ButtonComponent buttonName = "Save"/></div> */}

                    {   
                        formState === 6 
                            ? <div><ButtonComponent 
                                className = "hover-over-button-green"
                                onClick={()=> {
                                    dispatch(setBusy());
                                    delayLit();
                                }}
                                bgColor="green" 
                                color="white"
                                border="1px solid rgba(54, 58, 63, 0.8)"
                                buttonName = "Submit"/></div>
                            : <div><ButtonComponent 
                                buttonName = "Save"
                                onClick={()=> {
                                    dispatch(setBusy());
                                    delayLit();
                                }}/>
                            </div>
                    }
                    
                    {
                        formState < 6 && <div className="margin-left-1"> 
                            <ButtonComponent
                                    onClick={nextFormState}
                                    className = "hover-over-button"
                                    buttonName = "Next" 
                                    bgColor="white" 
                                    color="rgba(54, 58, 63, 0.8)"
                                    border="1px solid rgba(54, 58, 63, 0.8)"/>
                        </div> 
                    }

                </div>
                <br/><br/><br/>
            </div>
 
        
    );
}





export default React.memo(PdsProfilePageComponetView);