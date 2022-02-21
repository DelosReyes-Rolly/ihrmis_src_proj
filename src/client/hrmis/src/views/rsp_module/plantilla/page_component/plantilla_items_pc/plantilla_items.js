import BreadcrumbComponent from "../../../../common/breadcrumb_component/Breadcrumb";
import { plantillaItemsBreadCramp } from "../../static/breadcramp_data";
import SearchComponent from "../../../../common/input_component/search_input/search_input";
import { plantillaItemSelectFilter } from "../../static/filter_items";
import AddPlantillaItemModal from "../add_plantilla_item_modal/add_plantilla_item_modal";
import { useToggleService } from "../../../../../services/toggle_service";
import { API_HOST } from "../../../../../helpers/global/global_config";
import { statusDisplay } from "../../static/display_option";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters } from "react-table";

import axios from "axios";

const PlantillaItemPageComponentView = () => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <React.Fragment>
      <div className="plantilla-view">
        <div className="container-plantilla">
          <BreadcrumbComponent list={plantillaItemsBreadCramp} className="" />
        </div>

        <div className="regular-tab-component">
          <div className="reg-tab-container">
            <button
              onClick={() => toggleTab(1)}
              className={toggleState === 1 ? "reg-tab-activate" : "reg-tab"}
            >
              Regular
            </button>

            <button
              onClick={() => toggleTab(2)}
              className={toggleState === 2 ? "reg-tab-activate" : "reg-tab"}
            >
              Non-Regular
            </button>
          </div>

          <hr className="solid" />
        </div>

        <div className={toggleState === 1 ? "current-tab" : "show-none"}>
          <PlantillaDataTableDisplay type={1} />
        </div>

        {/* TAB SECOND NON REGULAR */}
        <div className={toggleState === 2 ? "current-tab" : "show-none"}>
          <PlantillaDataTableDisplay type={0} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlantillaItemPageComponentView;

export const PlantillaDataTableDisplay = ({ type }) => {
  const [plotData, setPlotData] = useState([]);
  const plantillaItemApi = async () => {
    await axios
      .get(API_HOST + "plantilla-items/" + type)
      .then((response) => {
        let data = response.data.data ?? [];

        let dataPlot = [];
        data?.forEach((element) => {
          dataPlot.push({
            itm_no: element.itm_no,
            pos_short_name: element.position.pos_short_name,
            ofc_acronym: element.office.ofc_acronym,
            itm_status: statusDisplay[element.itm_status],
            pos_category: element.position.pos_category,
          });
        });

        setPlotData(dataPlot);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useLayoutEffect(() => {
    plantillaItemApi();
  }, []);

  let data = useMemo(() => plotData, [plotData]);

  const columns = useMemo(
    () => [
      {
        Header: "Item No.",
        accessor: "itm_no", // accessor is the "key" in the data
      },
      {
        Header: "Position",
        accessor: "pos_short_name",
      },
      {
        Header: "Office",
        accessor: "ofc_acronym",
      },
      {
        Header: "Status",
        accessor: "itm_status",
      },
      {
        Header: "Category",
        accessor: "pos_category",
      },
    ],
    []
  );

  const initialState = { hiddenColumns: "pos_category" };

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
      <AddPlantillaItems
        type={type}
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

const AddPlantillaItems = ({ type, search, setSearch, statusFilter }) => {
  let [toggleAddPlantillaItem, setTogglePlantillaItem] =
    useToggleService(false);
  return (
    <React.Fragment>
      <div className="selector-buttons">
        <div className="selector-container">
          <span className="selector-span-1">
            <button onClick={() => setTogglePlantillaItem()}>
              <MdAdd size="14" />
              <span>Plantilla Item</span>
            </button>
          </span>
          <AddPlantillaItemModal
            isDisplay={toggleAddPlantillaItem}
            onClose={() => setTogglePlantillaItem()}
            type={type}
          />

          <span className="margin-left-1 selector-span-1">
            <select
              onChange={(e) => statusFilter("pos_category", e.target.value)}
            >
              {plantillaItemSelectFilter.map((item) => {
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
