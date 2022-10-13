import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useTable } from 'react-table'
import { API_HOST } from '../../../../helpers/global/global_config'

const ShowRemarks = () => {
  return (
    <div style={{ margin: "20px 30px" }}>
      <DisplayRemarks />    
    </div>
  )
}

export default ShowRemarks

const DisplayRemarks = () => {
  const [remarksData, setRemarksData] = useState([]);
  
  const fetchRemarksData = async () => {
    await axios
      .get(API_HOST + "get-remarks")
      .then((response) => {
        const data = response?.data;
        setRemarksData([...data]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Remarks",
        accessor: "remarks",
      }
    ],
    []
  );

  const data = React.useMemo(() => remarksData, [remarksData]);

  useEffect(() => {
    fetchRemarksData();
  }, []);

  return (
    <div>
      <RemarksTable columns={columns} data={data} />
    </div>
  );

}

const RemarksTable = ({columns, data}) => {

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
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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