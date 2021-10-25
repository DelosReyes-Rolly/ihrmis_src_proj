import React from 'react';
import CheckboxComponent from '../../../../../common/input_component/checkbox_input_component/checkbox_input_component';

const CitizenshiFormOne = (props) => {
    
  
    return (
    
        <React.Fragment>
            <div style={{ marginBottom:"10px" }}>
                <CheckboxComponent
                    checked={props.stateValue == 1 ? true : false} 
                    onChange={ props.filipino }/> <span className="margin-left-1">Filipino</span>
            </div>
            <div className="checked-dropdown">       
                <div className="checked-1">
                    <CheckboxComponent 
                        checked={props.stateValue == 2 ? true : false} 
                        onChange={ props.other }/> <span className="margin-left-1">Others</span>
                </div>
                <div className="checked-2">
                    {
                        props.stateValue == 2 && props.children //Display select input from formOne component
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default CitizenshiFormOne;
