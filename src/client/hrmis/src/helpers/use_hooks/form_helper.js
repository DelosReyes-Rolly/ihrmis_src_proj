import { useState } from "react";

export const useFormHelper = (initial = {}) => {
  const [formData, formDataSetter] = useState(initial);

  const formSingleInput = (e) => {
    formDataSetter({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formObjectInput = (objName, objData, textbox = false) => {
    if (textbox == false) {
      formDataSetter({
        ...formData,
        [objName]: objData,
      });
    } else {
      if (formData[objName] == "" || formData[objName] == undefined) {
        formDataSetter({
          ...formData,
          [objName]: objData,
        });
      } else {
        formDataSetter({
          ...formData,
          [objName]: "",
        });
      }
    }
  };

  return [formData, formSingleInput, formObjectInput, formDataSetter];
};
