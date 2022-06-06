import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBusy } from "../../../../../features/reducers/popup_response";
import { API_HOST } from "../../../../../helpers/global/global_config";
import ModalComponent from "../../../../common/modal_component/modal_component";
import * as Yup from "yup";
import InputComponent from "../../../../common/input_component/input_component/input_component";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { BiMinusCircle } from "react-icons/bi";

const OtherHobbyModal = ({
  title,
  hobbyType,
  isDisplay,
  onClose,
  //   reference = [{ oth_emp_desc: "Sleeping" }, { oth_emp_desc: "Sleeping" }],
}) => {
  const dispatch = useDispatch();

  const [refState, setRefState] = useState([
    { oth_emp_desc: "Sleeping" },
    { oth_emp_desc: "Twiter" },
  ]);

  const formHandler = useFormik({
    enableReinitialize: true,
    initialValues: {
      oth_emp_type: hobbyType ?? "",
      value_other: [],
    },
    validationSchema: Yup.object({
      value_other: Yup.array()
        .typeError("This field is required")
        .required("This field is required"),
    }),
    onSubmit: async (value, { resetForm }) => {
      dispatch(setBusy(true));
      await axios
        .post(API_HOST + "", value)
        .then(() => {
          resetForm();
          onClose();
        })
        .catch((err) => {
          resetForm();
          onClose();
          console.log(err.message);
        });
      dispatch(setBusy(false));
    },
  });

  //   useEffect(() => {
  //     // console.log(reference);
  //     // setRefState(reference);
  //   }, []);

  useEffect(() => {
    formHandler.setFieldValue("value_other", refState);
    console.log(refState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refState]);
  return (
    <React.Fragment>
      <ModalComponent
        title={title}
        isDisplay={isDisplay}
        onSubmitName="Save"
        onCloseName="Close"
        onSubmit={formHandler.handleSubmit}
        onSubmitType="submit"
        onClose={onClose}
      >
        {refState?.map((item, key) => {
          return (
            <MinusInput
              key={key}
              element={item}
              state={refState}
              setState={setRefState}
            />
          );
        })}
        <AddInput state={refState} setState={setRefState} />
      </ModalComponent>
    </React.Fragment>
  );
};

export default OtherHobbyModal;

const AddInput = ({ state, setState }) => {
  const [inputState, setInputState] = useState("");

  const addToArray = () => {
    const arrayHolder = state ?? [];
    let boolHolder = false;
    arrayHolder.forEach((element) => {
      if (element?.oth_emp_desc === inputState) {
        return (boolHolder = true);
      }
    });

    if (boolHolder === true) return setState(state);
    if (inputState === "") return setState(state);

    arrayHolder.push({ oth_emp_desc: inputState });
    setState([...arrayHolder]);
    return setInputState("");
  };

  return (
    <React.Fragment>
      <div className="add-hobby-employee">
        <div className="alignment-input">
          <InputComponent
            value={inputState}
            onChange={(e) => setInputState(e?.target?.value)}
          />
        </div>
        <div className="alignment-input">
          <MdOutlineAddCircleOutline
            onClick={() => addToArray()}
            className="input-icon"
            color="green"
            size={20}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const MinusInput = ({ element, state, setState }) => {
  const removeFromArray = () => {
    const arrayHolder = state;
    setState(
      arrayHolder.filter((item) => {
        return item?.oth_emp_desc !== element?.oth_emp_desc;
      })
    );
  };
  return (
    <React.Fragment>
      <div className="add-hobby-employee">
        <div className="alignment-input">
          <InputComponent value={element?.oth_emp_desc} readOnly={true} />
        </div>
        <div className="alignment-input">
          <BiMinusCircle
            onClick={() => removeFromArray()}
            className="input-icon"
            color="red"
            size={20}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
