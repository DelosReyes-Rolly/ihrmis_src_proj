import React, { useState } from "react";
import ButtonComponent from "../../common/button_component/button_component";
import {
  AiOutlineDown,
  AiOutlineMenu,
  AiOutlinePlus,
  AiOutlineUp,
} from "react-icons/ai";
import IconComponent from "../../common/icon_component/icon";
import SelectComponent from "../../common/input_component/select_component/select_component";
import {
  Actions,
  dateList,
  divisionList,
  functionList,
  periodList,
} from "../static/performance_data_list";
import DropdownIconComponent from "./dropdown_icon_component";
import { IoLocationSharp } from "react-icons/io5";

export const Ratings = ({ columns }) => {
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
    <div>
      <div>
        <div className="text-end">
          <span>OPCR For Revision (1)</span>
        </div>
        <div className="button-position">
          <ButtonComponent
            buttonLogoStart={<AiOutlinePlus />}
            buttonName="NEW"
          />
          <div className="select-position">
            <div className="select-start">
              <SelectComponent itemList={periodList} className="select" />
              <SelectComponent itemList={functionList} className="select" />
            </div>
            <SelectComponent
              itemList={divisionList}
              className="select select-end"
            />
          </div>
        </div>
        <div className="table-container">
          <table className="table-content">
            <thead>
              <tr>
                <th rowSpan={2} colSpan={1}>
                  Major Final Output/s
                </th>
                <th rowSpan={2} colSpan={1}>
                  Success Indicator
                </th>
                <th rowSpan={2} colSpan={1}>
                  Actual Accomplishments
                </th>
                <th rowSpan={1} colSpan={4}>
                  Ratings
                </th>

                <th rowSpan={2} colSpan={1}>
                  Remarks
                </th>
              </tr>
              <tr>
                <th className="item-td-btm item-td-left width-full">Q</th>
                <th className="item-td-btm width-full">E</th>
                <th className="item-td-btm width-full">T</th>
                <th className="item-td-btm item-td-right width-full">A</th>
              </tr>
            </thead>
            <tbody>
              {columns.map((item, index) => (
                <React.Fragment>
                  <tr>
                    <td colSpan={8}>
                      <div className="flex-between">
                        <span className="black">{item.mfo_title}</span>

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
                    item.tar_ind.map((item, index) => (
                      <tr>
                        <td className="no-border"></td>

                        <td>
                          <div className="flex">
                            <DropdownIconComponent
                              dropdownLogo={<AiOutlineMenu />}
                              itemList={Actions}
                            />
                            <IoLocationSharp className="red absolute right-comment-rating-1" />
                            <span className="black pd-left">
                              {item.tar_ind_title}
                            </span>
                          </div>
                        </td>
                        <td>
                          <IoLocationSharp className="red absolute right-comment-rating-1" />
                          <span className="black">
                            {item.tar_accomplishments}
                          </span>
                        </td>
                        <td className="rating">
                          <IoLocationSharp className="red absolute right-comment-rating-2" />

                          <span>{item.tar_ratings.tar_rating_quality}</span>
                        </td>
                        <td className="rating">
                          <IoLocationSharp className="red absolute right-comment-rating-2" />
                          <span>{item.tar_ratings.tar_rating_efficiency}</span>
                        </td>
                        <td className="rating">
                          <IoLocationSharp className="red absolute right-comment-rating-2" />
                          <span>{item.tar_ratings.tar_rating_timeliness}</span>
                        </td>
                        <td className="rating">
                          <IoLocationSharp className="red absolute right-comment-rating-2" />
                          <span>{item.tar_ratings.tar_rating_average}</span>
                        </td>
                        <td>
                          <IoLocationSharp className="red absolute right-comment-rating" />
                          <span className="black">{item.tar_remarks}</span>
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              ))}

              <tr>
                <td colSpan={8}>
                  <IconComponent
                    icon={<AiOutlinePlus />}
                    // onClick={AddRowOnClick}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
