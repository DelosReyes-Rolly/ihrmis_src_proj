import React from 'react';
import ModalComponent from '../../../common/modal_component/modal_component';
import { HiOutlineUserCircle, HiPlus } from "react-icons/hi";
import IconComponent from '../../../common/icon_component/icon';
import { BsReply } from "react-icons/bs";

const ModalComments = ({ isDisplay, onClose }) => {
  return (
    <React.Fragment>
      <ModalComponent isDisplay={isDisplay} onClose={onClose} title={'Comments'}>
        <div className='comments'>
          <div className='comment-details'>
            <IconComponent 
            icon={<HiOutlineUserCircle />}
            className="user-profile"
            />

            <div className="username">Rodrigo Geneta</div>
            <div className="date-posted">26, September 2022</div>
          </div>

          <div className='comment'>
            <div className='text'>
              This is a sample comment. This is a sample comment This is a sample comment This is a sample comment.
            </div>
            <div className='action-group'>
              <button className='action'>Reply</button>
              <button className='action'>Delete</button>
            </div>
          </div>

          <div className='reply'>
            <div className='comment-details'>
              <IconComponent 
              icon={<HiOutlineUserCircle />}
              className="user-profile"
              />

              <div className="username">Rodrigo Geneta</div>
              <div className="date-posted">26, September 2022</div>
            </div>

            <div className='comment'>
              <div className='text'>
                This is a sample comment. This is a sample comment This is a sample comment This is a sample comment.
              </div>
              <div className='action-group'>
                <button className='action'>Reply</button>
                <button className='action'>Delete</button>
              </div>
            </div>

            <div className='new-comment'>
              <IconComponent 
              icon={<HiOutlineUserCircle />}
              className="user-profile"
              />

              <div className='input-box'>
                <input type='text' className='input-comment' placeholder='Type something...'/>
                <button type='submit' className='submit-comment'>
                  <IconComponent 
                  icon={<HiPlus />}
                  className="btn-comment"
                  />
                </button>
              </div>
              <button className='send-reply'>
                <IconComponent 
                icon={<BsReply />}
                className='btn-reply'
                />
              </button>
            </div>
          </div>

          <div className='new-comment'>
            <IconComponent 
            icon={<HiOutlineUserCircle />}
            className="user-profile"
            />
            <div className='input-box'>
              <input type='text' className='input-comment' placeholder='Type something...'/>
              <button type='submit' className='submit-comment'>
                <IconComponent 
                icon={<HiPlus />}
                className='btn-comment'
                />
              </button>
            </div>
            <button className='send-reply'>
              <IconComponent 
              icon={<BsReply />}
              className='btn-reply'
              />
            </button>
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  )
}

export default ModalComments