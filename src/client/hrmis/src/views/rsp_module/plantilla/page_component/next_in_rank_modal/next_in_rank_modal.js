import React, { Fragment, useEffect, useMemo, useState } from "react";
import ModalComponent from "./../../../../common/modal_component/modal_component";
import { useRowSelect, useTable } from "react-table";
import { IoAddCircleOutline } from "react-icons/io5";
import ButtonComponent from "../../../../common/button_component/button_component.js";
import { useToggleHelper } from ".././../../../../helpers/use_hooks/toggle_helper";
import SelectAgencyModal from "./select_agency_modal";
import { useDispatch } from "react-redux";
/**
 * NOTES:
 * This table modal style is in _plantilla_view.scss
 */
const NextInRankModal = (props) => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "emp_name",
      },
      {
        Header: "Position",
        accessor: "pos_name",
      },
      {
        Header: "Office",
        accessor: "ofc_short_name",
      },
    ],
    []
  );
  const data = useMemo(
    () => [
      {
        emp_name: "Terrence Calzada",
        pos_name: "ITO-1",
        ofc_short_name: "ITD-CO",
      },
      {
        emp_name: "First Hokage Legee",
        pos_name: "ITO-1",
        ofc_short_name: "ITD-CO",
      },
    ],
    []
  );

  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <React.Fragment>
      <ModalComponent
        title="Next-in-Rank Employee"
        onSubmitName="Save"
        onCloseName="Memo"
        isDisplay={props.isDisplay}
        onClose={props.onClose}
        addExtraButton={<ButtonComponent buttonName="Notify" />}
      >
        <div className="next-rank-modal-container">
          <NextInRankTable
            data={data}
            columns={columns}
            selectedFunc={setSelectedItems}
            closeParent={props.onClose}
          />
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default NextInRankModal;

const NextInRankTable = ({ data, columns, selectedFunc, closeParent }) => {
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

  const [showAgencyModal, setShowAgencyModal] = useToggleHelper(false);

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
                            dispatch(setShowAgencyModal());
                            closeParent();
                          }}
                        >
                          <IoAddCircleOutline size={20} />
                        </span>
                      </div>
                    </th>
                  );
                }
                return (
                  <th style={{ color: "" }} {...column.getHeaderProps()}>
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
