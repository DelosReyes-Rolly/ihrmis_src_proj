import { useState } from "react";
import tableData1 from "./tableData1.json";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = () => {
 const [tableData, setTableData] = useState(tableData1);

 const columns = [
  { label: "Name of Office", accessor: "name_of_office" },
  { label: "Date", accessor: "date" },
  { label: "Status", accessor: "status" },
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

export default Table;
