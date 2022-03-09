import React from "react";
import InputComponent from "../../../../../common/input_component/input_component/input_component";
import TextAreaComponent from "../../../../../common/input_component/textarea_input_component/textarea_input_component";
import ModalComponent from "../../../../../common/modal_component/modal_component";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addCompetency,
  removeCompetency,
  editCompetency,
} from "../../../../../../features/reducers/jvscrw_slice";

const CalibratedScaleModal = ({
  title,
  onClose,
  isDisplay,
  type,
  jvsId,
  specific = null,
  competency,
}) => {
  const { competencies } = useSelector((state) => state.jvsform);
  const dispatch = useDispatch();

  const data = useFormik({
    enableReinitialize: true,
    initialValues: {
      rtg_factor: competency?.rtg_factor ?? "",
      rtg_percent: competency?.rtg_percent ?? "",
      com_type: type,
      com_specific: specific === null ? "default" : specific,
    },
    validationSchema: Yup.object({
      rtg_factor: Yup.string()
        .required("This field is required")
        .max(255, "Invalid input"),

      rtg_percent: Yup.number()
        .typeError("Must be a number")
        .required("This field is required")
        .max(100, "Invalid input"),
    }),
    onSubmit: async (values, { resetForm }) => {
      let orderSelector;

      const orderSelectorFunction = (number) => {
        const type = [
          "com_education",
          "com_writtenExam",
          "com_computationSKills",
          "com_oralExam",
          "com_creativeWork",
          "com_analyticalSkills",
          "com_training",
          "com_others",
          "com_experience",
        ];

        if (
          competencies[type[number]].tbl_com_type?.length === undefined ||
          competencies[type[number]].tbl_com_type?.length === 0
        ) {
          return 1;
        } else {
          return (
            competencies[type[number]].tbl_com_type[
              competencies[type[number]].tbl_com_type.length - 1
            ].rtg_seq_order + 1
          );
        }
      };

      if (type === "ED") {
        orderSelector = orderSelectorFunction(0);
      } else if (type === "WE") {
        orderSelector = orderSelectorFunction(1);
      } else if (type === "CS") {
        orderSelector = orderSelectorFunction(2);
      } else if (type === "OE") {
        orderSelector = orderSelectorFunction(3);
      } else if (type === "CW") {
        orderSelector = orderSelectorFunction(4);
      } else if (type === "AS") {
        orderSelector = orderSelectorFunction(5);
      } else if (type === "TR") {
        orderSelector = orderSelectorFunction(6);
      } else if (type === "OT") {
        orderSelector = orderSelectorFunction(7);
      } else if (type === "EX") {
        orderSelector = orderSelectorFunction(8);
      }

      if (competency.rtg_seq_order != null) {
        // edit
        dispatch(
          editCompetency({
            rtg_factor: values.rtg_factor,
            rtg_com_type: type,
            rtg_id: jvsId,
            rtg_seq_order: competency.rtg_seq_order,
            rtg_percent: values.rtg_percent,
            com_specific: specific === null ? "default" : specific,
          })
        );
      } else {
        // add
        if (competency.rtg_factor === values.rtg_factor) {
          console.log("Failed: Same Copy");
        } else {
          dispatch(
            addCompetency({
              rtg_factor: values.rtg_factor,
              rtg_com_type: type,
              rtg_id: jvsId,
              rtg_seq_order: orderSelector ?? 1,
              rtg_percent: values.rtg_percent,
              com_specific: specific === null ? "default" : specific,
            })
          );
        }
      }
      resetForm();
      onClose();
    },
  });

  const removeCompetencyRating = async () => {
    dispatch(
      removeCompetency({ rtg_com_type: type, order: competency.rtg_seq_order })
    );
    onClose();
  };

  return (
    <React.Fragment>
      <ModalComponent
        title={title}
        onSubmitName="Save"
        onCloseName="Delete"
        onClose={onClose}
        isDisplay={isDisplay}
        onSubmit={data.handleSubmit}
        onSubmitType="Submit"
        onPressed={removeCompetencyRating}
      >
        <div>
          <label>Scale Factor</label>
          <TextAreaComponent
            name="rtg_factor"
            row="3"
            value={data.values.rtg_factor}
            onChange={data.handleChange}
          />
          {data.touched.rtg_factor && data.errors.rtg_factor ? (
            <p className="error-validation-styles">{data.errors.rtg_factor}</p>
          ) : null}
        </div>
        <br />
        <div>
          <label>Percentage Scale</label>
          <InputComponent
            name="rtg_percent"
            value={data.values.rtg_percent}
            onChange={data.handleChange}
          />
          {data.touched.rtg_percent && data.errors.rtg_percent ? (
            <p className="error-validation-styles">{data.errors.rtg_percent}</p>
          ) : null}
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default CalibratedScaleModal;

// const sequence =
//   competency.rtg_seq_order != null ? "/" + competency?.rtg_seq_order : "";

// ADD
// await axios
//   .post(
//     API_HOST +
//       "jvscrw-competency-rating/" +
//       jvsId +
//       "/sequence" +
//       sequence,
//     values
//   )
//   .then(() => {
//     console.log("Success");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//REMOVE

// await axios
//   .delete(
//     API_HOST +
//       "jvscrw-rating/" +
//       jvsId +
//       "/order/" +
//       competency?.rtg_seq_order +
//       "/type/" +
//       type
//   )
//   .then(() => console.log("success"))
//   .catch((err) => console.log(err));
