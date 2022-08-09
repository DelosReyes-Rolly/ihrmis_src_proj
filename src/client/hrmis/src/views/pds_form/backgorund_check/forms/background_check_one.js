import React, { useEffect, useState, Component } from "react";
import { useDispatch } from "react-redux";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useScrollToTop } from "../../../../helpers/use_hooks/useScollTop";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setMessageError } from "../../../../features/reducers/error_handler_slice";
import { API_HOST } from "../../../../helpers/global/global_config";
import { ALERT_ENUM, popupAlert } from "../../../../helpers/alert_response";
import { setRefresh } from "../../../../features/reducers/popup_response";
import PrevNextSubButtons from "../../parts/prev_next_sub_buttons";
import dostLogo from "../../../../assets/images/logo.png";
import InputComponent from "../../../common/input_component/input_component/input_component";
import ButtonComponent from "../../../common/button_component/button_component";
import { AiOutlineRight } from "react-icons/ai";

const BackgroundCheckFormOne = () => {
  useScrollToTop();

  const dispatch = useDispatch();

  const { reference, applicant } = useParams();
  const [initials, setInitials] = useState({});
  const [applicantName, setApplicantName] = useState("");
  const [applicantLast, setApplicantLast] = useState("");
  const [position, setPosition] = useState("");
  const [office, setOffice] = useState("");
  const navigate = useNavigate();

  const twoOneInputs = [
    { label: "Outstanding", value: 4 },
    { label: "Very Satisfactory", value: 3 },
    { label: "Satisfactory", value: 2 },
    { label: "Poor", value: 1 },
  ];

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      1: initials[1] ?? "",
      2: initials[2] ?? "",
      3: initials[3] ?? "",
      4: initials[4] ?? "",
      5: initials[5] ?? "",
    },
    validationSchema: Yup.object({
      1: Yup.string().required("This field is required"),
      2: Yup.string().required("This field is required"),
      3: Yup.string().required("This field is required"),
      4: Yup.number().required("This field is required"),
      5: Yup.string().required("This field is required"),
    }),
    onSubmit: async (value, { resetForm }) => {
      value.applicant_id = applicant;
      value.reference = reference;
      await axios
        .post(API_HOST + "new-reference-check", value)
        .then(() => {
          navigate(`/background-check/two/${reference}/${applicant}`);
          dispatch(setRefresh());
        })
        .catch((err) => {
          popupAlert({
            message: err.message,
            type: ALERT_ENUM.fail,
          });
        });
      // renderBusy(false);
      resetForm();
    },
  });
  useEffect(() => {
    getApplicantData();
    getReferenceData();
  }, []);
  const getReferenceData = async () => {
    await axios
      .get(API_HOST + "get-reference-check/" + reference)
      .then((response) => {
        const applicantData = response.data.data;
        const values = {};
        applicantData?.tbl_reference_checks.forEach((element) => {
          values[element.chk_question] = element.chk_answer;
        });
        setInitials(values);
      })
      .catch((error) => {});
  };

  const getApplicantData = async () => {
    await axios
      .get(API_HOST + "get-reference-position-office/" + applicant)
      .then((response) => {
        const applicantData = response.data.data;
        const applicant = applicantData?.applicant;
        const positionText = applicantData?.position;
        const officeText = applicantData?.office;
        const nameText = `${applicant?.app_nm_first} ${applicant?.app_nm_mid[0]}. ${applicant?.app_nm_last} ${applicant?.app_nm_extn}`;
        setApplicantLast(applicant?.app_nm_last);
        setApplicantName(nameText);
        setPosition(positionText);
        setOffice(officeText);
      })
      .catch((error) => {});
  };
  return (
    <React.Fragment>
      <div className="pds-profile-main-view">
        <div className="form-header">
          <img src={dostLogo} width="50px" height="50px" alt="dost-logo" />
          <h3>Department of Science and Technology</h3>
          <p>General Santos Avenue, Bicutan Taguig City</p> <br />
          <br />
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              paddingTop: "1rem",
            }}
          >
            Employment Background Check
          </p>
          <br />
          <h1 style={{ color: "rgb(0, 78, 135)" }}>{applicantName}</h1>
        </div>
        <div style={{ paddingTop: "2rem" }}>
          <p>
            Good Day! We wish to inform you that{" "}
            <b>{applicantName.toUpperCase()}</b> has identified you as a
            character reference in relation to {applicantLast.toUpperCase()}'s
            recent job application as {`${position}`} at {`${office}`}. We shall
            appreciate it very much if you could take a few moments to answer
            the questions in this employment background check. Rest assured that
            all information you will disclose will be held in strict confidence
            (<strong style={{ color: "red" }}>* </strong>Required)
          </p>
        </div>
        <br />
        <br />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="add-office-modal">
            <div className="item-modal-5">
              <label>
                <strong style={{ color: "red" }}>* </strong> Please type your
                full name below:
              </label>
              <InputComponent
                name="1"
                value={form.values[1]}
                onChange={form.handleChange}
                maxLength="30"
              />
              {form.touched[1] && form.errors[1] ? (
                <span className="invalid-response">{form.errors[1]}</span>
              ) : null}
            </div>
          </div>
          <div className="add-office-modal">
            <div className="item-modal-5">
              <label>
                <strong style={{ color: "red" }}>* </strong> 1.1 How long have
                you known the candidate?
              </label>
              <InputComponent
                name="2"
                value={form.values[2]}
                onChange={form.handleChange}
                maxLength="30"
              />
              {form.touched[2] && form.errors[2] ? (
                <span className="invalid-response">{form.errors[2]}</span>
              ) : null}
            </div>
          </div>
          <div className="add-office-modal">
            <div className="item-modal-5">
              <label>
                <strong style={{ color: "red" }}>* </strong> 1.2 What is/was
                your relationship with the candidate?
              </label>
              <InputComponent
                name="3"
                value={form.values[3]}
                onChange={form.handleChange}
                maxLength="30"
              />
              {form.touched[3] && form.errors[3] ? (
                <span className="invalid-response">{form.errors[3]}</span>
              ) : null}
            </div>
          </div>
          <div className="add-office-modal">
            <div className="item-modal-5">
              <label>
                <strong style={{ color: "red" }}>* </strong> 2.1 Please
                describew the work performance of the candidate during his/her
                employment in your office/company
              </label>
              <div className="two">
                {twoOneInputs.map((data, index) => {
                  return (
                    <div
                      className="item-modal-5 radio-buttons"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                      key={index}
                    >
                      <InputComponent
                        id={index}
                        name="4"
                        type="radio"
                        onChange={form.handleChange}
                        maxLength="30"
                        checked={form.values[4] == data.value ? true : false}
                        value={data.value}
                      />
                      <label htmlFor={index}>{data.label}</label>
                    </div>
                  );
                })}
              </div>

              {form.touched[4] && form.errors[4] ? (
                <span className="invalid-response">{form.errors[4]}</span>
              ) : null}
            </div>
          </div>
          <div className="add-office-modal">
            <div className="item-modal-5">
              <label>
                <strong style={{ color: "red" }}>* </strong> 2.2 If you wish to
                use a different rating scale or add details, please use the
                space provided:
              </label>
              <InputComponent
                name="5"
                value={form.values[5]}
                onChange={form.handleChange}
                maxLength="30"
              />
              {form.touched[5] && form.errors[5] ? (
                <span className="invalid-response">{form.errors[5]}</span>
              ) : null}
            </div>
          </div>
        </div>
        <br />
        <form style={{ boxSizing: "border-box" }} onSubmit={form.handleSubmit}>
          <div
            className="add-office-modal"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div className="item-modal-5">
              <p>1/3</p>
            </div>
            <div
              className="item-modal-5"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <ButtonComponent
                type="button"
                buttonLogoEnd={<AiOutlineRight size="15px" />}
                className="next-button"
                buttonName="Next"
                onClick={form.handleSubmit}
              />
            </div>
          </div>
        </form>
        <br />
        <br />
      </div>
    </React.Fragment>
  );
};

export default BackgroundCheckFormOne;
