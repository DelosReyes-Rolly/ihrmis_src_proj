import ModalComponent from "../../../../common/modal_component/modal_component";
import React, { useEffect, useState } from 'react';
import { API_HOST } from "../../../../../helpers/global/global_config"
import InputComponent from "../../../../common/input_component/input_component/input_component";
import SelectComponent from "../../../../common/input_component/select_component/select_component";
import TextareaComponent from '../../../../common/input_component/textarea_input_component/textarea_input_component';
import { apiCategoryServiceModalInputItem, apiEmploymentBasisModalInputItem, apiEmploymentStatModalInputItem, apiLevelPositionModalInputItem, apiModeCreationModalInputItem } from "../../static/input_items";
import { useFormService } from "../../../../../services/form_service";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBusy } from "../../../../../features/reducers/loading_slice";
import ValidationComponent from "../../../../common/response_component/validation_component/validation_component";
import { useDelayService } from "../../../../../services/delay_service";


const AddPlantillaItemModal = (props) => {
    // ==========================================
    // ERROR HANDLING
    // ==========================================
    const [serverErrorResponse, setServerErrorResponse] = useState();
    const [failed, succeed] = useDelayService();

    // ==========================================
    // CUSTOM HOOKS
    // ==========================================
    const [dataToSubmit, setDataToSubmit, setHidden, setter] = useFormService();
    
    // ==========================================
    // REDUX STATE MANAGEMENT
    // ==========================================
    const dispatch = useDispatch();


    // ==========================================
    // SUBMIT HANDLER
    // ==========================================
    const submitHandler = async (e) => {
        
        console.log('was pressed');
        e.preventDefault();
        dispatch(setBusy(true));
        await axios.post(API_HOST + '/plantilla-items', dataToSubmit)
            .then((response) => {
                setServerErrorResponse(null);
                e.target.reset(); setter(null);
                succeed();
            }).catch(error => {
        
                if(error.response){
                    if(error.response.status === 422){
                        setServerErrorResponse(Object.values(error.response.data.errors));
                        failed();
                        setTimeout(()=>{
                            setServerErrorResponse(null);
                        }, 10000); 

                    } else if(error.response.status === 404){
                        console.log('404 Page Not Found');
                        setServerErrorResponse(['404 Page Not Found']);
                        setTimeout(()=>{
                            setServerErrorResponse(null);
                        }, 10000); 
                        failed();
                    } else if(error.response.status === 500){
                        console.log('500 API Internal Error!');
                        setServerErrorResponse([`500 ${error.response.data.message}`]);
                        setTimeout(()=>{
                            setServerErrorResponse(null);
                        }, 10000); 
                    }
                    
                } else if (error.request){
                    console.log('No response from server');
                    setServerErrorResponse([`Please check your network connectivity`]);
                    setTimeout(()=>{
                        setServerErrorResponse(null);
                    }, 10000); 
                    failed();
                } else {
                    console.log('Oops! Something went wrong');
                    setServerErrorResponse(['Oops! Something went wrong']);
                    setTimeout(()=>{
                        setServerErrorResponse(null);
                    }, 10000); 
                }

            });
            dispatch(setBusy(false));
    };


    // ==========================================
    // GETTING POSITION AND OFFICE VALUE
    // ==========================================
    const [officePositionState, setOfficePositionState] = useState();

    const getPositionAndOffice = () => {
        axios.get(API_HOST + '/office-position').then(response => {
            setOfficePositionState(response.data.data);
            
        }).then(error => {

            if(error){
                if(error.response){
                    if(error.response.status === 422){
                        console.log('422 API server responded with an error');
                    } else if (error.response.status === 404){
                        console.log('404 NOT FOUND');
                    } else if (error.response.status === 500){
                        console.log('500 INTERNAL SERVER ERROR');
                    }
                } else if(error.request){
    
                } else{
    
                }
            }
        })
    }

    useEffect(()=>{
        getPositionAndOffice();
        setHidden('itm_regular', props.regularValue);
    },[]);

    return (
        <React.Fragment>
            <ModalComponent
            title="Plantilla Items"
            onSubmitName="Save"
            onCloseName="Delete" 
            isDisplay={props.isDisplay}
            onSubmit={ submitHandler }
            onSubmitType="submit"
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

                <div className="add-plantilla-item-modal">
                    <span className="left-input item-modal-1">
                        <label>Item No.</label>
                        <InputComponent name="itm_no" onChange={ (e)=>setDataToSubmit(e) } maxLength="30"/>
                    </span>
                    <span className="right-input item-modal-2">
                        <label>Employment Status</label>
                        <SelectComponent name="itm_status" onChange={ (e)=>setDataToSubmit(e) } itemList={apiEmploymentStatModalInputItem}/>
                    </span>
                </div>

                <div className="add-plantilla-item-modal">
                    <span className="left-input item-modal-1">
                        <label>Position</label>
                        <select className="select-component" style={{ marginTop:'3px' }}
                            name="itm_pos_id" 
                            onChange={ (e)=>setDataToSubmit(e) }
                        >
                            <option className="option-component" value="DEFAULT" disabled>{props.defaultTitle}</option>
                            {officePositionState && officePositionState.positions.map((item, key) => {
                                return (
                                    <option className="option-component" 
                                        key={key} 
                                        value={item.pos_id}
                                        >{item.pos_title}
                                    </option>
                                );
                            })}
                        </select>
                    </span>

                    <span className="right-input item-modal-2">
                        <label>Office</label>
                        <select className="select-component" style={{ marginTop:'3px' }}
                            name="itm_ofc_id" 
                            onChange={ (e)=>setDataToSubmit(e) }
                        >
                            <option className="option-component" value="DEFAULT" disabled>{props.defaultTitle}</option>
                            {officePositionState && officePositionState.offices.map((item, key)=> {
                                return (
                                    <option className="option-component" 
                                        key={key} 
                                        value={item.ofc_id}
                                        >{item.ofc_name}
                                    </option>
                                );
                            })}
                        </select>
                    </span>
                </div>
                <div className="add-plantilla-item-modal">
                    <span className="left-input item-modal-3">
                        <label>Employment Basis</label>
                        <SelectComponent name="itm_basis" onChange={ (e)=>setDataToSubmit(e)} itemList={apiEmploymentBasisModalInputItem}/>
                    </span>
                    <span className="middle-input item-modal-3">
                        <label>Category Service</label>
                        <SelectComponent name="itm_category" onChange={ (e)=>setDataToSubmit(e)} itemList={apiCategoryServiceModalInputItem}/>
                    </span>
                    <span className="right-input item-modal-4">
                        <label>Level of Position</label>
                        <SelectComponent name="itm_level" onChange={ (e)=>setDataToSubmit(e) } itemList={apiLevelPositionModalInputItem}/>
                    </span>
                </div>

                <div className="add-plantilla-item-modal">
                    <span className="item-modal-5">
                        <label>Description of Position Function</label>
                        <TextareaComponent name="itm_function" onChange={ (e)=>setDataToSubmit(e) } maxLength="255"/>
                    </span>
                </div>

                <div className="add-plantilla-item-modal">
                    <span className="left-input item-modal-2"><label>Mode of Creation</label><SelectComponent name="itm_creation" onChange={ (e)=>setDataToSubmit(e) } itemList={apiModeCreationModalInputItem}/></span>
                    <span className="right-input item-modal-1"><label>Source of Fund</label><SelectComponent /></span>
                </div>

                <div className="add-plantilla-item-modal">
                    <span className="item-modal-5">
                        <label>Position of Immediate Supervisor</label>
                        <SelectComponent />
                    </span>
                </div>

                <div className="add-plantilla-item-modal">
                    <span className="item-modal-5">
                        <label>Position of Next Higher Supervisor</label>
                        <SelectComponent />
                    </span>
                </div>
                <br/>
            </ModalComponent>
        </React.Fragment>

    );
}

export default AddPlantillaItemModal;