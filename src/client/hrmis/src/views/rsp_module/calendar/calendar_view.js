import React, { useState } from "react";
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
import { InputIconComponent } from "../../common/input_component/input_component/input_component";
import { BsSearch } from "react-icons/bs";
import CalendarEventModal from "./calendar_event/calendar_event_modal";
import { useToggleHelper } from "../../../helpers/use_hooks/toggle_helper";

const CalendarView = () => {
	const [weekendsVisible, setWeekendsVisible] = useState(true);
	const [currentEvents, setCurrentEvents] = useState([]);

	const handleWeekendsToggle = () => {
		setWeekendsVisible(!weekendsVisible);
	};

	const handleDateSelect = (selectInfo) => {
		let title = prompt("Please enter a new title for your event");
		let calendarApi = selectInfo.view.calendar;

		calendarApi.unselect(); // clear date selection

		if (title) {
			calendarApi.addEvent({
				id: createEventId(),
				title,
				start: selectInfo.startStr,
				end: selectInfo.endStr,
				allDay: selectInfo.allDay,
			});
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

	const renderSidebarEvent = (event, key) => {
		return (
			<li key={key}>
				<b>
					{formatDate(event.start, {
						year: "numeric",
						month: "short",
						day: "numeric",
					})}
				</b>
				<i>{event.title}</i>
			</li>
		);
	};

	return (
		<React.Fragment>
			<div className="calender-view">
				<div className="container-calendar">
					<BreadcrumbComponent list={calendarBreadCrumbs} className="" />
					<div className="calendar-app">
						<RenderSidebar />
						<div className="calendar-app-main">
							<FullCalendar
								plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
								headerToolbar={{
									left: "prev,next today",
									center: "title",
									right: "dayGridMonth,timeGridWeek,timeGridDay",
								}}
								initialView="dayGridMonth"
								editable={true}
								selectable={true}
								selectMirror={true}
								dayMaxEvents={true}
								weekends={weekendsVisible}
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
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default CalendarView;

const RenderSidebar = () => {
	let [toggleCalendarEventModal, setToggleCalendarEventModal] =
		useToggleHelper(false);
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
								<MdAdd style={{ margin: -10, paddingRight: 20 }} size="20" />
							}
							onClick={() => {
								setToggleCalendarEventModal();
							}}
						/>
						<IconComponent
							id="filter_cal_event"
							className="padding-left-1"
							icon={<MdFilterAlt size="26" />}
							toolTipId="filter-cal-event"
							textHelper="Filter"
							onClick={() => {}}
						/>
					</div>
					<div className="calendar-search">
						<SearchComponent hideLabel={true} />
					</div>
					<div className="calendar-display-events"></div>
				</div>
			</div>
			<CalendarEventModal
				isDisplay={toggleCalendarEventModal}
				onClose={() => setToggleCalendarEventModal()}
			/>
		</React.Fragment>
	);
};
