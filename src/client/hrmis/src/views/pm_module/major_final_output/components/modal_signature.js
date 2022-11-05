import React from 'react'
import IconComponent from '../../../common/icon_component/icon'
import CheckboxComponent from '../../../common/input_component/checkbox_input_component/checkbox_input_component'
import SelectComponent from '../../../common/input_component/select_component/select_component'
import TextAreaComponent from '../../../common/input_component/textarea_input_component/textarea_input_component'
import ModalComponent from '../../../common/modal_component/modal_component'
import ToggleSwitchComponent from '../../../common/toggle_switch_component/toggle_switch'
import { AiOutlineFullscreen, AiOutlineUpload } from "react-icons/ai"
import SearchComponent from '../../../common/input_component/search_input/search_input'

const ModalSignature = ({ isDisplay, onClose }) => {
  return (
    <React.Fragment>
      <ModalComponent 
        isDisplay={isDisplay} 
        onClose={onClose} 
        title={'Signature'}
      >
        <div>
          <div className="signature-switch">
            <div>Name of Signatory</div>
            <div className="signatory-toggle">
              <ToggleSwitchComponent />
              <div style={{marginLeft: 5}}>Show All</div>
            </div>
          </div>

          <div style={{marginBottom: 10}}>
            <SelectComponent />
          </div>

          <div style={{marginBottom: 10}}>
            <TextAreaComponent 
              row={5}
            />
          </div>

          <div className="signature-bottom">
            <div className='signature-checkbox'>
              <CheckboxComponent />
              <div style={{marginLeft: 5}}>Remember</div>
            </div>

            <div className="signature-icons">
              <IconComponent 
                icon={<AiOutlineUpload />}
                className="signature-icon"
              />
              <IconComponent 
                icon={<AiOutlineFullscreen />}
                className="signature-icon"
              />
            </div>
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  )
}

export default ModalSignature