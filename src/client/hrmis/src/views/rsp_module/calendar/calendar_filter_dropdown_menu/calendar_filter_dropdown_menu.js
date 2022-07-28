import DropdownVpMenu from "../../plantilla/page_component/plantilla_vacant_pc/plantilla_vp_menu/Dropdownvpmenu";

const CalendarDropDownMenu = ({ calendarfilterData, icon }) => {
	return (
		<DropdownVpMenu
			itemList={calendarfilterData}
			title={icon}
			alignItems="end"
			className="button-icon unstyled-button"
			tooltipData={{
				toolTipId: "calendar-filter",
				textHelper: "Filter event by",
			}}
			isScrollable={true}
		/>
	);
};

export default CalendarDropDownMenu;
