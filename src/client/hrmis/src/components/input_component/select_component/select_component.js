import React from 'react';
import './select_component.css'

const SelectComponent = (props) => {
    return (
        <select className="select-component" 
            id={props.id}
            value={props.value}
            style={{marginTop:"3px"}}
            onChange={props.onChange}
            readOnly={props.readOnly}
            >
            <option className="option-component" value="DEFAULT" disabled>{props.defaultTitle}</option>
                {props.itemList.map(item => {
                    return <option className="option-component" 
                        key={item.id} 
                        value={item.id}
                        >{item.title}
                    </option>
            })}
            
        </select>
    );
}

SelectComponent.defaultProps={
    defaultTitle: 'Default',
    itemList: [],
    readOnly: false,
}

export default SelectComponent;