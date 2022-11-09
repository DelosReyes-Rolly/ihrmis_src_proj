import React from "react";
import { useState } from "react";
import {
  AiFillCheckCircle,
  AiFillPrinter,
  AiFillCaretUp,
} from "react-icons/ai";
import {
  IoArrowBackCircle,
  IoBookmark,
  IoChatbubbles,
  IoTrash,
} from "react-icons/io5";

// import { MfoTable } from "../views/pm_module/components/mfo_table";
import { NavLink, Outlet, useNavigate, Route, Routes } from "react-router-dom";
import BadgeComponent from "../../common/badge_component/Badge";
import IconComponent from "../../common/icon_component/icon";
export const MfoButtonNavbar = (props) => {
  const referenceList = [
    { id: "1", label: "Strategic Plan" },
    { id: "2", label: "SPMS Guide" },
  ];
  const [toggle, setToggle] = useState(false);
  function toggleDropdown() {
    setToggle(!toggle);
  }

  const hasComment = true;

  const navigate = useNavigate();
  const linkDetector = (item) => {
    if (typeof item === "string" || item instanceof String)
      return navigate(item);
    else if (typeof item === "function") {
      item();
    }
  };
  return (
    <>
      <div className="navbar-container">
        <nav className="inline-container">
          <div className="main-links">
            <NavLink
              className={({ isActive }) =>
                isActive ? "button-link-active" : "button-link"
              }
              to="/performance/major-final-output/mfo-table"
            >
              MFO Table
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "button-link-active" : "button-link"
              }
              to="/performance/major-final-output/cascaded-table"
            >
              Cascaded Table
            </NavLink>
          </div>
          <ul className="navbar-list">
            <li className="navbar-item">
              <IconComponent icon={<AiFillPrinter size={25} />} />
            </li>
            <li className="navbar-item">
              <IconComponent
                icon={<IoBookmark size={25} />}
                onClick={toggleDropdown}
              />
              {toggle && (
                <div>
                  <DropdownContent itemList={referenceList} />
                </div>
              )}
            </li>
            <li className="navbar-item">
              <IconComponent icon={<IoTrash size={25} />} />
            </li>
            <li className="navbar-item">
              <div className="flex relative">
                <IconComponent
                  style={{ position: "relative", zIndex: "-1" }}
                  icon={<IoChatbubbles size={25} />}
                />
                {/* Fix badge positioning */}
                {hasComment && <BadgeComponent className="badge" />}
              </div>
            </li>
            <li className="navbar-item">
              <IconComponent icon={<IoArrowBackCircle size={25} />} />
            </li>
            <li className="navbar-item">
              <IconComponent icon={<AiFillCheckCircle size={25} />} />
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );

  function DropdownContent({ itemList, setValue }) {
    return (
      <React.Fragment>
        <ul
          className="ul-dropdown-container"
          style={{
            position: "fixed",
            top: "24%",
            right: "11%",
          }}
        >
          {itemList?.map((element, key) => {
            return (
              <li
                style={{ listStyle: "none" }}
                className="ul-menu-item"
                onClick={() => {
                  setValue(element.id);
                  linkDetector(element);
                }}
                key={key}
              >
                {element.label}
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }

  function NotificationBadge({ count }) {
    return (
      <React.Fragment>
        <div className="relative">
          <div className="badge">
            {count > 0 ? <span>{count}</span> : <span></span>}
          </div>
        </div>
      </React.Fragment>
    );
  }
};
