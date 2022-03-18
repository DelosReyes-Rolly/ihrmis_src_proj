import React from 'react';
import ReactTooltip from 'react-tooltip';

const IconComponent = ({ id,icon, className, toolTipId, textHelper = "",  position = 'top', effect = 'solid'}) => {
    
    let addClassName = 'plantilla-icon ' + className;
    

    return ( 
        <React.Fragment>
            
            {toolTipId && <ReactTooltip id={toolTipId} place={position}effect={effect}>
                {textHelper}
            </ReactTooltip>}
            
            <span id={id} data-tip data-for={toolTipId} className={addClassName}>{icon}</span>
        </React.Fragment>
        
    );

}

export default IconComponent;
