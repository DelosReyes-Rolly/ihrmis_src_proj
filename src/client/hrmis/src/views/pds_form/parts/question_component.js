//scss at _pds_profile.scss
import React from 'react';

const QuestionComponent = (props) => {
    return ( 
        <tr className="tr-shade-color">
            <td colSpan="12">
                {props.queston}
            </td>
        </tr>
     );
}
 
export default QuestionComponent;