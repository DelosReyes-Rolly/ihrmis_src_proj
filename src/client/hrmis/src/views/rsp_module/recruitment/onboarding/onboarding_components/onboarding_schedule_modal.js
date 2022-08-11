import React, { useCallback, useEffect, useMemo, useState } from "react";
import InputComponent from "../../../../common/input_component/input_component/input_component";
import TextAreaComponent from "../../../../common/input_component/textarea_input_component/textarea_input_component";
import ModalComponent from "../../../../common/modal_component/modal_component";
import CheckboxInputComponent from "../../../../common/input_component/checkbox_input_component/checkbox_input_component";
import { AppointeesImageDisplay } from "./onboarding_tables";
import ReactDatePicker from "react-datepicker";
import { useFormik } from "formik";
import axios from "axios";
import { API_HOST } from "../../../../../helpers/global/global_config";
import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import { useTable } from "react-table";
import { useMapFocusHelper } from "../../../../../helpers/use_hooks/on_focus_helper";
import {
  setRefreshApi,
  setSelectedApplicantIdArray,
} from "../../../../../features/reducers/onboarding_slice";
import * as Yup from "yup";
import { ALERT_ENUM, popupAlert } from "../../../../../helpers/alert_response";
import { setBusy } from "../../../../../features/reducers/popup_response";

const displayFlex = (
  direction = "row",
  hALign = "start",
  vAlign = "center"
) => {
  return {
    display: "flex",
    flexDirection: direction,
    justifyContent: hALign,
    alignItems: vAlign,
    gap: "10px",
  };
};

const OnboardingSchedulModal = ({ isDisplay, onClose }) => {
  // When  schedule is selected infor,ation is set in scheduleData state
  const [scheduleData, setScheduleData] = useState([]);
  const [appointess, setAppointees] = useState([]);
  const [idForDelete, setIdForDelete] = useState(null);
  const data = useMemo(() => appointess, [appointess]);
  /**
   * Redux Toolkit functionality and states
   */
  const { selectedApplicantIdArray, selectedScheduleId, currentTable } =
    useSelector((state) => state.onboarding);
  const dispatch = useDispatch();

  /**
   * Form Handler Section
   */
  const [allDay, setAllDay] = useState(false);

  const handleAllDayDisabler = (e) => {
    setAllDay(e.target.checked);
    form.setFieldValue("evn_time_start", "00:00");
    form.setFieldValue("evn_time_end", "00:00");
  };

  const handleDateChange = (date) => {
    const [start, end] = date;
    form.setFieldValue("evn_date_start", start);
    form.setFieldValue("evn_date_end", end);
  };

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      evn_id: selectedScheduleId,
      evn_name: scheduleData.evn_name ?? "",
      evn_date_start: Date.parse(scheduleData.evn_date_start) ?? "",
      evn_date_end: Date.parse(scheduleData.evn_date_end) ?? "",
      evn_time_start: scheduleData.evn_time_start ?? "00:00",
      evn_time_end: scheduleData.evn_time_end ?? "00:00",
      evn_remarks: scheduleData?.evn_remarks ?? "",
      appointees: selectedApplicantIdArray,
    },
    validationSchema: Yup.object({
      evn_name: Yup.string().required("This field is required"),
      // evn_date_start: Yup.string().required("This field is required"),
      // evn_date_end: Yup.string().required("This field is required"),
      // evn_time_start: Yup.string().required("This field is required"),
      // evn_time_end: Yup.string().required("This field is required"),
      evn_remarks: Yup.string().required("This field is required"),
      appointees: Yup.array()
        .typeError("Invalid input")
        .required("This field is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      const API_REDIRECT =
        currentTable === 2
          ? "new-onboarding-schedule/add"
          : "new-onboarding-schedule/edit";

      const MESSAGE =
        currentTable === 2
          ? "New onboarding schedule was created successfully"
          : "Onboarding schedule was updated successfully";
      // appointees-mark-done
      dispatch(setBusy(true));
      await axios
        .post(API_HOST + API_REDIRECT, values)
        .then(() => {
          popupAlert({ message: MESSAGE, type: ALERT_ENUM.success });
          setAllDay(false);
          resetForm();
          dispatch(setRefreshApi());
          dispatch(setBusy(false));
          onClose();
        })
        .catch((err) => {
          dispatch(setBusy(false));
          popupAlert({ message: err?.message, type: ALERT_ENUM.fail });
        });
      dispatch(setBusy(false));
    },
  });

  // FETCHES
  const fetchOnboardingAppointees = async () => {
    /**
     * This is only for get purposes submitting an array of data
     */

    await axios
      .post(API_HOST + "selected-appointees", {
        appointees: selectedApplicantIdArray,
      })
      .then((res) => setAppointees(res.data.data))
      .catch((err) => console.log(err.message));
  };

  const fetchDataFromSchedule = async () => {
    /**
     * This is only for get purposes submitting an array of data
     */
    await axios
      .get(API_HOST + "selected-schedules/" + selectedScheduleId)
      .then((res) => {
        console.log(res.data.evn_app_array);
        setScheduleData(res.data);
        setAppointees(res.data?.evn_appointees);

        dispatch(setSelectedApplicantIdArray(res.data.evn_app_array));
      })
      .catch((err) => console.log(err.message));
  };

  const removeData = (id, employee) => {
    const list = employee;
    const index = list.findIndex((item) => {
      return parseInt(item.app_id) === parseInt(id);
    });
    if (index !== -1) {
      list.splice(index, 1);
    }

    setAppointees([...list]);
    const arrayHolder = [];

    list.forEach((element) => {
      console.log(element);
      arrayHolder.push(element?.app_id);
    });

    dispatch(setSelectedApplicantIdArray([...arrayHolder]));
  };

  const columns = useMemo(
    () => [
      {
        Header: "NEW APPOINTEES",
        columns: [
          {
            Header: "",
            accessor: "app_id",
          },
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
                    <div style={{ fontWeight: "bold" }}>
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
            accessor: "action",
            Cell: ({ cell }) => {
              return (
                <React.Fragment>
                  <div className="onboarding-sched-on-delete-appointees">
                    <div
                      onClick={() => {
                        setIdForDelete(cell.row.values.app_id);
                      }}
                    >
                      <MdClose size={25} />
                    </div>
                  </div>
                </React.Fragment>
              );
            },
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    if (currentTable === 2) {
      setScheduleData({});
      if (isDisplay === true) {
        fetchOnboardingAppointees();
      }
    }

    if (currentTable === 1) {
      if (isDisplay === true) {
        fetchDataFromSchedule();
      }
    }

    if (selectedScheduleId === null) {
      if (isDisplay === false) {
        setAppointees([]);
        setScheduleData({});
        dispatch(setSelectedApplicantIdArray([]));
      }
    }

    if (isDisplay === false) setIdForDelete(null);
  }, [isDisplay]);

  useEffect(() => {
    if (idForDelete !== null) {
      removeData(idForDelete, appointess);
    }
  }, [idForDelete]);

  return (
    <React.Fragment>
      <ModalComponent
        title="Onboarding Schedule"
        isDisplay={isDisplay}
        onClose={onClose}
        onSubmitType="submit"
        onSubmitName={currentTable === 2 ? "Submit" : "Save"}
        onSubmit={form.handleSubmit}
      >
        <div style={{ ...displayFlex("column", null, "start") }}>
          <div>
            <label>Name</label>
            <InputComponent
              value={form.values.evn_name}
              name="evn_name"
              onChange={form.handleChange}
            />
            {form.touched.evn_name && form.errors.evn_name ? (
              <p className="error-validation-styles">{form.errors.evn_name}</p>
            ) : null}
          </div>

          <div style={{ ...displayFlex("row", null, "start") }}>
            <div style={{ width: "50%" }}>
              <label>Date</label>
              <div className="date-picker-modified">
                <ReactDatePicker
                  className={"input-component input-center"}
                  onChange={handleDateChange}
                  startDate={form.values.evn_date_start}
                  endDate={form.values.evn_date_end}
                  popperPlacement="bottom-end"
                  selectsRange
                  placeholderText="mm/dd/yyyy-mm/dd/yy"
                />
                <InputComponent className="hidden-input-flag" />
              </div>
              {form.touched.evn_date_start && form.errors.evn_date_start ? (
                <p className="error-validation-styles">
                  {form.errors.evn_date_start}
                </p>
              ) : null}
              {form.touched.evn_date_end && form.errors.evn_date_end ? (
                <p className="error-validation-styles">
                  {form.errors.evn_date_end}
                </p>
              ) : null}
            </div>

            <div style={{ width: "40%" }}>
              <label>Time</label>
              <div style={{ ...displayFlex() }}>
                <div style={{ width: "50%" }}>
                  <InputComponent
                    disabled={allDay}
                    type="time"
                    name="evn_time_start"
                    value={form.values.evn_time_start}
                    onChange={form.handleChange}
                  />
                </div>
                <div> - </div>
                <div style={{ width: "50%" }}>
                  <InputComponent
                    className=""
                    disabled={allDay}
                    type="time"
                    name="evn_time_end"
                    value={form.values.evn_time_end}
                    onChange={form.handleChange}
                    placeholder="asdfasf"
                  />
                </div>
              </div>
              {form.touched.evn_time_start && form.errors.evn_time_start ? (
                <p className="error-validation-styles">
                  {form.errors.evn_time_start}
                </p>
              ) : null}
              {form.touched.evn_time_end && form.errors.evn_time_end ? (
                <p className="error-validation-styles">
                  {form.errors.evn_time_end}
                </p>
              ) : null}
            </div>

            <div style={{ width: "10%" }}>
              <label style={{ opacity: "0" }}>All Day</label>
              <div
                style={{
                  ...displayFlex(null, "center", "end"),
                  width: "100%",
                  padding: "7px 0px",
                }}
              >
                <CheckboxInputComponent onChange={handleAllDayDisabler} />
                <label>All Day</label>
              </div>
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <label>Details/Remarks</label>
            <TextAreaComponent
              name="evn_remarks"
              value={form.values.evn_remarks}
              onChange={form.handleChange}
            />
            {form.touched.evn_remarks && form.errors.evn_remarks ? (
              <p className="error-validation-styles">
                {form.errors.evn_remarks}
              </p>
            ) : null}
          </div>

          <div style={{ width: "100%" }}>
            <AppointeesTableList data={data} columns={columns} />
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default OnboardingSchedulModal;

const AppointeesTableList = ({ data, columns }) => {
  const initialState = {
    hiddenColumns: ["position", "office", "app_id", "emp_id", "itm_id"],
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      initialState,
      columns,
      data,
    });

  // Hook for Focus divs
  const [refTopic, , , selectableFocus] = useMapFocusHelper(
    "onboarding-tr-hover",
    "onboarding-tr-hover-focus"
  );

  return (
    <React.Fragment>
      <table
        cellSpacing="0"
        cellPadding="0"
        {...getTableProps()}
        style={{ width: "100%" }}
      >
        <thead>
          {headerGroups?.map((headerGroup) => (
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
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                style={{ cursor: "pointer" }}
                ref={(el) => (refTopic.current[i] = el)}
                onClick={() => selectableFocus(i)}
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
