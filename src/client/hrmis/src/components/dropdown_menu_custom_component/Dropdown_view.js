import React, { useEffect, useState } from 'react';
import { AiFillCaretUp } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import './Dropdown_view.css'

function DropdownViewComponent(props){
    return (
        <ul className="ul-dropdown-container" style={{display: props.display}}>
            <div className="ul-menu-item-arrow"><AiFillCaretUp size="15px"/></div>
            {props.itemList.map(list =>{
                return <Link className="link-class" to={list.link} key={list.id}><li className="ul-menu-item">{list.itemTitle}</li></Link>;
            })}
        </ul>
    
    );
}

DropdownViewComponent.defaultProps = {
    display: 'none',
    link: '#'
}

export default DropdownViewComponent;
