import React from 'react';

const SelectComponent = (props) => {
    return (
        <select className="select-component" 
            id={props.id}
            value={props.value}
            style={{marginTop:"3px"}}
            onChange={props.onChange}
            readOnly={props.readOnly}
            name={props.name}
            >
            <option className="option-component" selected disabled>{props.defaultTitle}</option>
                {props.itemList.map(item => {

                    if(item.id == null){
                        return <option className="option-component" 
                            key={item.name} 
                            value={item.code}
                            >{item.name}
                        </option>
                    } else {
                        return <option className="option-component" 
                            key={item.id} 
                            value={item.id}
                            >{item.title}
                        </option>
                    }
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