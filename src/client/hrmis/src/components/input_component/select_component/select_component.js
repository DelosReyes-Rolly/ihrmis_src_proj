import React from 'react';
import './select_component.css'

const SelectComponent = (props) => {
    return (
        <select className="select-component" id={props.id} defaultValue="DEFAULT">
            <option className="option-component" value="DEFAULT" disabled>{props.defaultTitle}</option>
            {props.list.map(item => {
                    <option className="option-component" key={item.id}>{item.title}</option>
                
            })}
            
        </select>
    );
}

SelectComponent.defaultProps={
    defaultTitle: 'Default',
    list: [],
}

export default SelectComponent;