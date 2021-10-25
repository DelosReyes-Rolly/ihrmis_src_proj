import React from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setFail } from '../../../../features/reducers/popup_response';

const FailResponseComponent = (props) => {
    const dispatch = useDispatch();
    return ( 
        <React.Fragment>
            <div className="fail-response">
                <div className="title-fail-response">
                    <strong>{props.title}</strong> <span onClick={()=>dispatch(setFail(false))}><MdClose size="14px"/></span>
                </div>
                <div className="children-fail-response">
                    {props.children}              
                </div>
            </div>
        </React.Fragment>
     );
}

FailResponseComponent.defaultProps = {
    children: 'Internal Error Lorem ip sum donor',
    title: 'FAILURE: Action Denied!'
}
 
export default FailResponseComponent;