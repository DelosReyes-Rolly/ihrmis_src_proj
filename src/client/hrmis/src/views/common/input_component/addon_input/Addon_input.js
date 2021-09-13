import React from 'react';

function AddonInputComponents (props) {
    return ( 
        <div className="input-group-container">
            <label>{props.label}</label>
            <div className="input-group">
                <input type="text" />
                <span className="input-group-addon">
                    {props.addonSign}
                </span>
            </div>             
        </div>
    );
}
 
export default AddonInputComponents;