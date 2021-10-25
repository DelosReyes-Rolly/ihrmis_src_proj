import React from 'react';
import ButtonComponent from '../../../../../common/button_component/button_component.js';
import {AiFillPrinter} from 'react-icons/ai'

const RemarksForm = () => {
    return ( 
        <React.Fragment>
            <div className="remarks-div-1">

                <h5 style={{ marginBottom:"5px" }}>PREPARED BY</h5>
                <div>
                    <select className="select-component">
                        <option defaultValue="1">Default</option>
                    </select> 
                    <button className="button-1">Sign</button>
                    <button className="button-2">Upload</button>
                </div>

                <br/><br/>

                <h5 style={{ marginBottom:"5px" }}>APPROVED BY</h5>
                <div style={{ display:"flex", justifyContent:'center' }}>
                    <select className="select-component">
                        <option defaultValue="1">Default</option>
                    </select> 

                    <button className="button-1">Sign</button>
                    <button className="button-2">Upload</button>
                </div>
            </div>
            <br/><br/><br/>
            <div className="remarks-div-2">
                <ButtonComponent buttonLogoStart={<AiFillPrinter size="14px"/>} buttonName="PRINT"/>
                <div>
                    <ButtonComponent className="on-save" buttonName="Save as New Version"/>
                    <ButtonComponent className="on-exit" buttonName="Exit"/>
                    <ButtonComponent className="on-submit" buttonName="Submit"/>
                </div>
            </div>

        </React.Fragment>
    );
}
 
export default RemarksForm;