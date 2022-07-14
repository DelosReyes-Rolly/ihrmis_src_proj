import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { BsArrowDown, BsArrowUp, BsPencilFill } from "react-icons/bs";
import { MdInfo } from "react-icons/md";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import { API_HOST } from "../../../../../helpers/global/global_config";
import { usePopUpHelper } from "../../../../../helpers/use_hooks/popup_helper";
import BreadcrumbComponent from "../../../../common/breadcrumb_component/Breadcrumb";
import ButtonComponent from "../../../../common/button_component/button_component.js";
import { plantillaItemsInfoBreadCramp } from "../../static/breadcramp_data";
import {
  apiCategoryServiceModalInputItem,
  apiEmploymentBasisModalInputItem,
  apiEmploymentStatModalInputItem,
  apiLevelPositionModalInputItem,
  apiModeCreationModalInputItem,
  SourceOfFundsItem,
} from "../../static/input_items";
import AddPlantillaItemModal from "../add_plantilla_item_modal/add_plantilla_item_modal";
import AddPlantillaItemDutiesAndRespoModal from "../plantilla_info_modals/add_duties_respo_modal";
import ReactTooltip from "react-tooltip";
import PositionInfoModal from "../plantilla_info_modals/position_info_modal";
import { useToggleHelper } from "../../../../../helpers/use_hooks/toggle_helper";

const PlantillaItemInformation = () => {
  const { item } = useParams();
  const { refresh } = useSelector((state) => state.popupResponse);
  const { renderFailed } = usePopUpHelper();
  const [plantilla, setPosition] = useState();
  const [dtyResponsibility, setDtyResponsibility] = useState();
  const [toggleAddPlantillaItem, setTogglePlantillaItem] =
    useToggleHelper(false);
  const [toggleAddDtyItem, setToggleAddDtyItem] = useToggleHelper(false);

  const itemInformation = async () => {
    // const id = plantilla?.position?.pos_id;
    await axios
      .get(API_HOST + "plantilla-duties-responsibility/" + item)
      .then((res) => {
        setDtyResponsibility(res.data.data);
      })
      .catch((err) => {
        renderFailed({ content: err.message });
      });
  };

  const plantillaDetail = async () => {
    await axios
      .get(API_HOST + "plantilla-itm-detail/" + item)
      .then((res) => {
        setPosition(res.data.data);
      })
      .catch((err) => {
        renderFailed({ content: err.message });
      });
  };

  useEffect(() => {
    itemInformation();
    plantillaDetail();
  }, [refresh]);

  return (
    <React.Fragment>
      <AddPlantillaItemModal
        isDisplay={toggleAddPlantillaItem}
        onClose={() => setTogglePlantillaItem()}
        plantillaData={plantilla}
        plantillaID={item}
      />
      <AddPlantillaItemDutiesAndRespoModal
        isDisplay={toggleAddDtyItem}
        onClose={() => setToggleAddDtyItem()}
        dtyData={dtyResponsibility}
        dty_id={item}
      />
      <BreadcrumbComponent
        list={plantillaItemsInfoBreadCramp}
        change={plantilla?.itm_no}
      />
      <br />
      <PositionTableView data={plantilla} pos_id={plantilla?.position.pos_id} />
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
      <DutiesAndRespoView plotData={dtyResponsibility} />
      <div
        style={{ margin: "10px 20px", display: "flex", justifyContent: "end" }}
      >
        <ButtonComponent
          buttonLogoStart={<BsPencilFill size={13} />}
          buttonName="Edit"
          onClick={() => setToggleAddDtyItem()}
        />
      </div>
    </React.Fragment>
  );
};
export default PlantillaItemInformation;

const PositionTableView = ({ data, pos_id }) => {
  const dataValue = (number, data) => {
    let value = "";
    data.forEach((element) => {
      if (element.id === number) {
        value = element.title;
      }
    });
    return value;
  };
  const [toogleModal, setToogleModal] = useToggleHelper(false);
  return (
    <React.Fragment>
      <PositionInfoModal
        isDisplay={toogleModal}
        onClose={setToogleModal}
        pos_id={pos_id}
      />
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
              <td rowSpan="2">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <p>{data?.position?.pos_title}</p>
                  <div>
                    <div
                      data-tip
                      data-for="registerTip"
                      onClick={setToogleModal}
                    >
                      <MdInfo size="20" />
                    </div>

                    <ReactTooltip id="registerTip" place="top" effect="solid">
                      View Info
                    </ReactTooltip>
                  </div>
                </div>
              </td>
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
                {dataValue(
                  data?.itm_category,
                  apiCategoryServiceModalInputItem
                )}
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
                {(data?.office?.ofc_area_code ?? "") +
                  " - " +
                  data?.office?.ofc_area_type ?? ""}
              </td>
              <th className="main-header">Source of Found</th>
              <td>
                {SourceOfFundsItem[parseInt(data?.itm_source)]?.title ?? ""}
              </td>
            </tr>
            <tr>
              <th className="main-header" rowSpan="2">
                Description of Position Function
              </th>
              <td rowSpan="2">{data?.itm_function}</td>
              <th className="main-header">Position of Immediate Supervisor</th>
              <td>{data?.itm_supv1_display}</td>
            </tr>
            <tr>
              <th className="main-header">Position of Next Supervisor</th>
              <td>{data?.itm_supv2_display}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

const DutiesAndRespoView = ({ plotData }) => {
  const [dataArr, setDataArr] = useState([]);

  useEffect(() => {
    if (plotData) {
      setDataArr(plotData);
    }
  }, [plotData]);

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

  const data = useMemo(() => dataArr, [dataArr]);

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
