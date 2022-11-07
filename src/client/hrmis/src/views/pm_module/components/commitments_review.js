import React from "react";
import { useState } from "react";
import {
  AiOutlineDown,
  AiOutlineMenu,
  AiOutlinePlus,
  AiOutlineUp,
} from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import ButtonComponent from "../../common/button_component/button_component";
import IconComponent from "../../common/icon_component/icon";
import SelectComponent from "../../common/input_component/select_component/select_component";
import {
  Actions,
  divisionList,
  functionList,
  periodList,
} from "../static/performance_data_list";

export const CommitmentsReview = ({ headers, columns }) => {
  const [subRows, setSubRows] = useState([]);

  const toggleSubRows = (id) => {
    const shownState = subRows.slice();
    const index = shownState.indexOf(id);

    if (index >= 0) {
      shownState.splice(index, 1);
      setSubRows(shownState);
    } else {
      shownState.push(id);
      setSubRows(shownState);
    }
  };

  return (
    <>
      <div>
        <div className="text-end">
          <span>OPCR FY 2021 1st Semester</span>
          <span>:</span>
          <span>OPCR For Revision (1)</span>
        </div>
        <div className="button-position">
          <SelectComponent itemList={functionList} className="select" />
        </div>
        <div className="table-container">
          <table className="table-content">
            <thead>
              <tr>
                {headers.map((item) => (
                  <TableHeaderItem item={item} />
                ))}
              </tr>
            </thead>
            <tbody>
              {columns.map((item, index) => (
                <React.Fragment>
                  <tr>
                    <td key={index} colSpan={5}>
                      <div className="flex-between">
                        <div className="flex">
                          <span
                            className="black"
                            style={{ paddingLeft: "10px" }}
                          >
                            {item.mfo_title}
                          </span>
                        </div>
                        <div>
                          <span onClick={() => toggleSubRows(item.mfo_id)}>
                            {subRows.includes(item.mfo_id) ? (
                              <AiOutlineUp />
                            ) : (
                              <AiOutlineDown />
                            )}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  {subRows.includes(item.mfo_id) &&
                    item.tar_ind_id.map((item, index) => (
                      <tr>
                        <td className="no-border"></td>

                        <td id={index}>
                          <div className="flex">
                            <span className="black pointer" onClick={() => {}}>
                              {item.tar_ind_title}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className="black pointer" onClick={() => {}}>
                            {" "}
                            {item.tar_budget}
                          </span>
                        </td>
                        <td>
                          <span className="black pointer" onClick={() => {}}>
                            {" "}
                            {item.div_response}
                          </span>
                        </td>
                        <td style={{ position: "relative" }}>
                          <span className="black pointer" onClick={() => {}}>
                            {" "}
                            {item.tar_remarks}
                          </span>

                          <IoLocationSharp
                            onClick={() => {}}
                            size={15}
                            className="red absolute right-comment-commitment pointer"
                          />
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const TableHeaderItem = ({ item }) => <th className="pd-5">{item.heading}</th>;
