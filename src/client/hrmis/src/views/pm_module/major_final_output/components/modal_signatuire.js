import React from 'react'
import CheckboxComponent from '../../../common/input_component/checkbox_input_component/checkbox_input_component'
import SelectComponent from '../../../common/input_component/select_component/select_component'
import TextAreaComponent from '../../../common/input_component/textarea_input_component/textarea_input_component'
import ModalComponent from '../../../common/modal_component/modal_component'

const ModalSignature = ({ isDisplay, onClose }) => {
  return (
    <React.Fragment>
      <ModalComponent 
        isDisplay={isDisplay} 
        onClose={onClose} 
        title={'Signature'}
      >
        <div className="signature-body">
          <div className='signature-switch'>
            <div>
              Name of Signatory
            </div>
            <div>
              <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
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

          <div className='signature-checkbox'>
            <div>
              <CheckboxComponent />
              Remember
            </div>
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  )
}

export default ModalSignature