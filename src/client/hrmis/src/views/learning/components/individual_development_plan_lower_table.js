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

function IndividualDevelopmentPlanLowerTable() {
  let iconStyles = { fontSize: "0.8em", color: "#084c84"};
 const data = React.useMemo(
     () => [
       {
        col1: "Insufficient knowledge in Budgeting",
        col2: "Formal Classroom Training",
        col3: "External training on Budgeting",
        col4: "Scholarship",
        col5: "11-20-2021",
        // col1: "Improve Management Skills",
        // col2: "Developmental Activities/Interventions: Added responsibilities on managing ABC project",
        // col4: "4th Quarter 2021: Official communication",
       },
       {
        col1: "Improve Management Skills",
        col2: "Developemental Activities/ Interventions",
        col3: "Added Responsibility on managing ABC project",
        col4: "Official Communication",
        col5: "4th Quarter 2021",
       },
     ],
     []
 )

 const columns = React.useMemo(
     () => [
       {
         Header: 'Performance Gap',
         accessor: 'col1',
       },
       {
         Header: 'Developement Activity',
         accessor: 'col2',
       },
       {
          Header: 'Development Type',
          accessor: 'col3',
        },
        {
          Header: 'Support Needed',
          accessor: 'col4',
        },
        {
          Header: 'Completion Date',
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

export default IndividualDevelopmentPlanLowerTable;