import { useState } from "react";

export const useUploadImageHelper = () => {
  const [imageState, setImageState] = useState([]);

  const reader64 = (files) => {
    const sean = Array.from(files);
    sean?.forEach((element) => {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          setImageState([...imageState, reader.result]);
        },
        false
      );
      if (element) {
        reader.readAsDataURL(element);
      }
    });
  };

  return { imageState, reader64 };
};
