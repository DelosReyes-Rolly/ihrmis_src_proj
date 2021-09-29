import React, { useState } from 'react';
import { SidebarOption } from './sidebar_data';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';

function SidebarComponent() {

    //For
    const [subdDropdownState, updateSubDropdownState] = useState({open: false, index: 0});
    const onClickSubDropdown = (number)=> {
        if(subdDropdownState.open === false){
            updateSubDropdownState({open: true, index: number});
        } else{
            updateSubDropdownState({open: false, index: number});
        }
    }

    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    }
    

    const isNavbarEnable  = useSelector((state) => state.mobileView.sidebar);
    const classValue = isNavbarEnable ? "display-mobile-menu" : '';

    return ( 
        <React.Fragment>    
            <div className={`sidebar-menu ${classValue}`}>
                <ul>
                    <li className="margin-bottom-2 parag-link"><p>Human Resource Management<br />Information System</p></li>
                    
                    {SidebarOption.map((option, key)=> {
                        if(option.more !== null){
                            return <React.Fragment key={key}>
                                <li onClick={() => toggleTab(option.id) } > 
                                    <Link 
                                        onClick={() => {
                                            onClickSubDropdown(option.id)
                                        }} 
                                    
                                        to={option.link}
                                        className={toggleState === option.id 
                                            ? "router-link-1 padding-1 item-list item-list-activate" 
                                            : "router-link padding-1 item-list"} key={option.id}>       

                                        <span className="margin-left-1 margin-right-1">
                                            {option.icon}
                                        </span>
                                        
                                        <span>
                                            {option.title}
                                        </span>
                                    </Link>
                                    <div className={ subdDropdownState.open 
                                        ? subdDropdownState.index === option.id 
                                        ?  "sub-menu-list"
                                        : "sub-menu-list-close" 
                                        : "sub-menu-list-close"}>

                                    <ul>
                                        {option.more.map((list, key) => {
                                            return <Link className="router-link" to={list.link} key={key}><li className="padding-1">{list.title}</li></Link>;})
                                        }                                      
                                    </ul>
                                    </div>

                                </li>
                            </React.Fragment>
                         

                        } else{
                            return <Link className="router-link" to={option.link} key={key}>
                            <li onClick={() => toggleTab(option.id)} 
                                className={toggleState === option.id ? "padding-1 item-list item-list-activate" : "padding-1 item-list"}
                                > 
                                <span className="margin-left-1 margin-right-1">
                                    {option.icon}
                                </span>
                                <span>
                                    {option.title}
                                </span>
                            </li></Link>
                        }
                    })}
                </ul>
            </div>
        </React.Fragment>
    );
}
 
export default SidebarComponent;