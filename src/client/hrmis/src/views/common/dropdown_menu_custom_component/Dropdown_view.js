import React from "react";
import { AiFillCaretUp } from "react-icons/ai";
import { Link } from "react-router-dom";

function DropdownViewComponent(props) {
  return (
    <ul className="ul-dropdown-container" style={{ display: props.display }}>
      <div className="ul-menu-item-arrow">
        <AiFillCaretUp size="15px" />
      </div>
      {props.itemList.map((list) => {
        if (list.itemTitle === "Next-in-Rank") {
          return (
            <li
              onClick={props.onClick}
              className="ul-menu-item link-class"
              key={list.id}
            >
              {list.itemTitle}
            </li>
          );
        } else {
          return (
            <Link className="link-class" to={list.link} key={list.id}>
              <li className="ul-menu-item">{list.itemTitle}</li>
            </Link>
          );
        }
      })}
    </ul>
  );
}

DropdownViewComponent.defaultProps = {
  display: "none",
  link: "#",
};

export default DropdownViewComponent;
