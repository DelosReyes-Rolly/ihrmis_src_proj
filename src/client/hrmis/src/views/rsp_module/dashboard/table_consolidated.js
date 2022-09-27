import { useState } from "react";
import tableData1 from "./tableData2.json";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const TableConsolidated = () => {
 const [tableData, setTableData] = useState(tableData1);

 const columns = [
  { label: "Performance Gap", accessor: "performace_gap" },
  { label: "Development Activity", accessor: "development_activity" },
  { label: "Completion & Support", accessor: "completion_and_support" },
  { label: "Employee", accessor: "employee" },
 ];

 return (
  <>
   <table className="table">
    <TableHead columns={columns} />
    <TableBody columns={columns} tableData={tableData} />
   </table>
  </>
 );
};

export default TableConsolidated;