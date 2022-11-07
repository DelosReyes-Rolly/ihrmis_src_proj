import React from "react";
import { AiFillCheckCircle, AiFillPrinter } from "react-icons/ai";
import {
  IoArrowBackCircle,
  IoChatbubbles,
  IoCog,
  IoTrash,
} from "react-icons/io5";

// import { MfoTable } from "../views/pm_module/components/mfo_table";
import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import ButtonComponent from "../../common/button_component/button_component";
import IconComponent from "../../common/icon_component/icon";
import DropdownIconComponent from "./dropdown_icon_component";

export const PerformanceReportButtonNavbar = (props) => {
  return (
    <>
      <div className="navbar-container">
        <nav className="inline-container">
          <div className="main-links">
            <NavLink
              className={({ isActive }) =>
                isActive ? "button-link-active" : "button-link"
              }
              to="/performance/performance-report/commitments"
            >
              Commitments
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "button-link-active" : "button-link"
              }
              to="/performance/performance-report/ratings"
            >
              Ratings
            </NavLink>
          </div>
          <ul className="navbar-list">
            <li className="navbar-item">
              <IconComponent icon={<AiFillPrinter size={25} />} />
            </li>
            <li className="navbar-item">
              <IconComponent icon={<IoCog size={25} />} />
            </li>
            <li className="navbar-item">
              <IconComponent icon={<IoTrash size={25} />} />
            </li>
            <li className="navbar-item">
              <IconComponent icon={<IoChatbubbles size={25} />} />
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
};
