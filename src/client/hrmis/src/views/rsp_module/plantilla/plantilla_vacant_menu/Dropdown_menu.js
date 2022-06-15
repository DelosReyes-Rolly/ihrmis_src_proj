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
  itemId,
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
          itemId={itemId}
        />
      )}
    </div>
  );
};

export default DropdownMenu;

const DropList = ({ itemList = [], display = "none", itemId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const linkDetector = (item) => {
    const itemlink = item.link;

    if (typeof itemlink === "string" || itemlink instanceof String) {
      if (item.label === "JVS &CRW") return navigate(itemlink + "/" + itemId);
      return navigate(itemlink);
    }

    if (typeof itemlink === "boolean" && item.link) {
      if (item.label.includes("Notify")) return dispatch(setRankEmail());
      return dispatch(setNextRank());
    }

    return itemlink();
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
