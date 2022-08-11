import axios from "axios";
import { format } from "date-fns";
import moment from "moment";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalFilter, useTable } from "react-table";
import ReactTooltip from "react-tooltip";
import {
  setCurrentTable,
  setSelectedApplicantIdArray,
  setSelectedScheduleId,
} from "../../../../../features/reducers/onboarding_slice";

import { generateColor } from "../../../../../helpers/color_generator";
import { API_HOST } from "../../../../../helpers/global/global_config";
import { useMapFocusHelper } from "../../../../../helpers/use_hooks/on_focus_helper";

export const OnboardingNewAppointeesTableContainer = () => {
  const [newAppointees, setNewAppointees] = useState([]);
  const { refreshApi } = useSelector((state) => state.onboarding);

  const columns = useMemo(
    () => [
      {
        Header: "NEW APPOINTEES",
        columns: [
          {
            Header: "",
            accessor: "photo",
            Cell: ({ cell }) => {
              return (
                <React.Fragment>
                  <div>
                    <AppointeesImageDisplay
                      photo={cell.row.values.photo}
                      name={cell.row.values.name}
                    />
                  </div>
                </React.Fragment>
              );
            },
          },
          {
            Header: "",
            accessor: "name",
            Cell: ({ cell }) => {
              return (
                <React.Fragment>
                  <div>
                    <div
                      className=""
                      style={{
                        fontWeight: "bold",
                        color: "#000000",
                        fontSize: "medium !important",
                      }}
                    >
                      {cell.row.values.name}
                    </div>
                    <div style={{ color: "#00000080", fontSize: "small" }}>
                      {cell.row.values.position}, {cell.row.values.office}
                    </div>
                  </div>
                </React.Fragment>
              );
            },
          },
          {
            Header: "",
            accessor: "position",
          },
          {
            Header: "",
            accessor: "office",
          },
          {
            Header: "",
            accessor: "app_id",
          },
          {
            Header: "",
            accessor: "emp_id",
          },
          {
            Header: "",
            accessor: "itm_id",
          },
        ],
      },
    ],
    []
  );

  const data = useMemo(() => newAppointees, [newAppointees]);

  const fetchNewAppointees = async () => {
    await axios
      .get(API_HOST + "all-new-appointed")
      .then((res) => setNewAppointees(res.data?.data))
      .catch((err) => console.log(err.message));
  };

  useEffect(() => fetchNewAppointees(), [refreshApi]);

  return (
    <React.Fragment>
      <AppointeesTable data={data} columns={columns} />
    </React.Fragment>
  );
};

const AppointeesTable = ({ data, columns, searchable = true }) => {
  const dispatch = useDispatch();

  const { searchField, currentTable, selectedApplicantIdArray, modal } =
    useSelector((state) => state.onboarding);

  // const dispatch = useDispatch();

  const initialState = {
    hiddenColumns: ["position", "office", "app_id", "emp_id", "itm_id"],
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      initialState,
      columns,
      data,
    },
    useGlobalFilter
  );

  // Hook for Focus divs
  const [refTopic, , removeFocus, selectableFocus] = useMapFocusHelper(
    "onboarding-tr-hover",
    "onboarding-tr-hover-focus"
  );

  const selectedItemHandler = (index, appplicantId) => {
    let arrayHolder = [];
    if (currentTable === 1) {
      dispatch(setCurrentTable(2));
      dispatch(setSelectedScheduleId(null));
    }

    if (currentTable === 2) {
      arrayHolder = [...selectedApplicantIdArray];
    }

    if (!arrayHolder.includes(appplicantId)) {
      arrayHolder.push(appplicantId);
      dispatch(setSelectedApplicantIdArray([...arrayHolder]));
    } else {
      const i = arrayHolder.indexOf(appplicantId);
      if (i !== -1) {
        arrayHolder.splice(i, 1);
      }
      dispatch(setSelectedApplicantIdArray([...arrayHolder]));
    }

    dispatch(setCurrentTable(2));
    selectableFocus(index);
  };

  useEffect(() => {
    if (searchable) setGlobalFilter(searchField);
  }, [searchField]);

  useEffect(() => {
    if (currentTable == 1) removeFocus(data?.length);
  }, [currentTable]);

  useEffect(() => {
    if (modal === true) removeFocus(data?.length);
    if (modal === false) dispatch(setSelectedApplicantIdArray([]));
  }, [modal]);

  if (data.length < 1) {
    return (
      <React.Fragment>
        <table style={{ width: "100%" }}>
          <thead>
            <tr
              style={{
                color: "#004e87",
                textAlign: "left",
              }}
            >
              <th>NEW APPOINTEES</th>
            </tr>
          </thead>
          <tbody>
            <tr className="onboarding-tr-hover">
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  color: "#00000070",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                No appointee to display
              </td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <table
        cellSpacing="0"
        cellPadding="0"
        {...getTableProps()}
        style={{ width: "100%" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              style={{ textAlign: "left" }}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  style={{
                    padding: "0px 0px",
                    color: "#004e87",
                    fontSize: "medium",
                  }}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i, arr) => {
            prepareRow(row);
            return (
              <tr
                style={{ cursor: "pointer" }}
                ref={(el) => (refTopic.current[i] = el)}
                onClick={() => selectedItemHandler(i, row.values.app_id)}
                className="onboarding-tr-hover"
                {...row.getRowProps()}
                tabIndex={i}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      style={{
                        padding:
                          cell.column.id === "name"
                            ? "5px 0px 5px 5px"
                            : "5px 5px",
                        width: cell.column.id === "photo" ? "50px" : null,
                        color: "black",
                        fontSize: cell.column.id !== "photo" ? "medium" : null,
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
    </React.Fragment>
  );
};

export const OnboardingNewScheduleTableContainer = () => {
  const [schedules, setSchedules] = useState([]);
  const { refreshApi } = useSelector((state) => state.onboarding);
  const fetchOnboardingSchedule = async () => {
    await axios
      .get(API_HOST + "onboarding-schedule")
      .then((res) => {
        setSchedules([...res?.data]);
        console.log(res?.data);
      })
      .catch((err) => console.log(err.message));
  };

  const columns = useMemo(
    () => [
      {
        Header: "SCHEDULE",
        columns: [
          {
            Header: "",
            accessor: "appointees",
            Cell: ({ cell }) => {
              const objectOfContent = JSON.parse(cell.row.values.appointees);
              return (
                <ScheduleAppointeesImages objectOfContent={objectOfContent} />
              );
            },
          },
          {
            Header: "",
            accessor: "schedule",
            Cell: ({ cell }) => {
              // const objectOfContent = JSON.parse(cell.row.values.appointees);

              const holder = cell.row.values.schedule;
              const dateHolder = format(new Date(holder), "dd/MM/yyyy");
              const dateNow = format(new Date(), "dd/MM/yyyy");
              const isBold = dateHolder === dateNow;
              const isPending = dateHolder < dateNow;

              return (
                <React.Fragment>
                  <p
                    style={{
                      color: isPending ? "red" : "black",
                      fontWeight: isBold ? "bold" : "normal",
                    }}
                  >
                    {holder}
                  </p>
                </React.Fragment>
              );
            },
          },
          {
            Header: "",
            accessor: "evn_id",
          },
        ],
      },
    ],
    []
  );

  useEffect(() => fetchOnboardingSchedule(), [refreshApi]);

  const data = useMemo(() => schedules, [schedules]);
  return (
    <React.Fragment>
      <ScheduleTable data={data} columns={columns} />
    </React.Fragment>
  );
};

const ScheduleTable = ({ data, columns }) => {
  /**
   * Redux Toolkit
   */
  const { searchField, currentTable, modal } = useSelector(
    (state) => state.onboarding
  );

  const dispatch = useDispatch();

  /**
   * Table
   */
  const initialState = { hiddenColumns: ["evn_id"] };

  // Hook for Focus divs
  const [refSchedule, focus, removeFocus] = useMapFocusHelper(
    "onboarding-tr-hover",
    "onboarding-tr-hover-focus"
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      initialState,
      columns,
      data,
    },
    useGlobalFilter
  );

  const selectedScheduleHandler = (i, length, scheduleId) => {
    focus(i, length);
    dispatch(setSelectedScheduleId(scheduleId));
    dispatch(setCurrentTable(1));
  };

  useEffect(() => setGlobalFilter(searchField), [searchField]);

  useEffect(() => {
    if (currentTable === 2) removeFocus(data?.length);
  }, [currentTable]);

  useEffect(() => {
    if (modal === true) removeFocus(data?.length);
    if (modal === false) {
      removeFocus(data?.length);
      dispatch(setSelectedScheduleId(null));
    }
  }, [modal]);

  if (data.length < 1) {
    return (
      <React.Fragment>
        <table style={{ width: "100%" }}>
          <thead>
            <tr
              style={{
                color: "#004e87",
                textAlign: "left",
              }}
            >
              <th>SCHEDULE</th>
            </tr>
          </thead>
          <tbody>
            <tr className="onboarding-tr-hover">
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  color: "#00000070",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                No schedule to display
              </td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <table
        cellSpacing="0"
        cellPadding="0"
        {...getTableProps()}
        style={{ width: "100%" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              style={{ textAlign: "left" }}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  style={{ padding: "0px 0px", color: "#004e87" }}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i, arr) => {
            prepareRow(row);
            return (
              <tr
                style={{ cursor: "pointer" }}
                ref={(el) => (refSchedule.current[i] = el)}
                className="onboarding-tr-hover"
                {...row.getRowProps()}
                onClick={() =>
                  selectedScheduleHandler(i, arr.length, row.values.evn_id)
                }
                tabIndex={i}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      style={{
                        padding:
                          cell.column.id === "appointees"
                            ? "8px 5px"
                            : "8px 0px",
                        fontSize:
                          cell.column.id === "schedule" ? "medium" : null,
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
    </React.Fragment>
  );
};

const ScheduleAppointeesImages = ({ objectOfContent }) => {
  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        {objectOfContent?.map((item, key, arr) => {
          if (key === 5) {
            return (
              <div
                key={key}
                style={{
                  borderRadius: "50px",
                  display: "flex",
                  marginLeft: key > 0 ? "-8px" : null,
                  backgroundColor: "rgba(96,96,96,0.2)",
                  zIndex: arr.length - key,
                  width: "50px",
                  fontSize: "x-small",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <strong style={{ color: "rgba(0,0,0,0.7)" }}>
                  +{arr.length - 5}
                </strong>
              </div>
            );
          }
          if (key > 5) return null;
          return (
            <div
              key={key}
              style={{
                borderRadius: "50px",
                display: "flex",
                marginLeft: key > 0 ? "-10px" : null,
                backgroundColor: "white",
                color: "rgba(0,0,0,0.7)",
                zIndex: arr.length - key,
                width: "50px",
                height: "50px",
              }}
            >
              <AppointeesImageDisplay photo={item?.photo} name={item?.name} />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export const AppointeesImageDisplay = ({ photo = null, name = null }) => {
  const rng = generateColor(name);
  const firstLetterName = name[0].toUpperCase();
  if (photo === null) {
    return (
      <React.Fragment>
        <ReactTooltip id="sadfasdf" effect="solid" html={true} />
        <div
          data-for="sadfasdf"
          data-tip={name}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50px",
            backgroundColor: `${rng}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          {firstLetterName}
        </div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <ReactTooltip
        id="sadfasdf"
        // place={position}
        effect="solid"
        html={true}
      />
      <div style={{ width: "50px", height: "50px", borderRadius: "50px" }}>
        <img
          style={{
            objectFit: "cover",
            width: "50px",
            height: "50px",
            borderRadius: "50px",
          }}
          src={photo}
          alt="sadfaxcfsddsf"
        />
      </div>
    </React.Fragment>
  );
};
