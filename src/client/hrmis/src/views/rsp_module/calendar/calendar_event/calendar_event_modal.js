import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setRefresh } from "../../../../features/reducers/popup_response";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import ModalComponent from "../../../common/modal_component/modal_component";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputComponent from "../../../common/input_component/input_component/input_component";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchComponent from "../../../common/input_component/search_input/search_input";
import { IoIosCalendar } from "react-icons/io";
import { BsDash } from "react-icons/bs";
import CheckboxComponent from "../../../common/input_component/checkbox_input_component/checkbox_input_component";
import SelectComponent from "../../../common/input_component/select_component/select_component";
import { frequencyData } from "../static/calendar_event_modal_data";
import moment from "moment";

const CalendarEventModal = ({ isDisplay, onClose }) => {
	const { renderBusy } = usePopUpHelper();
	const dispatch = useDispatch();
	const title = "Calendar Event";
	const onCloseNameLabel = "Delete";
	const dateInputPlaceholder = "mm/dd/yyyy - mm/dd/yyyy";
	const onSubmitName = "Save";
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(null);
	const [startDateEndDate, setStartDateEndDate] = useState("");

	const onDelete = () => {
		alert("gago!");
	};

	// ==========================================
	// FORMIK FORM
	// ==========================================
	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			evn_date_start: "",
			evn_date_end: "",
			evn_time_start: "",
			evn_time_end: "",
		},
		validationSchema: Yup.object({}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);

			renderBusy(false);
			dispatch(setRefresh());
			onClose();
		},
	});

	const borderInputStyle = {
		border: "1px solid #55555555",
		borderRight: "none",
	};
	const borderButtonStyle = {
		border: "1px solid #55555555",
		borderLeft: "none",
	};

	const datepickerRef = useRef(null);
	const openDatepickerDropDown = () => {
		const datepickerElement = datepickerRef.current;
		datepickerElement.setFocus(true);
	};

	const handleDateChange = (dates) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
		form.setFieldValue("evn_date_start", startDate);
		form.setFieldValue("evn_date_end", endDate);
	};

	useEffect(() => {
		setStartDateEndDate(
			moment(startDate).format("MM/DD/YYYY") +
				"-" +
				moment(endDate).format("MM/DD/YYYY") ?? ""
		);
	}, [startDate, endDate]);

	return (
		<React.Fragment>
			<ModalComponent
				title={title}
				isDisplay={isDisplay}
				onClose={onClose}
				onCloseName={onCloseNameLabel}
				onPressed={onDelete}
				onSubmitName={onSubmitName}
			>
				<div className="calendar-event-main">
					<div className="calendar-event-fields">
						<label htmlFor="eventName">Name</label>
						<InputComponent
							id="eventName"
							name="eventName"
							type="text"
							onChange={() => {}}
							value=""
						/>
					</div>
					<div className="calendar-event-datetime">
						<div className="calendar-event-fields calendar-date-field date-picker-modified">
							<label className="calendar-date-label" htmlFor="eventDate">
								Date
							</label>
							<SearchComponent
								id="eventDate"
								name="eventDate"
								className="calendar-custom-input "
								placeholder={dateInputPlaceholder}
								hideLabel={true}
								icon={<IoIosCalendar />}
								// styleParentInputDiv="custom-date-input"
								styleInput={borderInputStyle}
								styleButton={borderButtonStyle}
								cursor="pointer"
								color="black"
								onClick={() => openDatepickerDropDown()}
								value={startDateEndDate}
								onChange={handleDateChange}
								type="button"
								readOnly={true}
							/>
							<ReactDatePicker
								className="input-component input-centercalendar-datepicker hidden-input-flag"
								selected={startDate}
								onChange={handleDateChange}
								startDate={startDate}
								endDate={endDate}
								selectsRange
								popperPlacement="bottom-end"
								placeholderText="mm/dd/yyyy-mm/dd/yy"
								ref={datepickerRef}
							/>
						</div>
						<div className="calendar-event-fields">
							<div className="calendar-event-time-group">
								<div className="calendar-event-fields">
									<label htmlFor="eventTimeStart">Time</label>
									<InputComponent
										id="eventTimeStart"
										name="eventTimeStart"
										type="time"
										min="06:00"
										max="12:00"
										className="calendar-custom-input"
									/>
								</div>
								<div className="calendar-event-fields">
									<br></br>
									<BsDash />
								</div>
								<div className="calendar-event-fields">
									<br></br>
									<InputComponent
										id="eventTimeEnd"
										name="eventTimeEnd"
										type="time"
										min="06:00"
										max="12:00"
										className="calendar-custom-input"
									/>
								</div>
								<div className="calendar-event-fields">
									<br></br>
									<div className="calendar-all-day">
										<span className="calendar-checkbox ">
											<CheckboxComponent />
										</span>
										<label htmlFor="eventAllDay">All Day</label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="calendar-event-datetime">
						<div className="calendar-event-fields">
							<label className="eventfrequency" htmlFor="eventDate">
								Frequency
							</label>
							<SelectComponent
								name="eventfrequency"
								value=""
								onChange={(e) => {}}
								itemList={frequencyData}
								defaultTitle="Select Frequency"
							/>
						</div>
						<div className="calendar-event-fields">
							<div className="calendar-event-time-group">
								<label htmlFor="eventYear">Every</label>
								<InputComponent
									id="eventYear"
									name="eventYear"
									type="text"
									className="calendar-custom-input"
								/>
								<div className="calendar-event-fields">year/s in</div>
								<div className="calendar-event-fields">
									<br></br>
									<InputComponent
										id="eventTimeEnd"
										name="eventTimeEnd"
										type="month"
										min="06:00"
										max="12:00"
										className="calendar-custom-input"
									/>
								</div>
								<div className="calendar-event-fields">
									<br></br>
									<div className="calendar-all-day">
										<span className="calendar-checkbox ">
											<CheckboxComponent />
										</span>
										<label htmlFor="eventAllDay">All Day</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ModalComponent>
		</React.Fragment>
	);
};

export default CalendarEventModal;
