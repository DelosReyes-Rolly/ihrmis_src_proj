import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalFilter, useTable } from "react-table";
import {
  setSelectedAppointees,
  setSelectedSched,
} from "../../../../../features/reducers/onboarding_slice";
import { generateColor } from "../../../../../helpers/color_generator";
import { API_HOST } from "../../../../../helpers/global/global_config";
import { useMapFocusHelper } from "../../../../../helpers/use_hooks/on_focus_helper";

export const OnboardingNewAppointeesTableContainer = () => {
  const [newAppointees, setNewAppointees] = useState([]);
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
                  <div className="image-zoom-effect-user">
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

  useEffect(() => fetchNewAppointees(), []);

  return (
    <React.Fragment>
      <AppointeesTable data={data} columns={columns} />
    </React.Fragment>
  );
};

export const AppointeesTable = ({
  data,
  columns,
  searchable = true,
  removableAppointees = false,
}) => {
  const { searchField, currentTable } = useSelector(
    (state) => state.onboarding
  );

  const dispatch = useDispatch();

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
  const [refTopic, focus, removeFocus, selectableFocus] = useMapFocusHelper(
    "onboarding-tr-hover",
    "onboarding-tr-hover-focus"
  );

  // Collecting values and idisplaying highlighted option
  const collectingSelectedItem = (i, value, length) => {
    if (removableAppointees === false) {
      selectableFocus(i);
      dispatch(setSelectedAppointees(value));
    }
    if (removableAppointees === true) {
      focus(i, length);
    }
  };

  const removableOnFocus = (length) => {
    if (removableAppointees === true) removeFocus(length);
  };

  useEffect(() => {
    if (searchable) setGlobalFilter(searchField);
  }, [searchField]);

  useEffect(() => {
    if (currentTable === 0)
      if (removableAppointees === false) removeFocus(data?.length);
  }, [currentTable, data]);

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
                className="onboarding-tr-hover"
                {...row.getRowProps()}
                onClick={() => {
                  collectingSelectedItem(i, row.values.app_id, arr.length);
                  // selectableFocus(i);
                  // dispatch(setSelectedAppointees(row.values.app_id));
                }}
                onBlur={() => removableOnFocus(arr.length)}
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

  useEffect(() => fetchOnboardingSchedule(), []);

  const data = useMemo(() => schedules, [schedules]);
  return (
    <React.Fragment>
      <ScheduleTable data={data} columns={columns} />
    </React.Fragment>
  );
};

const ScheduleTable = ({ data, columns }) => {
  const initialState = { hiddenColumns: ["evn_id"] };
  const { searchField, currentTable } = useSelector(
    (state) => state.onboarding
  );
  const dispatch = useDispatch();

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

  useEffect(() => setGlobalFilter(searchField), [searchField]);

  const [refSchedule, focus, removeFocus] = useMapFocusHelper(
    "onboarding-tr-hover",
    "onboarding-tr-hover-focus"
  );

  const collectingSelectedItem = (i, value, length) => {
    focus(i, length);
    dispatch(setSelectedSched(value));
  };

  useEffect(() => {
    if (currentTable === 1) removeFocus(data?.length);
  }, [currentTable, data]);

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
                onClick={() => {
                  collectingSelectedItem(i, row.values.evn_id, arr.length);
                  // console.log(row.values.evn_id);
                }}
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
              className="image-zoom-effect-user"
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
      <div
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
    );
  }
  return (
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
  );
};
