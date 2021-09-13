import ModalComponent from "../../../../common/modal_component/modal_component";
import React from 'react';
import InputComponent from "../../../../common/input_component/input_component/input_component";
import SelectComponent from "../../../../common/input_component/select_component/select_component";
import TextareaComponent from '../../../../common/input_component/textarea_input_component/textarea_input_component';
import { apiCategoryServiceModalInputItem, apiEmploymentBasisModalInputItem, apiEmploymentStatModalInputItem, apiLevelPositionModalInputItem, apiModeCreationModalInputItem } from "../../static/input_items";


const AddPlantillaItemModal = (props) => {
    return (
        <React.Fragment>
            <ModalComponent
            title="Plantilla Items"
            onSubmitName="Save"
            onCloseName="Delete" 
            isDisplay={props.isDisplay}
            onClose={props.onClose}
            >
                <br/>
                <div className="add-plantilla-item-modal">
                    <span className="left-input item-modal-1">
                        <label>Item No.</label>
                        <InputComponent maxLength="10"/>
                    </span>
                    <span className="right-input item-modal-2">
                        <label>Employment Status</label>
                        <SelectComponent itemList={apiEmploymentStatModalInputItem}/>
                    </span>
                </div>

                <div className="add-plantilla-item-modal">
                    <span className="left-input item-modal-1">
                        <label>Position</label>
                        <SelectComponent />
                    </span>

                    <span className="right-input item-modal-2">
                        <label>Office</label>
                        <SelectComponent />
                    </span>
                </div>
                <div className="add-plantilla-item-modal">
                    <span className="left-input item-modal-3"><label>Employment Basis</label><SelectComponent itemList={apiEmploymentBasisModalInputItem}/></span>
                    <span className="middle-input item-modal-3"><label>Category Service</label><SelectComponent itemList={apiCategoryServiceModalInputItem}/></span>
                    <span className="right-input item-modal-4"><label>Level of Position</label><SelectComponent itemList={apiLevelPositionModalInputItem}/></span>
                </div>

                <div className="add-plantilla-item-modal">
                    <span className="item-modal-5">
                        <label>Description of Position Function</label>
                        <TextareaComponent maxLength="255"/>
                    </span>
                </div>

                <div className="add-plantilla-item-modal">
                    <span className="left-input item-modal-2"><label>Mode of Creation</label><SelectComponent itemList={apiModeCreationModalInputItem}/></span>
                    <span className="right-input item-modal-1"><label>Source of Fund</label><SelectComponent /></span>
                </div>

                <div className="add-plantilla-item-modal">
                    <span className="item-modal-5"><label>Position of Immediate Supervisor</label><SelectComponent /></span>
                </div>

                <div className="add-plantilla-item-modal">
                    <span className="item-modal-5"><label>Position of Next Higher Supervisor</label><SelectComponent /></span>
                </div>
                <br/>
            </ModalComponent>
        </React.Fragment>

    );
}

export default AddPlantillaItemModal;