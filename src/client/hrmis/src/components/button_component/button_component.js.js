import React from 'react';
import './button_component.css'

const ButtonComponent = (props) => {
    return(
        <button 
            className={`button-components ${props.className}`} 
            onClick={props.onClick} 
            type={props.type}
            style={{
                background: props.bgColor, 
                color: props.color, 
                border: props.border}}>
            <span className="bc-logo-component" style={props.buttonLogo !== null ? {marginRight:"5px"} : {marginRight:"0px"}} >{props.buttonLogo}</span>
            <span className="bc-logo-component">{props.buttonName}</span>
        </button>
    );
}

ButtonComponent.defaultProps = {
    buttonName: 'Click Me',
}


export default ButtonComponent;