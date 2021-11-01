import React, { useEffect, useState } from 'react';
import ModalComponent from '../../../../../../common/modal_component/modal_component';
import InputComponent from '../../../../../../common/input_component/input_component/input_component';
import SelectComponent from '../../../../../../common/input_component/select_component/select_component';
import { useHistory, useParams } from 'react-router-dom';
import { useFormService } from '../../../../../../../services/form_service';
import { useDelayService } from '../../../../../../../services/delay_service';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { API_HOST } from '../../../../../../../helpers/global/global_config';
import { setBusy } from '../../../../../../../features/reducers/loading_slice';
import { setFail } from '../../../../../../../features/reducers/popup_response';
import ValidationComponent from '../../../../../../common/response_component/validation_component/validation_component'
import { formThreeInput } from '../../../../static/input_items';

// ===========================================================
// USED IN FORM PAGE THREE
// ===========================================================

const ThreeAddEducationModal = (props) => {
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
    let history = useHistory();
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
        await axios.post(API_HOST + `/new-education/${item}`, dataState)
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
            "item":  props.data ? props.data.item : '',
            "edu_app_level": props.data ? props.data.level : '',
            "edu_app_school": props.data ? props.data.school : '',
            "edu_app_degree": props.data ? props.data.degree : '',
            "edu_app_from": props.data ? props.data.from : '',
            "edu_app_to": props.data ? props.data.to : '',
            "edu_app_graduated": props.data ? props.data.graduated : '',
            "edu_app_units": props.data ? props.data.unit_earned : '',
            "edu_app_honors": props.data ? props.data.honors : '',
        });
    },[props.isDisplay])
    
    return (
        <React.Fragment>
            <ModalComponent
                title="Educational Background"
                onSubmitName="Save"
                onCloseName="Delete" 
                isDisplay={props.isDisplay}
                onSubmit={ submitHandler }
                onSubmitType="submit"
                onPressed={props.onPressed}
                onClose={props.onClose}
            >
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
                <div className="add-educ-modal-container">
                    <div className="first-type-div">
                        <label>Level</label>
                        <SelectComponent name="edu_app_level" itemList={formThreeInput.add_educ_level} value={dataState.edu_app_level} defaultTitle="Education Level" onChange={ (e)=>{ singleInput(e) } } />
                    </div>

                    <div className="first-type-div">
                        <label>Name of School (write in full)</label>
                        <InputComponent name="edu_app_school" value={dataState.edu_app_school}  onChange={ (e)=>{ singleInput(e); } }  />
                    </div>

                    <div className="first-type-div">
                        <label>Basic Education/Degree/Course</label>
                        <InputComponent name="edu_app_degree" value={dataState.edu_app_degree} onChange={ (e)=>{ singleInput(e) } } />
                    </div>

                    <div className="first-type-div">
                        <label><strong>PERIOD OF ATTENDANCE</strong></label>
                    </div>
               
                    <div className="second-type-div">
                        <div className="from">
                            <label>From</label>
                            <InputComponent name="edu_app_from" value={dataState.edu_app_from}  onChange={ (e)=>{ singleInput(e) } } />
                        </div>
                        <div className="to">
                            <label>To</label>
                            <InputComponent name="edu_app_to" value={dataState.edu_app_to}  onChange={ (e)=>{ singleInput(e) } } />
                        </div>
                    </div>

                    <div  className ="second-type-div">
                        <div className="yearend">
                            <label>Year Graduated</label>
                            <InputComponent name="edu_app_graduated" value={dataState.edu_app_graduated} onChange={ (e)=>{ singleInput(e) } } />
                        </div>
                        <div className="highest">
                            <label>Highest Level/Units Earned (If not graduated)</label>
                            <InputComponent name="edu_app_units" value={dataState.edu_app_units} onChange={ (e)=>{ singleInput(e) } } />
                        </div>
                    </div>

                    <div className="first-type-div">
                        <label>Scholarship / Academic Honors Recieved</label>
                        <InputComponent name="edu_app_honors" value={dataState.edu_app_honors} onChange={ (e)=>{ singleInput(e) } } />
                    </div>
                    
                </div>
            </ModalComponent>
        </React.Fragment>
    )
}

export default ThreeAddEducationModal;
