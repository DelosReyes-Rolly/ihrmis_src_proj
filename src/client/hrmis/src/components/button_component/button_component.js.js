import React from 'react';
import './button_component.css'

const ButtonComponent = (props) => {
    return(
        <button className={`button-components ${props.className}`} onClick={props.onClick} style={{
            background: props.bgColor, 
            color: props.color, 
            border: props.border}}>
            <span style={props.buttonLogo !== null ? {marginRight:"5px"} : {marginRight:"0px"}} >{props.buttonLogo}</span>
            <span>{props.buttonName}</span>
        </button>
    );

}

ButtonComponent.defaultProps = {
    buttonName: 'Click Me',
}


export default ButtonComponent;