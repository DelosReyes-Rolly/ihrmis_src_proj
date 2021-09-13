import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ToggleSwitchComponent from './../../../../../common/toggle_switch_component/toggle_switch';

const DocumentaryToggle = (props) => {
    const [toggleState, setToggleState] = useState(false);
    return(
        <div className="documentary-toggle">
            <div className="margin-right-1">
                <ToggleSwitchComponent onChange={()=>setToggleState(!toggleState)}/>
            </div>
            <div>
                
                {toggleState === false 
                    ? <span>
                        <span className="margin-right-1">{props.label}</span>
                        <span><Link to="#">{props.link}</Link></span>
                    </span> 
                    : <span style={{color:"blue"}}>
                        <strong className="margin-right-1">
                            {props.label} 
                        </strong><span><Link to="#">{props.link}</Link></span>
                    </span> 
                }
            </div>
        </div>
    );
}

export default DocumentaryToggle;