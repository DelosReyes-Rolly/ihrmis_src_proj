import React from 'react'
import UploadAttachmentComponent from '../../../common/input_component/upload_attachment_component/upload_attachment_component'
import ModalComponent from '../../../common/modal_component/modal_component'

const ModalReferences = ({ isDisplay, onClose }) => {
  return (
    <React.Fragment>
      <ModalComponent 
        isDisplay={isDisplay} 
        onClose={onClose} 
        title={'References'}
      >
        <div className="references-body">
          <label>Name</label>
          <UploadAttachmentComponent />
          <hr className='hr-references'/>
        </div>
      </ModalComponent>
    </React.Fragment>
  )
}

export default ModalReferences