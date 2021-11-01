import { useState } from "react";

export const useFormService = (initial = {}) => {
    const [formData, formDataSetter] = useState(initial);

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
 
