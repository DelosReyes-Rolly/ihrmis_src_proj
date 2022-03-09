import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRatingFactor } from "../../../../../../features/reducers/jvscrw_slice";
import CheckboxComponent from "../../../../../common/input_component/checkbox_input_component/checkbox_input_component";
import InputComponent from "../../../../../common/input_component/input_component/input_component";
import WeightingTable from "./weight_table";

const CheckJobCompetency = ({ data, title, jvsId, type, isEmpty }) => {
  const [checkState, setCheckState] = useState(isEmpty);
  const [specify, setSpecify] = useState(data.com_specific);
  const { competencies } = useSelector((state) => state.jvsform);
  const dispatch = useDispatch();

  const changeStateFunc = (value) => {
    setSpecify(value);
    if (type === "ED") {
    }
    switch (type) {
      case "ED":
        dispatch(
          setRatingFactor({
            skills: TYPE[0],
            com_jvs_id: jvsId,
            com_specific: value,
            com_type: type,
          })
        );
        break;
      case "TR":
        dispatch(
          setRatingFactor({
            skills: TYPE[1],
            com_jvs_id: jvsId,
            com_specific: value,
            com_type: type,
          })
        );
        break;
      case "EX":
        dispatch(
          setRatingFactor({
            skills: TYPE[2],
            com_jvs_id: jvsId,
            com_specific: value,
            com_type: type,
          })
        );
        break;
      case "WE":
        dispatch(
          setRatingFactor({
            skills: TYPE[3],
            com_jvs_id: jvsId,
            com_specific: value,
            com_type: type,
          })
        );
        break;
      case "OE":
        dispatch(
          setRatingFactor({
            skills: TYPE[4],
            com_jvs_id: jvsId,
            com_specific: value,
            com_type: type,
          })
        );
        break;
      case "CW":
        dispatch(
          setRatingFactor({
            skills: TYPE[5],
            com_jvs_id: jvsId,
            com_specific: value,
            com_type: type,
          })
        );
        break;
      case "AS":
        dispatch(
          setRatingFactor({
            skills: TYPE[6],
            com_jvs_id: jvsId,
            com_specific: value,
            com_type: type,
          })
        );
      case "CS":
        dispatch(
          setRatingFactor({
            skills: TYPE[7],
            com_jvs_id: jvsId,
            com_specific: value,
            com_type: type,
          })
        );
        break;
      case "OT":
        dispatch(
          setRatingFactor({
            skills: TYPE[8],
            com_jvs_id: jvsId,
            com_specific: value,
            com_type: type,
          })
        );
        break;

      default:
        break;
    }
    console.log(competencies);
  };

  const TYPE = [
    "com_education",
    "com_training",
    "com_experience",
    "com_writtenExam",
    "com_oralExam",
    "com_creativeWork",
    "com_analyticalSkills",
    "com_computationSKills",
    "com_others",
  ];

  useEffect(() => {
    setSpecify(data.com_specific);
    setCheckState(data?.tbl_com_type?.length > 0);
  }, [data?.tbl_com_type?.length]);

  return (
    <React.Fragment>
      <div
        className="mqsfjc-div"
        style={{ marginBottom: "6px", marginTop: "6px" }}
      >
        <div
          className="margin-right-1 checkbox-mqsfjc"
          style={{ width: "25%" }}
        >
          <CheckboxComponent
            onChange={() => setCheckState(!checkState)}
            name={type}
            checked={checkState ?? false}
            className="margin-right-1"
          />
          <label>{title}</label>
        </div>
        <div style={{ width: "75%" }}>
          <InputComponent
            name={type}
            value={specify ?? ""}
            onChange={(e) => changeStateFunc(e.target.value)}
          />
        </div>
      </div>
      {checkState && (
        <WeightingTable
          specific={specify}
          title={title}
          type={type}
          jvsId={jvsId}
          data={data.tbl_com_type}
        />
      )}
    </React.Fragment>
  );
};

export default CheckJobCompetency;
