import React, { useEffect, useState } from "react";
import CheckboxComponent from "../../../../../common/input_component/checkbox_input_component/checkbox_input_component";
import InputComponent from "../../../../../common/input_component/input_component/input_component";
import WeightingTable from "./weight_table";

const CheckJobCompetency = ({ data, title, jvsId, type, isEmpty }) => {
  const [checkState, setCheckState] = useState(isEmpty);
  const [specify, setSpecify] = useState(data.com_specific);

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
            checked={checkState}
            className="margin-right-1"
          />
          <label>{title}</label>
        </div>
        <div style={{ width: "75%" }}>
          <InputComponent
            value={specify}
            onChange={(e) => setSpecify(e.target.value)}
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
