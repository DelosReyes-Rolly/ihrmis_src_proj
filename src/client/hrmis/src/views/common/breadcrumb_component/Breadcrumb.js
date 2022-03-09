import React, { Component } from "react";

const BreadcrumbComponent = ({ list, change }) => {
  return (
    <React.Fragment>
      <ul className="breadcrumb">
        {list.map((listName, i, row) => {
          if (row.length === i + 1 && change !== undefined) {
            return <li key={listName.name}>{change}</li>;
          } else {
            if (listName.link === "#") {
              return <li key={listName.name}>{listName.name}</li>;
            } else {
              return (
                <li key={listName.name}>
                  <a href={listName.link}>{listName.name}</a>
                </li>
              );
            }
          }
        })}
      </ul>
    </React.Fragment>
  );
};

export default BreadcrumbComponent;
