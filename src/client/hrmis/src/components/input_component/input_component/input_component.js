import React from 'react';
import './input_component.css'

const InputComponent = (props) =>{
    return(
        <input 
            className={`input-component ${props.className}`}
            id={props.id}
            type={props.type} 
            maxLength={props.maxLength} 
            size={props.size} 
            value={props.value}
            placeholder={props.placeholder}>


        </input>
    );
}

InputComponent.defaultProps = {
    type: 'text',
    maxLength: 255,
    size: 999,
    className: "",
    placeholder: "",
} 

export default InputComponent;