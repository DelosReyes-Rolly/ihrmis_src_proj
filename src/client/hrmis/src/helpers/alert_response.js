import { ALERT } from "./global/global_config";

export const ALER_ENUM = { fail: "error", success: "success" };

const TYPE_PARAM = {
  title: "",
  message: "",
  type: ALER_ENUM.success,
};

/**
 * Popup Sweetalert2 function
 * @param {TYPE_PARAM} param - Type of popup accepts alertEnum key
 */
export const popupAlert = (param) => {
  const alertType = messageType(param?.type);
  const title = param?.title === undefined ? alertType.title : param?.title;
  ALERT.fire({
    title: title,
    text: param?.message,
    icon: alertType?.icon,
    confirmButtonColor: alertType?.buttonColor,
  });
};

const messageType = (type = ALER_ENUM.success) => {
  let objectHolder = {
    icon: "",
    buttonColor: "",
    title: "",
  };

  if (type === ALER_ENUM.success) {
    objectHolder = {
      icon: "success",
      buttonColor: "#5cb85c",
      title: "Succeeded",
    };
  }

  if (type === ALER_ENUM.fail) {
    objectHolder = {
      icon: "error",
      buttonColor: "#d9534f",
      title: "Failed",
    };
  }

  return objectHolder;
};