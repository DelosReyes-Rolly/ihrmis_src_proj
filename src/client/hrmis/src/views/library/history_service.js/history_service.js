import React, { useMemo, useState } from "react";
import { useFilters, useGlobalFilter, useSortBy, useTable } from "react-table";
import BreadcrumbComponent from "../../common/breadcrumb_component/Breadcrumb";
import SearchComponent from "../../common/input_component/search_input/search_input";
import PositionModal from "../../rsp_module/plantilla/page_component/plantilla_info_modals/position_modal";
import { libraryCategoryGroupsBreadCrumbs } from "../../rsp_module/plantilla/static/breadcramp_data";
import { MdAdd } from "react-icons/md";

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
  const [dataforTable] = useState([]);
  // setDataForTable
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

  const data = useMemo(() => dataforTable, [dataforTable]);

  return <ActualTable columns={columns} data={data} />;
};

const ActualTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );
  const { globalFilter } = state;
  // Render the UI for your table
  return (
    <div className="default-table">
      <SearchNavigation search={globalFilter} setSearch={setGlobalFilter} />

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

const SearchNavigation = ({ search, setSearch }) => {
  const [showPosModal, setShowPosModal] = useState(false);

  return (
    <React.Fragment>
      <PositionModal
        onClose={() => setShowPosModal(false)}
        isDisplay={showPosModal}
      />

      <div className="selector-buttons" style={{ margin: "0px -20px" }}>
        <div>
          <span className="selector-span-1">
            <button
              className="btn-primary"
              onClick={() => setShowPosModal(true)}
            >
              <MdAdd style={{ padding: 0, marginRight: "5px" }} size="14" />
              <span>Position</span>
            </button>
          </span>
        </div>

        <div
          className="search-container"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          <span className="margin-right-1 selector-search-label">
            <label>Search</label>
          </span>
          <span>
            <SearchComponent
              placeholder="Search"
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};
