import React, { useRef, useState } from "react";
import { AiFillCaretUp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import usePositionSetter from "../../../helpers/use_hooks/position_setter";

const DropdownButtonViewComponent = ({
  title = {},
  className,
  itemList,
  alignItems = "center",
  toolTipId,
  textHelper,
  position = "top",
  effect = "solid",
  setValue,
}) => {
  const [dropable, setDropable] = useState(false);
  const [x, y, location, elementSize] = usePositionSetter(dropable);
  const timerRef = useRef();
  const navigate = useNavigate();
  // const location = useRef();

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
      ref={location}
      onBlur={() => selectedProperty()}
    >
      {toolTipId && (
        <ReactTooltip id={toolTipId} place={position} effect={effect}>
          {textHelper}
        </ReactTooltip>
      )}

      <button
        data-tip
        data-for={toolTipId}
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
          setValue={setValue}
          location={location}
          size={elementSize}
          xPosition={x}
          yPosition={y}
        />
      )}
    </div>
  );
};

export default DropdownButtonViewComponent;

const DropList = ({
  itemList = [],
  display = "none",
  setValue,
  size,
  xPosition,
  yPosition,
}) => {
  const navigate = useNavigate();
  const linkDetector = (item) => {
    if (typeof item === "string" || item instanceof String)
      return navigate(item);
    else if (typeof item === "function") {
      item();
    }
  };
  return (
    <React.Fragment>
      <ul
        className="ul-dropdown-container"
        ref={size}
        style={{
          display: display,
          position: "fixed",
          top: yPosition,
          left: xPosition,
        }}
      >
        <div className="ul-menu-item-arrow">
          <AiFillCaretUp size="15px" />
        </div>
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
};
