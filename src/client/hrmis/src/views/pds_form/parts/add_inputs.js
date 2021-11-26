import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  setMessageError,
  setObjectError,
} from "../../../features/reducers/error_handler_slice";
import { API_HOST } from "../../../helpers/global/global_config";
import useAxiosRequestHelper from "../../../helpers/use_hooks/axios_request_helper";
import { usePopUpHelper } from "../../../helpers/use_hooks/popup_helper";
import InputComponent from "../../common/input_component/input_component/input_component";

const PdsAddInput = (props) => {
  // ===========================================
  // ROUTER STATE
  // ===========================================
  const { item } = useParams();
  // const errorObj = useSelector((state) => state.error.objectError);
  // const errorMsg = useSelector((state) => state.error.messageError);
  const dispatch = useDispatch();

  // ===========================================
  // GET OTHER INFO RECORD HTTP REQUEST
  // ===========================================
  const { renderFail } = usePopUpHelper();
  const [otherInfoData, setOtherInfoData] = useState([]);

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

  // ===================================
  // ERROR HANDLING STATE
  // ===================================

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

  const submitHandler = async (e) => {
    // INPUT HANDLER
    e.preventDefault();
    await useAxiosRequestHelper
      .post(addInfoData, "new-other-info", item)
      .then(() => {})
      .catch((error) => {
        renderFail();
        if (typeof error === "object") {
          dispatch(setObjectError(error));
          dispatch(setMessageError("Unprocessable Entity"));
        } else {
          dispatch(setMessageError(error));
        }
      });
    setUpdateScreen(!updateScreen);
  };

  // =======================================
  //  INIT STATE AND COMPONENT RENDERER
  // =======================================
  const [updateScreen, setUpdateScreen] = useState(false);

  useEffect(() => {
    getOtherInfoRecord();
    setAddInfoData({
      oth_app_type: props.type,
      oth_app_desc: "",
    });
  }, [updateScreen]);

  return (
    <React.Fragment>
      <div className="pds-prof-class-one">
        <div style={{ width: "100%" }}>
          <label htmlFor="surname">{props.label}</label>
          <span className="invalid-response"></span>
        </div>
      </div>
      <form onSubmit={submitHandler}>
        {/* DISPLAY DATA STARTS HERE */}
        {otherInfoData === null
          ? null
          : otherInfoData.map((item, key) => {
              if (item.oth_app_type == props.type)
                return (
                  <div className="pds-prof-class-one" key={key}>
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

        <div className="pds-prof-class-one">
          <div style={{ width: "100%", paddingRight: "5px" }}>
            <InputComponent
              name="oth_app_desc"
              value={addInfoData ? addInfoData.oth_app_desc : ""}
              onChange={(e) => {
                inputOtherInfo(e);
              }}
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
      </form>
    </React.Fragment>
  );
};

export default PdsAddInput;
