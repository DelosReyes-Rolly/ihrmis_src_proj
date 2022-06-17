import React, { useEffect, useState } from "react";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineQuestionCircle,
  AiOutlineMenu,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import dostLogo from "../../../assets/images/logo.png";
import { openSideBar } from "../../../features/reducers/mobile_view_slice";
import { useToggleHelper } from "../../../helpers/use_hooks/toggle_helper";
import BadgeComponents from "../badge_component/Badge";
import NotificationComponent from "../notification/notification_component";
import navbarLogo from "../../../assets/images/ilogo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_HOST } from "../../../helpers/global/global_config";
import { axiosHeader } from "../../../config/axios_config";
import { setBusy } from "../../../features/reducers/popup_response";
import { ALERT_ENUM, popupAlert } from "../../../helpers/alert_response";

const USER_INFO = {
  user: "user",
  token: "token",
  token_type: "token_type",
};

const NavbarComponent = () => {
  let [dropState, updateDropState] = useToggleHelper(false);
  let dispatch = useDispatch();
  const [timeDataState, setTimeDataState] = useState();
  const navigate = useNavigate();

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

  const logoutAccount = async () => {
    dispatch(setBusy(true));
    await axios
      .get(API_HOST + "logout", axiosHeader)
      .then(() => {
        window.sessionStorage.removeItem(USER_INFO.user);
        window.sessionStorage.removeItem(USER_INFO.token);
        window.sessionStorage.removeItem(USER_INFO.token_type);
        dispatch(setBusy(false));
        navigate("/", { replace: true });
      })
      .catch((err) =>
        popupAlert({
          message: err.response.data.message ?? err.message,
          type: ALERT_ENUM.fail,
        })
      );
    dispatch(setBusy(false));
  };

  return (
    <React.Fragment>
      <div className="navbar-div">
        <nav>
          <h1>
            <span className="navbar-span-1 margin-right-1">
              <img src={navbarLogo} width="100" alt="ihrmis_logo" />
            </span>
            <span className="navbar-span-2">
              <p>&copy; 2021 DOST</p>
            </span>
            <span className="navbar-span-3">
              <p>{timeDataState}</p>
            </span>
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
              <span className="user-name-display">
                {window.sessionStorage.getItem("user")}
              </span>
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
                <li className="margin-top-1" onClick={() => navigate("")}>
                  <span>HR Module</span>
                </li>
                <li className="margin-bottom-1">
                  <span>Change Password</span>
                </li>
                <li className="margin-bottom-1" onClick={() => logoutAccount()}>
                  <span>LOGOUT</span>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div className="navabar-borderline"></div>
    </React.Fragment>
  );
};

export default NavbarComponent;
