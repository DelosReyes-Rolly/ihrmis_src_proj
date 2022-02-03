import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useParams } from "react-router";
import {
  API_HOST,
  validationRequired,
} from "../../../helpers/global/global_config";
import useAxiosHelper from "../../../helpers/use_hooks/axios_helper";
import { usePopUpHelper } from "../../../helpers/use_hooks/popup_helper";
import InputComponent from "../../common/input_component/input_component/input_component";
import * as Yup from "yup";

const ADD_TYPE = {
  skill: "SKILL",
  recog: "RECOG",
  membr: "MEMBR",
};

const PdsAddInput = (props) => {
  // ===========================================
  // ROUTER STATE
  // ===========================================
  const { item } = useParams();

  // ===========================================
  // GET OTHER INFO RECORD HTTP REQUEST
  // ===========================================
  const [otherInfoData, setOtherInfoData] = useState([]);
  const { renderFailed } = usePopUpHelper();

  const getOtherInfoRecord = async () => {
    await axios
      .get(API_HOST + `new-other-info/${item}`)
      .then((response) => {
        setOtherInfoData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ===========================================
  // GET OTHER INFO RECORD HTTP REQUEST
  // ===========================================
  const removeOtherInfoRecord = async (record) => {
    await axios
      .delete(API_HOST + `new-other-info/${record}`)
      .then((response) => {
        console.log(response);
      });
    setUpdateScreen(!updateScreen);
  };

  // =======================================
  //  SUBMIT HANDLER
  // =======================================
  const [addInfoData, setAddInfoData] = useState(); // STORE INPUT DATA

  const inputOtherInfo = (event) => {
    // INPUT ON CHANGE HANDLER
    setAddInfoData({
      ...addInfoData,
      [event.target.name]: event.target.value,
    });
  };

  const AddInputForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      oth_app_type: props.type,
      oth_app_desc: "",
    },
    validationSchema: Yup.object({
      oth_app_desc: validationRequired,
    }),
    onSubmit: async (values, { resetForm }) => {
      await useAxiosHelper
        .post(values, "new-other-info", item)
        .then(() => resetForm())
        .catch((err) => renderFailed({ content: err.message }));

      setUpdateScreen(!updateScreen);
    },
  });
  // =======================================
  //  INIT STATE AND COMPONENT RENDERER
  // =======================================
  const [updateScreen, setUpdateScreen] = useState(false);

  useEffect(() => {
    getOtherInfoRecord();
  }, [updateScreen]);

  return (
    <React.Fragment>
      <div className="pds-prof-class-one">
        <div style={{ width: "100%" }}>
          <label htmlFor="surname">{props.label}</label>
          <span className="invalid-response"></span>
        </div>
      </div>
      <form onSubmit={AddInputForm.handleSubmit}>
        {/* DISPLAY DATA STARTS HERE */}
        {otherInfoData === null
          ? null
          : otherInfoData.map((item, key) => {
              if (item.oth_app_type == props.type)
                return (
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    key={key}
                  >
                    <div style={{ width: "100%", paddingRight: "5px" }}>
                      <InputComponent
                        maxLenght="150"
                        name="oth_app_desc"
                        value={item.oth_app_desc}
                        readOnly={true}
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <AiOutlineMinusCircle
                        onClick={() => {
                          removeOtherInfoRecord(item.oth_app_time);
                        }}
                        style={{ color: "red" }}
                        size="22px"
                      />
                    </div>
                  </div>
                );
            })}

        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "100%", paddingRight: "5px" }}>
            <InputComponent
              name="oth_app_desc"
              value={AddInputForm.values.oth_app_desc}
              onChange={AddInputForm.handleChange}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#00000000",
                border: "1px solid #00000000",
                display: "flex",
                alignItems: "center",
              }}
            >
              <AiOutlinePlusCircle style={{ color: "green" }} size="22px" />
            </button>
          </div>
        </div>
        <ValidationHandler error={AddInputForm.errors} type={props.type} />
      </form>
    </React.Fragment>
  );
};

export default PdsAddInput;

const ValidationHandler = ({ error, type }) => {
  switch (type) {
    case ADD_TYPE.skill:
      return (
        <div>
          {error?.oth_app_desc && error?.oth_app_desc ? (
            <span className="invalid-response error-position">
              {error?.oth_app_desc}
            </span>
          ) : null}
        </div>
      );

    case ADD_TYPE.recog:
      return (
        <div>
          {error?.oth_app_desc && error?.oth_app_desc ? (
            <span className="invalid-response error-position">
              {error?.oth_app_desc}
            </span>
          ) : null}
        </div>
      );

    case ADD_TYPE.membr:
      return (
        <div>
          {error?.oth_app_desc && error?.oth_app_desc ? (
            <span className="invalid-response error-position">
              {error?.oth_app_desc}
            </span>
          ) : null}
        </div>
      );

    default:
      return null;
  }
};
