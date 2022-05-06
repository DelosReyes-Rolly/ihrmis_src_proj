import React, { Fragment, useEffect, useMemo, useState } from "react";
import ModalComponent from "./../../../../common/modal_component/modal_component";
import { useRowSelect, useTable } from "react-table";
import { IoAddCircleOutline } from "react-icons/io5";
import ButtonComponent from "../../../../common/button_component/button_component.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setContextMenu,
  setEmailRecepients,
  setNextRank,
  setRankEmail,
} from "../../../../../features/reducers/plantilla_item_slice";
import axios from "axios";
import { API_HOST } from "../../../../../helpers/global/global_config";
import { setRefresh } from "../../../../../features/reducers/popup_response";
import { ALERT_ENUM, popupAlert } from "../../../../../helpers/alert_response";
import { printNextRankMemoReport } from "../../../../../router/outside_routes";

/**
 * NOTES:
 * This table modal style is in _plantilla_view.scss
 */

const NextInRankModal = ({ isDisplay, onClose, plantilla }) => {
  const { refresh } = useSelector((state) => state.popupResponse);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dataFetched, setDataFetched] = useState([]);
  const fetch_id = plantilla ? plantilla?.itm_id : 1;

  const getNextInRankVacant = async () => {
    await axios
      .get(API_HOST + "get-next-rank-employees/" + fetch_id)
      .then((res) => {
        setDataFetched(res.data.data);
      });
  };

  const generateMemo = async () => {
    printNextRankMemoReport(fetch_id);
  };

  const onRemoveEmp = async () => {
    if (selectedItems.length !== 0) {
      await axios
        .post(API_HOST + "remove-to-next-rank", { item_list: selectedItems })
        .then(() => {
          dispatch(setRefresh());
          popupAlert({ message: "Removed Successfully" });
        })
        .catch((err) => {
          popupAlert({ message: err.message, type: ALERT_ENUM.fail });
        });
      return null;
    }
    popupAlert({
      message: "Please Select Next-in-Rank Employee to delete",
      type: ALERT_ENUM.fail,
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "nir_name",
      },
      {
        Header: "Position",
        accessor: "nir_pos_title",
      },
      {
        Header: "Office",
        accessor: "nir_office",
      },
      {
        Header: "Email",
        accessor: "nir_email",
      },
      {
        Header: "Emp ID",
        accessor: "nir_emp_id",
      },
      {
        Header: "Office ID",
        accessor: "nir_ofc_id",
      },
      {
        Header: "Agency ID",
        accessor: "nir_agn_id",
      },
      {
        Header: "Item ID",
        accessor: "nir_itm_id",
      },
    ],
    []
  );

  useEffect(() => {
    getNextInRankVacant();
  }, [refresh]);

  const data = useMemo(() => dataFetched, [dataFetched]);

  const onPressedNotify = () => {
    if (selectedItems.length != 0) {
      let arrHolder = [];
      selectedItems?.forEach((element) => {
        arrHolder.push(element.nir_email);
      });
      dispatch(setEmailRecepients(arrHolder));
      dispatch(setRefresh());
      dispatch(setNextRank());
      dispatch(setRankEmail());
      return null;
    }
    popupAlert({
      message: "Please Select Next-in-Rank Employee Recepient",
      type: ALERT_ENUM.fail,
    });
  };

  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <ModalComponent
        title="Next-in-Rank Employee"
        onSubmitName="Notify"
        onCloseName="Delete"
        isDisplay={isDisplay}
        onClose={onClose}
        onPressed={onRemoveEmp}
        onSubmitType="button"
        onSubStyle="notify-button-color"
        onPressStyle="delete-button-color"
        onClickSubmit={() => onPressedNotify()}
        addExtraButton={
          <ButtonComponent
            type="button"
            buttonName="Memo"
            onClick={() => generateMemo()}
          />
        }
      >
        <div className="next-rank-modal-container">
          <NextInRankTable
            data={data}
            columns={columns}
            selectedFunc={setSelectedItems}
            closeParent={onClose}
          />
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default NextInRankModal;

const NextInRankTable = ({ data, columns, selectedFunc }) => {
  const initialState = {
    hiddenColumns: [
      "nir_email",
      "nir_emp_id",
      "nir_ofc_id",
      "nir_agn_id",
      "nir_itm_id",
    ],
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      initialState,
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <TableCheckboxComponent {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <TableCheckboxComponent {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    if (selectedFlatRows) {
      selectedFunc(selectedFlatRows.map((d) => d.original));
    }
  }, [selectedFlatRows]);

  const dispatch = useDispatch();

  return (
    <Fragment>
      <table className="next-rank-table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              style={{ textAlign: "left", border: "1px solid black" }}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => {
                if (column.render("Header") === "Office") {
                  return (
                    <th style={{ color: "" }} {...column.getHeaderProps()}>
                      <div>
                        <span>{column.render("Header")}</span>
                        <span
                          className="span-icon"
                          onClick={() => {
                            dispatch(setNextRank());
                            dispatch(setContextMenu());
                          }}
                        >
                          <IoAddCircleOutline size={20} />
                        </span>
                      </div>
                    </th>
                  );
                }
                return (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                );
              })}
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
      <br />
      <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
    </Fragment>
  );
};

const TableCheckboxComponent = React.forwardRef(
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
