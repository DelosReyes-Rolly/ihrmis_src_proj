import React, {useState} from 'react';
import BreadcrumbComponent from '../../../common/breadcrumb_component/Breadcrumb';
import MfoTable from '../components/mfo_table';
import { performanceBreadcrumb } from '../static/breadcrumb_data';

const StatusMonitoring = () => {

  const [openModalRemarks, setOpenModalRemarks] = useState(false);
  const [openModalComments, setOpenModalComments] = useState(false);

  return (
    <div>
      <BreadcrumbComponent list={performanceBreadcrumb} className="breadcrumb-design"/>
      <div className='content-container'>
        <MfoTable />
      </div>


      {/* <div className='modals'>
        <ModalRemarks onClose={ () => setOpenModalRemarks(false)} isDisplay={openModalRemarks} />

        <ButtonComponent
        onClick={ () => setOpenModalRemarks(true)}
        buttonName="Remarks"
        style={{ margin: 20 }}
        />

        <ModalComments onClose={ () => setOpenModalComments(false)} isDisplay={openModalComments} />

        <ButtonComponent
        onClick={ () => setOpenModalComments(true)}
        buttonName="Comments"
        style={{ margin: 20 }}
        />
      </div>
      <div>
        <ShowRemarks />
      </div> */}
    </div>
  );
};

export default StatusMonitoring;