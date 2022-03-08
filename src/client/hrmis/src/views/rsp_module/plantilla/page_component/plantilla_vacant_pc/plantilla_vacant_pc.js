import React, { useLayoutEffect, useMemo, useState } from "react";
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
        <PlantillaDataTableDisplay type={0} />
      </div>
    </React.Fragment>
  );
};
export default PlantillaItemsVacantPositionComponentView;

export const PlantillaDataTableDisplay = ({ type }) => {
  const [plotData, setPlotData] = useState([]);

  const plantillaItemApi = async () => {
    await axios
      .get(API_HOST + "vacantpositions/" + type)
      .then((response) => {
        let data = response.data.data ?? [];
        let dataPlot = [];

        data?.forEach((element) => {
          dataPlot.push({
            itm_no: element.itm_no,
            pos_short_name: element.position.pos_short_name,
            ofc_acronym: element.office.ofc_acronym,
            itm_status: statusDisplay[element.itm_status],
            pos_category: element.position.pos_category,
          });
        });

        setPlotData(dataPlot);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useLayoutEffect(() => {
    plantillaItemApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let data = useMemo(() => plotData, [plotData]);

  const columns = useMemo(
    () => [
      {
        Header: "Item No.",
        accessor: "itm_no", // accessor is the "key" in the data
      },
      {
        Header: "Position",
        accessor: "pos_short_name",
      },
      {
        Header: "Office",
        accessor: "ofc_acronym",
      },
      {
        Header: "Status",
        accessor: "itm_status",
      },
      {
        Header: "Category",
        accessor: "pos_category",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useFilters,
      useGlobalFilter,
      useSortBy
    );

  return (
    <React.Fragment>
      <br />

      <div className="default-table">
        <table className="table-design" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                className="main-header"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr className="trHoverBody" {...row.getRowProps()}>
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
        <p
          style={{
            fontSize: "small",
            color: "rgba(70, 70, 70, 0.6)",
            marginTop: "10px",
          }}
        >
          Total of {rows.length} entries
        </p>
      </div>
    </React.Fragment>
  );
};
