import React from 'react';
import DostLogo from '../../../assets/images/logo.png';

const FooterComponent = () => {
 
    return ( 
        <div className="footer">
            <span className="margin-right-1"><img src={DostLogo} width="20" height="20" alt="dost logo"/></span>
            <p>&copy; 2020 DEPARTMENT OF SCIENCE AND TECHNOLOGY. ALL RIGHT RESERVE</p>
        </div>
    );
    
}
 
export default FooterComponent;
