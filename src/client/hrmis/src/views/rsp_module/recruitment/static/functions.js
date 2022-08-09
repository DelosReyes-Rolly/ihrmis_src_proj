import axios from "axios";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { setRefresh } from "../../../../features/reducers/popup_response";
import { ALERT_ENUM, popupAlert } from "../../../../helpers/alert_response";
import { API_HOST } from "../../../../helpers/global/global_config";
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
      "\nㅤ\n";
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
      "\nㅤ\n";
  });
  message = message.split("\n").map((str, key) => <p key={key}>{str}</p>);
  return message;
};

export const competencyToMessage = (data) => {
  let message = "";
  let array = [];
  let converter = [];
  converter["AS"] = "Analytical Skills, ";
  converter["CW"] = "Creative Work, ";
  converter["CS"] = "Computational Skills, ";
  converter["OE"] = "Oral Exam, ";
  converter["WE"] = "Written Exam, ";
  converter["OT"] = "Other, ";
  data.forEach((data) => {
    array[data.rtg_com_type] = converter[data.rtg_com_type];
  });

  for (var key in array) {
    if (array[key] !== undefined) {
      message += array[key];
    }
  }
  return message;
};

export const competencyScore = (data) => {
  let score = 0;
  let converter = ["AS", "CW", "CS", "OE", "WE", "OT"];
  data.forEach((data) => {
    if (converter.includes(data.com_type)) {
      score += data.com_ass_score;
    }
  });
  return score;
};

export const sortCompetencyScore = (score) => {
  let data = [];
  if (score !== undefined) {
    data = [...score];
  }
  let converter = ["AS", "CW", "CS", "OE", "WE", "OT"];
  let scores = {
    AS: 0,
    AS_com_id: 0,
    CW: 0,
    CW_com_id: 0,
    CS: 0,
    CS_com_id: 0,
    OE: 0,
    OE_com_id: 0,
    WE: 0,
    WE_com_id: 0,
    OT: 0,
    OT_com_id: 0,
  };
  data?.forEach((data) => {
    if (converter.includes(data.com_type)) {
      if (data.com_type === "AS") {
        scores.AS = data.com_ass_score;
        scores.AS_com_id = data.com_ass_id;
      }
      if (data.com_type === "CW") {
        scores.CW = data.com_ass_score;
        scores.CW_com_id = data.com_ass_id;
      }
      if (data.com_type === "CS") {
        scores.CS = data.com_ass_score;
        scores.CS_com_id = data.com_ass_id;
      }
      if (data.com_type === "OE") {
        scores.OE = data.com_ass_score;
        scores.OE_com_id = data.com_ass_id;
      }
      if (data.com_type === "WE") {
        scores.WE = data.com_ass_score;
        scores.WE_com_id = data.com_ass_id;
      }
      if (data.com_type === "OT") {
        scores.OT = data.com_ass_score;
        scores.OT_com_id = data.com_ass_id;
      }
    }
  });
  return scores;
};

export const sortCompetencyRating = (jvsRating, specific) => {
  let localJvs = [];
  let localSpecific = [];
  if (jvsRating !== undefined) {
    localJvs = [...jvsRating];
  }
  if (specific !== undefined) {
    localSpecific = [...specific];
  }
  let tables = {
    analytical: [],
    creative: [],
    computational: [],
    oral: [],
    written: [],
    other: [],
  };
  const ratingType = ["AS", "CS", "CW", "OE", "WE", "OT"];
  localJvs?.forEach((data) => {
    if (ratingType.indexOf(data.rtg_com_type) !== -1) {
      let values = {
        rtg_com_type: data.rtg_com_type,
        rtg_factor: data.rtg_factor,
        rtg_percent: data.rtg_percent,
        rtg_seq_order: data.rtg_seq_order,
      };
      localSpecific.forEach((specific) => {
        if (data.rtg_com_type === specific.com_type) {
          values.specific = specific.com_specific;
          values.com_id = specific.com_ass_id;
        }
      });
      if (data.rtg_com_type === "AS") {
        tables.analytical.push(values);
      }
      if (data.rtg_com_type === "CW") {
        tables.creative.push(values);
      }
      if (data.rtg_com_type === "CS") {
        tables.computational.push(values);
      }
      if (data.rtg_com_type === "OE") {
        tables.oral.push(values);
      }
      if (data.rtg_com_type === "WE") {
        tables.written.push(values);
      }
      if (data.rtg_com_type === "OT") {
        tables.other.push(values);
      }
    }
  });
  return tables;
};

export const functions = {
  deleteDocument: async function (att_id, dispatch) {
    await axios
      .get(API_HOST + "delete-uploaded-documents/" + att_id)
      .then((response) => {
        popupAlert({
          message: "Documents were Deleted",
          type: ALERT_ENUM.success,
        });
        dispatch(setRefresh());
      })
      .catch((error) => {});
  },
};
