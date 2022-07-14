import React from "react";
import { useNavigate } from "react-router-dom";

const BreadcrumbComponent = ({ list }) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <ul className="breadcrumb">
        {list?.map((listName) => {
          if (listName.link === "#") {
            return <li key={listName.name}>{listName.name}</li>;
          }
          return (
            <li
              key={listName.name}
              className="active-list-item"
              onClick={() => {
                navigate(listName.link);
              }}
            >
              {listName.name}
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default BreadcrumbComponent;
