import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { setSection } from "../../../../../features/reducers/onboarding_slice";
import { ALERT_ENUM, popupAlert } from "../../../../../helpers/alert_response";
import { API_HOST } from "../../../../../helpers/global/global_config";
import AccordionComponent from "../../../../common/accordion_component/accordion_common";
import { MdDragHandle } from "react-icons/md";
import { GrDrag } from "react-icons/gr";
import { setBusy } from "../../../../../features/reducers/popup_response";
import OnboardingItemModal from "./onboarding_item_modal";
import { useMapFocusHelper } from "../../../../../helpers/use_hooks/on_focus_helper";
import { array } from "yup";

const AccordionListComponent = ({ list = [] }) => {
  const [dataState, setDataState] = useState(list);

  ///DRAG FUNCTIONALITY LOGIC
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (dataState.length !== 1) {
      const items = Array.from(dataState);
      const [recorded] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, recorded);
      console.log(items);
      setDataState([...items]);
      modifyArrangement(items);
    }
  };

  const modifyArrangement = async (item) => {
    await axios
      .post(API_HOST + "modify-onboarding-section", { item: item })
      .then((res) => console.log(res.data.data.message))
      .catch((err) => console.log(err.message));
  };

  useEffect(() => setDataState(list), [list]);

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {dataState?.map((item, index) => {
                return (
                  <Draggable
                    key={item?.sec_onb_id}
                    draggableId={"droppable-" + item?.sec_onb_id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "start",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "10px 10px 10px 0px",
                            }}
                          >
                            <GrDrag size={30} color="gray" />
                          </div>
                          <AntiDragContainer provided={provided}>
                            <ItemAccordionComponent
                              title={item?.sec_onb_name}
                              onb_id={item?.sec_onb_id}
                            />
                          </AntiDragContainer>
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
    </React.Fragment>
  );
};

export default AccordionListComponent;

/**
 * Use this component is Onboarding Section Card
 */
const ItemAccordionComponent = ({ title, onb_id }) => {
  const [action, setAction] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [dataState, setDataState] = useState([]);
  const { updateSectionItem } = useSelector((state) => state.onboarding);
  const dispatch = useDispatch();

  /**
   * Action Function which calls 2 functionality, deleting a section and opening a modal
   */
  const actionFunction = () => {
    if (action !== null) {
      if (parseInt(action) === 0) setOpenModal(true);
      if (parseInt(action) === 1) removeSection();
      setAction(null);
    }
  };

  /**
   * Api request to remove section
   */
  const removeSection = async () => {
    dispatch(setBusy(true));
    await axios
      .delete(API_HOST + "delete-onboarding-section/" + onb_id)
      .then((res) => {
        dispatch(setSection(res.data.data));
        popupAlert({
          message: "Section Saved successfully",
          type: ALERT_ENUM.success,
        });
        dispatch(setBusy(false));
      })
      .catch((err) => {
        popupAlert({
          message: err.message ?? "Error Try again Later",
          type: ALERT_ENUM.fail,
        });
        dispatch(setBusy(false));
      });
  };

  /**
   * Api request to fetch section item
   */
  const fetchSectionItem = async () => {
    await axios
      .get(API_HOST + "get-section-item-by-id/" + onb_id)
      .then((res) => setDataState(res?.data?.data))
      .catch((err) =>
        popupAlert({
          message: err.message ?? "Error Try again Later",
          type: ALERT_ENUM.fail,
        })
      );
  };

  /**
   * This useeffect is used to run action function when action state is change
   */
  useEffect(() => actionFunction(), [action]);

  /**
   * This useeffect is used to fetch section items when updateSectionItem state is change
   */
  useEffect(() => fetchSectionItem(), [updateSectionItem]);

  /**
   * DRAG FUNCTIONALITY LOGIC
   */
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (dataState.length !== 1) {
      const items = Array.from(dataState);
      const [recorded] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, recorded);
      setDataState([...items]);
      modifyArrangement(items);
    }
  };

  const modifyArrangement = async (item) => {
    await axios
      .post(API_HOST + "modify-onboarding-section-item", { item: item })
      .then((res) => console.log(res.data.data.message))
      .catch((err) => console.log(err.message));
  };

  const [refItem, focus, blur] = useMapFocusHelper(
    "onboarding-section-item",
    "onboarding-section-item-focus"
  );
  // const [styleClick, setStyleClick] = useState(false);
  return (
    <React.Fragment>
      <OnboardingItemModal
        title="Section Item"
        isDisplay={openModal}
        onClose={() => setOpenModal(false)}
        sec_id={onb_id}
      />
      <AccordionComponent
        title={title}
        onb_id={onb_id}
        listItemGetter={setAction}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // fontWeight: styleClick ? "bold" : "normal",
                }}
              >
                {dataState?.map((item, index, arrValue) => {
                  return (
                    <Draggable
                      key={item?.itm_onb_id}
                      draggableId={"droppable-" + item?.itm_onb_id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div
                            ref={(el) => (refItem.current[index] = el)}
                            className="onboarding-section-item"
                            onClick={() => focus(index, arrValue.length)}
                            onBlur={() => blur(arrValue.length)}
                            tabIndex={index}
                          >
                            <OnboardingSectionItem
                              data={item}
                              provided={provided}
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
      </AccordionComponent>
    </React.Fragment>
  );
};

/**
 * Use this component is Onboarding Section Items Card
 */
const OnboardingSectionItem = ({ data, provided }) => {
  return (
    <React.Fragment>
      <div className="align-center">
        <MdDragHandle size={30} />
      </div>
      <AntiDragContainer provided={provided} id={data?.itm_onb_id}>
        <div className="text-center">{data?.itm_onb_name}</div>
      </AntiDragContainer>
    </React.Fragment>
  );
};

/**
 * Use this component to make a component undragable
 */
const AntiDragContainer = ({ children, provided }) => {
  return (
    <React.Fragment>
      <div
        data-rbd-drag-handle-context-id={
          provided.dragHandleProps?.["data-rbd-drag-handle-context-id"]
        }
        data-rbd-drag-handle-draggable-id="gibberish"
        style={{
          cursor: "pointer",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </React.Fragment>
  );
};
