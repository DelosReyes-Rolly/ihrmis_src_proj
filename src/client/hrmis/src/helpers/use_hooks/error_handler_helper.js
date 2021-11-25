import { useDispatch } from "react-redux";
import {
  setMessageError,
  setObjectError,
} from "../../features/reducers/error_handler_slice";
import { usePopUpHelper } from "./popup_helper";

const useErrorHandlerHelper = (error) => {
  const dispatch = useDispatch();
  const { renderFail } = usePopUpHelper();

  if (error.response) {
    renderFail();
    console.log(error);
    if (error.response.status === 422) {
      dispatch(setObjectError(error.response.data.errors));
      return "422: Unprocessed data";
    } else if (error.response.status === 404) {
      dispatch(setMessageError("404 Page Not Found"));
      return new Error("404 Page Not Found");
    } else if (error.response.status === 500) {
      dispatch(setMessageError("404 Page Not Found"));
      return new Error(`500: ${error.response.data.message}`);
    }
  } else if (error.request) {
    dispatch(setMessageError("404 Page Not Found"));
    return new Error(`Please check your network connectivity.`);
  } else {
    dispatch(setMessageError("Oopss something went wrong."));
    return new Error(`Oopss something went wrong.`);
  }
};

export default useErrorHandlerHelper;
