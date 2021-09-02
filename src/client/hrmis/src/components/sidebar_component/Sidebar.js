import React, { useState } from 'react';
import { SidebarOption } from './Sidebar_data';
import './Sidebar.css'
import {Link} from 'react-router-dom'

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

    return ( 
        <React.Fragment>    
            <div className="sidebar-menu">
                <ul>
                    <li className="margin-bottom-2 parag-link"><p>Human Resource Management<br />Information System</p></li>
                    
                    {SidebarOption.map(option => {
                        if(option.more !== null){
                            return <React.Fragment><Link className="router-link" to={option.link} key={option.id}>
                            
                            <li onClick={() => toggleTab(option.id)}> 
                                
                                <div onClick={() => onClickSubDropdown(option.id)} 
                                        className={toggleState === option.id 
                                            ? "padding-1 item-list item-list-activate" 
                                            : "padding-1 item-list"} key={option.id}>       

                                    <span className="margin-left-1 margin-right-1">
                                        {option.icon}
                                    </span>
                                    
                                    <span>
                                        {option.title}
                                    </span>
                                </div>
                                

                            </li>
                            
                            <div className={ subdDropdownState.open 
                                    ? subdDropdownState.index === option.id 
                                    ?  "sub-menu-list"
                                    : "sub-menu-list-close" 
                                    : "sub-menu-list-close"}>

                                <ul>
                                    {option.more.map(list => {
                                        return <Link className="router-link" to={list.link} key={list.id}><li className="padding-1">{list.title}</li></Link>;})
                                    }                                      
                                </ul>
                            </div>
                            </Link>
                            </React.Fragment> 

                            } else{
                                return <Link className="router-link" to={option.link} key={option.id}>
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