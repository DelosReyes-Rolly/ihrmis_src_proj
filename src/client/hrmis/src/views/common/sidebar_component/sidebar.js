import React, { useEffect } from "react";
import { SidebarOption } from "./sidebar_data";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import useSessionStorage from "../../../helpers/use_hooks/session_storage";
import { CSSTransition } from "react-transition-group";
import { openSideBar } from "../../../features/reducers/mobile_view_slice";
import { useDetectScreenHelper } from "../../../helpers/use_hooks/detect_screen_helper";

const SidebarComponent = ({ itemsList = SidebarOption }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useSessionStorage("selected-sidebar-item", 1);
  const [_, setSubSelected] = useSessionStorage("selected-sidebar-subitem", 1);
  const isNavbarEnable = useSelector((state) => state.mobileView.sidebar);
  const dispatch = useDispatch();
  const { isMobile } = useDetectScreenHelper();

  return (
    <React.Fragment>
      <div className={`sidebar-component-style-second`}></div>
      <CSSTransition
        classNames="slideRight"
        in={isMobile === true ? isNavbarEnable : true}
        timeout={300}
        unmountOnExit
      >
        <div className={`sidebar-component-style `}>
          <p style={{ padding: "10px" }}>
            Human Resource Management
            <br />
            Information System
          </p>
          <div className="sidebar-menu-items">
            <ul className="list-of-items">
              {itemsList.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <li
                      onClick={() => {
                        if (selected === item.id) {
                          navigate(item.link);
                          setSelected(0);
                          setSubSelected(0);
                        } else {
                          navigate(item.link);
                          setSelected(item.id);
                          setSubSelected(0);
                        }
                        if (item.more === null && isMobile) {
                          dispatch(openSideBar());
                        }
                      }}
                      className="items"
                      style={
                        selected === item.id
                          ? { backgroundColor: "#408fd6", color: "white" }
                          : null
                      }
                    >
                      <div>
                        {item.icon}
                        {item.title}
                      </div>
                      {item.more && (
                        <span>
                          <CSSTransition
                            in={selected === item.id}
                            timeout={300}
                            classNames="rotateArrow"
                          >
                            {selected === item.id ? (
                              <MdKeyboardArrowUp />
                            ) : (
                              <MdKeyboardArrowDown />
                            )}
                            {/* <MdKeyboardArrowUp /> */}
                          </CSSTransition>
                        </span>
                      )}
                    </li>
                    <CSSTransition
                      in={selected === item.id}
                      timeout={200}
                      unmountOnExit
                      classNames="slideDown"
                    >
                      <SubItemComponent itemList={item.more} />
                    </CSSTransition>
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};

export default SidebarComponent;

const SubItemComponent = ({ itemList = [] }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useSessionStorage(
    "selected-sidebar-subitem",
    1
  );
  const dispatch = useDispatch();
  const { isMobile } = useDetectScreenHelper();
  useEffect(() => {
    setSelected(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <ul>
        {itemList?.map((item) => {
          return (
            <li
              className="sub-item"
              key={item.id}
              onClick={() => {
                navigate(item.link);
                setSelected(item.id);
                if (isMobile) {
                  dispatch(openSideBar());
                }
              }}
              style={
                selected === item.id
                  ? { backgroundColor: "rgba(70, 70, 70, 0.6)", color: "white" }
                  : null
              }
            >
              <span style={{ padding: "0px 0px 0px 35px" }}>{item.title}</span>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};
