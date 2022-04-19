import { createSlice } from "@reduxjs/toolkit";
import { bubbleSort } from "../../helpers/bubble_sort_helper";

const TYPE = [
  "com_education",
  "com_writtenExam",
  "com_computationSKills",
  "com_oralExam",
  "com_creativeWork",
  "com_analyticalSkills",
  "com_training",
  "com_others",
  "com_experience",
];

const jvscrwSlice = createSlice({
  name: "jvsform",

  initialState: {
    minimum_req: "",
    version_selected: "",
    plantilla_item: "",

    office: {
      ofc_name: "",
      ofc_head: "",
    },
    position: {
      title: "",
      salary_grade: "",
    },
    eligibility: {
      std_quantity: "",
      std_keyword: "",
      std_specifics: "",
    },
    education: {
      std_quantity: "",
      std_keyword: "",
      std_specifics: "",
    },
    experience: {
      std_quantity: "",
      std_keyword: "",
      std_specifics: "",
    },
    training: {
      std_quantity: "",
      std_keyword: "",
      std_specifics: "",
    },
    competencies: {
      com_education: {},
      com_writtenExam: {},
      com_computationSKills: {},
      com_oralExam: {},
      com_creativeWork: {},
      com_analyticalSkills: {},
      com_training: {},
      com_others: {},
      com_experience: {},
    },
    remarksImg: {
      prepName: null,
      appName: null,
      preparedBy: null,
      approvedBy: null,
    },
    refresh: false,

    isEmptyCompetency: [],

    dtyResContainer: [],

    totalMinMaxData: {
      min: 0,
      max: 0,
      total: 0,
    },
  },

  reducers: {
    setPlantilla: (state, action) => {
      state.plantilla_item = action.payload;
    },
    setOffice: (state, action) => {
      let { ofc_name, ofc_head } = action.payload;
      state.office = {
        ofc_name: ofc_name,
        ofc_head: ofc_head,
      };
    },
    setPosition: (state, action) => {
      let { title, salary_grade } = action.payload;
      state.position = {
        title: title,
        salary_grade: salary_grade,
      };
    },
    setEligibility: (state, action) => {
      let { std_quantity, std_keyword, std_specifics } = action.payload;
      state.eligibility = {
        std_quantity: std_quantity,
        std_keyword: std_keyword,
        std_specifics: std_specifics,
      };
    },
    setEducation: (state, action) => {
      let { std_quantity, std_keyword, std_specifics } = action.payload;
      state.education = {
        std_quantity: std_quantity,
        std_keyword: std_keyword,
        std_specifics: std_specifics,
      };
    },
    setWorkExp: (state, action) => {
      let { std_quantity, std_keyword, std_specifics } = action.payload;
      state.experience = {
        std_quantity: std_quantity,
        std_keyword: std_keyword,
        std_specifics: std_specifics,
      };
    },
    setTraining: (state, action) => {
      let { std_quantity, std_keyword, std_specifics } = action.payload;
      state.training = {
        std_quantity: std_quantity,
        std_keyword: std_keyword,
        std_specifics: std_specifics,
      };
    },
    setCompetencies: (state, action) => {
      let {
        com_education,
        com_writtenExam,
        com_computationSKills,
        com_oralExam,
        com_creativeWork,
        com_analyticalSkills,
        com_training,
        com_others,
        com_experience,
      } = action.payload;

      state.competencies = {
        com_education,
        com_writtenExam,
        com_computationSKills,
        com_oralExam,
        com_creativeWork,
        com_analyticalSkills,
        com_training,
        com_others,
        com_experience,
      };

      jvscrwSlice.caseReducers.setTotalWeight(state);
    },
    addCompetency(state, action) {
      let { rtg_com_type } = action.payload;

      const competenciesStateStructure = (state, com_type, action) => {
        const {
          rtg_factor,
          rtg_com_type,
          rtg_id,
          rtg_seq_order,
          rtg_percent,
          com_specific,
        } = action.payload;

        if (rtg_seq_order === 1) {
          return {
            ...state.competencies,
            [com_type]: {
              com_jvs_id: rtg_id,
              com_specific: com_specific,
              com_type: rtg_com_type,
              tbl_com_type: [
                {
                  rtg_factor,
                  rtg_com_type,
                  rtg_id,
                  rtg_seq_order,
                  rtg_percent,
                },
              ],
            },
          };
        } else {
          return {
            ...state.competencies,
            [com_type]: {
              ...state.competencies[com_type],
              com_specific: com_specific,
              tbl_com_type: [
                ...state.competencies[com_type].tbl_com_type,
                {
                  rtg_factor,
                  rtg_com_type,
                  rtg_id,
                  rtg_seq_order,
                  rtg_percent,
                },
              ],
            },
          };
        }
      };

      if (rtg_com_type === "ED") {
        state.competencies = competenciesStateStructure(state, TYPE[0], action);
      } else if (rtg_com_type === "WE") {
        state.competencies = competenciesStateStructure(state, TYPE[1], action);
      } else if (rtg_com_type === "CS") {
        state.competencies = competenciesStateStructure(state, TYPE[2], action);
      } else if (rtg_com_type === "OE") {
        state.competencies = competenciesStateStructure(state, TYPE[3], action);
      } else if (rtg_com_type === "CW") {
        state.competencies = competenciesStateStructure(state, TYPE[4], action);
      } else if (rtg_com_type === "AS") {
        state.competencies = competenciesStateStructure(state, TYPE[5], action);
      } else if (rtg_com_type === "TR") {
        state.competencies = competenciesStateStructure(state, TYPE[6], action);
      } else if (rtg_com_type === "OT") {
        state.competencies = competenciesStateStructure(state, TYPE[7], action);
      } else if (rtg_com_type === "EX") {
        state.competencies = competenciesStateStructure(state, TYPE[8], action);
      }

      jvscrwSlice.caseReducers.setTotalWeight(state);
    },
    removeCompetency(state, action) {
      let { rtg_com_type } = action.payload;
      const competenciesStateStructure = (state, com_type, action) => {
        return {
          ...state.competencies,
          [com_type]: {
            ...state.competencies[com_type],
            tbl_com_type: [
              ...state.competencies[com_type].tbl_com_type.filter(
                (comp) => comp.rtg_seq_order !== action.payload.order
              ),
            ],
          },
        };
      };

      if (rtg_com_type === "ED") {
        state.competencies = competenciesStateStructure(state, TYPE[0], action);
      } else if (rtg_com_type === "WE") {
        state.competencies = competenciesStateStructure(state, TYPE[1], action);
      } else if (rtg_com_type === "CS") {
        state.competencies = competenciesStateStructure(state, TYPE[2], action);
      } else if (rtg_com_type === "OE") {
        state.competencies = competenciesStateStructure(state, TYPE[3], action);
      } else if (rtg_com_type === "CW") {
        state.competencies = competenciesStateStructure(state, TYPE[4], action);
      } else if (rtg_com_type === "AS") {
        state.competencies = competenciesStateStructure(state, TYPE[5], action);
      } else if (rtg_com_type === "TR") {
        state.competencies = competenciesStateStructure(state, TYPE[6], action);
      } else if (rtg_com_type === "OT") {
        state.competencies = competenciesStateStructure(state, TYPE[7], action);
      } else if (rtg_com_type === "EX") {
        state.competencies = competenciesStateStructure(state, TYPE[8], action);
      }

      jvscrwSlice.caseReducers.setTotalWeight(state);
    },
    editCompetency(state, action) {
      let { rtg_com_type } = action.payload;

      const competenciesStateStructure = (state, com_type, action) => {
        return {
          ...state.competencies,
          [com_type]: {
            ...state.competencies[com_type],
            com_specific: action.payload.com_specific,
            tbl_com_type: [
              ...state.competencies[com_type].tbl_com_type.map((comp) =>
                comp.rtg_seq_order === action.payload.rtg_seq_order
                  ? Object.assign({}, action.payload)
                  : comp
              ),
            ],
          },
        };
      };

      if (rtg_com_type === "ED") {
        state.competencies = competenciesStateStructure(state, TYPE[0], action);
      } else if (rtg_com_type === "WE") {
        state.competencies = competenciesStateStructure(state, TYPE[1], action);
      } else if (rtg_com_type === "CS") {
        state.competencies = competenciesStateStructure(state, TYPE[2], action);
      } else if (rtg_com_type === "OE") {
        state.competencies = competenciesStateStructure(state, TYPE[3], action);
      } else if (rtg_com_type === "CW") {
        state.competencies = competenciesStateStructure(state, TYPE[4], action);
      } else if (rtg_com_type === "AS") {
        state.competencies = competenciesStateStructure(state, TYPE[5], action);
      } else if (rtg_com_type === "TR") {
        state.competencies = competenciesStateStructure(state, TYPE[6], action);
      } else if (rtg_com_type === "OT") {
        state.competencies = competenciesStateStructure(state, TYPE[7], action);
      } else if (rtg_com_type === "EX") {
        state.competencies = competenciesStateStructure(state, TYPE[8], action);
      }

      jvscrwSlice.caseReducers.setTotalWeight(state);
    },
    setRefreh: (state) => {
      state.refresh = !state.refresh;
    },
    setIsEmptyCompetency: (state, action) => {
      let { payload } = action;
      state.isEmptyCompetency = { ...payload };
    },
    setDutyResponsibility: (state, action) => {
      let dataArray = [];
      action.payload.forEach((element, key) => {
        dataArray = [
          ...dataArray,
          { id: parseInt(key) + 1, description: element.dty_jvs_desc },
        ];
      });
      state.dtyResContainer = [...dataArray];
    },
    resetOrder: (state, action) => {
      state.dtyResContainer = [...action.payload];
    },
    addDutyResponsibility: (state, action) => {
      let { payload } = action;
      state.dtyResContainer = [...state.dtyResContainer, payload];
    },
    removeDutyResponsibility: (state, action) => {
      let { payload } = action;
      state.dtyResContainer = [
        ...state.dtyResContainer.filter((item) => item.id !== payload),
      ];
    },
    setRemarksImg: (state, action) => {
      const { key, value } = action.payload;
      state.remarksImg = { ...state.remarksImg, [key]: value };
    },

    setTotalWeight: (state) => {
      const {
        com_education,
        com_analyticalSkills,
        com_computationSKills,
        com_creativeWork,
        com_experience,
        com_oralExam,
        com_others,
        com_training,
        com_writtenExam,
      } = state.competencies;

      let arrayData = [
        com_education.tbl_com_type,
        com_analyticalSkills.tbl_com_type,
        com_computationSKills.tbl_com_type,
        com_creativeWork.tbl_com_type,
        com_experience.tbl_com_type,
        com_oralExam.tbl_com_type,
        com_others.tbl_com_type,
        com_training.tbl_com_type,
        com_writtenExam.tbl_com_type,
      ];

      let max = 0;
      let min = 0;
      let length = 0;
      let totalArray = [];

      arrayData.forEach((element, i, arr) => {
        let arraHolder = [];

        if (element !== undefined) {
          element?.forEach((arrData) => {
            arraHolder.push(parseInt(arrData.rtg_percent));
          });

          arraHolder = bubbleSort(arraHolder);

          if (arraHolder.length !== 0) {
            totalArray.push(arraHolder);
            length++;
            max += arraHolder[arraHolder.length - 1];
            min += arraHolder[0];
          }
        }
      });
      let totalLength = 0;
      let totalValue = 0;
      totalArray.forEach((element) => {
        element?.forEach((arr) => {
          totalLength++;
          totalValue += arr;
        });
      });

      state.totalMinMaxData = {
        ...state.totalMinMaxData,
        max: parseFloat((max / length).toFixed(2)),
        min: parseFloat((min / length).toFixed(2)),
        total: parseFloat((totalValue / totalLength).toFixed(2)),
      };
    },

    setRatingFactor: (state, action) => {
      const { skills, com_specific, com_type, com_jvs_id } = action.payload;
      state.competencies = {
        ...state.competencies,
        [skills]: {
          ...state.competencies[skills],
          com_jvs_id,
          com_type,
          com_specific,
        },
      };
    },
    setMinimumRequirement: (state, action) => {
      state.minimum_req = action.payload;
    },
    setVersionSelected: (state, action) => {
      state.version_selected = action.payload;
    },
  },
});

export const {
  setMinimumRequirement,
  setEligibility,
  setEducation,
  setWorkExp,
  setTraining,
  setOffice,
  setPlantilla,
  setPosition,
  setCompetencies,
  setRefreh,
  setIsEmptyCompetency,
  setDutyResponsibility,
  resetOrder,
  addDutyResponsibility,
  removeDutyResponsibility,
  setRemarksImg,
  addCompetency,
  removeCompetency,
  editCompetency,
  setTotalWeight,
  setRatingFactor,
  setVersionSelected,
} = jvscrwSlice.actions;

export default jvscrwSlice.reducer;
