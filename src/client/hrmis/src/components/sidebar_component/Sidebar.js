import React, { useState } from 'react';
import { SidebarOption } from './Sidebar_data';
import './Sidebar.css'
import {Link} from 'react-router-dom'

function SidebarComponent() {
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
                            return <Link className="router-link" to={option.link}><li onClick={() => toggleTab(option.id)} key={option.id}> 
                                <div className={toggleState === option.id ? "padding-1 item-list item-list-activate" : "padding-1 item-list"}>       
                                    <span className="margin-left-1 margin-right-1">
                                        {option.icon}
                                    </span>
                                    
                                    <span>
                                        {option.title}
                                    </span>
                                </div>
                                
                                <div className={toggleState === option.id ? "sub-menu-list": "sub-menu-list-close"}>
                                    <ul>
                                        {option.more.map(list => {
                                            return <li className="padding-1" key={list.id}>{list.title}</li>;})
                                        }                                      
                                    </ul>
                                </div>
                            </li></Link>
                            } else{
                                return <Link className="router-link" to={option.link}><li onClick={() => toggleTab(option.id)} 
                                    className={toggleState === option.id ? "padding-1 item-list item-list-activate" : "padding-1 item-list"}
                                    key={option.id}> 
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