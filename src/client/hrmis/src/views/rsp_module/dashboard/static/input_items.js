import axios from "axios";
import { API_HOST } from "../../../../helpers/global/global_config";
const getOffices = () => {
  let offices = [];
  axios
    .get(API_HOST + "office")
    .then((response) => {
      response.data.data.map((data) => {
        let obj = {};
        obj["id"] = data.ofc_id;
        obj["title"] = data.ofc_acronym;
        offices.push(obj);
      });
    })
    .catch((error) => {});
  return offices;
};

export const apiModelgetPositions = async (ofc_id) => {
  let positions = [];
  await axios
    .get(API_HOST + "plantilla-positions/" + ofc_id)
    .then((response) => {
      response.data.data.forEach((data) => {
        let obj = {};
        obj["id"] = data.itm_id;
        obj["title"] = data.pos_title;
        positions.push(obj);
      });
    })
    .catch((error) => {});
  return positions;
};

export const apiModelgetPosition = () => {
  let positions = [];
  axios
    .get(API_HOST + "plantilla-positions")
    .then((response) => {
      response.data.data.forEach((data) => {
        let obj = {
          id: data.itm_id,
          title: data.pos_title,
        };
        positions.push(obj);
      });
    })
    .catch((error) => {});
  return positions;
};

export const apiModelOfficeType = [
  {
    id: 1,
    title: "DOST-CO",
  },
  {
    id: 2,
    title: "DOST RO/PSTC",
  },
  {
    id: 3,
    title: "DOST Attached Agency",
  },
  {
    id: 4,
    title: "Constitutional Bodies",
  },
  {
    id: 5,
    title: "NGA",
  },
  {
    id: 6,
    title: "GOCC",
  },
  {
    id: 7,
    title: "LGU",
  },
  {
    id: 8,
    title: "SUC",
  },
  {
    id: 9,
    title: "PUC",
  },
  {
    id: 10,
    title: "NGO",
  },
  {
    id: 11,
    title: "Private Agency",
  },
  {
    id: 12,
    title: "Others",
  },
];
export const apiModelOfficeAreaType = [
  {
    id: "R",
    title: "Region",
  },
  {
    id: "P",
    title: "Province",
  },
  {
    id: "D",
    title: "District",
  },
  {
    id: "M",
    title: "Munincipality",
  },
  {
    id: "F",
    title: "Foreign Post",
  },
];
export const apiModelOffices = getOffices();

export const apiGetPositions = apiModelgetPosition();
