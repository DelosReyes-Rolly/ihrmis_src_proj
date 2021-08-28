import React from 'react';
import { AiFillCaretUp } from 'react-icons/ai'
import './Dropdown_view.css'

function DropdownViewComponent(props){
    return (
        <ul className="ul-dropdown-container" style={{display: props.display}}>
            <div className="ul-menu-item-arrow"><AiFillCaretUp size="15px"/></div>
            <li className="ul-menu-item"><a href={props.link}>View</a></li>
            <li className="ul-menu-item"><a href={props.link}>Disqualified</a></li>
            <li className="ul-menu-item"><a href={props.link}>Delete</a></li>
        </ul>
    );
}

DropdownViewComponent.defaultProps = {
    display: 'none',
    link: '#'
}

export default DropdownViewComponent;
