import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  setMessage,
  setFail,
  setSuccess,
  setBusy,
} from "../../features/reducers/popup_response";

export const usePopUpHelper = () => {
  const timer = 1000 * 5;
  const dispatch = useDispatch();
  const timeoutFail = useRef(null);
  const timeoutSuccess = useRef(null);

  const renderSucceed = ({
    title = "ACTION ACCEPTED",
    content = "Lorem ipsum donor",
  }) => {
    renderTimeoutCancel();
    dispatch(setSuccess(true));
    dispatch(setMessage({ title, content }));
    timeoutSuccess.current = setTimeout(() => {
      dispatch(setSuccess(false));
      dispatch(setMessage({ title: "", content: "" }));
    }, timer);
  };

  const renderFailed = ({
    title = "ACTION DENIED",
    content = "Lorem ipsum donor",
  }) => {
    renderTimeoutCancel();
    dispatch(setFail(true));
    dispatch(setMessage({ title, content }));
    timeoutFail.current = setTimeout(() => {
      dispatch(setFail(false));
      dispatch(setMessage({ title: "", content: "" }));
    }, timer);
  };

  /**
   * RESET ALL TO DEFAULT RESPONSE TO DEFAULT VALUE
   */
  const renderTimeoutCancel = () => {
    clearTimeout(timeoutFail.current);
    clearTimeout(timeoutSuccess.current);
    dispatch(setFail(false));
    dispatch(setSuccess(false));
    dispatch(setMessage({ title: "", content: "" }));
  };

  /**
   * DISPLAY LOADING ANIMATION
   * @param {bool} isBusy requires a boOlean value
   */
  const renderBusy = (isBusy) => {
    dispatch(setBusy(isBusy));
  };

  return { renderFailed, renderSucceed, renderBusy, renderTimeoutCancel };
};
