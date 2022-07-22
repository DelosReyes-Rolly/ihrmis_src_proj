import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setRefresh } from "../../../../features/reducers/popup_response";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import ModalComponent from "../../../common/modal_component/modal_component";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputComponent from "../../../common/input_component/input_component/input_component";
import DatePicker from "react-datepicker";
import SearchComponent from "../../../common/input_component/search_input/search_input";
import { IoIosCalendar } from "react-icons/io";
import { useToggleHelper } from "../../../../helpers/use_hooks/toggle_helper";

const CalendarEventModal = ({ isDisplay, onClose }) => {
	const { renderBusy } = usePopUpHelper();
	const dispatch = useDispatch();
	const title = "Calendar Event";
	const onCloseNameLabel = "Delete";
	const dateInputPlaceholder = "mm/dd/yyyy -mm/dd/yyyy";
	const onSubmitName = "Save";
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(null);
	const borderStyle = { border: "1px solid #55555555" };
	const [toggleDispay, setToggleDisplay] = useToggleHelper(false);
	const [startDateEndDate, setStartDateEndDate] = useState("");

	const onChange = (dates) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
		setStartDateEndDate(start + "-" + end);
	};
	const onDelete = () => {
		alert("gago!");
	};

	// ==========================================
	// FORMIK FORM
	// ==========================================
	const calendarEventForm = useFormik({
		enableReinitialize: true,
		initialValues: {},
		validationSchema: Yup.object({}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);

			renderBusy(false);
			dispatch(setRefresh());
			onClose();
		},
	});

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
					<div>
						<div className="calendar-event-datetime">
							<div className="calendar-event-fields calendar-date-field">
								<label htmlFor="eventDate">Date</label>
								<SearchComponent
									id="eventDate"
									name="eventDate"
									type="text"
									className="calendar-custom-input"
									placeholder={dateInputPlaceholder}
									hideLabel={true}
									icon={<IoIosCalendar />}
									// styleParentInputDiv="custom-date-input"
									styleButton={borderStyle}
									styleInput={borderStyle}
									cursor="pointer"
									color="black"
									onClick={() => {
										setToggleDisplay();
									}}
									value={startDateEndDate}
								/>
								{toggleDispay && (
									<DatePicker
										selected={startDate}
										onChange={onChange}
										startDate={startDate}
										endDate={endDate}
										selectsRange
										inline
									/>
								)}
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
										<label htmlFor="eventTimeEnd">Time</label>
										<InputComponent
											id="eventTimeEnd"
											name="eventTimeEnd"
											type="time"
											min="06:00"
											max="12:00"
											className="calendar-custom-input"
										/>
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
