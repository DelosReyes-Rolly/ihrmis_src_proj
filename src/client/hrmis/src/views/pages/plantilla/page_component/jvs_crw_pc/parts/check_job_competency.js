import React, { useState } from "react";
import CheckboxComponent from "../../../../../common/input_component/checkbox_input_component/checkbox_input_component";
import InputComponent from "../../../../../common/input_component/input_component/input_component";
import { jvsCrwRelevantData } from "../../../fake_data/table_data";
import WeightingTable from "./weight_table";

const CheckJobCompetency = (props) => {
    const [checkState, setCheckState] = useState(false);
    return ( 
        <React.Fragment>

            <div className="mqsfjc-div" style={{marginBottom:'6px', marginTop:"6px"}}>
                <div className="margin-right-1 checkbox-mqsfjc" style={{width: '25%'}}>
                    <CheckboxComponent 
                        name={props.name} 
                        // onChange={  } 
                        onChange={ ()=>setCheckState(!checkState) }
                        checkState={checkState}
                        className="margin-right-1"/><label>{props.title}</label>
                </div>
                <div style={{width: '75%'}}>
                    <InputComponent />
                </div>
            </div>
                {
                    checkState && <WeightingTable
                    min={jvsCrwRelevantData.relExperience.min}
                    max={jvsCrwRelevantData.relExperience.max}
                    data={jvsCrwRelevantData.relExperience.data}/>
                } 
        </React.Fragment>
     );
}
 
export default CheckJobCompetency;