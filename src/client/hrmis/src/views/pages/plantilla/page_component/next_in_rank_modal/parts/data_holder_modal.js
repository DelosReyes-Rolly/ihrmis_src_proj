import { useToggleService } from "../../../../../../services/toggle_service";
import CheckboxComponent from "../../../../../common/input_component/checkbox_input_component/checkbox_input_component";

const DataHolderModal = (props) => {
    let [checkedState, setCheckedState] = useToggleService(false);
    let onChecked = checkedState ? "bold-selected" : "";
    return (
        <div>
            <br/>
            <div className={`nrm-body ${onChecked}`}>
                <div className="check-box-alignment container-1">
                    <span className="margin-right-1">
                        <CheckboxComponent checked={checkedState} onChange={setCheckedState}/>
                    </span>
                    <span>{props.name}</span>
                </div>
                <div className="container-2">{props.position}</div>
                <div className="container-3">{props.office}</div>
            </div>
        </div>
    );
}

export default DataHolderModal;