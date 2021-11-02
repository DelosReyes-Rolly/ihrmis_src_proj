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
import SelectComponent from '../../../../../../common/input_component/select_component/select_component';
import ModalComponent from '../../../../../../common/modal_component/modal_component';
import ValidationComponent from '../../../../../../common/response_component/validation_component/validation_component';
import { formThreeInput } from '../../../../static/input_items';

// ===========================================================
// USED IN FORM PAGE THREE
// ===========================================================

const ThreeAddWorkExperienceModal = (props) => {

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
        await axios.post(API_HOST + `/new-work-experience/${item}`, dataState)
        .then((response) => {  
            e.target.reset();
            setServerErrorResponse(null); succeed();
            props.onClose();
            // setter(null); 
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
            "item":  props.data ? props.data.exp_app_time : '',
            "exp_app_from": props.data ? props.data.exp_app_from : '',
            "exp_app_to": props.data ? props.data.exp_app_to : '',
            "exp_app_position": props.data ? props.data.exp_app_position : '',
            "exp_app_agency": props.data ? props.data.exp_app_agency : '',
            "exp_app_salary": props.data ? props.data.exp_app_salary : '',
            "exp_app_grade": props.data ? props.data.exp_app_grade : '',
            "exp_app_step": props.data ? props.data.exp_app_step : '',
            "exp_app_appntmnt": props.data ? props.data.exp_app_appntmnt : '',
            "exp_app_govt": props.data ? props.data.exp_app_govt : '',
            "exp_app_rel_fields": props.data ? props.data.exp_app_rel_fields : '',
        });
    },[props.isDisplay])

    return (
        <React.Fragment>
             <ModalComponent
                title="Work Experience"
                onSubmitName="Save"
                onCloseName="Delete" 
                isDisplay={props.isDisplay}
                onPressed={props.onPressed}
                onSubmit={ submitHandler }
                onSubmitType="submit"
                onClose={props.onClose}
            >
                <div className="add-workexp-modal-container">

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
                        <label><strong>INCLUSIVE DATES</strong></label>
                    </div>
                    <div  className ="second-type-div">
                        <div className="from">
                            <label>From</label>
                            <InputComponent type="date" name="exp_app_from" value={dataState.exp_app_from} onChange={ e => { singleInput(e) }}/>
                        </div>
                        <div className="to">
                            <label>To</label>
                            <InputComponent type="date" name="exp_app_to" value={dataState.exp_app_to} onChange={ e => { singleInput(e) }}/>
                        </div>
                    </div>

                    <div className="first-type-div">
                        <label>Position Title (write in full/do not abbreviate)</label>
                        <InputComponent name="exp_app_position" value={dataState.exp_app_position} onChange={e => singleInput(e)} />
                    </div>

                    <div className="first-type-div">
                        <label>Department/Agency/Office/Company (write in full/do not abbreviate)</label>
                        <InputComponent name="exp_app_agency" value={dataState.exp_app_agency} onChange={e => singleInput(e)} />
                    </div>

                    <div className="third-type-div">
                        <div className="salary">
                            <label>Monthly Salary</label>
                            <InputComponent name="exp_app_salary" value={dataState.exp_app_salary} onChange={e => singleInput(e)} />
                        </div>
                        <div className="grade">
                            <label>(if applicable) Salary/Job/Grade</label>
                            <SelectComponent name="exp_app_grade" itemList={formThreeInput.add_work_grade} value={dataState.exp_app_grade} defaultTitle="Salary Grade" onChange={e => singleInput(e)}/>
                        </div>
                        <div className="increment">
                            <label>Step Increment</label>
                            <SelectComponent name="exp_app_step" itemList={formThreeInput.add_work_step} value={dataState.exp_app_step} defaultTitle="Step Increment" onChange={e => singleInput(e)}/>
                        </div>
                    </div>

                    {/* <div className="first-type-div">
                        <label>Place of Examination/Confernment</label>
                        <InputComponent />
                    </div> */}

                    <div  className ="second-type-div">
                        <div className="status">
                            <label>Status of Appointment</label>
                            <SelectComponent name="exp_app_appntmnt" itemList={formThreeInput.add_work_status} value={dataState.exp_app_appntmnt} defaultTitle="Status" onChange={e => singleInput(e)}/>
                        </div>
                        <div className="service">
                            <label>Government Service</label>
                            <SelectComponent name="exp_app_govt" itemList={formThreeInput.add_work_service} value={dataState.exp_app_govt} defaultTitle="Goverment Service" onChange={e => singleInput(e)} />
                        </div>
                    </div>

                    <div className="first-type-div">
                        <label>Related Field of Work</label>
                        <InputComponent name="exp_app_rel_fields" value={dataState.exp_app_rel_fields} onChange={e => singleInput(e)} />
                    </div>
                </div>
            </ModalComponent>
        </React.Fragment>
    )
}

export default ThreeAddWorkExperienceModal;
