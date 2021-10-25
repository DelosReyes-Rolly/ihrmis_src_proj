import React from 'react';
import ButtonComponent from '../../../../../common/button_component/button_component.js.js';
import { BsCheckCircle } from 'react-icons/bs';
import { FaPaperPlane } from 'react-icons/fa';

export const SuccessEmailConfirmation = () => {
    return (
        <React.Fragment>
            <div className="success-email-confirm">
                <div style={{ margin: "30px", color:"rgb(92, 153, 92)"}}>
                    <BsCheckCircle size="80px"/>
                </div>
                <h1>You've Successfully Verified your Email!</h1>
                <div>
                    <div>
                        <ButtonComponent className="back-color" buttonName="Back" />
                    </div>
                    <div>
                        <ButtonComponent className="next-color" buttonName="Next step" />
                    </div>
                    
                    
                </div>
                
            </div>
        </React.Fragment>

    )
}

export const SentEmailConfirmation = () => {
    return (
        <React.Fragment>
            <div className="success-email-confirm">
                <div style={{ margin: "30px", color:"#4276A4"}}>
                    <FaPaperPlane size="80px"/>
                </div>
                <h1>We have sent you an email. Please login to your email and verify it.</h1>
                <div>
                    
                </div>
            </div>
        </React.Fragment>

    )
}