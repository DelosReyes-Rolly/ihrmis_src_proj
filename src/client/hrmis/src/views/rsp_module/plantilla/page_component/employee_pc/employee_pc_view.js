import React, { useEffect, useMemo, useState } from "react";
import BreadcrumbComponent from "../../../../common/breadcrumb_component/Breadcrumb";
import { employeeItemsBreadCramp } from "../../static/breadcramp_data";
import SearchComponent from "../../../../common/input_component/search_input/search_input";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { MdAdd, MdMoreHoriz } from "react-icons/md";
import { useNavigate } from "react-router";
import { useFilters, useGlobalFilter, useSortBy, useTable } from "react-table";
import { useToggleHelper } from "../../../../../helpers/use_hooks/toggle_helper";
import axios from "axios";
import { ALERT_ENUM, popupAlert } from "../../../../../helpers/alert_response";
import { useSelector } from "react-redux";
import { API_HOST } from "../../../../../helpers/global/global_config";
import DropdownViewComponent from "../../../../common/dropdown_menu_custom_component/Dropdown_view";
import { EMPLOYEE_DROPDOWN } from "../../static/plantilla_vacant_positions_data";
import { EMPLOYEE_STATUS } from "../../static/filter_items";

const EmployeePageComponentView = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="plantilla-view">
        <div className="container-plantilla">
          <BreadcrumbComponent list={employeeItemsBreadCramp} className="" />
        </div>
        <div className="container-vacant-position">
          <div className="regular-tab-component">
            <div className="reg-tab-container">
              <button className="reg-tab-activate">List of Employee</button>
            </div>

            <hr className="solid" />
          </div>
        </div>
        <EmployeeDataTableDisplay />
      </div>
    </React.Fragment>
  );
};

export default EmployeePageComponentView;

export const EmployeeDataTableDisplay = () => {
  const { refresh } = useSelector((state) => state.popupResponse);
  const [plotData, setPlotData] = useState([]);
  const employeesList = async () => {
    await axios
      .get(API_HOST + "get-all-employee")
      .then((response) => {
        const data = response.data.data ?? [];
        const arrHolder = [];
        data.forEach((element) => {
          const pos_ofc = element?.emp_ofc_pos
            .split("\n")
            .map((str, key) => <p key={key}>{str}</p>);
          const status = element?.emp_status
            .split("\n")
            .map((str, key) => <p key={key}>{str}</p>);
          arrHolder.push({
            emp_name: element?.emp_name,
            emp_no: element?.emp_no,
            emp_itm_no: element?.emp_itm_no,
            emp_ofc_pos: pos_ofc,
            emp_status: status,
            svc_status: element?.svc_status,
          });
        });
        setPlotData(arrHolder);
      })
      .catch((err) => {
        popupAlert({
          message: err?.response?.data?.message ?? err.message,
          type: ALERT_ENUM.fail,
        });
      });
  };

  useEffect(() => {
    employeesList();
  }, [refresh]);

  const data = useMemo(() => plotData, [plotData]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "emp_name", // accessor is the "key" in the data
      },
      {
        Header: "Employee No.",
        accessor: "emp_no",
      },
      {
        Header: "Item No.",
        accessor: "emp_itm_no",
      },
      {
        Header: "Office & Position",
        accessor: "emp_ofc_pos",
      },
      {
        Header: "Status",
        accessor: "emp_status",
        Cell: ({ cell }) => (
          <React.Fragment>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                zIndex: 0,
              }}
            >
              <div>{cell.row.values.emp_status}</div>
              <div>
                <DropdownViewComponent
                  itemList={EMPLOYEE_DROPDOWN}
                  title={<MdMoreHoriz size="20" />}
                  alignItems="end"
                  toolTipId="other-actions"
                  textHelper="Click to view other actions"
                  className="dropdown-three-dots"
                />
              </div>
            </div>
          </React.Fragment>
        ),
      },
      {
        Header: "Service Status",
        accessor: "svc_status",
      },
    ],
    []
  );

  const initialState = { hiddenColumns: "svc_status" };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    setFilter,
  } = useTable(
    {
      initialState,
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  return (
    <React.Fragment>
      <br />
      <AddEmployee
        search={globalFilter}
        setSearch={setGlobalFilter}
        statusFilter={setFilter}
      />

      <div className="default-table">
        <table className="table-design" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                className="main-header"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <BsArrowDown />
                        ) : (
                          <BsArrowUp />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr className="trHoverBody" {...row.getRowProps()}>
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
        <p
          style={{
            fontSize: "small",
            color: "rgba(70, 70, 70, 0.6)",
            marginTop: "10px",
          }}
        >
          Total of {rows.length} entries
        </p>
      </div>
    </React.Fragment>
  );
};

const AddEmployee = ({ search, setSearch, statusFilter }) => {
  const [toggleAddPlantillaItem, setTogglePlantillaItem] =
    useToggleHelper(false);
  return (
    <React.Fragment>
      <div className="selector-buttons">
        <div className="selector-container">
          <span className="selector-span-1">
            <button
              className="btn-primary"
              onClick={() => setTogglePlantillaItem()}
            >
              <MdAdd style={{ padding: 0, margin: 0 }} size="14" />
              <span>Employee</span>
            </button>
          </span>
          <span className="margin-left-1 selector-span-1">
            <select
              onChange={(e) => statusFilter("svc_status", e.target.value)}
            >
              {EMPLOYEE_STATUS.map((item) => {
                return (
                  <option
                    className="options"
                    key={item.value}
                    value={item.value}
                  >
                    {item.title}
                  </option>
                );
              })}
            </select>
          </span>
        </div>

        <div className="search-container">
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
