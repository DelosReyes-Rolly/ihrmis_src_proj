import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { API_HOST } from "../../../../../helpers/global/global_config";
import { statusDisplay } from "../../static/display_option";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  useRowSelect,
} from "react-table";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import FilterPlantillaItems from "./filter_plantilla_items";
import {
  plantillaItemsVacantPosMenuItems,
  tableHeaderColumnName,
} from "../../static/plantilla_vacant_positions_data";
import { MdMoreHoriz } from "react-icons/md";
import NextInRankModal from "../next_in_rank_modal/next_in_rank_modal";
import PlantillaEmailModal, {
  EMAIL_ENUM,
} from "../plantilla_email_modal/plantilla_email_modal";
import DropdownVpMenu from "./plantilla_vp_menu/Dropdownvpmenu";
import ContextMenuModal from "../next_in_rank_modal/context_menu_modal";
import {
  setContextMenu,
  setNextRank,
  setNotifyOffice,
  setRankEmail,
  setEmailRecepients,
  setItemID,
  setVcEmailTemplateData,
  setSelectedPlantillaItems,
  setSelectedAgencyRank,
} from "../../../../../features/reducers/plantilla_item_slice";
import PlantillaVpEmailModal from "./plantilla_vp_email_modal/plantilla_vp_email_modal";

/**
 * PlantillaDataTableDisplay
 * @param type
 * @returns
 */
export const PlantillaDataTableDisplay = ({ type }) => {
  const refresh = useSelector((state) => state.popupResponse.refresh);
  const [plotData, setPlotData] = useState([]);
  const [selected_item_id, setSelectedItemID] = useState([]);
  const { item_id, plantilla_items } = useSelector(
    (state) => state.plantillaItem
  );
  // const [filters, setFiltersTable] = useState([]);
  const dispatch = useDispatch();

  const getVcEmailTemplateData = async (item_id) => {
    await axios
      .get(API_HOST + "getVcEmailTemplateData/" + item_id)
      .then((res) => {
        // const dataPlantilla = res;
        dispatch(setVcEmailTemplateData(res.data.data));
        // console.log(res.data.data);
      })
      .catch((err) => console.log(err?.message));
  };

  const plantillaItemApi = async () => {
    await axios
      .get(API_HOST + "getAllPositions")
      .then((response) => {
        //console.log(response.data);
        let data = response?.data.data ?? [];
        let dataPlot = [];
        if (data.length > 0) {
          data.map((item) => {
            item.itm_status = statusDisplay[item.itm_status];
            item.ofc_acronym = item?.office?.ofc_acronym;
            item.ofc_agn_id = item?.office?.ofc_agn_id;
            item.agn_head_email = item?.office?.office_agency?.agn_head_email;
            dataPlot.push(item);
          });

          setPlotData(dataPlot);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onCLickRow = (rowData) => {
    dispatch(setItemID(rowData?.itm_id));
    dispatch(setEmailRecepients([rowData?.agn_head_email]));
    getVcEmailTemplateData(rowData?.itm_id);
    dispatch(setSelectedAgencyRank(rowData?.ofc_agn_id));
  };

  useLayoutEffect(() => {
    plantillaItemApi();
  }, [refresh]);

  let data = useMemo(() => plotData, [plotData]);
  let columns = useMemo(() => tableHeaderColumnName, [tableHeaderColumnName]);

  const initialState = {
    hiddenColumns: [
      "pos_category",
      "itm_id",
      "itm_state",
      "ofc_agn_id",
      "agn_head_email",
    ],
    filters: [
      {
        id: "itm_state",
        value: 0,
      },
    ],
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    setFilter,
    selectedFlatRows,
    preGlobalFilteredRows,
    setAllFilters,
  } = useTable(
    {
      initialState: initialState,
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  // useEffect(() => {
  // 	setSelectedRowData(selectedFlatRows);
  // 	console.log(selectedrowData.map((d) => d.original));
  // }, [selectedFlatRows]);

  const { globalFilter } = state;

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      );
    }
  );

  const setSelectedRowsData = async (selectedFlatRowsData) => {
    let selectedItems = [];
    let temp_selected = [];
    selectedFlatRowsData?.forEach((element) => {
      let sdata = {};
      sdata["itm_id"] = element.itm_id;
      temp_selected.push(sdata);
    });
    selectedItems["positions"] = temp_selected;
    dispatch(setSelectedPlantillaItems(selectedItems));
  };

  useEffect(() => {
    let selectedFlatRowsData = selectedFlatRows.map((d) => d.original);
    if (selectedFlatRowsData.length > 0) {
      setSelectedRowsData(selectedFlatRowsData);
    } else {
      dispatch(setSelectedPlantillaItems([]));
    }
  }, [selectedFlatRows]);
  return (
    <React.Fragment>
      <FilterPlantillaItems
        type={type}
        search={globalFilter}
        setSearch={setGlobalFilter}
        statusFilter={setFilter}
        preFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
        setAllFilters={setAllFilters}
        // setFiltersTable={setFiltersTable}
      />
      <SelectAction />
      {/* <SelectTableComponent list={plotData} /> */}
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
                  {row.cells.map((cell, index, arr) => {
                    if (index === arr.length - 1) {
                      return (
                        <td {...cell.getCellProps()}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>{cell.render("Cell")}</div>
                            <div
                              onClick={() => {
                                onCLickRow(cell.row.values);
                              }}
                            >
                              <DropdownVpMenu
                                itemList={plantillaItemsVacantPosMenuItems}
                                title={<MdMoreHoriz size="15" />}
                                alignItems="end"
                                tooltipData={{
                                  toolTipId: "other-actions",
                                  textHelper: "Click to view other actions",
                                }}
                              />
                            </div>
                          </div>
                        </td>
                      );
                    }
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

const SelectAction = () => {
  const dispatch = useDispatch();
  const { next_rank, context_menu, rank_email, notify_office, item_id } =
    useSelector((state) => state.plantillaItem);
  return (
    <React.Fragment>
      <PlantillaVpEmailModal
        isDisplay={notify_office}
        onClose={() => dispatch(setNotifyOffice())}
        type={EMAIL_ENUM.regular}
        endpoint={API_HOST + "notify-vacant-office"}
      />
      <NextInRankModal
        plantilla={{ itm_id: item_id }}
        isDisplay={next_rank}
        onClose={() => dispatch(setNextRank())}
      />
      <ContextMenuModal
        isDisplay={context_menu}
        onClose={() => dispatch(setContextMenu())}
      />
      <PlantillaEmailModal
        isDisplay={rank_email}
        onClose={() => dispatch(setRankEmail())}
        type={EMAIL_ENUM.next_rank}
        endpoint={API_HOST + "notify-next-rank"}
      />
    </React.Fragment>
  );
};

export default SelectAction;
