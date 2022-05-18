import React, { useState } from "react";
import { AiFillCaretUp } from "react-icons/ai";
import ReactTooltip from "react-tooltip";

const DropDownComponent = ({
  title,
  className,
  itemList,
  setValue,
  toolTipId,
  position = "left",
  effect = "solid",
  textHelper,
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

        <button
          data-tip
          data-for={toolTipId}
          className={className}
          style={{ width: "max-content" }}
          onClick={() => setDropable(!dropable)}
        >
          {title}
        </button>

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

export default DropDownComponent;

const DropList = ({ itemList, display = "none", setValue }) => {
  return (
    <React.Fragment>
      <ul className="droplist-style" style={{ display: display }}>
        <div className="arrow-style">
          <AiFillCaretUp size="15px" />
        </div>
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
