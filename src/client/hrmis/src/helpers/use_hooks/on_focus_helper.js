import { useRef } from "react";
/**
 * useOnFocusHelper() This hook used to ease the focus functionality in react map renderer
 * @param {string} classNameOne - enter default class
 * @param {string} classNameTwo - enter active class
 * @returns a reference, focus function and onblur function
 */
export const useMapFocusHelper = (classNameOne, classNameTwo) => {
  const reference = useRef([]);

  const focusEventFunction = (index, length) => {
    // MAKE A MOCK ARRAY
    const makeArray = [...Array(parseInt(length)).keys()];
    // MODIFY CLASSNAME OF ALL INDEX
    makeArray.forEach((value) => {
      reference.current[value].className = classNameOne;
    });
    // MODIFY CLASSNAME OF SELECTED INDEX
    const tr = reference.current[index];
    tr.className = `${classNameOne} ${classNameTwo}`;
  };

  const onBlurEventFunction = (length) => {
    // MAKE A MOCK ARRAY
    const makeArray = [...Array(parseInt(length)).keys()];
    // MODIFY CLASSNAME OF ALL INDEX
    makeArray.forEach((value) => {
      reference.current[value].className = classNameOne;
    });
  };

  return [reference, focusEventFunction, onBlurEventFunction];
};
