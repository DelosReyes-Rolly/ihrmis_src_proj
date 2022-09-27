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

function TeamDevelopmentPlanTable() {
  let iconStyles = { fontSize: "0.8em", color: "#084c84"};
 const data = React.useMemo(
     () => [
       {
        col1: "Marianne Nguyen",
        col2: "Lack in Leadership",
        col3: "On-the-Job-Training: Coaching on the job from supervisor",
        col4: "EO 2021: Time and assistance",
       },
       {
        col1: "Casey Chambers",
        col2: "Insufficient knowledge in Budgeting",
        col3: "Formal Classroom Training: External training on Budgeting",
        col4: "11-20-2021: Scholarship",
        // col2: "Improve Management Skills",
        // col3: "Developmental Activities/Interventions: Added responsibilities on managing ABC project",
        // col4: "4th Quarter 2021: Official communication",
       },
       {
        col1: "Case, Justin B.",
        col2: "No knowledge about AI",
        col3: "Formal Classroom Training: Internal training on Introduction to Artificial Intelligence",
        col4: "2nd Quarter 2021: Time and budget",
       },
       {
        col1: "Samuels, Sam C.",
        col2: null,
        col3: null,
        col4: null,
       },
     ],
     []
 )

 const columns = React.useMemo(
     () => [
       {
         Header: 'Employee',
         accessor: 'col1',
       },
       {
         Header: 'Performance Gap',
         accessor: 'col2',
       },
       {
         Header: 'Developement Activity',
         accessor: 'col3',
       },
       {
        Header: 'Completion & Support',
        accessor: 'col4',
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

export default TeamDevelopmentPlanTable;