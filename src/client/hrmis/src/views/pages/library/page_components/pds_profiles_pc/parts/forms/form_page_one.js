import React, { useState } from 'react';
import dostLogo from './../../../../../../../assets/images/logo.png'
import InputComponent from '../../../../../../common/input_component/input_component/input_component';
import SelectComponent from '../../../../../../common/input_component/select_component/select_component';
import ButtonComponent from '../../../../../../common/button_component/button_component.js';
import CheckboxComponent from '../../../../../../common/input_component/checkbox_input_component/checkbox_input_component';
import Recaptcha from 'react-recaptcha';

const FormPageOne = () => {
    const [isVerified, setIsVerified]= useState(false);
    const recaptchaLoaded = ()=>{}
    return(

        <React.Fragment>
            <div className="form-header">
                <img src={dostLogo} width="50px" height="50px" alt="dost-logo"/>
                <h3>Department of Science and Technology</h3>
                <p>General Santos Avenue, Bicutan Taguig City</p> <br/><br/>
                <h2>PERSONAL DATA SHEET</h2>
                <br/><br/>
            </div>

            <div style={{fontSize:"small"}}>
                <p><em><strong>WARNING:</strong> Any misrepresentation made in Personal 
                        Data Sheet and the Work Experience Sheet shall 
                        cause the filing of administrative/criminal case/s 
                        against the person concerned</em></p>
                <br/>
                <p>READ THE <a href="#">GUIDE</a> BEFORE ACOMPLISHING THIS FORM 
                        DO NOT ABBREVIATE. Indicate N/A if not Applicable.</p>
            </div>

            <br/>
            <form style={{boxSizing:"border-box"}}>
                <table id="custom-table">
                    <thead>
                        <tr className="main-headers">
                            <th className="">
                                I. PERSONAL INFORMATION
                            </th>
                        </tr>
                    </thead>
                </table>
                <br/>
                {/* First Input Stanza */}
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"50%"}}>
                        <label htmlFor="surname" >Surname</label>
                        <InputComponent id="surname" maxLength="50"/>
                    </div>
                    <div style={{marginLeft:"5px", width:"50%"}}>
                        <label htmlFor="first-name" >First Name</label>
                        <InputComponent id="first-name" maxLength="50"/>
                    </div>
                </div>
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"50%"}}>
                        <label htmlFor="name-extension" >Name Extension (Jr., Sr.)</label>
                        <InputComponent id="name-extension" maxLength="50"/>
                    </div>
                    <div style={{marginLeft:"5px", width:"50%"}}>
                        <label htmlFor="middle-name" >Middle Name</label>
                        <InputComponent id="middle-name" maxLength="10"/>
                    </div>
                </div>
                <br/>
                {/* Second Input Stanza */}
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"25%"}}>
                        <label htmlFor="date-of-birth" >Date of Birth</label>
                        <InputComponent type="date" id="date-of-birth"/>
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"45%"}}>
                        <label htmlFor="place-of-birth" >Place of Birth</label>
                        <InputComponent id="place-of-birth"/>
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"15%"}}>
                        <label htmlFor="sex-gender" >Sex</label>
                        <SelectComponent id="sex-gender" defaultTitle="Sex"/>
                    </div>
                    <div style={{marginLeft:"5px", width:"15%"}}>
                        <label htmlFor="blood-type" >Blood Type</label>
                        <SelectComponent id="blood-type" defaultTitle="Blood Type"/>
                    </div>
                </div>
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"25%"}}>
                        <label htmlFor="civil-status" >Civil Status</label>
                        <SelectComponent id="civil-status" defaultTitle="Civil Status"/>
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"45%"}}>
                        <label htmlFor="other-specify" >If others, please specify</label>
                        <InputComponent id="other-specify"/>
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"15%"}}>
                        <label htmlFor="height" >Height (m)</label>
                        <InputComponent id="height"/>
                    </div>
                    <div style={{marginLeft:"5px", width:"15%"}}>
                        <label htmlFor="weight" >Weight (kg)</label>
                        <InputComponent id="weight"/>
                    </div>
                </div>

                <div className="pds-prof-class-one">
                    <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                        <div style={{marginRight:"5px", width:"33%"}}>
                            <label htmlFor="gsis-id-no" >GSIS ID No.</label>
                            <InputComponent id="gsis-id-no" maxLength="20"/>
                        </div>
                        <div style={{marginRight:"5px", marginLeft:"5px", width:"33%"}}>
                            <label htmlFor="pagibig-id-no" >PAG-IBIG ID No</label>
                            <InputComponent id="pagibig-id-no" maxLength="20"/>
                        </div>
                        <div style={{marginLeft:"5px", width:"33%"}}>
                            <label htmlFor="philhealth-id-no" >PHILHEALTH No.</label>
                            <InputComponent id="philhealth-id-no" maxLength="20"/>
                        </div>
                    </div>
                </div>
                <div className="pds-prof-class-one">
                    <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                        <div style={{marginRight:"5px", width:"33%"}}>
                            <label htmlFor="sss-id-no" >SSS No.</label>
                            <InputComponent id="sss-id-no" maxLength="20"/>
                        </div>
                        <div style={{marginRight:"5px", marginLeft:"5px", width:"33%"}}>
                            <label htmlFor="tin-id-no" >TIN No</label>
                            <InputComponent id="tin-id-no" maxLength="20"/>
                        </div>
                        <div style={{marginLeft:"5px", width:"33%"}}>
                            <label htmlFor="agency-employee-id-no" >Agency Employee No.</label>
                            <InputComponent id="agency-employee-id-no" maxLength="20"/>
                        </div>
                    </div>
                </div>

                <br/>

                {/* CITIZENSHIP */}
                <h5 style={{color:"rgba(54, 58, 63, 0.8)", marginBottom:"10px"}}>CITIZENSHIP</h5>
                <div className="pds-prof-class-one" style={{display:"flex", alignItems:"flex-start"}}>
                    <div style={{display:"flex", flexDirection:"column" , alignItems:"flex-start", width:"50%", marginRight:"10px" }}>
                        <div className="margin-bottom-1" style={{display:"flex", alignItems:"center", width:"100%"}}>
                            <CheckboxComponent />
                            <label className="margin-left-1">Filipino</label>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"100%"}}>
                            <div style={{display:"flex", alignItems:"center", width:"100%"}}>
                                <div style={{display:"flex", alignItems:"center", width:"30%"}}>
                                    <CheckboxComponent />
                                    <label className="margin-left-1">Dual Citizenship</label>
                                </div>
                                <div style={{width:"70%"}}>
                                    <SelectComponent />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{display:"flex", alignItems:"center", width:"50%", marginLeft:"10px"}}>
                        <div style={{display:"flex", flexDirection:"column", width:"100%"}}>
                            <div style={{display:"flex", alignItems:"center", width:"100%"}}>
                                <div style={{display:"flex", alignItems:"center", width:"30%"}}>
                                    <CheckboxComponent />
                                    <label className="margin-left-1">Dual Citizenship</label>
                                </div>
                                <div style={{width:"70%"}}>
                                    <SelectComponent />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <br/><br/>
                {/* RESEDENTIAL ADDRESS INFORMATION SECTION  */}
                <h5 style={{color:"rgba(54, 58, 63, 0.8)", marginBottom:"10px"}}>RESIDENTIAL ADDRESS</h5>
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"20%"}}>
                        <label htmlFor="res-house-block-lot" >House/Block/Lot No.</label>
                        <InputComponent id="res-house-block-lot"/>
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"25%"}}>
                        <label htmlFor="res-street" >Street</label>
                        <InputComponent id="res-street"/>
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"40%"}}>
                        <label htmlFor="res-subdi-village" >Subdivision/Village</label>
                        <InputComponent id="res-subdi-village"/>
                    </div>
                    <div style={{marginLeft:"5px", width:"15%"}}>
                        <label htmlFor="res-zip-code" >Zip Code</label>
                        <InputComponent id="res-zip-code"/>
                    </div>
                </div>
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"33%"}}>
                        <label htmlFor="res-barangay" >Barangay</label>
                        <SelectComponent id="res-barangay" defaultTitle=""/>
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"33%"}}>
                        <label htmlFor="res-municipality" >City/Municipality</label>
                        <SelectComponent id="res-municipality" defaultTitle=""/>
                    </div>
                    <div style={{marginLeft:"5px", width:"33%"}}>
                        <label htmlFor="res-province" >Province</label>
                        <SelectComponent id="res-province" defaultTitle=""/>
                    </div>
                </div>
                
                <br/><br/>
                {/*PERMANENT ADDRESS INFORMATION SECTION  */}
                <h5 style={{color:"rgba(54, 58, 63, 0.8)", marginBottom:"10px"}}>PERMANENT ADDRESS</h5>
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"20%"}}>
                        <label htmlFor="per-house-block-lot" >House/Block/Lot No.</label>
                        <InputComponent id="per-house-block-lot"/>
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"25%"}}>
                        <label htmlFor="per-street" >Street</label>
                        <InputComponent id="per-street"/>
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"40%"}}>
                        <label htmlFor="per-subdi-village" >Subdivision/Village</label>
                        <InputComponent id="per-subdi-village"/>
                    </div>
                    <div style={{marginLeft:"5px", width:"15%"}}>
                        <label htmlFor="per-zip-code" >Zip Code</label>
                        <InputComponent id="per-zip-code"/>
                    </div>
                </div>
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"33%"}}>
                        <label htmlFor="per-barangay" >Barangay</label>
                        <SelectComponent id="per-barangay" defaultTitle=""/>
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"33%"}}>
                        <label htmlFor="per-municipality" >City/Municipality</label>
                        <SelectComponent id="per-municipality" defaultTitle=""/>
                    </div>
                    <div style={{marginLeft:"5px", width:"33%"}}>
                        <label htmlFor="per-province" >Province</label>
                        <SelectComponent id="per-province" defaultTitle=""/>
                    </div>
                </div>
                <br/>
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"30%"}}>
                        <label htmlFor="telephone-num" >Telephone No.</label>
                        <InputComponent id="telephone-num"/>
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"30%"}}>
                        <label htmlFor="mobile-num" >Mobile No</label>
                        <InputComponent id="mobile-num"/>
                    </div>
                    <div style={{marginLeft:"5px", width:"40%"}}>
                        <label htmlFor="email-address" >Email Address</label>
                        <InputComponent id="email-address"/>
                    </div>
                </div>
                <br/><br/>
                
                
                {/* CAPTCHA */}
                <div className="pds-prof-class-two">
                    <div>
                        {/* 6LdIujEcAAAAAJ8QBACQTRD5bf1YgtPOQZI9h01e */}
                        <Recaptcha 
                            margin="0px"
                            sitekey = "6LdIujEcAAAAAJRdTNTP0jkmHt60fVZMlj7Fn7nT"
                            render = "explicit"
                            onloadCallback = {recaptchaLoaded}
                        />
                    </div>
                    <div>
                        <ButtonComponent buttonName="Submit"/>
                    </div>
                </div>
            </form>

            <br/><br/>
        </React.Fragment>
    );
}


export default FormPageOne;