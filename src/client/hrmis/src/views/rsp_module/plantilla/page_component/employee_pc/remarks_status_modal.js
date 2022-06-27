import React from "react";
import ModalComponent from "../../../../common/modal_component/modal_component";
import SelectComponent from "../../../../common/input_component/select_component/select_component";
import TextAreaComponent from "../../../../common/input_component/textarea_input_component/textarea_input_component";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  API_HOST,
  validationRequired,
} from "../../../../../helpers/global/global_config";
import axios from "axios";
import { ALERT_ENUM, popupAlert } from "../../../../../helpers/alert_response";
import { useDispatch } from "react-redux";
import { setBusy } from "../../../../../features/reducers/popup_response";

const statusObj = [
  { id: "In Service", title: "In Service" },
  { id: "Transferred", title: "Transferred" },
  { id: "Retired", title: "Retired" },
  { id: "Resigned", title: "Resigned" },
  { id: "Rationalized", title: "Rationalized" },
  { id: "End of Contract", title: "End of Contract" },
  { id: "Deceased", title: "Deceased" },
  { id: "Drop from Rolls", title: "Drop from Rolls" },
  { id: "Awol", title: "Awol" },
];

const generate_api_link = (api, identifier = null) => {
  const id = identifier ? `/${identifier}` : "";
  if (api !== null) return API_HOST + api + id;
  return null;
};

/**
 * RemarksStatusModal Component used to view status and remarks modal
 *
 * - The status modal will be view when onPressHidden is true.
 * - The remarks modal will be view when onPressHidden is false,
 *
 */
const RemarksStatusModal = ({
  isDisplay,
  onClose,
  title = "Remarks",
  onPressedHidden = true,
  endpoint,
  id,
}) => {
  const dispatch = useDispatch();

  const formHandler = useFormik({
    enableReinitialize: true,
    initialValues: {
      status: "",
      remarks: "",
    },
    validationSchema: Yup.object({
      status: onPressedHidden ? validationRequired : Yup.string(),
      remarks: validationRequired,
    }),
    onSubmit: async (values) => {
      dispatch(setBusy(true));
      const link = generate_api_link(endpoint, id);
      if (link === null) {
        await axios
          .post(link, values)
          .then(() => {
            popupAlert({
              message: "Saved successfully",
              type: ALERT_ENUM.success,
            });
          })
          .catch((err) => {
            dispatch(setBusy(false));
            popupAlert({
              message: err.response.data.message ?? err?.message,
              type: ALERT_ENUM.fail,
            });
          });
        dispatch(setBusy(false));
        return null;
      }
      dispatch(setBusy(false));
      console.log("Didnt work");
    },
  });

  return (
    <React.Fragment>
      <ModalComponent
        isDisplay={isDisplay}
        onClose={onClose}
        title={title}
        onPressedHidden={onPressedHidden}
        onSubmit={formHandler.handleSubmit}
        onSubmitType="submit"
        onCloseName="Clear"
        onSubmitName="Save"
      >
        {onPressedHidden && (
          <div style={{ marginBottom: "5px" }}>
            <label>Status</label>
            <SelectComponent
              name="status"
              defaultTitle="Select Status"
              itemList={statusObj}
              value={formHandler?.values?.status}
              onChange={formHandler?.handleChange}
            />
            {formHandler.touched.status && formHandler.errors.status ? (
              <p className="error-validation-styles">
                {formHandler.errors.status}
              </p>
            ) : null}
          </div>
        )}
        <div>
          <label style={{ marginTop: "5px" }}>Remarks</label>
          <TextAreaComponent
            name="remarks"
            row={onPressedHidden ? "2" : "6"}
            value={formHandler?.values?.remarks}
            onChange={formHandler?.handleChange}
          />
          {formHandler.touched.remarks && formHandler.errors.remarks ? (
            <p className="error-validation-styles">
              {formHandler.errors.remarks}
            </p>
          ) : null}
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default RemarksStatusModal;
