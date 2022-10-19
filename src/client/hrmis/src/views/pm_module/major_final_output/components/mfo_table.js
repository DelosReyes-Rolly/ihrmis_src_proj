import React from 'react'
import { useTable } from 'react-table'
import { TbArrowsDownUp } from "react-icons/tb";
import IconComponent from '../../../common/icon_component/icon';
import { IoIosMail } from 'react-icons/io';
import { MdMessage } from 'react-icons/md';
import { useState } from 'react';
import ModalRemarks from './modal_remarks';
import ModalComments from './modal_comments';
import ButtonComponent from '../../../common/button_component/button_component';
import ModalReferences from './modal_references';
import ModalSignature from './modal_signatuire';

const MfoTable = () => {
  const data = React.useMemo(
    () => [
      {
        col1: <input type="checkbox" />,
        col2: 'Office of the Secretary (OSEC)',
        col3: '01-15-2021',
        col4: 'In-Preparation',
        col5: '',
      },
      {
        col1: <input type="checkbox" />,
        col2: 'Office of the Undersecretary for Science and Technical Services (OUSEC-STS)',
        col3: '01-15-2021',
        col4: 'For Revision',
        col5: '',
      },
      {
        col1: <input type="checkbox" />,
        col2: 'Office of the Director for Planning and Evaluation Service (PES)',
        col3: '01-15-2021',
        col4: 'Approved',
        col5: '',
      },
      {
        col1: <input type="checkbox" />,
        col2: 'Policy Development and Planning Division (PDPD)',
        col3: '',
        col4: '',
        col5: '',
      },
    ],
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'col1', 
      },
      {
        Header: 'Name of Office',
        accessor: 'col2', 
      },
      {
        Header: 'Date',
        accessor: 'col3',
      },
      {
        Header: 'Status',
        accessor: 'col4',
      },
      {
        Header: 'Remarks',
        accessor: 'col5',
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <div>
      <TitleBar />
      <DropdownButtons />

      <table {...getTableProps()} className="table-design">
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
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} >
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="td-design"

                    >
                      {cell.render('Cell')}
                    </td>
                    
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

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

