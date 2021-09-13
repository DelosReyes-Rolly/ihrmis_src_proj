import React from 'react';

const TextAreaComponent = (props) => {
    return(
        <textarea style={{marginTop:"3px"}} 
            className="textarea-component" id={props.id} 
            maxLength={props.maxLength} 
            rows={props.row}
            placeholder={props.placeHolder}>
        </textarea>
    );
}

TextAreaComponent.defaultProps = {

    maxLength: 255,
    numRow: 1,
    placeHolder: "Comment here!"
}

export default TextAreaComponent;