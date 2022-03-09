import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { bubbleSort } from "../../../../../../helpers/bubble_sort_helper.js";
import ButtonComponent from "../../../../../common/button_component/button_component.js";
import CalibratedScaleModal from "./calibrated_scale_modal.js";
import { useToggleHelper } from "../../../../../../helpers/use_hooks/toggle_helper";
import { setRefreh } from "../../../../../../features/reducers/jvscrw_slice.js";
import axios from "axios";
import { API_HOST } from "../../../../../../helpers/global/global_config.js";

const WeightingTable = ({ title, type, jvsId, data, specific }) => {
  const dispatch = useDispatch();

  const [isDisplay, setIsDisplay] = useToggleHelper();
  let min, max;
  let ratingArr = [];

  const getMaxMin = (arr) => {
    const newSortedArr = bubbleSort(arr);
    min = newSortedArr[0];
    max = newSortedArr[newSortedArr.length - 1];
  };

  const [compotencyValue, setCompetencyValue] = useState({
    rtg_percent: "",
    rtg_factor: "",
  });

  useEffect(() => {
    dispatch(setRefreh());
  }, [isDisplay]);

  return (
    <React.Fragment>
      <CalibratedScaleModal
        title="Calibrated Scale of Factor Weight"
        isDisplay={isDisplay}
        type={type}
        jvsId={jvsId}
        competency={compotencyValue}
        specific={specific}
        onClose={() => {
          setCompetencyValue({
            rtg_percent: "",
            rtg_factor: "",
          });
          setIsDisplay();
        }}
      />
      <table id="custom-table" style={{ marginBottom: "10px" }}>
        <thead>
          {title === undefined ? null : (
            <tr className="main-headers">
              <th colSpan="12">{title}</th>
            </tr>
          )}
          <tr className="secondary-headers">
            <th
              colSpan="10"
              style={{ textAlign: "center" }}
              className="percent-75-wide"
            >
              CALIBRATED WEIGHT OF FACTOR WEIGHT
            </th>
            <th
              colSpan="2"
              style={{ textAlign: "center" }}
              className="percent-25-wide"
            >
              PERCENTAGE (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {data === undefined
            ? null
            : data.map((item, index, arr) => {
                ratingArr.push(item.rtg_percent);

                if (index + 1 == arr.length) {
                  getMaxMin(ratingArr);
                }

                return (
                  <tr
                    key={index}
                    className="trClass"
                    onClick={() => {
                      setCompetencyValue(item);
                      setIsDisplay();
                    }}
                  >
                    <td colSpan="10" className="percent-75-wide">
                      {item.rtg_factor}
                    </td>
                    <td
                      colSpan="2"
                      style={{ textAlign: "center" }}
                      className="percent-25-wide"
                    >
                      {item.rtg_percent}
                    </td>
                  </tr>
                );
              })}
          <tr className="secondary-headers">
            <th
              colSpan="5"
              style={{ textAlign: "right" }}
              className="percent-30-wide"
            >
              Minimum Factor Weight
            </th>
            <th
              colSpan="2"
              style={{ textAlign: "center" }}
              className="percent-20-wide"
            >
              {min}
            </th>
            {/* LEAST */}
            <th
              colSpan="3"
              style={{ textAlign: "right" }}
              className="percent-30-wide"
            >
              Miximum Factor Weight
            </th>
            <th
              colSpan="2"
              style={{ textAlign: "center" }}
              className="percent-20-wide"
            >
              {max}
            </th>
            {/* HIGHEST */}
          </tr>
        </tbody>
      </table>
      <ButtonComponent
        buttonLogoStart={<MdAdd size="14" />}
        buttonName="Add"
        onClick={() => {
          setIsDisplay();
        }}
      />
    </React.Fragment>
  );
};

export default WeightingTable;
