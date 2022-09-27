import React from 'react';
import { useTable, useSortBy, useRowSelect } from 'react-table';
import { TbArrowsDownUp } from 'react-icons/tb'; 


const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

function SubmissionTable() {
  let iconStyles = { fontSize: "0.8em", color: "#084c84"};
 const data = React.useMemo(
     () => [
       {
        col1: "Office of the Secretary (OSEC)",
        col2: "01-15-2021",
        col3: "In-Preparation"
       },
       {
        col1: "Office of the Undersecretary for Scientific and Technical Services (OUSEC - STS)",
        col2: "11-20-2021",
        col3: "For Revision"
       },
       {
        col1: "Office of the Director for Planning and Evaluation Service (PES)",
        col2: "10-05-2021",
        col3: "Approved (Received)"
       },
       {
        col1: "Policy Developement and Planning Division (PDPD)",
        col2: null,
        col3: null
       },
     ],
     []
 )

 const columns = React.useMemo(
     () => [
       {
         Header: 'Name of Office',
         accessor: 'col1',
       },
       {
         Header: 'Date',
         accessor: 'col2',
       },
       {
         Header: 'Status',
         accessor: 'col3',
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
 } = useTable({ columns, data }, useSortBy, useRowSelect,hooks => {
  hooks.visibleColumns.push(columns => [
    // Let's make a column for selection
    ...columns,
    {
      id: 'selection',
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
      Cell: ({ row }) => (
        <div>
          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        </div>
      ),
    },
  
  ])
}
);

 return (
     <div>
       <table {...getTableProps()}>
         <thead>
         {headerGroups.map(headerGroup => (
             <tr {...headerGroup.getHeaderGroupProps()}>
               {headerGroup.headers.map(column => (
                   <th
                       {...column.getHeaderProps(column.getSortByToggleProps())}
                       style={{
                         color: '#084c84',
                         padding: '10px',
                         textAlign: 'left',
                         borderRight: '1px solid #ddd',
                       }}
                   >
                    <TbArrowsDownUp style={iconStyles}/> 
                     {column.render('Header')}
                     <span>
                       {column.isSorted
                           ? column.isSortedDesc
                               ? ''
                               : ''
                           : ''}
                    </span>
                   </th>
               ))}
             </tr>
         ))}
         </thead>
         <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
               <tr {...row.getRowProps()}>
                 {row.cells.map(cell => {
                   return (
                       <td
                           {...cell.getCellProps()}
                           style={{
                             padding: '10px',
                           }}
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
 );
}

export default SubmissionTable;