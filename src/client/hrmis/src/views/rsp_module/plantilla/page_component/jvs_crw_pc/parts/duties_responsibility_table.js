import { useFormik } from "formik";
import React, { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { RiPenNibFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  addDutyResponsibility,
  removeDutyResponsibility,
  resetOrder,
} from "../../../../../../features/reducers/jvscrw_slice.js";
import { useToggleHelper } from "../../../../../../helpers/use_hooks/toggle_helper.js";
import ButtonComponent from "../../../../../common/button_component/button_component.js";
import TextAreaComponent from "../../../../../common/input_component/textarea_input_component/textarea_input_component.js";
import ModalComponent from "../../../../../common/modal_component/modal_component.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdMenu } from "react-icons/md";

const DutiesResponsibilityTable = ({ jvsId }) => {
  const [toggle, setToggle] = useToggleHelper();
  const { dtyResContainer } = useSelector((state) => state.jvsform);
  return (
    <React.Fragment>
      <table id="custom-table">
        <thead>
          <tr className="main-headers">
            <th style={{ textAlign: "center" }}>DUTIES AND RESPONSIBILITIES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div style={{ margin: "10px 40px 10px 40px" }}>
                {dtyResContainer.map((element, key) => {
                  let { description, id } = element;
                  const number = key + 1;
                  return <p key={id}>{number + ". " + description}</p>;
                })}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        style={{ marginTop: "10px", display: "flex", justifyContent: "right" }}
      >
        <ButtonComponent
          buttonLogoStart={<RiPenNibFill size="14" />}
          onClick={() => setToggle()}
          buttonName="Update"
        />
      </div>

      <DutiesResponsibilityModal
        isDisplay={toggle}
        onClose={() => setToggle()}
        jvsId={jvsId}
      />
    </React.Fragment>
  );
};

export default DutiesResponsibilityTable;

const DutiesResponsibilityModal = ({ onClose, isDisplay, jvsId }) => {
  const { dtyResContainer } = useSelector((state) => state.jvsform);
  const dispatch = useDispatch();
  const jvsFormDtyRes = useFormik({
    initialValues: {
      dty_res_item: dtyResContainer,
    },
    onSubmit: async () => {
      onClose();
    },
  });

  const [desc, setDesc] = useState("");

  const addValue = () => {
    if (desc !== "") {
      dispatch(
        addDutyResponsibility({
          id: dtyResContainer.length + 1,
          description: desc,
        })
      );
    }
    setDesc("");
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (dtyResContainer.length !== 1) {
      const items = Array.from(dtyResContainer);
      const [recorded] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, recorded);
      dispatch(resetOrder(items));
    }
  };

  return (
    <React.Fragment>
      <ModalComponent
        title="Duties and Responsibilities"
        onSubmitName="Save"
        onClose={onClose}
        isDisplay={isDisplay}
        onSubmit={jvsFormDtyRes.handleSubmit}
        onSubmitType="Submit"
        onPressed={undefined}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {dtyResContainer?.map(({ id, description }, index) => {
                  return (
                    <Draggable
                      key={id}
                      draggableId={"droppable-" + id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <MdMenu
                              style={{ paddingRight: "5px" }}
                              size="22px"
                            />
                            <TextAreaComponent
                              value={description}
                              readOnly={true}
                            />
                            <AiOutlineMinusCircle
                              onClick={() => {
                                dispatch(removeDutyResponsibility(id));
                              }}
                              style={{ color: "red", paddingLeft: "5px" }}
                              className="button-add-remove"
                              size="22px"
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "15px" }}
        >
          <TextAreaComponent
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <AiOutlinePlusCircle
            onClick={() => addValue()}
            style={{ color: "green", paddingLeft: "5px" }}
            className="button-add-remove"
            size="22px"
          />
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};
