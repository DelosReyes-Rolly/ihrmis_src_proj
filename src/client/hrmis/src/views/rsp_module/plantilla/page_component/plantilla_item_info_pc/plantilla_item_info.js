import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { BsArrowDown, BsArrowUp, BsPencilFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import { API_HOST } from "../../../../../helpers/global/global_config";
import { usePopUpHelper } from "../../../../../helpers/use_hooks/popup_helper";
import { useToggleService } from "../../../../../services/toggle_service";
import BreadcrumbComponent from "../../../../common/breadcrumb_component/Breadcrumb";
import ButtonComponent from "../../../../common/button_component/button_component.js";
import { plantillaItemsInfoBreadCramp } from "../../static/breadcramp_data";
import {
  apiCategoryServiceModalInputItem,
  apiEmploymentBasisModalInputItem,
  apiEmploymentStatModalInputItem,
  apiLevelPositionModalInputItem,
  apiModeCreationModalInputItem,
} from "../../static/input_items";
import AddPlantillaItemModal from "../add_plantilla_item_modal/add_plantilla_item_modal";

const PlantillaItemInformation = () => {
  const { item } = useParams();
  const { renderBusy, renderFailed } = usePopUpHelper();
  const [plantilla, setPosition] = useState();
  const [dtyResponsibility, setDtyResponsibility] = useState();
  let [toggleAddPlantillaItem, setTogglePlantillaItem] =
    useToggleService(false);

  const itemInformation = async (item) => {
    renderBusy(true);
    await axios
      .get(API_HOST + "plantilla-itm-detail/" + item)
      .then((res) => {
        setPosition(res.data.data);
      })
      .catch((err) => {
        renderFailed({ content: err.message });
      });

    await axios
      .get(API_HOST + "plantilla-duties-responsibility/" + item)
      .then((res) => {
        setDtyResponsibility(res.data.data);
      })
      .catch((err) => {
        renderFailed({ content: err.message });
      });

    renderBusy(false);
  };

  useEffect(() => {
    itemInformation(item);
  }, []);
  return (
    <React.Fragment>
      <AddPlantillaItemModal
        isDisplay={toggleAddPlantillaItem}
        onClose={() => setTogglePlantillaItem()}
        plantillaData={plantilla}
      />
      <BreadcrumbComponent
        list={plantillaItemsInfoBreadCramp}
        change={plantilla?.itm_no}
        className=""
      />

      <PositionTableView data={plantilla} />
      <div
        style={{ margin: "10px 20px", display: "flex", justifyContent: "end" }}
      >
        <ButtonComponent
          buttonLogoStart={<BsPencilFill size={13} />}
          buttonName="Edit"
          onClick={() => setTogglePlantillaItem()}
        />
      </div>

      <br />
      <DutiesAndRespoView
        plotData={dtyResponsibility}
        itemNumber={plantilla?.itm_no}
      />
      <div
        style={{ margin: "10px 20px", display: "flex", justifyContent: "end" }}
      >
        <ButtonComponent
          buttonLogoStart={<BsPencilFill size={13} />}
          buttonName="Edit"
        />
      </div>
    </React.Fragment>
  );
};

export default PlantillaItemInformation;

const PositionTableView = ({ data }) => {
  const dataValue = (number, data) => {
    let value = "";
    data.forEach((element) => {
      if (element.id === number) {
        value = element.title;
      }
    });
    return value;
    //apiLevelPositionModalInputItem
  };
  return (
    <div className="default-table">
      <table>
        <tbody>
          <tr>
            <th className="main-header">Item No.</th>
            <td>{data?.itm_no}</td>
            <th className="main-header">Salary Grade</th>
            <td>{data?.position?.pos_salary_grade}</td>
          </tr>
          <tr>
            <th className="main-header" rowSpan="2">
              Position Title
            </th>
            <td rowSpan="2">{data?.position?.pos_title}</td>
            <th className="main-header">Nature of employment</th>
            <td>
              {dataValue(data?.itm_status, apiEmploymentStatModalInputItem)}
            </td>
          </tr>
          <tr>
            <th className="main-header">Employment Basis</th>
            <td>
              {dataValue(data?.itm_basis, apiEmploymentBasisModalInputItem)}
            </td>
          </tr>
          <tr>
            <th className="main-header">Level of Position</th>
            <td>
              {dataValue(data?.itm_level, apiLevelPositionModalInputItem)}
            </td>
            <th className="main-header">Category Service</th>
            <td>
              {dataValue(data?.itm_category, apiCategoryServiceModalInputItem)}
            </td>
          </tr>
          <tr>
            <th className="main-header">Place of Assignment</th>
            <td>{data?.office?.ofc_acronym}</td>
            <th className="main-header">Mode of Creation</th>
            <td>
              {dataValue(data?.itm_creation, apiModeCreationModalInputItem)}
            </td>
          </tr>
          <tr>
            <th className="main-header">Area Code and Type</th>
            <td>
              {data?.office?.ofc_area_code +
                " - " +
                data?.office?.ofc_area_type}
            </td>
            <th className="main-header">Source of Found</th>
            <td></td>
          </tr>
          <tr>
            <th className="main-header" rowSpan="2">
              Description of Position Function
            </th>
            <td rowSpan="2">{data?.itm_function}</td>
            <th className="main-header">Position of Immediate Supervisor</th>
            <td></td>
          </tr>
          <tr>
            <th className="main-header">Position of Next Supervisor</th>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const DutiesAndRespoView = ({ plotData = [] }) => {
  const columns = useMemo(
    () => [
      {
        Header: "DUTIES AND RESPONSIBILITIES",
        columns: [
          {
            Header: "No.",
            accessor: "dty_itm_order",
          },
          {
            Header: "Duties and Responsibilities",
            accessor: "dty_itm_desc",
          },
          {
            Header: "Percentage of Working Time",
            accessor: "dty_itm_percent",
          },
          {
            Header: "Competency Level",
            accessor: "dty_itm_cmptncy",
          },
        ],
      },
    ],
    []
  );

  const data = useMemo(() => plotData, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <div className="default-table">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="main-header"
                >
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <BsArrowDown />
                      ) : (
                        <BsArrowUp />
                      )
                    ) : (
                      ""
                    )}
                  </span>

                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
