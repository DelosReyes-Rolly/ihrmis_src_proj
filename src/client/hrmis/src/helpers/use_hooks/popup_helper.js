import { useDispatch } from "react-redux";
import { setFail, setSuccess } from "../../features/reducers/popup_response";

export const usePopUpHelper = () => {
  let dispatch = useDispatch();
  const timer = 5000;

  const renderSuccess = () => {
    dispatch(setSuccess(true));
    setTimeout(() => {
      dispatch(setSuccess(false));
    }, timer);
  };

  const renderFail = () => {
    dispatch(setFail(true));
    setTimeout(() => {
      dispatch(setFail(false));
    }, timer);
  };

  return { renderFail, renderSuccess };
};
