import React, { useRef, useState } from 'react';
import dostLogo from './../../../../../../../assets/images/logo.png'
import InputComponent from '../../../../../../common/input_component/input_component/input_component';
import SelectComponent from '../../../../../../common/input_component/select_component/select_component';
import ButtonComponent from '../../../../../../common/button_component/button_component.js';
import CheckboxComponent from '../../../../../../common/input_component/checkbox_input_component/checkbox_input_component';
import axios from 'axios';
import { API_HOST } from '../../../../../../../helpers/global/global_config';
import CitizenshiFormOne from '../citizenship_form_one';
import { useFormService } from './../../../../../../../services/form_service';
import { IoCopySharp } from "react-icons/io5"
import phil from 'phil-reg-prov-mun-brgy';
import { useLocationService } from '../../../../../../../services/location_service';
import countryList from 'iso-3166-country-list';
import { useDispatch } from 'react-redux';
import ReCAPTCHA from "react-google-recaptcha";
import ValidationComponent from '../../../../../../common/response_component/validation_component/validation_component';
import { formOneInput } from '../../../../static/input_items';
import { setBusy } from '../../../../../../../features/reducers/loading_slice'
import { setFail } from '../../../../../../../features/reducers/popup_response';
import { useDelayService } from '../../../../../../../services/delay_service';

const FormPageOne = () => {

    // ===================================
    // CUSTOM HOOK SERVICE
    // ===================================
        // FOR FORM
    const [applicantDataHolder, setDataInput, arrInput] = useFormService();
        // FOR GETTING BRGY, MUNICIPALITY, PROVINCE STATES
    const [resCity, resBrgy, getResCity, getResBrgy] = useLocationService();
    const [perCity, perBrgy, getPerCity, getPerBrgy] = useLocationService();
        // FOR CLOSING POPUPS
    const [failed, succeed] = useDelayService();

    // ===================================
    // REDUX STATE AND FUNCIONALITIES
    // ===================================
    const dispatch = useDispatch();
    
    // ===================================
    // ERROR HANDLING STATE
    // ===================================
    const [serverErrorResponse, setServerErrorResponse] = useState();

    // ===================================
    // CAPTCHA LOGIC STATE
    // ===================================
    const [verifyCapcha, setVerifyCaptcha] = useState(false); // Use for determining if user successfully finish the captcha
    const [captcha, setCaptcha] = useState(false) // Use for displaying captcha input error handling
    // const recaptchaResetRef = useRef(null); // Use for resetting the captcha on submit
    

    // ===================================
    //  CITIZENSHIP STATE
    // ===================================
    const [citizenshipState, setCitizenshipState] = useState(0); /// if filipino or not
    const [dualCitizen, setDualCitizen] = useState(false); /// if dual or not

    // ===================================
    // ADDRESS FUNCTION AND STATE
    // ===================================
    const [isCopied, setIsCopied] = useState(false);
    const setCopiedAddress = ()=>{
        setIsCopied(!isCopied)
        arrInput('copied_addr', isCopied);
    }

    // ===================================
    //  SUBBMIT HANDLER
    // ===================================
    const submitHandler = async (e) => {
        e.preventDefault();
        
        if(verifyCapcha == true){
            setCaptcha(false);
            // recaptchaResetRef.current.reset();
            
            dispatch(setBusy(true));
            await axios.post(API_HOST + '/new-applicant', applicantDataHolder)
            .then((response) => {  
                e.target.reset();
                setServerErrorResponse(null);
                succeed();
            }).catch(error => {
        
                if(error.response){
                    if(error.response.status === 422){
                        console.log(error.response.data.errors);              
                        setServerErrorResponse(Object.values(error.response.data.errors));
                        failed();
                    } else if(error.response.status === 404){
                        console.log('404 Page Not Found');
                        setServerErrorResponse(null);
                        failed();
                    } else if(error.response.status === 500){
                        console.log('500 API Internal Error!');
                        console.log(error.response.data.message);
                        setServerErrorResponse(null);
                        failed();
                    }
                    
                } else if (error.request){
                    console.log('No response from server');
                    
                    setServerErrorResponse(null);
                    failed();
                } else {
                    console.log('Oops! Something went wrong');
                    dispatch(setFail(true));
                    failed();
                }

            });
            dispatch(setBusy(false));
        } else {
            setCaptcha(true);
            failed(); 
        }
        
    }
    
    
    return(

        <React.Fragment>

            {/* 
                //==========================================
                // PDS ON-210 MAIN HEADER
                //==========================================
            */}
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
            </div><br/>
            
            {/* 
                //==========================================
                // PDS ON-210 FORM SERVER ERROR RESPONSE 
                //==========================================
            */}
            {
                captcha 
                    ? <ValidationComponent title="FAILED TO SUBMIT">
                        {captcha && <p>- Please Complete the CAPTCHA</p>}
                    </ValidationComponent>
                    : serverErrorResponse != null 
                        ? <ValidationComponent title="FAILED TO SUBMIT">
                            {
                                serverErrorResponse.map((item, key)=>{
                                    return <p key={key}>- {item}</p>
                                }) 
                            }
                        </ValidationComponent>
                        : null
            }<br/>

            {/* 
                //==========================================
                // PDS ON-210 FORM SECTION 
                //==========================================
            */}

            <form style={{boxSizing:"border-box"}} onSubmit={submitHandler}>
                {/* 
                    //==========================================
                    // FORM HEADER SECTION 
                    //==========================================
                */}
                <table id="custom-table">
                    <thead>
                        <tr className="main-headers">
                            <th className="">
                                I. PERSONAL INFORMATION
                            </th>
                        </tr>
                    </thead>
                </table><br/>

                {/* 
                    //==========================================
                    // USER NAME INFORMATION SECTION 
                    //==========================================
                */}

                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"50%"}}>
                        <label>Surname</label>
                        <InputComponent name="app_nm_last" onChange={ e=>{setDataInput(e)}}/>
                    </div>
                    <div style={{marginLeft:"5px", width:"50%"}}>
                        <label>First Name</label>
                        <InputComponent name="app_nm_first" onChange={ e => {setDataInput(e)}}/>
                    </div>
                </div>
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"50%"}}>
                        <label>Name Extension (Jr., Sr.)</label>
                        <InputComponent name="app_nm_extn" onChange={ e => {setDataInput(e)}}/>
                    </div>
                    <div style={{marginLeft:"5px", width:"50%"}}>
                        <label>Middle Name</label>
                        <InputComponent name="app_nm_mid" onChange={ e => {setDataInput(e)}}/>
                    </div>
                </div><br/>

                {/* 
                    //==========================================
                    // OTHER USER INFORMATION SECTION 
                    //==========================================
                */}
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"25%"}}>
                        <label> Date of Birth</label>
                        <InputComponent type="date" name="app_birth_date" onChange={ e =>setDataInput(e) }/>
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"45%"}}>
                        <label>Place of Birth</label>
                        <InputComponent name="app_birth_place" onChange={ e => {setDataInput(e)}}/>
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"15%"}}>
                        <label>Sex</label>
                        <SelectComponent name="app_sex" itemList={formOneInput.sex}  defaultTitle="Sex" onChange={ e => {setDataInput(e)}}/>
                    </div>
                    <div style={{marginLeft:"5px", width:"15%"}}>
                        <label>Blood Type</label>
                        <SelectComponent name="app_blood_type" itemList={formOneInput.blood_type} defaultTitle="Blood Type" onChange={ e => {setDataInput(e)}}/>
                    </div>
                </div>
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"25%"}}>
                        <label>Civil Status</label>
                        <SelectComponent name="app_civil_status" itemList={formOneInput.civil_status} defaultTitle="Civil Status" onChange={ e => {setDataInput(e)}}/>
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"45%"}}>
                        <label>If others, please specify</label>
                        <InputComponent name="app_civil_others" onChange={ e => {setDataInput(e)}}/>
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"15%"}}>
                        <label>Height (m)</label>
                        <InputComponent name="app_height" onChange={ e => {setDataInput(e)}}/>
                    </div>
                    <div style={{marginLeft:"5px", width:"15%"}}>
                        <label>Weight (kg)</label>
                        <InputComponent name="app_weight" onChange={ e => {setDataInput(e)}} />
                    </div>
                </div>

                {/* 
                    //==========================================
                    // EMPLOYMENT INFORMATION SECTION 
                    //==========================================
                */}
                <div className="pds-prof-class-one">
                    <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                        <div style={{marginRight:"5px", width:"33%"}}>
                            <label>GSIS ID No.</label>
                            <InputComponent name="app_gsis" onChange={ e => {setDataInput(e)}}/>
                        </div>
                        <div style={{marginRight:"5px", marginLeft:"5px", width:"33%"}}>
                            <label>PAG-IBIG ID No</label>
                            <InputComponent name="app_pagibig" onChange={ e => {setDataInput(e)}}/>
                        </div>
                        <div style={{marginLeft:"5px", width:"33%"}}>
                            <label>PHILHEALTH No.</label>
                            <InputComponent name="app_philhealth" onChange={ e => {setDataInput(e)}}/>
                        </div>
                    </div>
                </div>

                <div className="pds-prof-class-one">
                    <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                        <div style={{marginRight:"5px", width:"33%"}}>
                            <label>SSS No.</label>
                            <InputComponent name="app_sss" onChange={ e => {setDataInput(e)}}/>
                        </div>
                        <div style={{marginRight:"5px", marginLeft:"5px", width:"33%"}}>
                            <label>TIN No</label>
                            <InputComponent name="app_tin" onChange={ e => {setDataInput(e)}}/>
                        </div>
                        <div style={{marginLeft:"5px", width:"33%"}}>
                            <label>Agency Employee No.</label>
                            <InputComponent name="app_emp_no" onChange={ e => {setDataInput(e)}}/>
                        </div>
                    </div>
                </div><br/>

                 {/* 
                    //==========================================
                    // CITIZENSHIP INFORMATION SECTION 
                    //==========================================
                */}
                <h5 style={{color:"rgba(54, 58, 63, 0.8)", marginBottom:"10px"}}>CITIZENSHIP</h5>
                <div className="pds-prof-class-one">
                    <div className="citizenship-container">
                        <div className="div-1">
                            <CitizenshiFormOne 
                                stateValue={citizenshipState} 
                                filipino={ () => { 
                                    setCitizenshipState(1); 
                                    arrInput('app_filipino', 1); 
                                }}
                                other={ () => { 
                                    setCitizenshipState(2); 
                                    arrInput('app_filipino', 0); 
                                }}>

                                <SelectComponent name="app_dual_cny_id" defaultTitle="Specify Country" itemList={countryList} 
                                    onChange={(e)=> {
                                        { setDataInput(e) }
                                }}/>
                            </CitizenshiFormOne>
                        </div>

                        {
                            citizenshipState == 1 && 
                            <div className="div-2">
                                <div className="checked-dropdown">  
                                    <div className="checked-1">
                                        <CheckboxComponent
                                            checked={dualCitizen} 
                                            onChange={ (e) => {
                                                setDualCitizen(!dualCitizen)
                                                arrInput('is_dual_citizen', e.target.checked == true ? true : false);
                                        }}/> 
                                        <span className="margin-left-1">Dual Citizen</span>
                                    </div>
                                    <div className="checked-2">
                                        {
                                            dualCitizen == true && 
                                            <SelectComponent name="app_dual_type" defaultTitle="Specify Country" 
                                                itemList = {formOneInput.dual_citizen_type}
                                                onChange={(e)=>{
                                                setDataInput(e);
                                            }}/>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div><br/>

                {/* 
                    //==========================================
                    // RESEDENTIAL ADDRESS INFORMATION SECTION 
                    //==========================================
                */}

                <h5 style={{color:"rgba(54, 58, 63, 0.8)", marginBottom:"10px"}}>RESIDENTIAL ADDRESS</h5>
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"20%"}}>
                        <label>House/Block/Lot No.</label>
                        <InputComponent name="res_block_lot" onChange={e => setDataInput(e)}/>
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"25%"}}>
                        <label>Street</label>
                        <InputComponent name="res_street" onChange={e => setDataInput(e)}/>
                        
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"40%"}}>
                        <label>Subdivision/Village</label>
                        <InputComponent name="res_sub_village" onChange={e => setDataInput(e)}/>
                    </div>
                    <div style={{marginLeft:"5px", width:"15%"}}>
                        <label>Zip Code</label>
                        <InputComponent name="res_zip_code" onChange={e => setDataInput(e)}/>
                    </div>
                </div>

                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"33%"}}>
                        <label>Province</label>
                        <SelectComponent name="res_province" defaultTitle="Province" itemList={phil.provinces} 
                            onChange={e => {
                                setDataInput(e);
                                getResCity(e.target.value);
                            }}/>
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"33%"}}>
                        <label>City/Municipality</label>
                        <SelectComponent name="res_municipality" defaultTitle="City" itemList={resCity == null ? [] : resCity} 
                            onChange={e => {
                                setDataInput(e);
                                getResBrgy(e.target.value)
                            }}/>
                    </div>
                    <div style={{marginLeft:"5px", width:"33%"}}>
                        <label>Barangay</label>
                        <SelectComponent name="res_barangay" defaultTitle="Barangay" itemList={resBrgy == null ? [] : resBrgy} onChange={e => setDataInput(e)}/>
                    </div>
                </div>
                
                <br/>
                {/* 
                    //==========================================
                    // PERMANENT ADDRESS INFORMATION SECTION
                    //==========================================
                */}
                
                <div className="per-address-head"> {/* header of permanent address */}
                    <h5 style={{color:"rgba(54, 58, 63, 0.8)"}}>PERMANENT ADDRESS</h5>
                    <span className="res-address-copy" onClick={()=>setCopiedAddress()}><IoCopySharp className="copy-icon" size="14px"/> {isCopied ? "Input Permanent Address": "Copy Resedential Address"}</span>
                </div>
                {isCopied == false && 
                    <div>
                        <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                            <div style={{marginRight:"5px", width:"20%"}}>
                                <label>House/Block/Lot No.</label>
                                <InputComponent name="per_block_lot" onChange={e => setDataInput(e)}/>
                            </div>
                            <div style={{marginRight:"5px", marginLeft:"5px", width:"25%"}}>
                                <label>Street</label>
                                <InputComponent name="per_street" onChange={e => setDataInput(e)}/>
                            </div>
                            <div style={{marginRight:"5px", marginLeft:"5px", width:"40%"}}>
                                <label>Subdivision/Village</label>
                                <InputComponent name="per_sub_village" onChange={e => setDataInput(e)}/>
                            </div>
                            <div style={{marginLeft:"5px", width:"15%"}}>
                                <label>Zip Code</label>
                                <InputComponent name="per_zip_code" onChange={e => setDataInput(e)}/>
                            </div>
                        </div>
                        <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                            <div style={{marginRight:"5px", width:"33%"}}>
                                <label>Barangay</label>
                                <SelectComponent name="per_province" defaultTitle="Province"  itemList={phil.provinces} 
                                    onChange={e => {
                                        setDataInput(e);
                                        getPerCity(e.target.value);
                                }}/>
                            </div>
                            <div style={{marginRight:"5px", marginLeft:"5px", width:"33%"}}>
                                <label>City/Municipality</label>
                                <SelectComponent name="per_municipality" defaultTitle="City" 
                                    itemList={perCity == null ? [] : perCity}
                                    onChange={e => {
                                        setDataInput(e);
                                        getPerBrgy(e.target.value);
                                }}/>
                            </div>
                            <div style={{marginLeft:"5px", width:"33%"}}>
                                <label>Province</label>
                                <SelectComponent name="per_barangay" defaultTitle="Barangay" 
                                    itemList={perBrgy == null ? [] : perBrgy}
                                    onChange={e => setDataInput(e)}/>
                            </div>
                        </div>
                    </div>
                }<br/>
                {/* 
                    //==========================================
                    // CONTACT INFORMATION SECTION
                    //==========================================
                */}
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"30%"}}>
                        <label>Telephone No.</label>
                        <InputComponent name="app_tel_no" onChange={ e => {setDataInput(e)}}/>
                    </div>
                    <div style={{marginRight:"5px", marginLeft:"5px", width:"30%"}}>
                        <label>Mobile No</label>
                        <InputComponent name="app_mobile_no" onChange={ e => {setDataInput(e)}}/>
                    </div>
                    <div style={{marginLeft:"5px", width:"40%"}}>
                        <label>Email Address</label>
                        <InputComponent name="app_email_addr" onChange={ e => {setDataInput(e)}}/>
                    </div>
                </div><br/><br/>
                
                {/* 
                    //==========================================
                    // CAPTCHA INFORMATION SECTION
                    //==========================================
                */}
                <div className="pds-prof-class-two">
                    <div>
                        <ReCAPTCHA
                            // ref={recaptchaResetRef}
                            sitekey="6LdIujEcAAAAAJRdTNTP0jkmHt60fVZMlj7Fn7nT"
                            onChange={()=>setVerifyCaptcha(true)}
                            onExpired={()=>setVerifyCaptcha(false)}
                            onErrored={()=>setVerifyCaptcha(false)}
                        />
                    </div>
                    <div>
                        <ButtonComponent buttonName="Submit"/>
                    </div>
                </div>

            </form><br/><br/>

        </React.Fragment>
    );
}


export default FormPageOne;