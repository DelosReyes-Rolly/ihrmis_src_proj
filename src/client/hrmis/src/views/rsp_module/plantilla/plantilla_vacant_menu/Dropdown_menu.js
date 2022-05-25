import React, { useRef, useState } from "react";
import { AiFillCaretUp } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import {
  setNextRank,
  setRankEmail,
} from "../../../../features/reducers/plantilla_item_slice";

const DropdownMenu = ({
  title,
  className,
  itemList,
  alignItems = "start",
  tooltipData = { position: "top", effect: "solid" },
  customData,
  callback,
}) => {
  const [dropable, setDropable] = useState(false);
  const timerRef = useRef();

  const navigate = useNavigate();

  const selectedProperty = (link = null) => {
    if (link !== null) {
      navigate(link);
      setDropable(false);
    }

    if (link === null) {
      timerRef.current = setTimeout(() => {
        setDropable(false);
      }, 200);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: alignItems,
      }}
      onBlur={() => selectedProperty()}
    >
      {tooltipData.toolTipId && (
        <ReactTooltip
          id={tooltipData.toolTipId}
          place={tooltipData.position}
          effect={tooltipData.effect}
        >
          {tooltipData.textHelper}
        </ReactTooltip>
      )}

      <button
        data-tip
        data-for={tooltipData.toolTipId}
        className={className}
        style={{ width: "max-content" }}
        onClick={() => {
          setDropable(!dropable);
        }}
      >
        {title}
      </button>
      {itemList && (
        <DropList
          itemList={itemList}
          display={dropable ? "block" : "none"}
          onClick={selectedProperty}
          customData={customData}
          callback={callback}
        />
      )}
    </div>
  );
};

export default DropdownMenu;

const DropList = ({
  itemList = [],
  display = "none",
  customData,
  callback,
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const linkDetector = (item) => {
    let itemlink = item.link;
    if (typeof itemlink === "string" || itemlink instanceof String)
      return navigate(itemlink);
    else if (typeof itemlink === "function") {
      itemlink();
    } else if (typeof item.link === "boolean" && item.link) {
      if (item.label.includes("Notify")) {
        dispatch(setRankEmail());
      } else if (item.label.includes("Next-in")) {
        dispatch(setNextRank());
      }
    }
  };

  return (
    <React.Fragment>
      <ul className="ul-dropdown-container" style={{ display: display }}>
        <div className="ul-menu-item-arrow">
          <AiFillCaretUp size="15px" />
        </div>
        {itemList?.map((element, key) => {
          return (
            <li
              style={{ listStyle: "none" }}
              className="ul-menu-item"
              onClick={() => linkDetector(element)}
              key={key}
            >
              {element.label}
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};
