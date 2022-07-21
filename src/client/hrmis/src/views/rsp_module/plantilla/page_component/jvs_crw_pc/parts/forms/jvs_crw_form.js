import axios from "axios";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dostLogo from "../../../../../../../assets/images/logo.png";
import { API_HOST } from "../../../../../../../helpers/global/global_config";
import ButtonComponent from "../../../../../../common/button_component/button_component.js";
import CompetencyTable, { COMPETENCY_ENUMS } from "./competency_table";

const JvsCrwFormPage = () => {
  const [plantilla, setPlantilla] = useState();
  const { item } = useParams();
  const { education, experience, training } = useSelector(
    (state) => state.jvscrwForm
  );

  /**
   * All use memo
   */
  const plantillaDetail = useMemo(() => plantilla, [plantilla]);
  const educationDetail = useMemo(() => education, [education]);
  const experienceDetail = useMemo(() => experience, [experience]);
  const trainingDetail = useMemo(() => training, [training]);

  /**
   * For Fetching plantilla no, csc qualification and postion data
   */
  const fetchPositionCscDetail = async () => {
    await axios
      .get(API_HOST + "pos-csc-plantilla/" + item)
      .then((res) => setPlantilla(plotPlantillaOfficePosition(res.data.data)))
      .catch((err) => console.log(err?.message));
  };

  /**
   * For Fetching all comptencies and ratings data
   */
  // const fetchCompetencies = async () => {};

  useEffect(() => {
    fetchPositionCscDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {console.log("RENDER MAIN: ")}
      <div className="jvs-form-page">
        <div className="jvs-header">
          <img src={dostLogo} width="50px" height="50px" alt="dost-logo" />
          <h3>Department of Science and Technology</h3>
          <p>General Santos Avenue, Bicutan, Taguig City</p> <br />
          <h2 style={{ marginTop: "30px" }}>
            JOB VACANCY SPECIFICATION & CRITERIA RATING FORM
          </h2>
        </div>
        {/* ======================================================================== */}
        <div className="jvs-version-drop-down">
          <div>Version</div>
          <div>
            <select className="jvs-select-version">
              <option>Hello World</option>
              <option>Hi There</option>
            </select>
          </div>
          <div>
            <ButtonComponent buttonName="New" />
          </div>
        </div>
        {/* ======================================================================== */}
        <PositionTableView plantilla={plantillaDetail} />
        {/* ======================================================================== */}
        <CompetencyTable
          title="EDUCATION"
          RTG_TYPE={COMPETENCY_ENUMS.EDUCATION}
          detail={educationDetail.competencies}
        />
        <CompetencyTable
          title="RELEVANT TRAINING"
          RTG_TYPE={COMPETENCY_ENUMS.TRAINING}
          detail={trainingDetail.competencies}
        />
        <CompetencyTable
          title="RELEVANT EXPERIENCE"
          RTG_TYPE={COMPETENCY_ENUMS.EXPERIENCE}
          detail={experienceDetail.competencies}
        />
      </div>
    </React.Fragment>
  );
};

export default memo(JvsCrwFormPage);

const PositionTableView = memo(({ plantilla }) => {
  return (
    <React.Fragment>
      {console.log("RENDER POS TABLE: ")}
      <div className="jvs-container">
        <table className="table-position">
          <tbody>
            <tr className="header-one">
              <td colSpan="2">JOB POSITION</td>
            </tr>
            <tr className="header-two">
              <td className="td-with">POSITION TITLE</td>
              <td>PLANTILLA ITEM NO.</td>
            </tr>
            <tr>
              <td>{plantilla?.title}</td>
              <td>{plantilla?.itm_no}</td>
            </tr>
            <tr className="header-two">
              <td>OFFICE/UNIT</td>
              <td>PLACE OF ASSIGNMENT</td>
            </tr>
            <tr>
              <td>
                {plantilla?.ofc_head_ofc && <p>{plantilla?.ofc_head_ofc},</p>}
                {plantilla?.ofc_name}
              </td>
              <td>{plantilla?.ofc_name}</td>
            </tr>
            <tr className="header-two">
              <td>REPORTS TO</td>
              <td>SALARY GRADE</td>
            </tr>
            <tr>
              <td>{plantilla?.ofc_head}</td>
              <td>{plantilla?.salary_grade}</td>
            </tr>
            <tr className="header-one">
              <td colSpan="2">CSC QUALIFICATION STANDARDS</td>
            </tr>
            <tr className="header-two">
              <td colSpan="2">ELIGIBILITY</td>
            </tr>
            <tr>
              <td colSpan="2">{plantilla?.eligibility}</td>
            </tr>
            <tr className="header-two">
              <td colSpan="2">EDUCATION</td>
            </tr>
            <tr>
              <td colSpan="2">{plantilla?.education}</td>
            </tr>
            <tr className="header-two">
              <td colSpan="2">EXPERIENCE</td>
            </tr>
            <tr>
              <td colSpan="2">{plantilla?.experience}</td>
            </tr>
            <tr className="header-two">
              <td colSpan="2">TRAINING</td>
            </tr>

            <tr>
              <td colSpan="2">{plantilla?.training}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
});

/**
 * PlotPLantillaOfficePosition
 * Use to plot specific data from collection of data related to the plantilla
 * @param {Object} plantilla
 * @returns
 */
const plotPlantillaOfficePosition = (plantilla) => {
  return {
    itm_no: plantilla?.itm_no,
    // Office
    ofc_name: plantilla?.office?.ofc_name,
    ofc_head: plantilla?.office?.ofc_head,
    ofc_head_ofc: plantilla?.office?.ofc_head_ofc,
    // Possition
    title: plantilla?.position?.title,
    salary_grade: plantilla?.position?.salary_grade,
    // CSC
    education: plantilla?.position?.education,
    eligibility: plantilla?.position?.eligibility,
    training: plantilla?.position?.training,
    experience: plantilla?.position?.experience,
  };
};
