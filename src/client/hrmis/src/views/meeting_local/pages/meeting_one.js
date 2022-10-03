import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { API_HOST } from "../../../helpers/global/global_config";
import ButtonComponent from "../../common/button_component/button_component";
import MeetingOneModal from "../modals/meeting_one_modal";

const MeetingOne = () => {
  const [modal, setModal] = useState(false);
  return (
    <div style={{ margin: "10px 20px" }}>
      <MeetingOneModal isDisplay={modal} onClose={() => setModal(false)} />

      <div className="container-hello">
        <ButtonComponent buttonName="MO-130" onClick={() => setModal(true)} />
      </div>
      <br />
      <div>
        <DisplayPerson modal={modal} />
      </div>
    </div>
  );
};

export default MeetingOne;

const DisplayPerson = ({ modal }) => {
  const [personData, setPersonData] = useState([]);

  const fetchPersonData = async () => {
    await axios
      .get(API_HOST + "get-person")
      .then((response) => {
        const data = response?.data;
        setPersonData([...data]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "psn_name",
      },
      {
        Header: "Email",
        accessor: "psn_email",
      },
    ],
    []
  );

  const data = React.useMemo(() => personData, [personData]);

  useEffect(() => {
    fetchPersonData();
  }, [modal]);

  return (
    <div>
      <PersonTable columns={columns} data={data} />
    </div>
  );
};

const PersonTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// const DisplayPerson = () => {
//   const [data, setData] = useState([]);

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Name",
//         accessor: "ppl_name",
//       },
//       {
//         Header: "Email",
//         accessor: "ppl_email",
//       },
//     ],

//     []
//   );

//   return <Table columns={columns} data={data} />;
// };

// const Table = ({ columns, data }) => {
//   // Use the state and functions returned from useTable to build your UI
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({
//       columns,
//       data,
//     });

//   // Render the UI for your table
//   return (
//     <table style={{ width: "100%" }} {...getTableProps()}>
//       <thead>
//         {headerGroups.map((headerGroup) => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column) => (
//               <th
//                 style={{ border: "1px solid gray", padding: "3px" }}
//                 {...column.getHeaderProps()}
//               >
//                 {column.render("Header")}
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map((row, i) => {
//           prepareRow(row);
//           return (
//             <tr {...row.getRowProps()}>
//               {row.cells.map((cell) => {
//                 return (
//                   <td
//                     style={{ border: "1px solid gray", padding: "3px" }}
//                     {...cell.getCellProps()}
//                   >
//                     {cell.render("Cell")}
//                   </td>
//                 );
//               })}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// };
