import axios from "axios";
import { API_HOST, APP_HOST } from "../helpers/global/global_config";

export const printMemoOnPostingOfVp = (agencies, positions) => {
  // let string_json_data = Object.assign({}, data);
  window.open(
    API_HOST +
      "generateMemoOnPVP/" +
      JSON.stringify(agencies) +
      "/" +
      JSON.stringify(positions),
    "_tab"
  );
};

export const printMemoOnPostingOfVpForCsc = (data) => {
  // let string_json_data = Object.assign({}, data);
  window.open(API_HOST + "generateMemoOnPVPForCsc", "_tab");
};

export const printVacantPositions = () => {
  window.open(API_HOST + "generate-VpReport", "_tab");
};

export const printNoticeOfVacancy = (data) => {
  window.open(
    API_HOST + "generate-NoticeVpReport/" + JSON.stringify(data),
    "_tab"
  );
};

export const testOutsideLink = () => {
  window.open("https://www.youtube.com/watch?v=UVv8EBr5lE0", "_tab");
};

export const printNextRankMemoReport = (plantilla) => {
  window.open(API_HOST + "generate-vacant-memo-pdf/" + plantilla, "_tab");
};

export const printJvsCrwReport = async (jvs) => {
  try {
    await axios.get(API_HOST + "get-generated-pdf/" + jvs);
    window.open(API_HOST + "get-generated-pdf/" + jvs, "_tab");
  } catch (error) {
    throw error;
  }
};

export const navigateResourceOnbording = () => {
  window.open(APP_HOST + "welcome_aboard", "_tab");
};

export const outsiteWebHelper = (link) => {
  window.open(link, "_tab");
};
