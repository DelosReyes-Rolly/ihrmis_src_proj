import React from "react";
import ReactTooltip from "react-tooltip";

const IconComponent = ({
  id,
  icon,
  className,
  toolTipId,
  textHelper = "",
  position = "top",
  effect = "solid",
  onClick = null,
  cursor = "pointer",
  color = "map-get($primaryColor, regular)",
}) => {
  let addClassName = "plantilla-icon " + className;

  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        {toolTipId && (
          <ReactTooltip
            id={toolTipId}
            place={position}
            effect={effect}
            html={true}
          >
            {textHelper}
          </ReactTooltip>
        )}

        <span
          id={id}
          data-tip
          data-for={toolTipId}
          className={addClassName}
          onClick={onClick}
          style={{ cursor: cursor, color: color }}
        >
          {icon}
        </span>
      </div>
    </React.Fragment>
  );
};

export default IconComponent;
