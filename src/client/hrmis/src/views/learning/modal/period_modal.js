import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { ALERT_ENUM, popupAlert } from "../../../helpers/alert_response";
import { API_HOST } from "../../../helpers/global/global_config";
import InputComponent from "../../common/input_component/input_component/input_component";
import ModalComponent from "../../common/modal_component/modal_component";




const PeriodModal = ({isDisplay, onClose}) => {
    
    const formHandler = useFormik({
        initialValues:{
            prd_start: "",
            prd_end: "",
            prd_title: "",
        },
        validationSchema: Yup.object({              
            prd_start: Yup.date()
                .typeError("Invalid Input")
                .required("This field is required"),
            prd_end: Yup.date()
                .typeError("Invalid Input")
                .required("This field is required"),
            prd_title: Yup.string()
                .typeError("Invalid Input")
                .required("This field is required"),
        }),
        onSubmit: async (values, {resetForm}) => {
            axios 
                .post(API_HOST + "add-period", values)
                .then(() => {
                    popupAlert("Success", ALERT_ENUM.success);
                    resetForm();
                    onClose();
                })
                .catch((err) =>{
                    popupAlert("Failed", ALERT_ENUM.fail);
                });
        },
    });
    

    return (
        <React.Fragment>
            <ModalComponent
                title="New Period" 
                isDisplay={isDisplay} 
                onClose={onClose}
                onSubmitType="submit"
                onSubmit={formHandler.handleSubmit}
            >
            <div className="flex-container">
                <span style={{paddingRight: 40}}>
                    <label>Period From</label>
                    <InputComponent 
                        name="prd_start"
                        type={"date"}
                        value={formHandler.values.prd_start}
                        onChange={formHandler.handleChange}
                    />
                    {formHandler.touched.prd_start && formHandler.errors.prd_start ? (
                        <p className="error-validation-styles">
                        {formHandler.errors.prd_start}
                        </p>
                    ) : null}
                </span>
                <span style={{paddingRight: 40}}>
                    <label>To</label>
                    <InputComponent    
                        name="prd_end"
                        type={"date"}
                        value={formHandler.values.prd_end}
                        onChange={formHandler.handleChange}
                    />
                    {formHandler.touched.prd_end && formHandler.errors.prd_end ? (
                        <p className="error-validation-styles">
                        {formHandler.errors.prd_end}
                        </p>
                    ) : null}
                </span>
            </div><br/>
            <label>Title</label>
            <InputComponent
                name="prd_title"
                value={formHandler.values.prd_title}
                onChange={formHandler.handleChange}
            />
            {formHandler.touched.prd_title && formHandler.errors.prd_title ? (
                <p className="error-validation-styles">
                {formHandler.errors.prd_title}
                </p>
            ) : null}
            </ModalComponent>
        </React.Fragment>
    );
};

export default PeriodModal;