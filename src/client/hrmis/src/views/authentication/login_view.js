import React from "react";
import masthead from "../../assets/images/masthead.png";
import InputComponent from "../common/input_component/input_component/input_component";
import ButtonComponent from "../common/button_component/button_component.js.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_HOST, SANCTUM } from "../../helpers/global/global_config";
import { usePopUpHelper } from "../../helpers/use_hooks/popup_helper";
import { useNavigate } from "react-router-dom";
import { ALERT_ENUM, popupAlert } from "../../helpers/alert_response";

const LoginView = () => {
  const { renderBusy } = usePopUpHelper();

  const navigate = useNavigate();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("This field is required")
        .max(255, "Invalid input")
        .email(),
      password: Yup.string()
        .required("This field is required")
        .max(255, "Invalid input"),
    }),
    onSubmit: async (values) => {
      renderBusy(true);
      await axios
        .get(SANCTUM + "sanctum/csrf-cookie")
        .then(() => {
          axios
            .post(API_HOST + "login", values)
            .then(() => {
              popupAlert({ message: "Login Successfully" });
              navigate("/rsp/dashboard");
            })
            .catch((err) => {
              console.log(err.response.data.message);
              popupAlert({
                message: err.response.data.message,
                type: ALERT_ENUM.fail,
              });
            });
        })
        .catch((err) => {
          popupAlert({ message: err.message, type: ALERT_ENUM.fail });
        });
      renderBusy(false);
    },
  });

  return (
    <React.Fragment>
      <div>
        <div className="blue-div">
          <div className="img-div">
            <img className="image-dost" src={masthead} />
          </div>
          <div className="title-div">
            <h1>Integrated Human Resource Management Information System</h1>
          </div>
        </div>
        <div className="white-div">
          <form onSubmit={loginForm.handleSubmit}>
            <span>
              <label>
                <strong>Username</strong>
              </label>
              <InputComponent
                name="email"
                onChange={loginForm.handleChange}
                className="input-div"
              />
              {loginForm.touched.email && loginForm.errors.email ? (
                <p className="error-validation-styles">
                  {loginForm.errors.email}
                </p>
              ) : null}
            </span>
            <br />
            <span>
              <label>
                <strong>Password</strong>
              </label>
              <InputComponent
                type="password"
                name="password"
                onChange={loginForm.handleChange}
                className="input-div"
              />
              {loginForm.touched.password && loginForm.errors.password ? (
                <p className="error-validation-styles">
                  {loginForm.errors.password}
                </p>
              ) : null}
            </span>
            <br />
            <br />
            <span>
              <ButtonComponent className="login-button" buttonName="Login" />
            </span>
            <br />
            <br />
            <span className="copyright-div">
              <p>Copyright 2021 DOST. All rights reserved.</p>
            </span>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginView;
