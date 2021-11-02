import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { setBusy } from '../../../../../../../features/reducers/loading_slice';
import { setFail } from '../../../../../../../features/reducers/popup_response';
import { API_HOST } from '../../../../../../../helpers/global/global_config';
import { useDelayService } from '../../../../../../../services/delay_service';
import { useFormService } from '../../../../../../../services/form_service';
import InputComponent from '../../../../../../common/input_component/input_component/input_component';
import ModalComponent from '../../../../../../common/modal_component/modal_component';
import ValidationComponent from '../../../../../../common/response_component/validation_component/validation_component';

// ===========================================================
// USED IN FORM PAGE THREE
// ===========================================================
//http://localhost:8000/api/new-csc-eleigibility/

const ThreeAddCivilServiceModal = (props) => {

 // ===========================================================
    // CUSTOM HOOK SERVICE
    // ===========================================================
    const [dataState, singleInput, multiInput, setter] = useFormService();
    const [failed, succeed] = useDelayService();

    // ===================================
    // REDUX STATE AND FUNCIONALITIES
    // ===================================
    const dispatch = useDispatch();


    // ===================================
    // HANDLING ROUTES
    // ===================================
    const { item } = useParams();
    
    // ===================================
    // ERROR HANDLING STATE
    // ===================================
    const [serverErrorResponse, setServerErrorResponse] = useState();

    // ===========================================================
    // SUBMIT HANDLER
    // ===========================================================
    const submitHandler = async (e) => {
        e.preventDefault();
        
        dispatch(setBusy(true));
        await axios.post(API_HOST + `/new-csc-eleigibility/${item}`, dataState)
        .then((response) => {  
            e.target.reset();
            setServerErrorResponse(null); succeed();
            props.onClose();
        }).catch(error => {
    
            if(error.response){
                if(error.response.status === 422){
                    console.log(error.response.data.errors);              
                    setServerErrorResponse(Object.values(error.response.data.errors));
                    failed();
                    setTimeout(()=>{
                        setServerErrorResponse(null);
                    }, 10000); 
                } else if(error.response.status === 404){
                    console.log('404 Page Not Found');
                    // history.push('/ihrmis/plantilla/four-zero-four')
                    setServerErrorResponse([`404: ${error.response.data.message}`]);
                    failed();
                    setTimeout(()=>{
                        setServerErrorResponse(null);
                    }, 10000); 
                } else if(error.response.status === 500){
                    console.log('500 API Internal Error!');
                    console.log(error.response.data.message);
                    setServerErrorResponse([`500: ${error.response.data.message}`]);
                    failed();
                    setTimeout(()=>{
                        setServerErrorResponse(null);
                    }, 10000); 
                }
                
            } else if (error.request){
                console.log('No response from server');
                setServerErrorResponse([`Please check your network connectivity`]);
                failed();
                setTimeout(()=>{
                    setServerErrorResponse(null);
                }, 10000); 
            } else {
                console.log('Oops! Something went wrong');
                setServerErrorResponse([`Oops! Something went wrong`]);
                dispatch(setFail(true));
                failed();
                setTimeout(()=>{
                    setServerErrorResponse(null);
                }, 10000); 
            }

        });
        dispatch(setBusy(false));
    }

    useEffect(()=>{
        setter({
            "item":  props.data ? props.data.cse_app_time : '',
            "cse_app_title": props.data ? props.data.cse_app_title : '',
            "cse_app_date": props.data ? props.data.cse_app_date : '',
            "cse_app_place": props.data ? props.data.cse_app_place : '',
            "cse_app_rating": props.data ? props.data.cse_app_rating : '',
            "cse_app_license": props.data ? props.data.cse_app_license : '',
            "cse_app_validity": props.data ? props.data.cse_app_validity : '',
        });
    },[props.isDisplay])

    return (
        <React.Fragment>
            <ModalComponent
                title="Civil Service Eligibility"
                onSubmitName="Save"
                onCloseName="Delete" 
                isDisplay={props.isDisplay}
                onSubmit={ submitHandler }
                onSubmitType="submit"
                onPressed={props.onPressed}
                onClose={props.onClose}
            >
                <div className="add-csc-modal-container">

                    {serverErrorResponse && 
                        <ValidationComponent title="FAILED TO SUBMIT">   
                            {
                                serverErrorResponse.map((item, key)=>{
                                    return <p key={key}>- {item}</p>
                                }) 
                            }
                        </ValidationComponent>
                    } 
                    <br/>
                    
                    <div className="first-type-div">
                        <label>Career Service/RA 1080 (Board Bar) Under Special Law/ CES/ CSEE Barangay Eligibility, Driver's License</label>
                        <InputComponent name="cse_app_title" value={dataState.cse_app_title} onChange={ e => { singleInput(e) }}/>
                    </div>

                    <div className="second-type-div">
                        <div className="rating">
                            <label>Rating (if applicable)</label>
                            <InputComponent name="cse_app_rating" value={dataState.cse_app_rating} onChange={ e => { singleInput(e) }} />
                        </div>
                        <div className="examination-date">
                            <label>Date of Examination Conferment</label>
                            <InputComponent type="date" name="cse_app_date" value={dataState.cse_app_date} onChange={ e => { singleInput(e) }}/>
                        </div>
                    </div>

                    <div className="first-type-div">
                        <label>Place of Examination/Confernment</label>
                        <InputComponent name="cse_app_place" value={dataState.cse_app_place} onChange={ e => { singleInput(e) }}/>
                    </div>

                    <div  className ="second-type-div">
                        <div className="license-number">
                            <label>License Number (if applicable)</label>
                            <InputComponent name="cse_app_license" value={dataState.cse_app_license} onChange={ e => { singleInput(e) }}/>
                        </div>
                        <div className="validity">
                            <label>Date of Validity</label>
                            <InputComponent type="date" name="cse_app_validity" value={dataState.cse_app_validity} onChange={ e => { singleInput(e) }}/>
                        </div>
                    </div>
                </div>
            </ModalComponent>
        </React.Fragment>
    )
}

export default ThreeAddCivilServiceModal;
