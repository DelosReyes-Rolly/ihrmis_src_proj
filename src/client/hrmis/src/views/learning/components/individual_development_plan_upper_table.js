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

function IndividualDevelopmentPlanUpperTable() {
  let iconStyles = { fontSize: "0.8em", color: "#084c84"};
 const data = React.useMemo(
     () => [
       {
       
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
         Header: '',
         accessor: 'col2',
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
} = useTable({ columns, data }, useSortBy);
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

export default IndividualDevelopmentPlanUpperTable;