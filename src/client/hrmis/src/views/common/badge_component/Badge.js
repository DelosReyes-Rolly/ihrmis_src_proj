import React from 'react';

const BadgeComponent = (props) => {
    
    let addClassName = 'notification-badge ' + props.className;
    
    return ( 
        <span className={addClassName}>{props.value}</span>
    );

}

export default BadgeComponent;