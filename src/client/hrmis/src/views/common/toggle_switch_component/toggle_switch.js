
import React from 'react';

const ToggleSwitchComponent = (props) => {

    return (
        <label className="switch">
            <input type="checkbox" onChange={props.onChange}/>
            <span className="slider round"></span>
        </label>
    );
}

export default ToggleSwitchComponent;