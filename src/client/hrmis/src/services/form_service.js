import { useState } from "react";

export const useFormService = () => {
    const [formData, formDataSetter] = useState({});

    const formSingleInput = (e) => {
        formDataSetter({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    const formObjectInput = (objName, objData) => {
        formDataSetter({
            ...formData,
            [objName] : objData
        });
    }

    return [formData, formSingleInput, formObjectInput, formDataSetter];
}
 
