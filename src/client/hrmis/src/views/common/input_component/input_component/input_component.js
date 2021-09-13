import React from 'react';

const InputComponent = (props) =>{
    return(
        <input style={{marginTop:"3px"}}
            onChange={props.onChange}
            value={props.value}
            className={`input-component ${props.className}`}
            id={props.id}
            type={props.type} 
            maxLength={props.maxLength} 
            size={props.size} 
            placeholder={props.placeholder}
            min={props.min}
            max={props.max}
            readOnly={props.readOnly}
            >
        </input>
    );
}

InputComponent.defaultProps = {
    type: 'text',
    maxLength: 255,
    size: 999,
    className: "",
    placeholder: "",
    onchange: ()=>{},
    readOnly: false,
} 

export default InputComponent;