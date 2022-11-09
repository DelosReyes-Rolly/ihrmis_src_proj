import React, { useState } from "react";
import { AiFillCaretUp } from "react-icons/ai";
import ReactTooltip from "react-tooltip";

const DropdownIconComponent = ({
  className,
  itemList,
  setValue,
  toolTipId,
  position = "left",
  effect = "solid",
  textHelper,
  dropdownLogo,
}) => {
  const [dropable, setDropable] = useState(false);
  return (
    <React.Fragment>
      <div
        style={{
          position: "relative",
        }}
      >
        {toolTipId && (
          <ReactTooltip id={toolTipId} place={position} effect={effect}>
            {textHelper}
          </ReactTooltip>
        )}

        <span
          data-tip
          data-for={toolTipId}
          className={className}
          style={{ width: "max-content" }}
          onClick={() => setDropable(!dropable)}
        >
          {dropdownLogo}
        </span>

        {itemList && (
          <DropList
            display={dropable ? "block" : "none"}
            itemList={itemList}
            setValue={setValue}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default DropdownIconComponent;

const DropList = ({ itemList, display = "none", setValue }) => {
  return (
    <React.Fragment>
      <ul className="actions-style" style={{ display: display }}>
        {itemList?.map((element, key) => {
          return (
            <li
              style={{ listStyle: "none" }}
              className=""
              key={key}
              onClick={() => setValue(element.id)}
            >
              {element.label}
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};
