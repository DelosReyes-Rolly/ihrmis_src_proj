import React from "react";
import ModalComponent from "./../../../../common/modal_component/modal_component";
import CheckboxComponent from "../../../../common/input_component/checkbox_input_component/checkbox_input_component";
import DataHolderModal from "./parts/data_holder_modal";
import { nextInRankData } from "../../fake_data/next_in_rank_data";

const NextInRankModal = (props) => {
    return(
        <React.Fragment>
            <ModalComponent
            title="Next-in-Rank Employee"
            onSubmitName="Notify"
            onCloseName="Memo" 
            isDisplay={props.isDisplay}
            onClose={props.onClose}>
                <div className="next-rank-modal-container">
                    <div className="nrm-header">
                        <div className="check-box-alignment container-1">
                            <span className="margin-right-1"><CheckboxComponent/></span>
                            <span>Name</span>
                        </div>
                        <div className="container-2">Position</div>
                        <div className="container-3">Office</div>
                    </div>
                </div>
                <hr style={{marginTop:"10px", border:"1px solid rgba(70, 70, 70, 0.1)"}}/>
                <div className="next-rank-modal-container">

                    {nextInRankData.map((item, key)=>{
                        return (
                            <DataHolderModal 
                            key={key}
                            name={item.name}
                            position={item.position}
                            office={item.office}
                        />
                        );
                    })}

                </div>

            </ModalComponent>
        </React.Fragment>
    );
}

export default NextInRankModal;