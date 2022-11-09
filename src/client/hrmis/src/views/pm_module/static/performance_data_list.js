//Actions

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

export const Actions = [
  { id: "1", label: <AiOutlineEdit />, action: "" },
  { id: "2", label: <AiOutlineDelete />, action: "" },
];

// MFO Table Filters

// Ratings Data
export const RatingsColumnsSample = [
  {
    mfo_id: "1",
    mfo_title:
      "Collaboration and configuration of new ICT Facilities and equipment",
    tar_ind: [
      {
        tar_ind_title:
          "High-end Router and configured by EO June with no negative feedback",
        tar_accomplishments:
          "High-end Router installed and configured by 25 June With no negative feedback",
        tar_ratings: {
          tar_rating_quality: "5",
          tar_rating_efficiency: "5",
          tar_rating_timeliness: "3",
          tar_rating_average: "4.33",
        },
        tar_remarks:
          "Lorem Ipsum dolor st amet. consectetur aap.tscjng e Nulla ,accumsan solictudin neque, sed effcitur puru arcu ut orci",
      },

      {
        tar_ind_title:
          "Sophos Intercept X fully implemented by EO June with no negative feedback",
        tar_accomplishments:
          "Sophos Intercept X tully implemented by 10 May no negatrve feedback",
        tar_ratings: {
          tar_rating_quality: "5",
          tar_rating_efficiency: "5",
          tar_rating_timeliness: "5",
          tar_rating_average: "5",
        },
        tar_remarks:
          "Lorem Ipsum dolor st amet. consectetur aap.tscjng e Nulla ,accumsan solictudin neque, sed effcitur puru arcu ut orci",
      },
    ],
  },
  {
    mfo_id: "2",
    mfo_title:
      "Collaboration and configuration of new ICT Facilities and equipment",
    tar_ind: [
      {
        tar_ind_title:
          "High-end Router and configured by EO June with no negative feedback",
        tar_accomplishments:
          "High-end Router installed and configured by 25 June With no negative feedback",
        tar_ratings: {
          tar_rating_quality: "3",
          tar_rating_efficiency: "2",
          tar_rating_timeliness: "3",
          tar_rating_average: "2.67",
        },
        tar_remarks:
          "Lorem Ipsum dolor st amet. consectetur aap.tscjng e Nulla ,accumsan solictudin neque, sed effcitur puru arcu ut orci",
      },

      {
        tar_ind_title:
          "Sophos Intercept X fully implemented by EO June with no negative feedback",
        tar_accomplishments:
          "Sophos Intercept X tully implemented by 10 May no negatrve feedback",
        tar_ratings: {
          tar_rating_quality: "4",
          tar_rating_efficiency: "3",
          tar_rating_timeliness: "3",
          tar_rating_average: "3.67",
        },
        tar_remarks:
          "Lorem Ipsum dolor st amet. consectetur aap.tscjng e Nulla ,accumsan solictudin neque, sed effcitur puru arcu ut orci",
      },
    ],
  },
];

// Commitments Data Tree
export const CommitmentsHeaderTitle = [
  { heading: "Major Final Output/s" },
  { heading: "Success Indicator" },
  { heading: "Alloted Budget" },
  { heading: "Divisions Responsible" },
  { heading: "Remarks" },
];

export const CommitmentsColumnsSample = [
  {
    mfo_id: "1",
    mfo_title:
      "Collaboration and configuration of new ICT Facilities and equipment",
    tar_ind_id: [
      {
        tar_ind_title:
          "High-end Router and configured by EO June with no negative feedback",
        tar_budget: "230,000",
        div_response: "PED-ITS",
        tar_remarks:
          "Lorem Ipsum dolor st amet. consectetur aap.tscjng e Nulla ,accumsan solictudin neque, sed effcitur puru arcu ut orci",
      },

      {
        tar_ind_title:
          "Sophos Intercept X fully implemented by EO June with no negative feedback",
        tar_budget: "160,000",
        div_response: "PED-ITS",
        tar_remarks:
          "Lorem Ipsum dolor st amet. consectetur aap.tscjng e Nulla ,accumsan solictudin neque, sed effcitur puru arcu ut orci",
      },
    ],
  },
  {
    mfo_id: "2",
    mfo_title:
      "Collaboration and configuration of new ICT Facilities and equipment",
    tar_ind_id: [
      {
        tar_ind_title:
          "High-end Router and configured by EO June with no negative feedback",
        tar_budget: "230,000",
        div_response: "PED-ITS",
        tar_remarks:
          "Lorem Ipsum dolor st amet. consectetur aap.tscjng e Nulla ,accumsan solictudin neque, sed effcitur puru arcu ut orci",
      },

      {
        tar_ind_title:
          "Sophos Intercept X fully implemented by EO June with no negative feedback",
        tar_budget: "160,000",
        div_response: "PED-ITS",
        tar_remarks:
          "Lorem Ipsum dolor st amet. consectetur aap.tscjng e Nulla ,accumsan solictudin neque, sed effcitur puru arcu ut orci",
      },

      {
        tar_ind_title:
          "Sophos Intercept X fully implemented by EO June with no negative feedback",
        tar_budget: "160,000",
        div_response: "PED-ITS",
        tar_remarks:
          "Lorem Ipsum dolor st amet. consectetur aap.tscjng e Nulla ,accumsan solictudin neque, sed effcitur puru arcu ut orci",
      },
    ],
  },
];

// MFO Table Data
export const mfoTable = [
  {
    prj_id: "1",
    prj_title:
      "Collaboration and configuration of new ICT Facilities and equipment",
    mfo_info: [
      {
        mfo_id: "1",
        mfo_title: "New ICT Facilities and equipment installed and configured",
        mfo_ind_info: [
          {
            ind_id: "1",
            ind_title:
              "High-end Router installed and configured by EO June with no negative feedback",
            ind_performance: [
              {
                performance_metric: "E",
                performance_measure: "Percentage of Completion",
                performance_target: "100%",
                performance_standard:
                  "5 - 100%, 4 - 90% - 99%, 3 - 80% - 89%, 2 - 70% - 79%, 1 - below 70%",
              },
              {
                performance_metric: "Q",
                performance_measure: "Number of Negative Responses",
                performance_target: "No negative feedback",
                performance_standard:
                  "5 - 0-1, 4 - 2-3, 3 - 4 - 6, 2 - 7 - 9, 1 - more than 9",
              },
              {
                performance_metric: "T",
                performance_measure: "As scheduled",
                performance_target: "By end of June",
                performance_standard:
                  "5 - earlier than June, 4 - within first two weeks of June, 3 - within last two weeks of June, 2 - within two weeks after June, 1 - later than two weeks after June",
              },
            ],
          },
          {
            ind_id: "2",
            ind_title:
              "High-end Router installed and configured by EO June with no negative feedback",
            ind_performance: [
              {
                performance_metric: "E",
                performance_measure: "Percentage of Completion",
                performance_target: "100%",
                performance_standard:
                  "5 - 100%, 4 - 90% - 99%, 3 - 80% - 89%, 2 - 70% - 79%, 1 - below 70%",
              },
              {
                performance_metric: "Q",
                performance_measure: "Number of Negative Responses",
                performance_target: "No negative feedback",
                performance_standard:
                  "5 - 0-1, 4 - 2-3, 3 - 4 - 6, 2 - 7 - 9, 1 - more than 9",
              },
              {
                performance_metric: "T",
                performance_measure: "As scheduled",
                performance_target: "By end of June",
                performance_standard:
                  "5 - earlier than June, 4 - within first two weeks of June, 3 - within last two weeks of June, 2 - within two weeks after June, 1 - later than two weeks after June",
              },
            ],
          },
        ],
      },
      {
        mfo_id: "2",
        mfo_title: "New ICT Facilities and equipment installed and configured",
        mfo_ind_info: [
          {
            ind_id: "1",
            ind_title:
              "High-end Router installed and configured by EO June with no negative feedback",
            ind_performance: [
              {
                performance_metric: "E",
                performance_measure: "Percentage of Completion",
                performance_target: "100%",
                performance_standard:
                  "5 - 100%, 4 - 90% - 99%, 3 - 80% - 89%, 2 - 70% - 79%, 1 - below 70%",
              },
              {
                performance_metric: "Q",
                performance_measure: "Number of Negative Responses",
                performance_target: "No negative feedback",
                performance_standard:
                  "5 - 0-1, 4 - 2-3, 3 - 4 - 6, 2 - 7 - 9, 1 - more than 9,",
              },
              {
                performance_metric: "T",
                performance_measure: "As scheduled",
                performance_target: "By end of June",
                performance_standard:
                  "5 - earlier than June, 4 - within first two weeks of June, 3 - within last two weeks of June, 2 - within two weeks after June, 1 - later than two weeks after June",
              },
            ],
          },
          {
            ind_id: "2",
            ind_title:
              "High-end Router installed and configured by EO June with no negative feedback",
            ind_performance: [
              {
                performance_metric: "E",
                performance_measure: "Percentage of Completion",
                performance_target: "100%",
                performance_standard:
                  "5 - 100%, 4 - 90% - 99%, 3 - 80% - 89%, 2 - 70% - 79%, 1 - below 70%",
              },
              {
                performance_metric: "Q",
                performance_measure: "Number of Negative Responses",
                performance_target: "No negative feedback",
                performance_standard:
                  "5 - 0-1, 4 - 2-3, 3 - 4 - 6, 2 - 7 - 9, 1 - more than 9,",
              },
              {
                performance_metric: "T",
                performance_measure: "As scheduled",
                performance_target: "By end of June",
                performance_standard:
                  "5 - earlier than June, 4 - within first two weeks of June, 3 - within last two weeks of June, 2 - within two weeks after June, 1 - later than two weeks after June",
              },
            ],
          },
        ],
      },
    ],
  },
];

//Cascaded Table
export const cascadedTable = [
  {
    prj_id: "1",
    prj_title:
      "Collaboration and configuration of new ICT Facilities and equipment",
    mfo_info: [
      {
        mfo_id: "1",
        mfo_title: "New ICT Facilities and equipment installed and configured",
        mfo_ind_info: [
          {
            ind_id: "1",
            ind_title:
              "High-end Router installed and configured by EO June with no negative feedback",
            ind_ipcr: [
              {
                ipcr_id: "1",
                ipcr_responsible: "FBBicomong",
                ipcr_mfoutput: "Draft STI policies prepared and submitted",
                ipcr_success_indicator:
                  "100% ot Draft STI Policies prepared and submitted to the Chief within the semester with at most five (5) substantive corrections.",
              },
            ],
          },
        ],
      },
      {
        mfo_id: "2",
        mfo_title: "New ICT Facilities and equipment installed and configured",
        mfo_ind_info: [
          {
            ind_id: "1",
            ind_title:
              "High-end Router installed and configured by EO June with no negative feedback",
            ind_ipcr: [
              {
                ipcr_id: "1",
                ipcr_responsible: "FBBicomong",
                ipcr_mfoutput: "Draft STI policies prepared and submitted",
                ipcr_success_indicator:
                  "100% ot Draft STI Policies prepared and submitted to the Chief within the semester with at most five (5) substantive corrections.",
              },
              {
                ipcr_id: "2",
                ipcr_responsible: "GG Hernandez",
                ipcr_mfoutput: "Draft STI policies prepared and submitted",
                ipcr_success_indicator:
                  "100% ot Draft STI Policies prepared and submitted to the Chief within the semester with at most five (5) substantive corrections.",
              },
              {
                ipcr_id: "3",
                ipcr_responsible: "Phil Atun",
                ipcr_mfoutput: "Tapos na",
                ipcr_success_indicator:
                  "Lorem ipsum dolor sit amet, consectetur",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const functionList = [
  {
    id: "1",
    title: "Core Functions",
    code: "core_functions",
  },
  {
    id: "2",
    title: "Strategic Functions",
    code: "strategic_functions",
  },
  {
    id: "3",
    title: "Support Functions",
    code: "support_functions",
  },
];

export const dateList = [
  {
    id: "1",
    title: "2022",
    code: "2022",
  },
  {
    id: "2",
    title: "2021",
    code: "2021",
  },
  {
    id: "3",
    title: "2020",
    code: "2020",
  },
  {
    id: "4",
    title: "2019",
    code: "2019",
  },
];

// Performance Filters

export const referenceList = [
  { id: "1", label: "Strategic Plan" },
  { id: "2", label: "SPMS Guide" },
];

export const periodList = [
  { id: "1", title: "2021 1st Semester", code: "2021-1stSem" },
  { id: "2", title: "2021 2nd Semester", code: "2021-2stSem" },
];

export const divisionList = [
  {
    id: "1",
    title: "Division/Unit",
    code: "division_unit",
  },
];
