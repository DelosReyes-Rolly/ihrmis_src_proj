import React, { useEffect, useState } from "react";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineQuestionCircle,
  AiOutlineBell,
  AiOutlineMenu,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import dostLogo from "../../../assets/images/logo.png";
import { openSideBar } from "../../../features/reducers/mobile_view_slice";
import { useToggleHelper } from "../../../helpers/use_hooks/toggle_helper";
import BadgeComponents from "../badge_component/Badge";
import NotificationComponent from "../notification/notification_component";

const NavbarComponent = ({}) => {
  let [dropState, updateDropState] = useToggleHelper(false);
  let dispatch = useDispatch();
  const [timeDataState, setTimeDataState] = useState();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeDataState(
        new Date().toLocaleString("en-US", {
          weekday: "long",
          hour: "numeric",

          month: "long",
          day: "numeric",
          year: "numeric",

          minute: "numeric",
          second: "numeric",
          hour12: true,
        })
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="navbar-div">
      <nav>
        <h1>
          <span className="navbar-span-1 margin-right-1">iHRMiS</span>
          <span className="navbar-span-2">
            <p>&copy; 2021 DOST</p>
          </span>
          <span className="navbar-span-3">
            <p>{timeDataState}</p>
          </span>
          {/* Monday 04 January 2021 | 08:00:00 AM */}
        </h1>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <li className="">
            <NotificationComponent />
          </li>

          <li className="margin-right-1 notification">
            <BadgeComponents className="add-style-badge" value={1} />
            <span>
              <AiOutlineQuestionCircle size="20px" />
            </span>
          </li>

          <li
            className="notification menu-on-mobile"
            onClick={() => {
              dispatch(openSideBar());
            }}
          >
            <span>
              <AiOutlineMenu size="20px" />
            </span>
          </li>

          <li
            onClick={() => updateDropState()}
            className="user-dropdown"
            style={{ cursor: "pointer" }}
          >
            <span className="user-avatar">
              <img src={dostLogo} width="20" height="20" alt="avatar" />
            </span>
            <span className="user-name-display">Juan Dela Cruz </span>
            <span className="user-drop-arrow">
              <AiFillCaretDown size="12px" />
            </span>
            <ul
              className="user-drop-option"
              style={{ display: dropState ? "block" : "none" }}
            >
              <span className="user-arrow-up">
                <AiFillCaretUp size="15px" />
              </span>
              <li className="margin-top-1">
                <a href="/ihrmis/#">HR Module</a>
              </li>
              <li className="margin-bottom-1">
                <a href="/ihrmis/#">Change Password</a>
              </li>
              <li className="margin-bottom-1">
                <a href="/ihrmis/#">LOGOUT</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavbarComponent;

{
  /* <li className="margin-right-1 notification">
            <BadgeComponents className="add-style-badge" value={1} />
            <span>
              <AiOutlineQuestionCircle size="20px" />
            </span>
          </li> */
}
{
  /* <li
            className="notification menu-on-mobile"
            onClick={() => {
              dispatch(openSideBar());
            }}
          >
            <span>
              <AiOutlineMenu size="20px" />
            </span>
          </li> */
}
{
  /* <BadgeComponents className="add-style-badge" value={1} />
            <span>
              <AiOutlineBell size="20px" />
            </span> */
}
