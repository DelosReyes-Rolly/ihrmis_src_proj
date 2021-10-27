import React, { useState } from 'react';
import InputComponent from '../../../../../../common/input_component/input_component/input_component';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { useFormService } from '../../../../../../../services/form_service';
import ButtonComponent from '../../../../../../common/button_component/button_component.js';
import axios from 'axios';
import { API_HOST } from '../../../../../../../helpers/global/global_config';
import { useDelayService } from '../../../../../../../services/delay_service';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { setFail } from '../../../../../../../features/reducers/popup_response';
import { setBusy } from '../../../../../../../features/reducers/loading_slice';
import ValidationComponent from '../../../../../../common/response_component/validation_component/validation_component';

const FormPageTwo = () => {
    // =====================================
    // CUSTOM HOOK SERVICES
    // =====================================
    const [inputState, singleInput, multiInput, setter] = useFormService(); // FORM SERVICE
    const [failed, succeed] = useDelayService();

    // ===================================
    // REDUX STATE AND FUNCIONALITIES
    // ===================================
    const dispatch = useDispatch();


    // ===================================
    // HANDLING ROUTES
    // ===================================
    let history = useHistory();
    const { item } = useParams();
    
    // ===================================
    // ERROR HANDLING STATE
    // ===================================
    const [serverErrorResponse, setServerErrorResponse] = useState();

    // =====================================
    // LIST OF CHILDREN INFORMATION
    // =====================================
    const setChildObject = (e) => { // Set Child information
        const { name, value } = e.target;
        setchildState({
            ...childState,
            [name]: value,
        });
    }

    const [childState, setchildState] = useState({ // Child information
        name: '',
        birthday: '',
    });
    const [childArrayState, addChildArrayState] = useState([]); // List of chilldren

    const addChildArray = () => { // Push child information in array
        if(childState.name != '' && childState.birthday != ''){
            addChildArrayState([
                ...childArrayState,
                childState
            ]);
            setchildState({
                name: '',
                birthday: '',
            });

            multiInput('children', childArrayState);
        }                
    }
    
    const removeChildArray = (index) => { // Remove child from array
        addChildArrayState(childArrayState.slice(0, index).concat(childArrayState.slice(index + 1)));
        multiInput('children', childArrayState);
    }

    // =====================================
    // SUBMIT HANDLER FUNCTION
    // =====================================
    const submitHandler = async (e) => {
        e.preventDefault();
        history.push(`/ihrmis/plantilla/subbmit-success/${item}`);
        if(item !== null || item !== undefined){
            dispatch(setBusy(true));
            await axios.post(API_HOST + `/new-afc/${item}`, inputState)
            .then((response) => {  
                addChildArrayState([]);
                setServerErrorResponse(null);
                succeed();
                history.push(`/ihrmis/plantilla/subbmit-success/${item}`);
            }).catch(error => {
        
                if(error.response){
                    if(error.response.status === 422){
                        console.log(error.response.data.errors);              
                        setServerErrorResponse(Object.values(error.response.data.errors));
                        failed();
                    } else if(error.response.status === 404){
                        console.log('404 Page Not Found');
                        history.push('/ihrmis/plantilla/four-zero-four')
                        failed();
                    } else if(error.response.status === 500){
                        console.log('500 API Internal Error!');
                        console.log(error.response.data.message);
                        setServerErrorResponse([`500: ${error.response.data.message}`]);
                        failed();
                    }
                    
                } else if (error.request){
                    console.log('No response from server');
                    setServerErrorResponse([`Please check your network connectivity`]);
                    failed();
                } else {
                    console.log('Oops! Something went wrong');
                    setServerErrorResponse([`Oops! Something went wrong`]);
                    dispatch(setFail(true));
                    failed();
                }
    
            });
            dispatch(setBusy(false));
        }
    }

    return ( 
        <div className="pds-profile-main-view"><br/><br/>
            {/* 
                // =============================================
                // FORM PAGE TWO HEADER
                // =============================================
            */}
            {serverErrorResponse && 
                <ValidationComponent title="FAILED TO SUBMIT">   
                    {
                        serverErrorResponse.map((item, key)=>{
                            return <p key={key}>- {item}</p>
                        }) 
                    }
                </ValidationComponent>
            } <br/>
            {/* 
                // =============================================
                // FORM PAGE TWO HEADER
                // =============================================
            */}
            <table id="custom-table">
                <thead>
                    <tr className="main-headers">
                        <th className="">
                            II. FAMILY BACKGROUND
                        </th>
                    </tr>
                </thead>
            </table>
            <br/>

            {/* 
                // =============================================
                // SPOUSE INFORMATION
                // =============================================
            */}
            <form onSubmit={submitHandler}>

                <div>
                    <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                        <div style={{marginRight:"5px", width:"50%"}}>
                            <label>SPOUSE's Surname</label>
                            <InputComponent name="app_sps_nm_last" onChange={ (e) => singleInput(e) }/>
                        </div>
                        <div style={{marginLeft:"5px", width:"50%"}}>
                            <label>First Name</label>
                            <InputComponent name="app_sps_nm_first" onChange={ (e) => singleInput(e) }/>
                        </div>
                    </div>
                    <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                        <div style={{marginRight:"5px", width:"50%"}}>
                            <label>Middle Name</label>
                            <InputComponent name="app_sps_nm_mid" onChange={ (e) => singleInput(e) }/>
                        </div>
                        <div style={{marginLeft:"5px", width:"50%"}}>
                            <label>Name Extension (Jr., Sr.)</label>
                            <InputComponent name="app_sps_nm_extn" onChange={ (e) => singleInput(e) }/>
                        </div>
                    </div>
                    <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                        <div style={{marginRight:"5px", width:"50%"}}>
                            <label>Occupation</label>
                            <InputComponent name="app_sps_occupation" onChange={ (e) => singleInput(e) }/>
                        </div>
                        <div style={{marginLeft:"5px", width:"50%"}}>
                            <label>Employer/Business Name</label>
                            <InputComponent name="app_sps_bus_name" onChange={ (e) => singleInput(e) }/>
                        </div>
                    </div>
                    <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                        <div style={{marginRight:"5px", width:"65%"}}>
                            <label>Business Address</label>
                            <InputComponent name="app_sps_bus_addr" onChange={ (e) => singleInput(e) }/>
                        </div>
                        <div style={{marginLeft:"5px", width:"35%"}}>
                            <label>Telephone No.</label>
                            <InputComponent name="app_sps_tel_no" onChange={ (e) => singleInput(e) }/>
                        </div>
                    </div> <br/><br/>

                    {/* 
                        // =============================================
                        // FATHERS INFORMATION
                        // =============================================
                    */}

                    <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                        <div style={{marginRight:"5px", width:"50%"}}>
                            <label>FATHERS's Surname</label>
                            <InputComponent name="app_fthr_nm_last" onChange={ (e) => singleInput(e) }/>
                        </div>
                        <div style={{marginLeft:"5px", width:"50%"}}>
                            <label>First Name</label>
                            <InputComponent name="app_fthr_nm_first" onChange={ (e) => singleInput(e) }/>
                        </div>
                    </div>
                    <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                        <div style={{marginRight:"5px", width:"50%"}}>
                            <label>Middle Name</label>
                            <InputComponent name="app_fthr_nm_mid" onChange={ (e) => singleInput(e) }/>
                        </div>
                        <div style={{marginLeft:"5px", width:"50%"}}>
                            <label>Name Extension (Jr., Sr.)</label>
                            <InputComponent name="app_fthr_nm_extn" onChange={ (e) => singleInput(e) }/>
                        </div>
                    </div><br/><br/>

                    {/* 
                        // =============================================
                        // MOTHERS MAIDEN INFORMATION
                        // =============================================
                    */}
                    <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                        <div style={{marginRight:"5px", width:"50%"}}>
                            <label>MOTHER's MAIDEN Surname</label>
                            <InputComponent name="app_mthr_nm_last" onChange={ (e) => singleInput(e) }/>
                        </div>
                        <div style={{marginLeft:"5px", width:"50%"}}>
                            <label>First Name</label>
                            <InputComponent name="app_mthr_nm_first" onChange={ (e) => singleInput(e) }/>
                        </div>
                    </div>
                    <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                        <div style={{marginRight:"5px", width:"50%"}}>
                            <label>MOTHER's MAIDEN Middle Name</label>
                            <InputComponent name="app_mthr_nm_mid" onChange={ (e) => singleInput(e) }/>
                        </div>
                        <div style={{marginLeft:"5px", width:"50%"}}>
                            <label>Name Extension (Jr., Sr.)</label>
                            <InputComponent name="app_mthr_nm_extn" onChange={ (e) => singleInput(e) }/>
                        </div>
                    </div>
                </div><br/><br/>
                {/* 
                    // =============================================
                    // LIST OF CHILDREN INFORMATION
                    // =============================================
                */}

                { childArrayState && childArrayState.map((item, key) => {
                    return (
                        <div className="pds-prof-class-one" key={key}>
                            <div style={{marginRight:"5px", width:"70%"}}>
                                <InputComponent value={item.name} readOnly={true}/> 
                            </div>
                            <div style={{marginLeft:"5px", marginRight:"5px", width:"30%"}}>
                                <InputComponent value={item.birthday} readOnly={true}/>  
                            </div>
                            <div style={{display:"flex", alignItems:"center"}}>
                                <AiOutlineMinusCircle style={{color:"red"}} size="22px" onClick={()=>removeChildArray(key)}/>
                            </div>
                        </div>
                    );})}

                <div className="pds-prof-class-one">
                    <div style={{marginRight:"5px", width:"70%"}}>
                        <InputComponent onChange={(e) => setChildObject(e)} 
                            name="name" value={childState.name}/> 
                    </div>
                    <div style={{marginLeft:"5px", marginRight:"5px", width:"30%"}}>
                        <InputComponent type="date" onChange={(e) => setChildObject(e)} 
                            name="birthday" value={childState.birthday}/>  
                    </div>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <AiOutlinePlusCircle style={{color:"green"}} size="22px" onClick={()=>{
                            console.log(childState); 
                            addChildArray();
                        }}/>
                    </div>
                </div><br/><br/>

                <ButtonComponent type="submit" buttonName="Submit"/><br/><br/>
            </form>
        </div>
     );
}

 
export default FormPageTwo;