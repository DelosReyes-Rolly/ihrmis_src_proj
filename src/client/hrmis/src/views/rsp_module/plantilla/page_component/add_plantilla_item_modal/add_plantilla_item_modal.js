import ModalComponent from "../../../../common/modal_component/modal_component";
import React, { useEffect, useState } from "react";
import { API_HOST } from "../../../../../helpers/global/global_config";
import InputComponent from "../../../../common/input_component/input_component/input_component";
import SelectComponent from "../../../../common/input_component/select_component/select_component";
import TextareaComponent from "../../../../common/input_component/textarea_input_component/textarea_input_component";
import {
  apiCategoryServiceModalInputItem,
  apiEmploymentBasisModalInputItem,
  apiEmploymentStatModalInputItem,
  apiLevelPositionModalInputItem,
  apiModeCreationModalInputItem,
} from "../../static/input_items";
import axios from "axios";
import { usePopUpHelper } from "../../../../../helpers/use_hooks/popup_helper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setRefresh } from "../../../../../features/reducers/popup_response";
import { Navigate, useNavigate } from "react-router-dom";
import { ALERT_ENUM, popupAlert } from "../../../../../helpers/alert_response";

const AddPlantillaItemModal = ({
  type,
  isDisplay,
  onClose,
  plantillaData,
  plantillaID = null,
}) => {
  const { renderBusy } = usePopUpHelper();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeName = plantillaID === null ? "Close" : "Delete";
  const endpointId = plantillaID === null ? "/0" : "/" + plantillaID;
  // ==========================================
  // FORMIK FORM
  // ==========================================
  const plantillaForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      itm_no: plantillaData?.itm_no ?? "",
      itm_status: plantillaData?.itm_status ?? "",
      itm_pos_id: plantillaData?.position?.pos_id ?? "",
      itm_ofc_id: plantillaData?.office?.ofc_id ?? "",
      itm_basis: plantillaData?.itm_basis ?? "",
      itm_level: plantillaData?.itm_level ?? "",
      itm_category: plantillaData?.itm_category ?? "",
      itm_function: plantillaData?.itm_function ?? "",
      itm_creation: plantillaData?.itm_creation ?? "",
      itm_supv1_itm_id: plantillaData?.itm_supv1_itm_id ?? "",
      itm_supv2_itm_id: plantillaData?.itm_supv2_itm_id ?? "",
      itm_regular: type ?? plantillaData?.itm_regular,
    },
    validationSchema: Yup.object({
      itm_no: Yup.string()
        .required("This field is required")
        .max(255, "Invalid input"),

      itm_status: Yup.number()
        .typeError("Must be a number")
        .required("This field is required"),

      itm_pos_id: Yup.number()
        .typeError("Must be a number")
        .required("This field is required"),

      itm_ofc_id: Yup.number()
        .typeError("Must be a number")
        .required("This field is required"),

      itm_basis: Yup.number()
        .typeError("Must be a number")
        .required("This field is required"),

      itm_level: Yup.number()
        .typeError("Must be a number")
        .required("This field is required"),

      itm_category: Yup.number()
        .typeError("Must be a number")
        .required("This field is required"),

      itm_function: Yup.string()
        .required("This field is required")
        .max(255, "Invalid input"),

      itm_creation: Yup.number()
        .typeError("Must be a number")
        .required("This field is required"),
      itm_supv1_itm_id: Yup.number().typeError("Must be a number"),
      // .required("This field is required"),
      itm_supv2_itm_id: Yup.number().typeError("Must be a number"),
      // .required("This field is required"),
    }),
    onSubmit: async (value, { resetForm }) => {
      renderBusy(true);
      await axios
        .post(API_HOST + "plantilla-items" + endpointId, value)
        .then(() => {
          popupAlert({
            message: "Saved Plantilla Successfully",
            type: ALERT_ENUM.success,
          });
          resetForm();
        })
        .catch((err) => {
          popupAlert({
            message: err.response.message ?? "Plantilla Creation/Update Failed",
            type: ALERT_ENUM.fail,
          });
        });
      renderBusy(false);
      dispatch(setRefresh());
      onClose();
    },
  });

  const [officePositionState, setOfficePositionState] = useState();
  const getPositionAndOffice = () => {
    axios
      .get(API_HOST + "office-position")
      .then((response) => {
        setOfficePositionState(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [plantillaByOfc, setPlantillaByOfc] = useState([]);
  const getPlantillasByOffice = async (officeId) => {
    await axios
      .get(API_HOST + "get-plantilla-by-office/" + officeId ?? 0)
      .then((response) => {
        let arrHolder = [];
        const data = response.data.data;
        data?.forEach((element) => {
          arrHolder.push({ id: element.itm_id, title: element.itm_no });
        });
        setPlantillaByOfc(arrHolder);
      })
      .catch((error) => {});
  };

  const onRemovePressed = async () => {
    if (plantillaID === null) return onClose();
    renderBusy(true);
    await axios
      .delete(API_HOST + "remove-plantilla/" + plantillaID)
      .then(() => {
        renderBusy(false);
        popupAlert({
          message: "Deleted Plantilla Successfully",
          type: ALERT_ENUM.success,
        });
        navigate("/rsp/plantilla/plantilla-items");
      })
      .catch((err) => {
        renderBusy(false);
        popupAlert({
          message: err.response.message ?? "Failed to Delete Plantilla",
          type: ALERT_ENUM.fail,
        });
      });
    onClose();
  };

  useEffect(() => {
    getPositionAndOffice();
  }, []);

  useEffect(() => {
    if (plantillaForm.values.itm_ofc_id !== "") {
      getPlantillasByOffice(plantillaForm.values.itm_ofc_id);
    }
  }, [plantillaForm.values.itm_ofc_id]);

  return (
    <React.Fragment>
      <ModalComponent
        title="Plantilla Items"
        onSubmitName="Save"
        onCloseName={closeName}
        isDisplay={isDisplay}
        onSubmit={plantillaForm.handleSubmit}
        onSubmitType="submit"
        onClose={onClose}
        onPressed={() => onRemovePressed()}
      >
        <div className="add-plantilla-item-modal">
          <span className="left-input item-modal-1">
            <label>Item No.</label>
            <InputComponent
              name="itm_no"
              value={plantillaForm.values.itm_no}
              onChange={plantillaForm.handleChange}
              maxLength="30"
            />
            {plantillaForm.touched.itm_no && plantillaForm.errors.itm_no ? (
              <p className="error-validation-styles">
                {plantillaForm.errors.itm_no}
              </p>
            ) : null}
          </span>
          <span className="right-input item-modal-2">
            <label>Employment Status</label>
            <SelectComponent
              defaultTitle="Status"
              name="itm_status"
              value={plantillaForm.values.itm_status}
              onChange={plantillaForm.handleChange}
              itemList={apiEmploymentStatModalInputItem}
            />

            {plantillaForm.touched.itm_status &&
            plantillaForm.errors.itm_status ? (
              <p className="error-validation-styles">
                {plantillaForm.errors.itm_status}
              </p>
            ) : null}
          </span>
        </div>
        <div className="add-plantilla-item-modal">
          <span className="left-input item-modal-1">
            <label>Position</label>
            <select
              className="select-component"
              style={{ marginTop: "3px" }}
              name="itm_pos_id"
              value={plantillaForm.values.itm_pos_id}
              onChange={plantillaForm.handleChange}
            >
              <option className="option-component" value="">
                Positions
              </option>
              {officePositionState &&
                officePositionState.positions.map((item, key) => {
                  return (
                    <option
                      className="option-component"
                      key={key}
                      value={parseInt(item.pos_id)}
                    >
                      {item.pos_title}
                    </option>
                  );
                })}
            </select>

            {plantillaForm.touched.itm_pos_id &&
            plantillaForm.errors.itm_pos_id ? (
              <p className="error-validation-styles">
                {plantillaForm.errors.itm_pos_id}
              </p>
            ) : null}
          </span>

          <span className="right-input item-modal-2">
            <label>Office</label>
            <select
              className="select-component"
              style={{ marginTop: "3px" }}
              name="itm_ofc_id"
              value={plantillaForm.values.itm_ofc_id}
              onChange={(e) => {
                plantillaForm.handleChange(e);
                getPlantillasByOffice(e.target.value);
              }}
            >
              <option className="option-component" value="">
                Offices
              </option>
              {officePositionState &&
                officePositionState.offices.map((item, key) => {
                  return (
                    <option
                      className="option-component"
                      key={key}
                      value={item.ofc_id}
                    >
                      {item.ofc_name}
                    </option>
                  );
                })}
            </select>

            {plantillaForm.touched.itm_ofc_id &&
            plantillaForm.errors.itm_ofc_id ? (
              <p className="error-validation-styles">
                {plantillaForm.errors.itm_ofc_id}
              </p>
            ) : null}
          </span>
        </div>
        <div className="add-plantilla-item-modal">
          <span className="left-input item-modal-3">
            <label>Employment Basis</label>
            <SelectComponent
              defaultTitle="Employment"
              name="itm_basis"
              value={plantillaForm.values.itm_basis}
              onChange={plantillaForm.handleChange}
              itemList={apiEmploymentBasisModalInputItem}
            />
            {plantillaForm.touched.itm_basis &&
            plantillaForm.errors.itm_basis ? (
              <p className="error-validation-styles">
                {plantillaForm.errors.itm_basis}
              </p>
            ) : null}
          </span>
          <span className="middle-input item-modal-3">
            <label>Category Service</label>
            <SelectComponent
              defaultTitle="Category"
              name="itm_category"
              value={plantillaForm.values.itm_category}
              onChange={plantillaForm.handleChange}
              itemList={apiCategoryServiceModalInputItem}
            />
            {plantillaForm.touched.itm_category &&
            plantillaForm.errors.itm_category ? (
              <p className="error-validation-styles">
                {plantillaForm.errors.itm_category}
              </p>
            ) : null}
          </span>
          <span className="right-input item-modal-4">
            <label>Level of Position</label>
            <SelectComponent
              defaultTitle="Level of Position"
              name="itm_level"
              value={plantillaForm.values.itm_level}
              onChange={plantillaForm.handleChange}
              itemList={apiLevelPositionModalInputItem}
            />
            {plantillaForm.touched.itm_level &&
            plantillaForm.errors.itm_level ? (
              <p className="error-validation-styles">
                {plantillaForm.errors.itm_level}
              </p>
            ) : null}
          </span>
        </div>

        <div className="add-plantilla-item-modal">
          <span className="item-modal-5">
            <label>Description of Position Function</label>
            <TextareaComponent
              name="itm_function"
              value={plantillaForm.values.itm_function}
              onChange={plantillaForm.handleChange}
              maxLength="255"
            />
            {plantillaForm.touched.itm_function &&
            plantillaForm.errors.itm_function ? (
              <p className="error-validation-styles">
                {plantillaForm.errors.itm_function}
              </p>
            ) : null}
          </span>
        </div>

        <div className="add-plantilla-item-modal">
          <span className="left-input item-modal-2">
            <label>Mode of Creation</label>
            <SelectComponent
              defaultTitle="Creation"
              name="itm_creation"
              value={plantillaForm.values.itm_creation}
              onChange={plantillaForm.handleChange}
              itemList={apiModeCreationModalInputItem}
            />
            {plantillaForm.touched.itm_creation &&
            plantillaForm.errors.itm_creation ? (
              <p className="error-validation-styles">
                {plantillaForm.errors.itm_creation}
              </p>
            ) : null}
          </span>
          <span className="right-input item-modal-1">
            <label>Source of Fund</label>
            <SelectComponent />
          </span>
        </div>

        <div className="add-plantilla-item-modal">
          <span className="item-modal-5">
            <label>Position of Immediate Supervisor</label>
            <SelectComponent
              defaultTitle="Immediate Supervisor"
              name="itm_supv1_itm_id"
              value={plantillaForm.values.itm_supv1_itm_id}
              onChange={plantillaForm.handleChange}
              itemList={plantillaByOfc}
            />
            {plantillaForm.touched.itm_supv1_itm_id &&
            plantillaForm.errors.itm_supv1_itm_id ? (
              <p className="error-validation-styles">
                {plantillaForm.errors.itm_supv1_itm_id}
              </p>
            ) : null}
          </span>
        </div>

        <div className="add-plantilla-item-modal">
          <span className="item-modal-5">
            <label>Position of Next Higher Supervisor</label>
            <SelectComponent
              defaultTitle="Higher Supervisor"
              name="itm_supv2_itm_id"
              value={plantillaForm.values.itm_supv2_itm_id}
              onChange={plantillaForm.handleChange}
              itemList={plantillaByOfc}
            />
            {plantillaForm.touched.itm_supv2_itm_id &&
            plantillaForm.errors.itm_supv2_itm_id ? (
              <p className="error-validation-styles">
                {plantillaForm.errors.itm_supv2_itm_id}
              </p>
            ) : null}
          </span>
        </div>
        <br />
      </ModalComponent>
    </React.Fragment>
  );
};

export default AddPlantillaItemModal;
