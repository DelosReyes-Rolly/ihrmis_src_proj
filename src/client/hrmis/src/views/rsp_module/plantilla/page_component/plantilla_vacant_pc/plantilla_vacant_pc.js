import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import BreadcrumbComponent from "../../../../common/breadcrumb_component/Breadcrumb";
import IconComponent from "../../../../common/icon_component/icon";
import { API_HOST } from "../../../../../helpers/global/global_config";
import { statusDisplay } from "../../static/display_option";
import {
  BsArrowDown,
  BsArrowUp,
  BsFillCheckCircleFill,
  BsGlobe,
} from "react-icons/bs";
import { useTable, useSortBy, useGlobalFilter, useFilters } from "react-table";
import axios from "axios";
import { AiFillPrinter } from "react-icons/ai";
import { plantillaVacantBreadCramp } from "../../static/breadcramp_data";
import { useToggleService } from "../../../../../services/toggle_service";
import { useDispatch } from "react-redux";
import NextInRankModal from "../next_in_rank_modal/next_in_rank_modal";
import { plantillaItemMenuItem } from "../../static/menu_items";
import { MdMoreHoriz } from "react-icons/md";
import DropdownViewComponent from "../../../../common/dropdown_menu_custom_component/Dropdown_view";
// eslint-disable-next-line
// import { BreadCrumbsData } from "../../static/breadcramp_data";

// let bc = BreadCrumbsData();

const PlantillaItemsVacantPositionComponentView = () => {
  return (
    <React.Fragment>
      <div className="plantilla-view">
        <div className="container-plantilla">
          {/* <BreadcrumbComponent list={bc.getBreadcrumbData('vacant')} className="" /> */}
          <BreadcrumbComponent list={plantillaVacantBreadCramp} className="" />
        </div>

        <div className="three-idiot">
          <IconComponent
            id="print_vacantposition"
            icon={<AiFillPrinter />}
            toolTipId="pl-vp-printer"
            textHelper="Print"
          />
          <IconComponent
            id="print_vacantposition"
            className="padding-left-1"
            icon={<BsGlobe />}
            toolTipId="pl-vp-view"
            textHelper="View/Edit Selected Vacant Position"
          />
          <IconComponent
            id="print_vacantposition"
            className="padding-left-1"
            icon={<BsFillCheckCircleFill />}
            toolTipId="pl-vp-check"
            textHelper="Close Vacant Position"
          />
        </div>
        <div>
          <TableView regularValue={1} />
        </div>
      </div>
    </React.Fragment>
  );
};

const TableView = (props) => {
  let [toggleNextRank, setToggletoggleNextRank] = useToggleService(false);
  let [toggleAddPlantillaItem, setTogglePlantillaItem] =
    useToggleService(false);

  const [buttonToggleState, setButtonToggleState] = useState({
    on: false,
    index: 0,
  });

  const buttonTogleTab = (number) => {
    if (buttonToggleState.on === false) {
      setButtonToggleState({ on: true, index: number });
    } else {
      setButtonToggleState({ on: false, index: number });
    }
  };

  //API CALL FOR VIEWING
  const dispatch = useDispatch();
  const [plantillaItemTableData, setData] = useState();
  useEffect(() => {
    const plantillaItemApi = async () => {
      await axios
        .get(API_HOST + "plantilla-items")
        .then((response) => {
          setData(response.data.data);
          console.log("Run");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    plantillaItemApi(plantillaItemTableData);
    console.log();
  }, []);

  return (
    <React.Fragment>
      <NextInRankModal
        isDisplay={toggleNextRank}
        onClose={setToggletoggleNextRank}
      />
      <div className="plantilla-table">
        <div className="scrollable-div-table">
          <table id="custom-table">
            <thead>
              <tr className="fixed-label-table">
                <th>
                  <button>
                    <BsArrowUp />
                  </button>{" "}
                  Item No.
                </th>
                <th>
                  <button>
                    <BsArrowUp />
                  </button>{" "}
                  Position
                </th>
                <th>
                  <button>
                    <BsArrowUp />
                  </button>{" "}
                  Office
                </th>
                <th>
                  <button>
                    <BsArrowUp />
                  </button>{" "}
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {plantillaItemTableData &&
                plantillaItemTableData.map((data) => {
                  if ((props.regularValue === 1) & (data.itm_regular === 1)) {
                    return (
                      <tr className="trClass" key={data.itm_id}>
                        <td>{data.itm_no ?? ""}</td>
                        <td>{data.position.pos_short_name ?? ""}</td>
                        <td>{data.office.ofc_acronym ?? ""}</td>
                        <td className="column-option">
                          <div className="inline-div-td-1">
                            {statusDisplay[data.itm_status]}
                            <br />
                            {}
                          </div>
                          <div className="inline-div-td-2">
                            <button onClick={() => buttonTogleTab(data.itm_id)}>
                              <MdMoreHoriz size="15" />
                            </button>

                            <DropdownViewComponent
                              display={
                                buttonToggleState.on
                                  ? buttonToggleState.index === data.itm_id
                                    ? "block"
                                    : "none"
                                  : "none"
                              }
                              itemList={plantillaItemMenuItem}
                              onClick={() => {
                                setToggletoggleNextRank();
                                setButtonToggleState({
                                  on: data.itm_id,
                                  index: false,
                                });
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  } else if (
                    (props.regularValue === 0) &
                    (data.itm_regular === 0)
                  ) {
                    return (
                      <tr className="trClass" key={data.itm_id}>
                        <td>{data.itm_no}</td>
                        <td>{data.position.pos_short_name}</td>
                        <td>{data.office.ofc_acronym}</td>
                        <td className="column-option">
                          <div className="inline-div-td-1">
                            {statusDisplay[data.itm_status]}
                            <br />
                            {}
                          </div>
                          <div className="inline-div-td-2">
                            <button onClick={() => buttonTogleTab(data.itm_id)}>
                              <MdMoreHoriz size="15" />
                            </button>

                            <DropdownViewComponent
                              display={
                                buttonToggleState.on
                                  ? buttonToggleState.index === data.itm_id
                                    ? "block"
                                    : "none"
                                  : "none"
                              }
                              itemList={plantillaItemMenuItem}
                              onClick={() => {
                                setToggletoggleNextRank();
                                setButtonToggleState({
                                  on: data.itm_id,
                                  index: false,
                                });
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                  return <React.Fragment></React.Fragment>;
                })}
            </tbody>
          </table>
        </div>

        <p className="data-entry">
          Total of {plantillaItemTableData && plantillaItemTableData.length}{" "}
          Entries
        </p>
        <br />
      </div>
    </React.Fragment>
  );
};
export default PlantillaItemsVacantPositionComponentView;
