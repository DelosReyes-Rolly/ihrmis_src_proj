import React, { useMemo, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { API_HOST } from "../../../../helpers/global/global_config.js";
import { useTable, useSortBy, useGlobalFilter, useFilters } from "react-table";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useSelectValueCon } from "../../../../helpers/use_hooks/select_value_cons.js";
import { useToggleHelper } from "../../../../helpers/use_hooks/toggle_helper.js";
import { MdAdd } from "react-icons/md";
import { GroupClusterData } from "../static/input_items.js";
import GroupClusterModal from "./category_groups_modal.js";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper.js";
import { setRefresh } from "../../../../features/reducers/popup_response";
import { ALERT_ENUM, popupAlert } from "../../../../helpers/alert_response.js";

const CategoryGroupsTable = () => {
  const dispatch = useDispatch();
  let [toggleOfficeModal, setToggleOfficeModal] = useToggleHelper(false);
  const { renderBusy } = usePopUpHelper();
  const [plotCategories, setCategories] = useState([]);
  const { refresh } = useSelector((state) => state.popupResponse);
  const { trueValue } = useSelectValueCon();
  const categoryGroupsData = useCallback(async () => {
    await axios
      .get(API_HOST + "category-groups")
      .then((response) => {
        let data = response.data.data ?? [];
        let dataPlot = [];
        data.forEach((data) => {
          let values = {
            grp_id: data.grp_id,
            grp_name: data.grp_name,
            grp_level: data.grp_level,
            grp_cluster: data.grp_cluster,
            grp_cluster_text: trueValue(data.grp_cluster, GroupClusterData),
          };

          dataPlot.push(values);
        });
        setCategories(dataPlot);
      })
      .catch((error) => {});
    renderBusy(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);
  useEffect(() => {
    categoryGroupsData();
  }, [categoryGroupsData]);

  let data = useMemo(() => plotCategories, [plotCategories]);
  const columns = useMemo(
    () => [
      {
        Header: "Group ID",
        accessor: "grp_id",
      },
      {
        Header: "Group Name",
        accessor: "grp_name",
      },
      {
        Header: "Level",
        accessor: "grp_level",
      },
      {
        Header: "Group Cluster",
        accessor: "grp_cluster",
      },
      {
        Header: "Group Cluster",
        accessor: "grp_cluster_text",
      },
    ],
    []
  );

  const initialState = {
    hiddenColumns: ["grp_id", "grp_cluster"],
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        initialState,
        columns,
        data,
      },
      useFilters,
      useGlobalFilter,
      useSortBy
    );
  const removeCategory = async (record) => {
    renderBusy(true);
    await axios
      .delete(API_HOST + `category-groups/${record}`)
      .then(() => {
        popupAlert({
          message: "Category was deleted",
          type: ALERT_ENUM.success,
        });
      })
      .catch((err) => {
        popupAlert({
          message: err.message,
          type: ALERT_ENUM.fail,
        });
      });
    renderBusy(false);
    setToggleOfficeModal();
    setDataState(null);
    dispatch(setRefresh());
  };

  const [dataState, setDataState] = useState();
  const passModalData = (param) => {
    setDataState(param);
    setToggleOfficeModal();
  };
  return (
    <div>
      <div style={{ margin: 20 }}>
        <button className="btn-primary" onClick={() => setToggleOfficeModal()}>
          <MdAdd style={{ padding: 0, margin: 0 }} size="14" />
          <span>Category Group</span>
        </button>
      </div>
      <GroupClusterModal
        isDisplay={toggleOfficeModal}
        onClose={() => {
          setToggleOfficeModal();
          setDataState(null);
        }}
        data={dataState}
        remove={() => {
          if (dataState !== null) {
            removeCategory(dataState.grp_id);
          } else {
            setToggleOfficeModal();
          }
        }}
        removeName={dataState !== null ? "Delete" : "Close"}
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
              let officeData = {};
              row.allCells.forEach((cell) => {
                let test = { [cell.column.id]: cell.value };
                officeData = { ...officeData, ...test };
              });

              return (
                <tr
                  className="trHoverBody"
                  {...row.getRowProps()}
                  onClick={() => {
                    passModalData(officeData);
                  }}
                >
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
    </div>
  );
};

export default CategoryGroupsTable;
