import TextAreaComponent from "../../../../../../common/input_component/textarea_input_component/textarea_input_component";
import dostLogo from "../../../../../../../assets/images/logo.png";
import { jvsCrwTableData } from "../../../../fake_data/table_data";
import WeightingTable from "../weight_table";
import React, { useEffect, useState } from "react";
import CheckJobCompetency from "../check_job_competency";
import RemarksForm from "../remarks_form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_HOST } from "../../../../../../../helpers/global/global_config";
import {
  setCompetencies,
  setDutyResponsibility,
  setEducation,
  setEligibility,
  setIsEmptyCompetency,
  setOffice,
  setPlantilla,
  setPosition,
  setTotalWeight,
  setTraining,
  setWorkExp,
} from "../../../../../../../features/reducers/jvscrw_slice";
import { setBusy } from "../../../../../../../features/reducers/popup_response";
import DutiesResponsibilityTable from "../duties_responsibility_table";
import { bubbleSort } from "../../../../../../../helpers/bubble_sort_helper";

// TODO: change jvsId to actual value

const JvsFormOne = ({ itemId }) => {
  const [dataState, _] = useState(jvsCrwTableData);

  // REDUX FUNCTIONALITIES
  const {
    plantilla_item,
    position,
    office,
    eligibility,
    education,
    training,
    experience,
    competencies,
  } = useSelector((state) => state.jvsform);
  const dispatch = useDispatch();

  // FETCH COMPETENCY TYPES
  const fetchCscQualificationOnLoad = async () => {
    dispatch(setBusy(true));
    await axios.get(API_HOST + "jvscrw/1").then((res) => {
      dispatch(setPlantilla(res.data.data.itm_no));
      dispatch(setPosition(res.data.data.position));
      dispatch(setOffice(res.data.data.office));
      const cscQualification = res.data.data.position.csc_standards;
      cscQualification.forEach((element) => {
        if (element.std_type === "CS") {
          dispatch(setEligibility(element));
        } else if (element.std_type === "ED") {
          dispatch(setEducation(element));
        } else if (element.std_type === "EX") {
          dispatch(setWorkExp(element));
        } else if (element.std_type === "TR") {
          dispatch(setTraining(element));
        }
      });
    });
    dispatch(setBusy(false));
  };

  const fetchJvsDutiesResponsibityOnLoad = async () => {
    await axios
      .get(API_HOST + "jvscrw-duty-responsibility/1")
      .then((res) => {
        dispatch(setDutyResponsibility(res.data.data));
      })
      .catch((err) => console.log(err.message));

    dispatch(setTotalWeight());
  };

  //COMPETENCY RATING RECORDS
  const valueEmptyRating = (isEmpty, element) => {
    return {
      ...isEmpty,
      [element["com_type"]]: element["tbl_com_type"].length > 0,
    };
  };

  const fetchCompetenciesOnLoad = async () => {
    await axios
      .get(API_HOST + "jvscrw-rating/1")
      .then((res) => {
        let data = res.data.data;
        let com_education = {},
          com_writtenExam = {},
          com_computationSKills = {},
          com_oralExam = {},
          com_creativeWork = {},
          com_analyticalSkills = {},
          com_training = {},
          com_others = {},
          com_experience = {};
        let isEmpty = {};
        data.forEach((element) => {
          if (element["com_type"] === "ED") {
            com_education = element ?? [];
            isEmpty = valueEmptyRating(isEmpty, element);
          } else if (element["com_type"] === "WE") {
            com_writtenExam = element ?? [];
            isEmpty = valueEmptyRating(isEmpty, element);
          } else if (element["com_type"] === "CS") {
            com_computationSKills = element ?? [];
            isEmpty = valueEmptyRating(isEmpty, element);
          } else if (element["com_type"] === "OE") {
            com_oralExam = element ?? [];
            isEmpty = valueEmptyRating(isEmpty, element);
          } else if (element["com_type"] === "CW") {
            com_creativeWork = element ?? [];
            isEmpty = valueEmptyRating(isEmpty, element);
          } else if (element["com_type"] === "AS") {
            com_analyticalSkills = element ?? [];
            isEmpty = valueEmptyRating(isEmpty, element);
          } else if (element["com_type"] === "TR") {
            com_training = element ?? [];
            isEmpty = valueEmptyRating(isEmpty, element);
          } else if (element["com_type"] === "OT") {
            com_others = element ?? [];
            isEmpty = valueEmptyRating(isEmpty, element);
          } else if (element["com_type"] === "EX") {
            com_experience = element ?? [];
            isEmpty = valueEmptyRating(isEmpty, element);
          }
        });
        dispatch(setIsEmptyCompetency(isEmpty));

        dispatch(
          setCompetencies({
            com_education,
            com_writtenExam,
            com_computationSKills,
            com_oralExam,
            com_creativeWork,
            com_analyticalSkills,
            com_training,
            com_others,
            com_experience,
          })
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchJvsDutiesResponsibityOnLoad();
    fetchCscQualificationOnLoad();
    fetchCompetenciesOnLoad();
  }, []);

  return (
    <React.Fragment>
      <div className="form-header">
        <br />
        <img src={dostLogo} width="50px" height="50px" alt="dost-logo" />
        <h3>Department of Science and Technology</h3>
        <p>General Santos Avenue, Bicutan Taguig City</p> <br />
        <br />
        <h2>JOB VACANCY SPECIFICATION & CRITERIA RATING FORM</h2>
      </div>
      <br />
      <br />
      <br />
      <div className="version-dropdown">
        <span>Version</span>
        <span className="margin-left-1">
          <select defaultValue={"DEFAULT"} className="select-version">
            <option value="DEFAULT" disabled>
              Select version
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </span>
      </div>
      <br />
      {/* TABLE DESIGN VIEW STARTS HERE  */}
      <div className="jvs-crw-main-table">
        <table id="custom-table">
          <thead>
            {/* ====================================================================*/}
            <tr className="main-headers">
              <th style={{ textAlign: "center" }} colSpan="4">
                JOB POSITION
              </th>
            </tr>
            {/* FIRST HEADER  */}
          </thead>
          <tbody>
            <tr className="secondary-headers">
              <th className="row-percent-50" colSpan="2">
                POSITION TITLE
              </th>
              <th className="row-percent-50" colSpan="2">
                PLANTILLA ITEM NO.
              </th>
            </tr>
            <tr>
              <td className="row-percent-50" colSpan="2">
                {position?.title}
              </td>
              <td className="row-percent-50" colSpan="2">
                {plantilla_item}
              </td>
            </tr>
            {/* SECOND HEADER  */}
            <tr className="secondary-headers">
              <th className="row-percent-50" colSpan="2">
                OFFICE/UNIT
              </th>
              <th className="row-percent-50" colSpan="2">
                PLACE OF ASSIGNMENT
              </th>
            </tr>
            <tr>
              <td className="row-percent-50" colSpan="2">
                {office?.ofc_name}
              </td>
              <td className="row-percent-50" colSpan="2">
                {dataState.jobDescription.placeOfAssignment}
              </td>
            </tr>
            {/* THIRD HEADER  */}
            <tr className="secondary-headers">
              <th className="row-percent-50" colSpan="2">
                REPORTS TO
              </th>
              <th className="row-percent-50" colSpan="2">
                SALARY GRADE
              </th>
            </tr>
            <tr>
              <td className="row-percent-50" colSpan="2">
                {dataState.jobDescription.reportsTo}
              </td>
              <td className="row-percent-50" colSpan="2">
                {position?.salary_grade}
              </td>
            </tr>
          </tbody>
          {/* ====================================================================*/}
          {/* CSC QUALIFICATION STANDARDS STARTS HERE  */}
          <tbody>
            <tr className="main-headers">
              <th style={{ textAlign: "center" }} colSpan="4">
                CSC QUALIFICATION STANDARDS
              </th>
            </tr>
            {/* FIRST HEADER  */}
            <tr className="secondary-headers">
              <th colSpan="4">ELIGIBILITY</th>
            </tr>
            <tr>
              <td colSpan="4">{eligibility?.std_specifics}</td>
            </tr>
            {/* SECOND HEADER  */}
            <tr className="row-percent-75x secondary-headers">
              <th colSpan="3">EDUCATION</th>
            </tr>
            <tr>
              <td colSpan="3">{education?.std_specifics}</td>
            </tr>
            {/* THIRD HEADER  */}
            <tr className="secondary-headers">
              <th colSpan="3">EXPERIENCE</th>
            </tr>
            <tr>
              <td colSpan="3">{experience?.std_specifics}</td>
            </tr>
            {/* FOURTH HEADER  */}
            <tr className="secondary-headers">
              <th colSpan="3">TRAINING</th>
            </tr>
            <tr>
              <td colSpan="3">{training?.std_specifics}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />

      <WeightingTable
        title="EDUCATION"
        type="ED"
        jvsId="1"
        data={competencies.com_education.tbl_com_type}
      />
      <br />
      <WeightingTable
        title="RELEVANT TRAINING"
        type="TR"
        jvsId="1"
        data={competencies.com_training.tbl_com_type}
      />
      <br />
      <WeightingTable
        title="RELEVANT EXPERIENCE"
        type="EX"
        jvsId="1"
        data={competencies.com_experience.tbl_com_type}
      />
      <br />
      {/*REQUIRED JOB COMPETENCY */}
      <h3 style={{ color: "#4276A4", fontSize: "14px", marginBottom: "6px" }}>
        REQUIRED JOB COMPETENCY
      </h3>
      <div style={{ marginBottom: "5px" }}>
        <TextAreaComponent row="2" />
      </div>
      <span
        style={{ color: "#4276A4", fontSize: "12px", fontWeight: "normal" }}
      >
        (Please check all that apply)
      </span>
      <CheckJobCompetency
        title="Written Exam"
        type="WE"
        jvsId="1"
        data={competencies.com_writtenExam}
      />
      <CheckJobCompetency
        title="Oral Exam"
        type="OE"
        jvsId="1"
        data={competencies.com_oralExam}
      />
      <CheckJobCompetency
        title="Creative Work"
        type="CW"
        jvsId="1"
        data={competencies.com_creativeWork}
      />
      <CheckJobCompetency
        title="Analytical Skills"
        type="AS"
        jvsId="1"
        data={competencies.com_analyticalSkills}
      />
      <CheckJobCompetency
        title="Computation Skills"
        type="CS"
        jvsId="1"
        data={competencies.com_computationSKills}
      />
      <CheckJobCompetency
        title="Others"
        type="OT"
        jvsId="1"
        data={competencies.com_others}
      />
      <br />
      <br />
      <TotalCalculation />
      <br />
      <br />
      <DutiesResponsibilityTable jvsId="1" />
      <br />
      <br />
      <RemarksForm jvsId="1" />
      <br />
      <br />
    </React.Fragment>
  );
};

export default JvsFormOne;

const TotalCalculation = () => {
  const { totalMinMaxData } = useSelector((state) => state.jvsform);

  return (
    <React.Fragment>
      <div className="scoring-div">
        <div>
          <h6
            style={{ color: "#4276A4", fontSize: "14px", marginBottom: "6px" }}
          >
            Total Minimum Factor Weight (%):
            <span>
              <strong>{totalMinMaxData?.min ?? 0}</strong>
            </span>
          </h6>
        </div>
        <div>
          <h6
            style={{ color: "#4276A4", fontSize: "14px", marginBottom: "6px" }}
          >
            Total Maximum Factor Weight (%):
            <span>
              <strong>{totalMinMaxData?.max ?? 0}</strong>
            </span>
          </h6>
        </div>
      </div>
      <div className="scoring-div">
        <div>
          <h6>
            TOTAL OVERALL FACTOR WEIGHT (%):
            <span>
              <strong>{totalMinMaxData?.total}</strong>
            </span>
          </h6>
        </div>
      </div>
    </React.Fragment>
  );
};
