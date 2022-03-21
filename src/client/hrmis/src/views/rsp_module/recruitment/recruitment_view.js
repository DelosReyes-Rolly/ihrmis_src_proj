import React, { useMemo, useEffect, useLayoutEffect, useState } from "react";
import BreadcrumbComponent from "../../common/breadcrumb_component/Breadcrumb";
import DropdownViewComponent from "../../common/dropdown_menu_custom_component/Dropdown_view";
import SearchComponent from "../../common/input_component/search_input/search_input";
import BadgeComponent from "../../common/badge_component/Badge";
import { recruitmentBreadCramp } from "./static/breadcramp_item";
// import { recruitmentTableData } from "./fake_data/table_data";
import { useTable, useSortBy, useGlobalFilter, useFilters } from "react-table";

import { MdAdd, MdMoreHoriz } from "react-icons/md";
// import { BsArrowUpDown } from 'react-icons/bs'
import {
  recruitmentMenuItem,
  recruitmentSelectItem,
} from "./static/menu_items";
import { API_HOST } from "../../../helpers/global/global_config.js";
import axios from "axios";
import { recruitmentSelectFilter } from "./static/filter_items";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

const RecruitmentView = (props) => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [buttonToggleState, setButtonToggleState] = useState({
    on: false,
    index: 0,
  });
  const buttonTogleTab = (number) => {
    if (buttonToggleState.on === false) {
      setButtonToggleState({ on: true, index: number });
    } else {
      setButtonToggleState({ on: false, index: number });
    }
  };

  return (
    <React.Fragment>
      <div className="plantilla-view">
        <div className="container-plantilla">
          <BreadcrumbComponent list={recruitmentBreadCramp} className="" />
        </div>

        <div className="tab-button">
          <button
            onClick={() => toggleTab(1)}
            className={
              toggleState === 1 ? "tab-tap tab-tap-activate" : "tab-tap"
            }
          >
            Qualified
          </button>
          <BadgeComponent className="tab-badge-add-style" value={"1"} />
          <button
            onClick={() => toggleTab(2)}
            className={
              toggleState === 2
                ? "tab-tap tab-tap-activate margin-left-1"
                : "tab-tap margin-left-1"
            }
          >
            Disqualified
          </button>
          <hr className="solid" />
        </div>
        {/* TAB MENU STARTS HERE  */}
        <div className={toggleState === 1 ? "current-tab" : "show-none"}>
          <div className="selector-buttons">
            <div className="selector-container">
              <span className="selector-span-1">
                <button>
                  <MdAdd size="18" />
                  <span>Applicant</span>
                </button>
              </span>
              <span className="margin-left-1 selector-span-1">
                <select defaultValue={"DEFAULT"}>
                  <option value="DEFAULT" disabled>
                    Vacant Position
                  </option>
                  {recruitmentSelectFilter.map((item) => {
                    return (
                      <option
                        className="options"
                        key={item.value}
                        defaultValue={item.value}
                      >
                        {item.title}
                      </option>
                    );
                  })}
                </select>
              </span>
              <span className="margin-left-1 selector-span-1">
                <select defaultValue={"DEFAULT"}>
                  <option value="DEFAULT" disabled>
                    Filter By
                  </option>
                  {recruitmentSelectItem.map((item) => {
                    return (
                      <option
                        className="options"
                        key={item.value}
                        defaultValue={item.value}
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
                <SearchComponent placeholder="Search" />
              </span>
            </div>
          </div>
          <div className={toggleState === 1 ? "current-tab" : "show-none"}>
            <RecruitmentTable type={1} />
          </div>

          {/* TAB SECOND NON REGULAR */}
          <div className={toggleState === 2 ? "current-tab" : "show-none"}>
            {/* <RecruitmentTable type={0} /> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RecruitmentView;

const RecruitmentTable = ({ type }) => {
  const [plotApplicantData, setApplicantData] = useState([]);

  const applicantDataApi = async () => {
    await axios
      .get(API_HOST + "get-complete-applicant/" + type)
      .then((response) => {
        let data = response.data.data;
        let dataPlot = [];
        data.map((data) => {
          console.log(data);

          let values = {
            app_name: data.app_nm_last + ", " + data.app_nm_first ?? "ME",
            app_profile: data.app_profile ?? "ME",
            pos_applied: "i Dont Care" ?? "ME",
            app_qualifications: data.app_profile ?? "ME",
            sts_App_remarks: data.app_profile ?? "ME",
          };
          dataPlot.push(values);
        });
        setApplicantData(dataPlot);
        console.log();
      })
      .catch((error) => {});
  };

  useEffect(() => {
    applicantDataApi();
  }, []);
  const data = useMemo(() => plotApplicantData, [plotApplicantData]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "app_name", // accessor is the "key" in the data
      },
      {
        Header: "Profile",
        accessor: "app_profile",
      },
      {
        Header: "Qualifications",
        accessor: "app_qualifications",
      },
      {
        Header: "Position Applied",
        accessor: "pos_applied",
      },
      {
        Header: "Status",
        accessor: "sts_App_remarks",
      },
    ],
    []
  );

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
      {/* <AddPlantillaItems
        type={type}
        search={globalFilter}
        setSearch={setGlobalFilter}
        statusFilter={setFilter}
      /> */}
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
