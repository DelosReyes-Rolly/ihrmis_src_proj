import React, { useEffect, useMemo, useState } from "react";
import InputComponent from "../../../../common/input_component/input_component/input_component";
import TextAreaComponent from "../../../../common/input_component/textarea_input_component/textarea_input_component";
import ModalComponent from "../../../../common/modal_component/modal_component";
import CheckboxInputComponent from "../../../../common/input_component/checkbox_input_component/checkbox_input_component";
import { AppointeesImageDisplay, AppointeesTable } from "./onboarding_tables";
import ReactDatePicker from "react-datepicker";
import { useFormik } from "formik";
import axios from "axios";
import { API_HOST } from "../../../../../helpers/global/global_config";
import { useDispatch, useSelector } from "react-redux";
import {
  setSCheduleInformation,
  setSelectedAppointeesArray,
} from "../../../../../features/reducers/onboarding_slice";
import { MdClose } from "react-icons/md";

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
  /**
   * TODO: get schedule id in splice then create an axios get request to get information of schedule
   */

  const [scheduleData, setScheduleData] = useState([]);
  const dispatch = useDispatch();

  const {
    selectedAppointees,
    selectedSched,
    currentTable,
    scheduleInformation,
  } = useSelector((state) => state.onboarding);

  const data = useMemo(() => scheduleInformation, [scheduleInformation]);

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
      evn_name: scheduleData.evn_name ?? "",
      evn_date_start: Date.parse(scheduleData.evn_date_start) ?? "",
      evn_date_end: Date.parse(scheduleData.evn_date_end) ?? "",
      evn_time_start: scheduleData.evn_time_start ?? "00:00",
      evn_time_end: scheduleData.evn_time_end ?? "00:00",
      evn_remarks: scheduleData?.evn_remarks ?? "",
      appointees: selectedAppointees,
    },
    onSubmit: async (values) => {
      console.log(values);
      await axios
        .post(API_HOST + "new-onboarding-schedule", values)
        .then((res) => {})
        .catch((err) => {});
    },
  });

  // FETCHES
  const fetchOnboardingAppointees = async () => {
    /**
     * This is only for get purposes submitting an array of data
     */
    await axios
      .post(API_HOST + "selected-appointees", {
        appointees: selectedAppointees,
      })
      .then((res) => {
        // setAppointees(res.data.data);
        console.log(res.data.data);
        dispatch(setSCheduleInformation(res.data.data));
        // form.setFieldValue("appointees", selectedAppointees); // Create an external function setter for handing selected employees
      })
      .catch((err) => console.log(err.message));
  };

  const fetchDataFromSchedule = async () => {
    /**
     * This is only for get purposes submitting an array of data
     */
    await axios
      .get(API_HOST + "selected-schedules/" + selectedSched, {
        appointees: selectedAppointees,
      })
      .then((res) => {
        dispatch(setSelectedAppointeesArray(res?.data?.data?.evn_source));
        // console.log(selectedAppointees);
        setScheduleData(res.data.data);
        // console.log(scheduleData.evn_source);
        // console.log(res.data.data.evn_name);
        // form.setFieldValue("appointees", selectedAppointees); // Create an external function setter for handing selected employees
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    if (currentTable !== null) fetchOnboardingAppointees();
  }, [selectedAppointees]);

  useEffect(() => {
    if (currentTable === 0) fetchDataFromSchedule();
    if (currentTable === 1) setScheduleData([]);
  }, [selectedSched]);

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
                        console.log(scheduleInformation);
                        const index = scheduleInformation.findIndex(
                          (item) => item.app_id === cell.row.values.app_id
                        );

                        // console.log(index);

                        // dispatch(setSCheduleInformation(scheduleInformation));
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

  return (
    <React.Fragment>
      <ModalComponent
        title="Onboarding Schedule"
        isDisplay={isDisplay}
        onClose={onClose}
        onSubmitType="submit"
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
          </div>

          <div style={{ width: "100%" }}>
            <AppointeesTable
              data={data}
              columns={columns}
              removableAppointees={true}
            />
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default OnboardingSchedulModal;
