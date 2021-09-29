import ModalComponent from "../../../../common/modal_component/modal_component";
import React, { useState } from 'react';
import { API_HOST } from "../../../../../helpers/global/global_config"
import InputComponent from "../../../../common/input_component/input_component/input_component";
import SelectComponent from "../../../../common/input_component/select_component/select_component";
import TextareaComponent from '../../../../common/input_component/textarea_input_component/textarea_input_component';
import { apiCategoryServiceModalInputItem, apiEmploymentBasisModalInputItem, apiEmploymentStatModalInputItem, apiLevelPositionModalInputItem, apiModeCreationModalInputItem } from "../../static/input_items";
import { useFormService } from "../../../../../services/form_service";
import axios from "axios";
import { useDelayService } from "../../../../../services/delay_service";


const AddPlantillaItemModal = (props) => {
    const [serverResponse, setServerResponse] = useState();
    const [dataToSubmit, setDataToSubmit, setHidden] = useFormService();
    const submitHandler = async (e) => {
        console.log('was pressed');
        setHidden('itm_regular', props.regularValue ?? "1")
        e.preventDefault();
        console.log(dataToSubmit);
        
        await axios.post(API_HOST + '/plantilla-items', dataToSubmit)
            .then(response  => {
                e.target.reset();
            }).catch(error => {
                if(!error){

                    console.log(error.response.status);
                    if(error.response.status === 422){
                        setServerResponse(error.response.data.errors);
                        console.log(error.response.data.errors);
                        setTimeout(()=>{
                            setServerResponse(null);
                        }, 5000);
                        
                    }

                }
            });
    };

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
                {serverResponse && 
                    <div style={{ color:'red' }}>
                        <h4>Failed to Submit</h4>
                        
                        {serverResponse.itm_no && serverResponse.itm_no.map((data, key)=>{
                            return (
                                <p key={key}>{data}</p>
                            );
                        })}
                        {serverResponse.itm_function && serverResponse.itm_function.map((data, key)=>{
                            return (
                                <p key={key}>{data}</p>
                            );
                        })}
                    </div>
                }
                <br/>
                <div className="add-plantilla-item-modal">
                   

                    <span className="left-input item-modal-1">
                        <label>Item No.</label>
                        <InputComponent name="itm_no" onChange={ (e)=>setDataToSubmit(e) } maxLength="10"/>
                    </span>
                    <span className="right-input item-modal-2">
                        <label>Employment Status</label>
                        <SelectComponent name="itm_status" onChange={ (e)=>setDataToSubmit(e) } itemList={apiEmploymentStatModalInputItem}/>
                    </span>
                </div>

                <div className="add-plantilla-item-modal">
                    <span className="left-input item-modal-1">
                        <label>Position</label>
                        {/* name="itm_pos_id" onChange={ (e)=>setDataToSubmit(e) } */}
                        <SelectComponent  />
                    </span>

                    <span className="right-input item-modal-2">
                        <label>Office</label>
                        {/* name="itm_ofc_id" onChange={ (e)=>setDataToSubmit(e) } */}
                        <SelectComponent  />
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