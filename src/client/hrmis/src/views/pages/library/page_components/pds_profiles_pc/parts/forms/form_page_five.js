import React from 'react';
import InputComponent from '../../../../../../common/input_component/input_component/input_component';
import ButtonComponent from '../../../../../../common/button_component/button_component.js';
import CheckboxComponent from '../../../../../../common/input_component/checkbox_input_component/checkbox_input_component';
import { AiFillPrinter } from 'react-icons/ai';

import {MdAdd} from 'react-icons/md'


const FormPageFive = () => {
    return ( 
        <div>
            <div>
                <table id="custom-table">
                    <thead>
                        <tr className="main-headers">
                            <th colSpan="12">
                                REFERENCES <br/>
                                <span style={{fontSize:"12px", fontWeight:"normal"}}>(Person not related by consanguinity or affinity to applicant/appointee)</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="secondary-headers">
                            <th colSpan="3">
                                Name
                            </th>
                            <th colSpan="6">
                                Address
                            </th>
                            <th colSpan="3">
                                Tel No.
                            </th>
                        </tr>

                        <tr>
                            <td colSpan="3">Sean Calzada</td>
                            <td colSpan="6">Bagumabayan Taguig City</td>
                            <td colSpan="3">09176500801</td>
                        </tr>
                    </tbody>
                    <br/>
                    <ButtonComponent buttonLogoStart={<MdAdd size="14px"/>} buttonName="ADD"/>
                </table>
            </div> <br/><br/>

            <div className="form-4-div">

                GOVERNMENT ISSUED ID
                <br/>
                (i.e. Passport, GSIS, SSS, PRC, Driver's License, etc.)
                <br/><br/>
                <div className="form-4-input-div">
                    <div className="form-4-gid-1">
                        <label>Government Issued ID</label>
                        <InputComponent />
                    </div>
                    <div className="form-4-gid-2">
                        <label>ID/License/Passport No</label>
                        <InputComponent />
                    </div>
                    <div className="form-4-gid-3">
                        <label>Date/Place of Issuance</label>
                        <InputComponent />
                    </div>
                </div>
            </div>

            <br/><br/>
            <div className="form-4-div">
                
                <div className="form-4-hereby">
                    <div className="">
                        <CheckboxComponent />
                    </div>
                    <div className="p-tag">I declare under oath that i have personally accomplished this Personal Data Sheet which
                    is a true, correct and complete statement pursuant to the provisions of the pertinent laws.
                    rules and regulations of the Republic of the Philippines. I authorize the agency
                    head/authorized representative to veryfy/validate the contents stated herein. I agree
                    that any misrepresentation made in this document and its attachments shall cause the filling 
                    of administrative/criminal case/s against me.</div>
                    
                </div>
                <br/><br/>
                <ButtonComponent buttonLogoStart={<AiFillPrinter size="15px"/>} buttonName="Print"/>
            </div> <br/><br/>
        </div>
    );
}
 
export default FormPageFive;