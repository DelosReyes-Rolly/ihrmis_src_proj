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

function ConsolidatedTable() {
  let iconStyles = { fontSize: "0.8em", color: "#084c84"};
 const data = React.useMemo(
     () => [
       {
        col1: "Lack in Leadership",
        col2: "On-the-Job-Training: Coaching on the job from supervisor",
        col3: "EO 2021: Time and assistance",
        col4: "Marianne Nguyen"
       },
       {
        col1: "Insufficient knowledge in Budgeting",
        col2: "Formal Classroom Training: External training on Budgeting",
        col3: "11-20-2021: Scholarship",
        col4: "Casey Chambers"
       },
       {
        col1: "Improve Management Skills",
        col2: "Developmental Activities/Interventions: Added responsibilities on managing ABC project",
        col3: "4th Quarter 2021: Official communication",
        col4: "Leanna Stevens"
       },
       {
        col1: "No knowledge about AI",
        col2: "Formal Classroom Training: Internal training on Introduction to Artificial Intelligence",
        col3: "2nd Quarter 2021: Time and budget",
        col4: "Justin Case; Leanna Stevens; Sebastian Philip Cloud"
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
         Header: 'Development Activity',
         accessor: 'col2',
       },
       {
         Header: 'Completion & Support',
         accessor: 'col3',
       },
       {
        Header: 'Employee',
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

export default ConsolidatedTable;