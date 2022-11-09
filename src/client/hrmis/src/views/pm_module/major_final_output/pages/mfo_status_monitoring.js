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
    </div>
  );
};

export default StatusMonitoring;