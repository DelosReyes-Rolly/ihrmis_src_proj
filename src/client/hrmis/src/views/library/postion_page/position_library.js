import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { API_HOST } from "../../../helpers/global/global_config";
import BreadcrumbComponent from "../../common/breadcrumb_component/Breadcrumb";
import SearchComponent from "../../common/input_component/search_input/search_input";
import PositionModal from "../../rsp_module/plantilla/page_component/plantilla_info_modals/position_modal";
import { libraryCategoryGroupsBreadCrumbs } from "../../rsp_module/plantilla/static/breadcramp_data";
import { categoryLevel } from "../static/library_functions";

const PositionLibrary = () => {
  return (
    <React.Fragment>
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
                  CIVIL SERVICE POSITION
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
    </React.Fragment>
  );
};

export default PositionLibrary;

const TableDisplay = () => {
  const [dataforTable, setDataForTable] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "pos_id",
      },
      {
        Header: "Title",
        accessor: "pos_title",
      },
      {
        Header: "Category Level",
        accessor: "pos_category",
        Cell: ({ cell }) => {
          return categoryLevel(cell?.row?.values?.pos_category);
        },
      },
      {
        Header: "SG",
        accessor: "education",
      },
      {
        Header: "Experience",
        accessor: "experience",
      },
      {
        Header: "Training",
        accessor: "training",
      },
    ],
    []
  );
  const { refresh } = useSelector((state) => state.popupResponse);

  const data = useMemo(() => dataforTable, [dataforTable]);

  const getCivilServicePosition = async () => {
    await axios
      .get(API_HOST + "get-info-position")
      .then((res) => setDataForTable(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCivilServicePosition();
  }, [refresh]);

  return (
    <React.Fragment>
      <ActualTable columns={columns} data={data} />
    </React.Fragment>
  );
};

const ActualTable = ({ columns, data }) => {
  const initialState = {
    hiddenColumns: ["pos_id"],
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      initialState,
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy
  );
  const { globalFilter } = state;
  // Render the UI for your table
  const [showPosEditModal, setShowPosEditModal] = useState(false);
  const [posId, setPosId] = useState(false);

  return (
    <div className="default-table">
      <SearchNavigation search={globalFilter} setSearch={setGlobalFilter} />

      <PositionModal
        id={posId}
        onClose={() => setShowPosEditModal(false)}
        isDisplay={showPosEditModal}
      />

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
              <tr className="trHoverBody" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      onClick={() => {
                        setPosId(cell.row.values.pos_id);
                        setShowPosEditModal(true);
                      }}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
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
