import { ALERT } from "./global/global_config";

export const ALERT_ENUM = { fail: "error", success: "success" };

const TYPE_PARAM = {
	title: "",
	message: "",
	type: ALERT_ENUM,
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

const messageType = (type = ALERT_ENUM.success) => {
	let objectHolder = {
		icon: "",
		buttonColor: "",
		title: "",
	};

	if (type === ALERT_ENUM.success) {
		objectHolder = {
			icon: "success",
			buttonColor: "#5cb85c",
			title: "Succeeded",
		};
	}

	if (type === ALERT_ENUM.fail) {
		objectHolder = {
			icon: "error",
			buttonColor: "#d9534f",
			title: "Failed",
		};
	}

	return objectHolder;
};

/**
 * Popup Sweetalert2 confirmation function
 * @param {TYPE_PARAM} param - Type of popup accepts alertEnum key
 */
export const popupConfirmation = (param) => {
	const alertType = messageType(param?.type);
	const confirmColor = messageType(ALERT_ENUM.success);
	const title = param?.title === undefined ? alertType.title : param?.title;
	// console.log(param.value);
	ALERT.fire({
		title: title,
		text: param?.message,
		icon: alertType?.icon,
		confirmButtonColor: confirmColor?.buttonColor,
		showCancelButton: true,
		cancelButtonColor: alertType?.buttonColor,
	}).then((result) => {
		console.log(result);
		if (result.isConfirmed) {
			param.functions(param.value);
		}
	});
};
