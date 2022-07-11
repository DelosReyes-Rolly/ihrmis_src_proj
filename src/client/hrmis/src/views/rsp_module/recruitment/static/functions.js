import { format } from "date-fns";
import { educationInputItemText } from "../../../pds_form/static/input_items";
import { recruitmentEligbilities } from "./table_items";

export const eligibilityToMessage = (data) => {
	let message = "";
	data.forEach((data) => {
		message += recruitmentEligbilities[data.cse_app_title] + "\n";
	});
	message = message.split("\n").map((str, key) => <p key={key}>{str}</p>);
	return message;
};
export const experienceToMessage = (data) => {
	let message = "";
	data.forEach((data) => {
		let from = format(new Date(data?.exp_app_from), "MMM dd yyyy");
		let to = format(new Date(data?.exp_app_to), "MMM dd yyyy");
		message +=
			from +
			" - " +
			to +
			"\n" +
			data?.exp_app_position +
			"\n" +
			data?.exp_app_agency +
			"\n\n";
	});
	message = message.split("\n").map((str, key) => <p key={key}>{str}</p>);
	return message;
};
export const trainingToMessage = (data) => {
	let message = "";
	let count = 0;
	data.forEach((data) => {
		let from = format(new Date(data?.trn_app_from), "dd MMM");
		let to = format(new Date(data?.trn_app_from), "dd MMM yyyy");
		count++;
		message +=
			count + ". " + data?.trn_app_title + ", " + from + " - " + to + "\n";
	});
	message = message.split("\n").map((str, key) => <p key={key}>{str}</p>);
	return message;
};
export const educationToMessage = (data) => {
	let message = "";
	data.forEach((data) => {
		message +=
			educationInputItemText[data?.edu_app_level].title +
			" " +
			data?.edu_app_degree +
			"\n" +
			data?.edu_app_school +
			"\n" +
			data?.edu_app_from +
			" - " +
			data?.edu_app_to +
			"\n\n";
	});
	message = message.split("\n").map((str, key) => <p key={key}>{str}</p>);
	return message;
};
