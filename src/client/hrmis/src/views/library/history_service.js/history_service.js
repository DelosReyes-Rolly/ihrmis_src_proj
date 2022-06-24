import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import BreadcrumbComponent from "../../common/breadcrumb_component/Breadcrumb";
import { libraryCategoryGroupsBreadCrumbs } from "../../rsp_module/plantilla/static/breadcramp_data";

const HistoryServiceLibrary = () => {
  return (
    <React.Fragment>
      <div>
        <BreadcrumbComponent
          list={libraryCategoryGroupsBreadCrumbs}
          className=""
        />
        <div className="container-vacant-position">
          <div className="regular-tab-component">
            <div className="reg-tab-container ">
              <button className={"reg-tab-activate"}>
                Employee History Service
              </button>
            </div>
          </div>
          <hr className="solid" />
        </div>
        <div>
          <TableDisplay />
        </div>
      </div>
    </React.Fragment>
  );
};

export default HistoryServiceLibrary;

const TableDisplay = () => {
  const [dataforTable, setDataForTable] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "svc_emp_id",
      },
      {
        Header: "Date",
        accessor: "svc_date",
      },
      {
        Header: "Action ID",
        accessor: "svc_act_id",
      },
      {
        Header: "Item ID",
        accessor: "svc_itm_id",
      },
      {
        Header: "Status",
        accessor: "svc_status",
      },
      {
        Header: "Salary",
        accessor: "svc_salary",
      },
      {
        Header: "Remarks",
        accessor: "svc_remarks",
      },
    ],
    []
  );

  const data = useMemo(() => dataforTable, []);

  return <ActualTable columns={columns} data={data} />;
};

const ActualTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <div className="default-table">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr className="main-header" {...headerGroup.getHeaderGroupProps()}>
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
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
