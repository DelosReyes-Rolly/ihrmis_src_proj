import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import { usePopUpHelper } from "../../../../../helpers/use_hooks/popup_helper";
import ModalComponent from "../../../../common/modal_component/modal_component";
import { setRefresh } from "../../../../../features/reducers/popup_response";
import { useDispatch } from "react-redux";
import { API_HOST } from "../../../../../helpers/global/global_config";
import TextAreaComponent from "../../../../common/input_component/textarea_input_component/textarea_input_component";
import { ALERT_ENUM, popupAlert } from "../../../../../helpers/alert_response";
import Creatable from "react-select/creatable";
const RecruitmentStatusModal = ({
  isDisplay,
  onClose,
  rowData,
  statusSelect,
}) => {
  const dispatch = useDispatch();
  const { renderBusy } = usePopUpHelper();
  const [status, setStatus] = useState({});

  const statusForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      status_id: "1",
      status_remark: "",
    },
    validationSchema: Yup.object({
      status_id: Yup.number()
        .typeError("Must be a number")
        .required("This field is required"),
      status_remark: Yup.string().typeError("Must be Text"),
    }),
    onSubmit: async (value, { resetForm }) => {
      renderBusy(true);

      let axios = false;
      if (rowData.length > 0) {
        const formData = new FormData();
        formData.append("status_id", value.status_id);
        formData.append("status_remark", value.status_remark);
        rowData.forEach((element) => {
          formData.append("applicant_id", element.app_id);
          axios = submitForm(formData);
        });
      } else {
        const formData = new FormData();
        formData.append("status_id", value.status_id);
        formData.append("status_remark", value.status_remark);
        formData.append("applicant_id", rowData.app_id);
        axios = submitForm(formData);
      }
      if (axios) {
        popupAlert({
          message: "Reason of Change submitted successfully",
          type: ALERT_ENUM.success,
        });
      } else {
        popupAlert({
          message: "Status failed to save",
          type: ALERT_ENUM.fail,
        });
      }
      resetForm();
    },
  });

  const submitForm = async (formData) => {
    let status = true;
    await axios
      .post(API_HOST + "add-applicant-status", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        status = true;
        dispatch(setRefresh());
        onClose();
      })
      .catch((err) => {
        status = false;
      });
    renderBusy(false);
    return status;
  };
  return (
    <React.Fragment>
      <ModalComponent
        title="Reason for Change"
        isDisplay={isDisplay}
        onClose={onClose}
        onSubmit={statusForm.handleSubmit}
        onSubmitType="submit"
        onSubmitName="Submit"
        onPressedHidden={true}
      >
        <div className="add-documents-modal">
          <div className="left-input item-modal-1">
            <TextAreaComponent
              name="status_remark"
              onChange={statusForm.handleChange}
              value={statusForm.values.status_remark}
            />
            {statusForm.touched.remarks && statusForm.errors.status_remark ? (
              <p className="error-validation-styles">
                {statusForm.errors.status_remark}
              </p>
            ) : null}
          </div>
        </div>
        <div className="add-documents-modal">
          <div
            className="left-input item-modal-1"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <label>Status</label>
            <Creatable
              name="status_id"
              options={statusSelect}
              isClearable={false}
              value={{
                label: statusSelect?.label ?? status?.label ?? "Select Status",
                value: statusSelect?.value ?? status?.value ?? "0",
              }}
              className="creatable-design"
              onChange={(e) => {
                if (e !== null) {
                  setStatus({ label: e?.label, value: e?.value });
                  statusForm.setFieldValue("status_id", e.value);
                }
              }}
            />
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default RecruitmentStatusModal;
