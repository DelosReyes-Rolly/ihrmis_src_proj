import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import BreadcrumbComponent from "../../common/breadcrumb_component/Breadcrumb";
import { calendarBreadCrumbs } from "../plantilla/static/breadcramp_data";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./static/event-utils";
import ButtonComponent from "../../common/button_component/button_component.js";
import { MdAdd, MdFilterAlt } from "react-icons/md";
import IconComponent from "../../common/icon_component/icon";
import SearchComponent from "../../common/input_component/search_input/search_input";
import {
	BsAsterisk,
	BsBell,
	BsCalendar,
	BsCamera,
	BsCardChecklist,
	BsClock,
	BsFillExclamationOctagonFill,
	BsGift,
	BsHouse,
	BsSquareFill,
	BsStopwatch,
} from "react-icons/bs";
import CalendarEventModal from "./calendar_event/calendar_event_modal";
import { useToggleHelper } from "../../../helpers/use_hooks/toggle_helper";
import { legends } from "./static/calendar_event_modal_data";
import axios from "axios";
import { API_HOST } from "../../../helpers/global/global_config";
import CalendarDropDownMenu from "./calendar_filter_dropdown_menu/calendar_filter_dropdown_menu";
import { IoIosPeople } from "react-icons/io";
import { HiOutlineCake, HiOutlinePresentationChartLine } from "react-icons/hi";
import { IoAirplane } from "react-icons/io5";

const CalendarView = () => {
	const [currentEvents, setCurrentEvents] = useState([]);
	const [filterEvent, setFilterEvent] = useState(null);
	const hasWindow = typeof window !== "undefined";
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	const handleDateSelect = (selectInfo) => {
		let check = new Date(selectInfo.startStr);
		let today = new Date();
		if (check < today) {
			// Previous Day. show message if you want otherwise do nothing.
			// So it will be unselectable
			console.log(check);
		} else {
			let title = prompt("Please enter a new title for your event");
			let calendarApi = selectInfo.view.calendar;

			calendarApi.unselect(); // clear date selection
			console.log(selectInfo);
			if (title) {
				calendarApi.addEvent({
					id: createEventId(),
					title,
					start: selectInfo.startStr,
					end: selectInfo.endStr,
					allDay: selectInfo.allDay,
					typ_evn_id: 5,
				});
			}
		}
	};

	const handleEventClick = (clickInfo) => {
		if (
			window.confirm(
				`Are you sure you want to delete the event '${clickInfo.event.title}'`
			)
		) {
			clickInfo.event.remove();
		}
	};

	const handleEvents = (events) => {
		setCurrentEvents(events);
	};

	const renderEventContent = (eventInfo) => {
		return (
			<React.Fragment>
				<b>{eventInfo.timeText}</b>
				<i>{eventInfo.event.title}</i>
			</React.Fragment>
		);
	};

	const updateSize = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
		// console.log("width:" + width);
		// console.log("height:" + height);
	};

	useEffect(() => {
		window.addEventListener("resize", updateSize);
	}, [width, height]);

	return (
		<React.Fragment>
			<div className="calender-view">
				<div className="container-calendar">
					<BreadcrumbComponent list={calendarBreadCrumbs} className="" />
					<div className="calendar-app">
						<RenderSidebar currentEvents={currentEvents} />
						<div className="calendar-app-main">
							<FullCalendar
								plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
								headerToolbar={{
									left: "prev,next today",
									center: "title",
									right: "dayGridMonth,timeGridWeek,timeGridDay",
								}}
								initialView="dayGridMonth"
								// validRange={(nowDate) => {
								// 	return {
								// 		start: nowDate,
								// 	};
								// }}
								editable={true}
								selectable={true}
								selectMirror={true}
								dayMaxEvents={true}
								weekends={true}
								initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
								select={handleDateSelect}
								eventContent={renderEventContent} // custom render function
								eventClick={handleEventClick}
								eventsSet={handleEvents} // called after events are initialized/added/changed/removed
								/* you can update a remote database when these fire:
								eventAdd={function(){}}
								eventChange={function(){}}
								eventRemove={function(){}}
								*/
							/>
							<CalendarLegends className="calendar-color-legend-main" />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default CalendarView;

const RenderSidebar = ({ currentEvents }) => {
	const [toggleCalendarEventModal, setToggleCalendarEventModal] =
		useToggleHelper(false);
	const [eventType, setEventType] = useState([]);

	const getCalendarEventTypes = async () => {
		await axios
			.get(API_HOST + "getCalendarEventTypes")
			.then((response) => {
				let data = response?.data.data ?? [];
				let tempdata = [];
				data.map((value) => {
					let item = {};
					item.id = value.typ_evn_id;
					item.label = value.typ_evn_name;
					item.link = "#";
					tempdata.push(item);
				});

				setEventType(tempdata);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getCalendarEventTypes();
		// console.log(eventType);
	}, []);

	const renderSidebarEvent = (event, key) => {
		return (
			<tr key={key}>
				<td style={{ paddingTop: "14px" }}>
					<IconComponent
						icon={<GetEventIcon id={event._def.extendedProps.typ_evn_id} />}
						color="dodgerblue"
						className="calendar-text-shadow"
						cursor="default"
					/>
				</td>
				<td>
					<p className="fw-bold">{event.title}</p>
					<p className="fs-10">7-10 August 2022 * 1:00 PM - 3:00 PM</p>
					<p className="fs-10">This is a remark. This is a remark</p>
				</td>
			</tr>
		);
	};

	return (
		<React.Fragment>
			<div className="calendar-app-sidebar">
				<div className="calendar-app-sidebar-section">
					<div className="button-icon-style">
						<ButtonComponent
							toolTipId="create-event"
							tipPosition="top"
							buttonName="Event"
							buttonLogoStart={
								<MdAdd className="calendar-add-event" size="20" />
							}
							onClick={() => {
								setToggleCalendarEventModal();
							}}
						/>
						<CalendarDropDownMenu
							calendarfilterData={eventType}
							icon={<MdFilterAlt size="26" />}
						/>
					</div>
					<div className="calendar-search">
						<SearchComponent hideLabel={true} />
					</div>
					<div className="calendar-display-events">
						<h3 className="p-b-10">Upcoming Schedule</h3>
						<div className="calendar-scrollable">
							<table className="p-b-10">
								<tbody>{currentEvents.map(renderSidebarEvent)}</tbody>
							</table>
						</div>
					</div>
					<CalendarLegends className="calendar-color-legend-sidebar" />
				</div>
			</div>
			<CalendarEventModal
				isDisplay={toggleCalendarEventModal}
				onClose={() => setToggleCalendarEventModal()}
			/>
		</React.Fragment>
	);
};

const CalendarLegends = ({ className }) => {
	return (
		<div className={className}>
			<table>
				<thead></thead>
				<tbody>
					{legends.map((element, id) => {
						return (
							<tr key={id}>
								<td style={{ paddingTop: "7px" }}>
									<IconComponent
										icon={<BsSquareFill />}
										color={element.color}
										className="calendar-text-shadow"
										cursor="default"
									/>
								</td>
								<td>{element.title}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

const GetEventIcon = ({ id }) => {
	switch (id) {
		case 1:
			return <BsBell />;
		case 2:
			return <BsClock />;
		case 3:
			return <IoIosPeople />;
		case 4:
			return <BsCalendar />;
		case 5:
			return <HiOutlinePresentationChartLine />;
		case 6:
			return <BsCardChecklist />;
		case 7:
			return <BsStopwatch />;
		case 8:
			return <BsCamera />;
		case 9:
			return <HiOutlineCake />;
		case 10:
			return <BsFillExclamationOctagonFill />;
		case 11:
			return <IoAirplane />;
		case 12:
			return <BsHouse />;
		case 13:
			return <BsGift />;
		case 14:
			return <BsAsterisk />;
	}

	return <BsBell />;
};
