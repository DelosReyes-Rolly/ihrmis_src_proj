import React from 'react';
import './textarea_input_component.css';

const TextAreaComponent = (props) => {
    return(
        <textarea style={{marginTop:"3px"}} 
            className="textarea-component" id={props.id} 
            maxLength={props.maxLenght} 
            rows={props.row}
            placeholder={props.placeHolder}>
        </textarea>
    );
}

TextAreaComponent.defaultProps = {

    maxLenght: 255,
    numRow: 1,
    placeHolder: "Comment here!"
}

export default TextAreaComponent;