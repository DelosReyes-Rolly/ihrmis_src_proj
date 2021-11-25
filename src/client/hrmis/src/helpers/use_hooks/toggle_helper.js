import { useState } from "react";

export const useToggleHelper = (initialState = false) => {
  let [toggleState, setToggle] = useState(initialState);

  const enableToggle = () => {
    setToggle(!toggleState);
  };

  return [toggleState, enableToggle];
};
