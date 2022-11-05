import React from 'react'
import IconComponent from '../../../common/icon_component/icon'
import UploadAttachmentComponent from '../../../common/input_component/upload_attachment_component/upload_attachment_component'
import ModalComponent from '../../../common/modal_component/modal_component'
import { IoClose } from "react-icons/io5"

const ModalReferences = ({ isDisplay, onClose }) => {
  return (
    <React.Fragment>
      <ModalComponent 
        isDisplay={isDisplay} 
        onClose={onClose} 
        title={'References'}
      >
        <div className="references-body">
          <div style={{marginBottom: 10}}>Name</div>
          <div>
            <UploadAttachmentComponent />
          </div>
          <hr className='hr-references'/>
          <div className="references-files">
            <div>File 1</div>
            <IconComponent 
              icon={<IoClose />}
              className="delete-file"
            />
          </div>
          <div className="references-files">
            <div>File 2</div>
            <IconComponent 
              icon={<IoClose />}
              className="delete-file"
            />
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  )
}

export default ModalReferences