import React, { useEffect, useState } from 'react'
import IconComponent from '../../../common/icon_component/icon';
import { useTable } from 'react-table';
import { TbArrowsDownUp } from "react-icons/tb";
import { IoIosMail } from 'react-icons/io';
import { MdMessage } from 'react-icons/md';
import ModalRemarks from './modal_remarks';
import ModalComments from './modal_comments';
import ButtonComponent from '../../../common/button_component/button_component';
import ModalReferences from './modal_references';
import ModalSignature from './modal_signature';
import axios from 'axios';
import { API_HOST } from '../../../../helpers/global/global_config';

const MfoTable = () => {
  return (
    <div>
      <TitleBar />
      <DropdownButtons />

      <DisplayMfoTable />
    </div>
  )
}

export default MfoTable

const DropdownButtons = () => {
  const [openModalComments, setOpenModalComments] = useState(false);
  const [openModalReferences, setOpenModalReferences] = useState(false);
  const [openModalSignature, setOpenModalSignature] = useState(false);
  return (
    <div>
      <div className='dropdown-group'>
        <select className='dropdown-design'>
          <option selected hidden>2022</option>
          <option>2022</option>
          <option>2021</option>
          <option>2020</option>
          <option>2019</option>
          <option>2018</option>
        </select>

        <select className='dropdown-design'>
          <option selected hidden>Status</option>
          <option>All</option>
          <option>In Preparation</option>
          <option>For Discussion</option>
          <option>For Revision</option>
          <option>For Review</option>
          <option>For Calibration</option>
          <option>Approved</option>
        </select>

        <ModalComments onClose={ () => setOpenModalComments(false)} isDisplay={openModalComments} />

        <ButtonComponent
        onClick={ () => setOpenModalComments(true)}
        buttonName="Comments"
        style={{ margin: 20 }}
        />

        <ModalReferences onClose={ () => setOpenModalReferences(false)} isDisplay={openModalReferences} />

        <ButtonComponent
        onClick={ () => setOpenModalReferences(true)}
        buttonName="References"
        style={{ margin: 20 }}
        />

        <ModalSignature onClose={ () => setOpenModalSignature(false)} isDisplay={openModalSignature} />

        <ButtonComponent
        onClick={ () => setOpenModalSignature(true)}
        buttonName="Signature"
        style={{ margin: 20 }}
        />
        
      </div>
    </div>
  );
}

const TitleBar = () => {
  const [modalRemarks, setModalRemarks] = useState(false);
  return (
    <div className="page-title">
      <div className="title-text">
        Major Final Output Table
      </div>

      <div className='btn-icon'>
        <div className='button-icon'>
          <IconComponent 
            id=""
            className="icon"
            icon={<IoIosMail />}
            toolTipId=""
            onClick={() => { 
            }}
            textHelper=""
          />
        </div>

        <ModalRemarks isDisplay={modalRemarks} onClose={() => setModalRemarks(false)} />
        <div className='button-icon'>
          <IconComponent 
            id=""
            className="icon"
            icon={<MdMessage />}
            toolTipId=""
            onClick={() => { 
              setModalRemarks(true)
            }}
            textHelper=""
          />
        </div>
      </div> 
    </div>
  )
}

const DisplayMfoTable = () => {
  const [mfoTable, setMfoTable] = useState([]);

  const fetchMfoTable = async () => {
    await axios
      .get(API_HOST + "get-mfo-table")
      .then((response) => {
        const data = response?.data;
        setMfoTable([...data]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Name of Office",
        accessor: "mfo_ofc_id",
      },
      {
        Header: "Date",
        accessor: "mfo_sts_time",
      },
      {
        Header: "Status",
        accessor: "Status",
      },
      {
        Header: "Remarks",
        accessor: "Remarks",
      },
    ],
    []
  );

  const data = React.useMemo(() => mfoTable, [mfoTable]);

  useEffect(() => {
    fetchMfoTable();
  },);

  return (
    <div>
      <MfoTableStucture columns={columns} data={data} />
    </div>
  );
}

const MfoTableStucture = ({columns, data}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()} 
                className="th-design"
              >
                <div>
                  <TbArrowsDownUp className='arrow-icon'/>
                  {column.render('Header')}
                </div>
                
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}
