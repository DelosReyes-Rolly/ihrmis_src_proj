import React, { Component } from 'react';
import { AiFillCaretDown, AiFillCaretUp, AiOutlineQuestionCircle, AiOutlineBell } from 'react-icons/ai';
import DostLogo from '../../assets/images/logo.png';
import BadgeComponents from '../badge_component/Badge';
import './Navbar.css';


class NavbarComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            optionDisplay: 'none',
            notificationDisplay: 'none',
            helpDisplay: 'none',
        }
    }


    render() { 
        
        return ( <div className="navbar-div">
            <nav>
                <h1>
                    <span className="navbar-span-1 margin-right-1">HRMiS</span>
                    <span className="navbar-span-2"><p>&copy; 2021 DOST</p></span>
                    <span className="navbar-span-3"><p>Monday 04 January 2021 | 08:00:00 AM</p></span>
                </h1>
                <ul>
                    <li className="margin-right-1 notification">
                        <BadgeComponents className="add-style-badge" value={1}/>
                        <span><AiOutlineBell size="20px"/></span>
                    </li>
                    <li className="margin-right-1 notification">
                    <BadgeComponents className="add-style-badge" value={1}/>
                        <span><AiOutlineQuestionCircle size="20px"/></span></li>
                    <li onClick={ this.onClickOptionEvent } className="user-dropdown">
                        <span className="user-avatar"><img src={DostLogo} width="20" height="20" alt="avatar"/></span>
                        <span className="user-name-display">Terrence Calzada </span>
                        <span className="user-drop-arrow"> <AiFillCaretDown size="12px"/></span>
                        <ul className="user-drop-option" style={{display: this.state.optionDisplay}}>
                            <span className="user-arrow-up"><AiFillCaretUp size="15px"/></span>
                            <li className="margin-top-1"><a href="">HR Module</a></li>
                            <li className="margin-bottom-1"><a href="">Change Password</a></li>
                            <li className="margin-bottom-1"><a href="">LOGOUT</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div> );
    }

    onClickOptionEvent = () => {

        if(this.state.optionDisplay === 'none'){
            this.setState({optionDisplay: 'block'});
        } else {
            this.setState({optionDisplay: 'none'});
        }
    }

    onClickNotificationEvent = () => {

        if(this.state.notificationDisplay === 'none'){
            this.setState({notificationDisplay: 'block'});
        } else {
            this.setState({notificationDisplay: 'none'});
        }
    }

    onClickHelpEvent = () => {

        if(this.state.helpDisplay === 'none'){
            this.setState({helpDisplay: 'block'});
        } else {
            this.setState({helpDisplay: 'none'});
        }
    }
}
 
export default NavbarComponent;