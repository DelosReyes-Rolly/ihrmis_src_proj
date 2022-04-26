import { useState } from "react";

export const useUploadImageHelper = () => {
  const [imageState, setImageState] = useState([]);

  const reader64 = async (file) => {
    const imageArray = Array.from(file);
    imageArray?.forEach((element) => {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          setImageState([reader.result, ...imageState]);
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
