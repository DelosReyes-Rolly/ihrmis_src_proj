import { API_HOST } from "../helpers/global/global_config";

export const printMemoOnPostingOfVpForDost = () => {
	window.open(API_HOST + "generate-MemoOnPostingVPForDost", "_tab");
};

export const printMemoOnPostingOfVpForCsc = () => {
	window.open(API_HOST + "generate-MemoOnPostingVPForCsc", "_tab");
};

export const printVacantPositions = () => {
	window.open(API_HOST + "generate-VpReport", "_tab");
};

export const printNoticeOFVacany = () => {
	window.open(API_HOST + "generate-NoticeVpReport", "_tab");
};
