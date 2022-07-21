import React, { memo, useCallback, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";

import ButtonComponent from "../../../../../../common/button_component/button_component.js";
import CompetencyModal from "./competency_modal.js";

const CompetencyTable = ({ title = "EDUCATION", RTG_TYPE, detail }) => {
  /**
   * All use callback
   */
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editValue, setEditValue] = useState(null);
  const [editArr, setEditArr] = useState([]);

  const [minMax, setMinMax] = useState({
    min: 0,
    max: 0,
  });

  const modalSetter = useCallback((boolValue) => {
    setModal(boolValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editModalSetter = useCallback((boolValue) => {
    setEditModal(boolValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMinMax(calculateMinMax(detail));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail]);

  return (
    <React.Fragment>
      <CompetencyModal
        title={title}
        isDisplay={modal}
        onClose={modalSetter}
        RTG_TYPE={RTG_TYPE}
      />
      <CompetencyModal
        title={title}
        isDisplay={editModal}
        onClose={editModalSetter}
        data={editValue}
        RTG_TYPE={RTG_TYPE}
        arrData={editArr}
      />
      {console.log("RENDER POS TABLE: ")}
      <div className="jvs-container">
        <table className="table-position">
          <thead>
            <tr className="header-one">
              <th colSpan="4">{title}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="header-two" colSpan="2">
                CALIBRATED SCALE OF FACTOR WEIGHT
              </td>
              <td className="header-two" colSpan="2">
                PERCENTAGE (%)
              </td>
            </tr>
            {detail?.map((item, index, arrayValue) => {
              return (
                <tr
                  key={index}
                  onClick={() => {
                    setEditValue({
                      index: index,
                      rtg_factor: item.rtg_factor,
                      rtg_percent: item.rtg_percent,
                    });
                    setEditArr(arrayValue);
                    setEditModal(true);
                  }}
                >
                  <td colSpan="2">{item.rtg_factor}</td>
                  <td colSpan="2">{item.rtg_percent}</td>
                </tr>
              );
            })}

            <tr>
              <td className="header-two">Minimum Factor Weight</td>
              <td>{minMax.min}</td>
              <td className="header-two">Maximum Factor Weight</td>
              <td>{minMax.max}</td>
            </tr>
          </tbody>
        </table>
        <div className="btn-add-comp">
          <ButtonComponent
            buttonLogoStart={<MdAdd size="14" />}
            buttonName="Add"
            onClick={() => setModal(true)}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default memo(CompetencyTable);

const calculateMinMax = (competency = []) => {
  let mini = 0;
  let maxi = 0;

  competency.forEach((element, index) => {
    if (index === 0) {
      mini = element.rtg_percent;
      maxi = element.rtg_percent;
    }
    if (element.rtg_percent > maxi) {
      maxi = element.rtg_percent;
    }
    if (element.rtg_percent < mini) {
      mini = element.rtg_percent;
    }
  });

  return {
    min: mini,
    max: maxi,
  };
};

export const COMPETENCY_ENUMS = Object.freeze({
  EDUCATION: "ED",
  TRAINING: "TR",
  EXPERIENCE: "EX",
});
