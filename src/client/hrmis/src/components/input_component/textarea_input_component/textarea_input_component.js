import React from 'react';
import './textarea_input_component.css';

const TextAreaComponent = (props) => {
    return(
        <textarea id="textarea-component" maxLength={props.maxLenght} rows={props.numRow}>

        </textarea>
    );
}

TextAreaComponent.defaultProps = {

    maxLenght: 255,
    numRow: 1
}

export default TextAreaComponent;