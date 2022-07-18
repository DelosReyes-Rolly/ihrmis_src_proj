import { useFormik } from "formik";
import React, { memo, useCallback } from "react";
import InputComponent from "../../../../../../common/input_component/input_component/input_component";
import TextAreaComponent from "../../../../../../common/input_component/textarea_input_component/textarea_input_component";
import ModalComponent from "../../../../../../common/modal_component/modal_component";
import * as Yup from "yup";
import {
  validationRequired,
  validationRequiredNum,
} from "../../../../../../../helpers/global/global_config";
import {
  setCompTraining,
  setCompEducation,
  setCompExperience,
} from "../../../../../../../features/reducers/jvscrw_form_slice";
import { useDispatch, useSelector } from "react-redux";
import { COMPETENCY_ENUMS } from "./competency_table";
import {
  ALERT_ENUM,
  popupAlert,
} from "../../../../../../../helpers/alert_response";

const CompetencyModal = ({
  title,
  isDisplay,
  onClose,
  RTG_TYPE,
  // For Editing purposes
  data = null,
  arrData = [],
}) => {
  const formHandler = useFormik({
    enableReinitialize: true,
    initialValues: {
      rtg_factor: data?.rtg_factor ?? "",
      rtg_percent: data?.rtg_percent ?? "",
    },
    validationSchema: Yup.object({
      rtg_factor: validationRequired,
      rtg_percent: Yup.number()
        .typeError("Must be a number")
        .required("This field is required")
        .max(100, "Invalid input"),
    }),
    onSubmit: (values, { resetForm }) => {
      try {
        const detailData = {
          rtg_factor: values?.rtg_factor,
          rtg_percent: parseFloat(values?.rtg_percent),
        };

        //ADD
        if (data === null) stateCompetencyAdder(RTG_TYPE, detailData);
        //EDIT
        if (data !== null) {
          stateCompetencyUpdater(RTG_TYPE, detailData);
        }

        resetForm();
        popupAlert({
          message: "Changes were saved successfully",
          type: ALERT_ENUM.success,
        });
        onClose(false);
      } catch (error) {
        popupAlert({
          message: error.message,
          type: ALERT_ENUM.fail,
        });
      }
    },
  });

  const dispatch = useDispatch();

  const { education, experience, training } = useSelector(
    (state) => state.jvscrwForm
  );

  /**
   * Add data to array of competencies
   */
  const stateCompetencyAdder = useCallback((setter, value, type = 1) => {
    if (setter === COMPETENCY_ENUMS.EDUCATION) {
      dispatch(setCompEducation({ type: type, data: value }));
    }
    if (setter === COMPETENCY_ENUMS.TRAINING) {
      dispatch(setCompTraining({ type: type, data: value }));
    }
    if (setter === COMPETENCY_ENUMS.EXPERIENCE) {
      dispatch(setCompExperience({ type: type, data: value }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stateCompetencyUpdater = useCallback((setter, value, type = 2) => {
    if (setter === COMPETENCY_ENUMS.EDUCATION) {
      // const arr = editDataInArray(arrData);
      dispatch(setCompEducation({ type: type, data: [] }));
    }
    // if (setter === COMPETENCY_ENUMS.TRAINING) {
    //   const arrayHolder = editDataInArray(
    //     training?.competencies,
    //     data.index,
    //     value
    //   );
    //   dispatch(setCompTraining({ type: type, data: arrayHolder }));
    // }
    // if (setter === COMPETENCY_ENUMS.EXPERIENCE) {
    //   const arrayHolder = editDataInArray(
    //     experience?.competencies,
    //     data.index,
    //     value
    //   );
    //   dispatch(setCompExperience({ type: type, data: arrayHolder }));
    // }
  }, []);

  return (
    <React.Fragment>
      <ModalComponent
        title={title}
        isDisplay={isDisplay}
        onClose={() => onClose(false)}
        onSubmitType="submit"
        onSubmitName={"Save"}
        onSubmit={formHandler.handleSubmit}
      >
        {console.log("RENDER POS MODAL: ")}
        <div>
          <label>Scale Factor</label>
          <TextAreaComponent
            name="rtg_factor"
            row="3"
            value={formHandler.values.rtg_factor}
            onChange={formHandler.handleChange}
          />
          {formHandler.touched.rtg_factor && formHandler.errors.rtg_factor ? (
            <p className="error-validation-styles">
              {formHandler.errors.rtg_factor}
            </p>
          ) : null}
        </div>
        <br />
        <div>
          <label>Percentage Scale</label>
          <InputComponent
            name="rtg_percent"
            value={formHandler.values.rtg_percent}
            onChange={formHandler.handleChange}
          />
          {formHandler.touched.rtg_percent && formHandler.errors.rtg_percent ? (
            <p className="error-validation-styles">
              {formHandler.errors.rtg_percent}
            </p>
          ) : null}
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default memo(CompetencyModal);

const editDataInArray = (arrayValue, index, value) => {
  let ArrHolder = [];

  arrayValue?.map((item, i) => {
    if (i === index) {
      return ArrHolder.push(value);
    }
    return ArrHolder.push(item);
  });

  return ArrHolder;
};

const removeDataInArray = (arrayValue, index) => {
  const ARR_HOLDER = arrayValue;
  if (index > -1) {
    ARR_HOLDER.splice(index, 1); // 2nd parameter means remove one item only
  }
  return ARR_HOLDER;
};
