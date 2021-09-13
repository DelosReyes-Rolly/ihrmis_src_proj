//scss at _pds_profile.scss

import React, { useState } from 'react';
import CheckboxComponent from '../../../../../common/input_component/checkbox_input_component/checkbox_input_component';

const SubQuestionComponent = (props) => {

    const [selectCheckbox, setSelectCheckBox] = useState(0);
    
    return ( 
        <tr className="tr-shade-color">
            <td colSpan="9" className="td-sub-question">
                
                {props.subQuestion}
            </td>
            <td colSpan="3" className="td-yes-no">
                <div className="items-checkbox">
                    <div className="checkbox-alignment">
                        <CheckboxComponent onChange={()=>setSelectCheckBox(1)} checked={selectCheckbox === 1}/> <span className="margin-left-1">Yes</span>
                    </div>
                    <div className="checkbox-alignment">
                        <CheckboxComponent onChange={()=>setSelectCheckBox(2)} checked={selectCheckbox === 2}/> <span className="margin-left-1">No</span>         
                    </div>
                </div> 
            </td>
        </tr>
     );
}
 
export default SubQuestionComponent;