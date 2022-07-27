import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { MdMenu } from "react-icons/md";
import InputComponent from "../../../../common/input_component/input_component/input_component";
import TextAreaComponent from "../../../../common/input_component/textarea_input_component/textarea_input_component";
import ModalComponent from "../../../../common/modal_component/modal_component";
import * as Yup from "yup";
import axios from "axios";
import { API_HOST } from "../../../../../helpers/global/global_config";
import { usePopUpHelper } from "../../../../../helpers/use_hooks/popup_helper";
import { useDispatch } from "react-redux";
import { setRefresh } from "../../../../../features/reducers/popup_response";

const AddPlantillaItemDutiesAndRespoModal = ({
  dty_id = null,
  isDisplay,
  onClose,
  dtyData,
}) => {
  const { renderSucceed, renderFailed, renderBusy } = usePopUpHelper();
  const [dataState, setDataState] = useState([]);
  let dispatch = useDispatch();
  const endPointId = dty_id === null ? "/0" : "/" + dty_id;
  const dtyFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      dty_respo: dataState,
      dty_itm_desc: "",
      dty_itm_percent: "",
      dty_itm_cmptncy: "",
    },
    validationSchema: Yup.object({
      dty_respo: Yup.array(),
      dty_itm_desc: Yup.string().when("dty_respo", {
        is: (dty_respo) => dty_respo.length === 0,
        then: Yup.string().required("This field is required"),
      }),
      dty_itm_percent: Yup.number().when("dty_respo", {
        is: (dty_respo) => dty_respo.length === 0,
        then: Yup.number().required("This field is required"),
      }),
      dty_itm_cmptncy: Yup.string().when("dty_respo", {
        is: (dty_respo) => dty_respo.length === 0,
        then: Yup.string().required("This field is required"),
      }),
    }),
    onSubmit: async (values, { resetForm }) => {
      renderBusy(true);
      await axios
        .post(API_HOST + "add-dty-items" + endPointId, values)
        .then((res) => {
          renderSucceed({});
          resetForm();
          dispatch(setRefresh());
          onClose();
        })
        .catch((err) => {
          renderFailed({ content: err.message });
        });
      renderBusy(false);
    },
  });

  ///DRAG FUNCTIONALITY LOGIC
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (dataState.length !== 1) {
      const items = Array.from(dataState);
      const [recorded] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, recorded);
      setDataState([...items]);
    }
  };
  /// HANDLE STATE CHANGE PER TEXT
  const [addDataToArray, setAddDataToArray] = useState({
    dty_itm_desc: "",
    dty_itm_percent: "",
    dty_itm_cmptncy: "",
  });

  const handleAddChange = (type, value) => {
    setAddDataToArray({ ...addDataToArray, [type]: value });
  };

  /// HANDLE ARRAY STATE CHANGE
  const handleArrayChange = (type, index, e) => {
    const { value } = e.target;
    setDataState((dataState) =>
      dataState?.map((list, i) => {
        return index === i ? { ...list, [type]: value } : { ...list };
      })
    );
  };

  const handleAdd = ({ dty_itm_desc, dty_itm_percent, dty_itm_cmptncy }) => {
    let saver = 0;
    dataState.forEach((element) => {
      if (element.dty_itm_order >= saver) {
        saver = element.dty_itm_order;
      }
    });
    if (dty_itm_desc !== "") {
      if (dty_itm_percent !== "") {
        if (dty_itm_cmptncy !== "") {
          setDataState([
            ...dataState,
            {
              dty_itm_order: saver + 1,
              dty_itm_desc,
              dty_itm_percent,
              dty_itm_cmptncy,
            },
          ]);
          console.log(dataState);
          setAddDataToArray({
            dty_itm_order: "",
            dty_itm_desc: "",
            dty_itm_percent: "",
            dty_itm_cmptncy: "",
          });
          dtyFormik.setFieldValue("dty_respo", dataState);
        }
      }
    }
  };

  const handleRemove = (item_id) => {
    setDataState(dataState.filter((item) => item.dty_itm_order !== item_id));
  };

  useEffect(() => {
    if (dtyData) {
      setDataState(dtyData);
    }
  }, [dtyData, isDisplay]);

  return (
    <React.Fragment>
      <ModalComponent
        title="Duties and Responsibilities"
        onSubmit={dtyFormik.handleSubmit}
        onSubmitType="submit"
        onSubmitName="Save"
        isDisplay={isDisplay}
        onClose={onClose}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "-10px",
          }}
        >
          <div style={{ marginTop: "6px" }}>
            <MdMenu
              style={{ color: "#00000000", paddingRight: "5px" }}
              size="22px"
            />
          </div>
          <div style={{ width: "50%", marginRight: "5px" }}>
            <label>Description</label>
          </div>
          <div
            style={{
              width: "25%",
              marginRight: "5px",
              marginLeft: "5px",
            }}
          >
            <label>Percent of Working Time</label>
          </div>
          <div style={{ width: "25%", marginLeft: "5px" }}>
            <label>Competency Level</label>
          </div>
          <div style={{ marginTop: "6px" }}>
            <AiOutlineMinusCircle
              style={{ color: "#00000000", paddingLeft: "5px" }}
              className="button-add-remove"
              size="22px"
            />
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {dataState.map(
                  (
                    {
                      dty_itm_order,
                      dty_itm_desc,
                      dty_itm_percent,
                      dty_itm_cmptncy,
                    },
                    index
                  ) => {
                    return (
                      <Draggable
                        key={dty_itm_order}
                        draggableId={"droppable-" + dty_itm_order}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <div style={{ marginTop: "6px" }}>
                                <MdMenu
                                  style={{ paddingRight: "5px" }}
                                  size="22px"
                                />
                              </div>
                              <div style={{ width: "50%", marginRight: "5px" }}>
                                <TextAreaComponent
                                  value={dty_itm_desc}
                                  onChange={(e) => {
                                    handleArrayChange("dty_itm_desc", index, e);
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  width: "25%",
                                  marginRight: "5px",
                                  marginLeft: "5px",
                                }}
                              >
                                <div className="div-dty-res-percent-inp">
                                  <input
                                    value={dty_itm_percent}
                                    type="number"
                                    onChange={(e) => {
                                      handleArrayChange(
                                        "dty_itm_percent",
                                        index,
                                        e
                                      );
                                    }}
                                  />
                                  <span>%</span>
                                </div>
                              </div>
                              <div style={{ width: "25%", marginLeft: "5px" }}>
                                <InputComponent
                                  value={dty_itm_cmptncy}
                                  onChange={(e) => {
                                    handleArrayChange(
                                      "dty_itm_cmptncy",
                                      index,
                                      e
                                    );
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: "6px" }}>
                                <AiOutlineMinusCircle
                                  onClick={() => {
                                    // dispatch(removeDutyResponsibility(id));
                                    handleRemove(dty_itm_order);
                                  }}
                                  style={{ color: "red", paddingLeft: "5px" }}
                                  className="button-add-remove"
                                  size="22px"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  }
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <br />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: "50%", marginRight: "5px" }}>
            <TextAreaComponent
              name="dty_itm_desc"
              value={addDataToArray.dty_itm_desc}
              onChange={(e) => {
                handleAddChange("dty_itm_desc", e.target.value);
                dtyFormik.handleChange(e);
              }}
            />
            {dtyFormik.touched.dty_itm_desc && dtyFormik.errors.dty_itm_desc ? (
              <p className="error-validation-styles">
                {dtyFormik.errors.dty_itm_desc}
              </p>
            ) : null}
          </div>
          <div style={{ width: "25%", marginRight: "5px", marginLeft: "5px" }}>
            <div className="div-dty-res-percent-inp">
              <input
                name="dty_itm_percent"
                value={addDataToArray.dty_itm_percent}
                type="number"
                onChange={(e) => {
                  handleAddChange("dty_itm_percent", e.target.value);
                  dtyFormik.handleChange(e);
                }}
              />
              <span>%</span>
            </div>

            {dtyFormik.touched.dty_itm_percent &&
            dtyFormik.errors.dty_itm_percent ? (
              <p className="error-validation-styles">
                {dtyFormik.errors.dty_itm_percent}
              </p>
            ) : null}
          </div>
          <div style={{ width: "25%", marginLeft: "5px" }}>
            <InputComponent
              name="dty_itm_cmptncy"
              value={addDataToArray.dty_itm_cmptncy}
              onChange={(e) => {
                handleAddChange("dty_itm_cmptncy", e.target.value);
                dtyFormik.handleChange(e);
              }}
            />
            {dtyFormik.touched.dty_itm_cmptncy &&
            dtyFormik.errors.dty_itm_cmptncy ? (
              <p className="error-validation-styles">
                {dtyFormik.errors.dty_itm_cmptncy}
              </p>
            ) : null}
          </div>
          <div style={{ marginTop: "6px" }}>
            <AiOutlinePlusCircle
              onClick={() => {
                // dispatch(removeDutyResponsibility(id));
                handleAdd(addDataToArray);
              }}
              style={{ color: "green", paddingLeft: "5px" }}
              className="button-add-remove"
              size="22px"
            />
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default AddPlantillaItemDutiesAndRespoModal;
