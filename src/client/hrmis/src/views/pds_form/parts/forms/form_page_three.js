import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setBusy } from "../../../../features/reducers/popup_response";
import { API_HOST } from "../../../../helpers/global/global_config";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import { useToggleHelper } from "../../../../helpers/use_hooks/toggle_helper";
import ButtonComponent from "../../../common/button_component/button_component.js";
import { MdAdd } from "react-icons/md";
import ThreeAddEducationModal from "../add_modals/three_add_educ";
import { formThreeInput } from "../../static/input_items";
import ThreeAddVoluntrayWorkModal from "../add_modals/three_add_voluntary";
import ThreeAddCivilServiceModal from "../add_modals/three_add_csc";
import ThreeAddWorkExperienceModal from "../add_modals/three_add_workexp";
import ThreeAddInterventionModal from "../add_modals/three_add_intervention";
import PrevNextSubButtons from "../prev_next_sub_buttons";
import DostHeader from "../dost_header";
import {
  setMessageError,
  setObjectError,
} from "../../../../features/reducers/error_handler_slice";
import { useScrollToTop } from "../../../../helpers/use_hooks/useScollTop";

const FormPageThree = () => {
  useScrollToTop();
  let navigate = useNavigate();
  let { item } = useParams();

  return (
    <React.Fragment>
      <div className="pds-profile-main-view">
        <DostHeader />
        <br />
        <TableOne />
        <br />
        <br />
        <TableTwo />
        <br />
        <br />
        <TableThree />
        <br />
        <br />
        <TableFour />
        <br />
        <br />
        <TableFive />
        <div className="buttons-pos-right">
          <PrevNextSubButtons
            page={3}
            onClickBack={() =>
              navigate(`/ihrmis/pds-applicant/form-page-two/${item}`)
            }
            onClickNext={() =>
              navigate(`/ihrmis/pds-applicant/form-page-four/${item}`)
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const TableOne = () => {
  // ===========================================
  // CUSTOM HOOK SERVICE
  // ===========================================
  const { renderFail, renderSuccess } = usePopUpHelper();
  let [showData, setShowData] = useToggleHelper(false);

  // ===========================================
  // REACT ROUTER FUNCTIONALITY
  // ===========================================
  const { item } = useParams();

  // ===========================================
  // REDUX TOOLKIT FUNCTIONALITY
  // ===========================================
  const dispatch = useDispatch();

  const onCloseClearError = () => {
    dispatch(setMessageError(undefined));
    dispatch(setObjectError({}));
  };

  // ===========================================
  // GET ALL EDUCATION RECORD HTTP REQUEST
  // ===========================================
  const [educationRecord, setEducationRecord] = useState([]);
  const getEducationRecord = async () => {
    await axios
      .get(API_HOST + `new-education/${item}`)
      .then((response) => {
        setEducationRecord(response.data.data);
      })
      .catch((error) => {});
  };

  // ===========================================
  // REMOVE EDUCATION RECORD HTTP REQUEST
  // ===========================================
  const [dataContainer, setDataContainer] = useState(null);
  const removeEducationRecord = async (record) => {
    dispatch(setBusy(true));
    await axios
      .delete(API_HOST + `new-education/${record}`)
      .then(() => {
        renderSuccess();
      })
      .catch(() => renderFail());
    dispatch(setBusy(false));
  };

  // ===========================================
  // FOR EDUCATION INIT STATE RENDER AND TOOGLE UPDATE HANDLER
  // ===========================================
  let [toogle, setToggle] = useState({
    addModal: false,
    updateModal: false,
  });

  const toggleSetter = (name) => {
    setToggle({ ...toogle, [name]: !toogle[name] });
  };

  useEffect(() => {
    getEducationRecord();
  }, [toogle]);

  return (
    <React.Fragment>
      {/* 
          // ===========================================
          // MODAL FOR ADDING EDUCATION RECORDS
          // ===========================================
      */}
      <ThreeAddEducationModal
        isDisplay={toogle.addModal}
        onClose={() => {
          toggleSetter("addModal");
          onCloseClearError();
        }}
      />
      {/* 
          // ===========================================
          // MODAL FOR UPDATING/REMOVING EDUCATION RECORDS
          // ===========================================
      */}
      <ThreeAddEducationModal
        isDisplay={toogle.updateModal}
        onPressed={() => {
          removeEducationRecord(dataContainer.item);
          toggleSetter("updateModal");
          onCloseClearError();
        }}
        onClose={() => {
          toggleSetter("updateModal");
          onCloseClearError();
        }}
        data={dataContainer}
      />

      <div className="scrollable-div-table">
        {/* 
            // ===========================================
            // TABLE STARTS HERE
            // ===========================================
        */}
        <table id="custom-table">
          {/* 
              // ===========================================
              // TABLE HEADER STARTS HERE
              // ===========================================
          */}
          <thead>
            <tr className="fixed-label-table main-headers">
              <th colSpan="12">
                <span style={{ float: "left" }}>
                  III. EDUCATIONAL BACKGROUND
                </span>
                <span style={{ float: "right" }} onClick={() => setShowData()}>
                  {" "}
                  {showData ? (
                    <AiOutlineArrowUp size="18px" />
                  ) : (
                    <AiOutlineArrowDown size="18px" />
                  )}
                </span>
              </th>
            </tr>
            <tr className="fixed-label-table secondary-headers tr-header">
              <th
                colSpan="5"
                rowSpan="2"
                style={{ textAlign: "center", width: "40%" }}
              >
                Name of School
              </th>
              <th
                colSpan="4"
                rowSpan="2"
                style={{ textAlign: "center", width: "30%" }}
              >
                Level of Education/Basic Education/Degree/Course
              </th>
              <th
                colSpan="2"
                rowSpan="1"
                style={{ textAlign: "center", width: "20%" }}
              >
                Period of Attendance
              </th>
              <th
                colSpan="1"
                rowSpan="2"
                style={{ textAlign: "center", width: "10%" }}
              >
                Units Earned
              </th>
            </tr>
            <tr className="fixed-label-table secondary-headers tr-header">
              <th
                colSpan="1"
                rowSpan="1"
                style={{ textAlign: "center", width: "10%" }}
              >
                From
              </th>
              <th
                colSpan="1"
                rowSpan="1"
                style={{ textAlign: "center", width: "10%" }}
              >
                To
              </th>
            </tr>
          </thead>
          {/* 
              // ===========================================
              // TABLE CONTENT STARTS HERE
              // ===========================================
          */}
          {showData && (
            <tbody>
              {educationRecord == null
                ? null
                : educationRecord.map((item, key) => {
                    return (
                      <tr
                        key={key}
                        className="tr-education-record"
                        onClick={() => {
                          setDataContainer(item);
                          toggleSetter("updateModal");
                        }}
                      >
                        <td colSpan="5" style={{ textAlign: "center" }}>
                          {item.school}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {formThreeInput.add_educ_level[item.level].title}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {item.from}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {item.to}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {item.unit_earned}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          )}
        </table>
      </div>
      <div style={{ marginTop: "10px" }}>
        <ButtonComponent
          buttonLogoStart={<MdAdd size="14px" />}
          buttonName="Add Record"
          onClick={() => {
            toggleSetter("addModal");
          }}
        />
      </div>
    </React.Fragment>
  );
};

const TableTwo = () => {
  // ===========================================
  // CUSTOM HOOK SERVICE
  // ===========================================
  const { renderFail, renderSuccess } = usePopUpHelper();
  let [showData, setShowData] = useToggleHelper(false);

  // ===========================================
  // REACT ROUTER FUNCTIONALITY
  // ===========================================
  const { item } = useParams();

  const onCloseClearError = () => {
    dispatch(setMessageError(undefined));
    dispatch(setObjectError({}));
  };

  // ===========================================
  // REDUX TOOLKIT FUNCTIONALITY
  // ===========================================
  const dispatch = useDispatch();

  // ===========================================
  // GET ALL CIVIL SERVICE RECORD HTTP REQUEST
  // ===========================================
  const [cselibilityRecord, setCselibilityRecord] = useState([]);
  const getCseligibilityRecord = async () => {
    await axios
      .get(API_HOST + `new-csc-eleigibility/${item}`)
      .then((response) => {
        setCselibilityRecord(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ===========================================
  // REMOVE CIVIL SERVICE RECORD HTTP REQUEST
  // ===========================================
  const [dataContainer, setDataContainer] = useState(null);
  const removeCseligibilityRecord = async (record) => {
    dispatch(setBusy(true));
    await axios
      .delete(API_HOST + `new-csc-eleigibility/${record}`)
      .then(() => renderSuccess())
      .catch(() => renderFail());
    dispatch(setBusy(false));
  };

  // ===========================================
  // FOR CIVIL SERVICE INIT STATE RENDER AND TOOGLE UPDATE HANDLER
  // ===========================================
  let [toogle, setToggle] = useState({
    addModal: false,
    updateModal: false,
  });

  const toggleSetter = (name) => {
    setToggle({ ...toogle, [name]: !toogle[name] });
  };

  useEffect(() => {
    getCseligibilityRecord();
  }, [toogle]);

  return (
    <React.Fragment>
      {/* 
          // ===========================================
          // MODAL FOR ADDING CIVIL SERVICE RECORD
          // =========================================== 
      */}
      <ThreeAddCivilServiceModal
        isDisplay={toogle.addModal}
        onClose={() => {
          toggleSetter("addModal");
          onCloseClearError();
        }}
      />
      {/* 
          // ===========================================
          // MODAL FOR UPDATING/REMOVING CIVIL SERVICE RECORD
          // =========================================== 
      */}
      <ThreeAddCivilServiceModal
        isDisplay={toogle.updateModal}
        onPressed={() => {
          removeCseligibilityRecord(dataContainer.cse_app_time);
          toggleSetter("updateModal");
          onCloseClearError();
        }}
        onClose={() => {
          toggleSetter("updateModal");
          onCloseClearError();
        }}
        data={dataContainer}
      />
      <div className="scrollable-div-table">
        {/* 
                // ===========================================
                // TABLE STARTS HERE
                // =========================================== 
            */}
        <table id="custom-table">
          {/* 
                // ===========================================
                // TABLE HEADER STARTS HERE
                // =========================================== 
            */}
          <thead>
            <tr className="fixed-label-table main-headers">
              <th colSpan="12">
                <span style={{ float: "left" }}>
                  IV. CIVIL SERVICE ELIGIBILITY
                </span>
                <span style={{ float: "right" }} onClick={() => setShowData()}>
                  {" "}
                  {showData ? (
                    <AiOutlineArrowUp size="18px" />
                  ) : (
                    <AiOutlineArrowDown size="18px" />
                  )}
                </span>
              </th>
            </tr>
            <tr className="fixed-label-table secondary-headers tr-header">
              <th
                colSpan="4"
                rowSpan="2"
                style={{ textAlign: "center", width: "30%" }}
              >
                Civil Service Eligibility
              </th>
              <th
                colSpan="1"
                rowSpan="2"
                style={{ textAlign: "center", width: "10%" }}
              >
                Rating
              </th>
              <th
                colSpan="4"
                rowSpan="2"
                style={{ textAlign: "center", width: "30%" }}
              >
                Place of Examination
              </th>
              <th
                colSpan="1"
                rowSpan="2"
                style={{ textAlign: "center", width: "10%" }}
              >
                Date
              </th>
              <th
                colSpan="2"
                rowSpan="1"
                style={{ textAlign: "center", width: "20%" }}
              >
                License
              </th>
            </tr>
            <tr className="fixed-label-table secondary-headers tr-header">
              <th
                colSpan="1"
                rowSpan="1"
                style={{ textAlign: "center", width: "10%" }}
              >
                Number
              </th>
              <th
                colSpan="1"
                rowSpan="1"
                style={{ textAlign: "center", width: "10%" }}
              >
                Validity
              </th>
            </tr>
          </thead>
          {/* 
                // ===========================================
                // TABLE CONTENT STARTS HERE
                // =========================================== 
            */}
          {showData && (
            <tbody>
              {cselibilityRecord == null
                ? ""
                : cselibilityRecord.map((item, key) => {
                    return (
                      <tr
                        className="tr-education-record"
                        onClick={() => {
                          setDataContainer(item);
                          toggleSetter("updateModal");
                        }}
                        key={key}
                      >
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.cse_app_title}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {item.cse_app_rating}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.cse_app_place}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {item.cse_app_date}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {item.cse_app_license}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {item.cse_app_validity}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          )}
        </table>
      </div>
      <div style={{ marginTop: "10px" }}>
        <ButtonComponent
          buttonLogoStart={<MdAdd size="14px" />}
          buttonName="Add Record"
          onClick={() => {
            toggleSetter("addModal");
          }}
        />
      </div>
    </React.Fragment>
  );
};

const TableThree = () => {
  // ===========================================
  // CUSTOM HOOK SERVICE
  // ===========================================
  const { renderFail, renderSuccess } = usePopUpHelper();
  let [showData, setShowData] = useToggleHelper(false);

  // ===========================================
  // REACT ROUTER FUNCTIONALITY
  // ===========================================
  const { item } = useParams();
  const onCloseClearError = () => {
    dispatch(setMessageError(undefined));
    dispatch(setObjectError({}));
  };

  // ===========================================
  // REDUX TOOLKIT FUNCTIONALITY
  // ===========================================
  const dispatch = useDispatch();

  // ===========================================
  // GET ALL WORK RECORD HTTP REQUEST
  // ===========================================
  const [workExperienceRecord, setWorkExperienceRecord] = useState([]);
  const getWorkExperienceRecord = async () => {
    await axios
      .get(API_HOST + `new-work-experience/${item}`)
      .then((response) => {
        setWorkExperienceRecord(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ===========================================
  // REMOVE WORK RECORD HTTP REQUEST
  // ===========================================
  const [dataContainer, setDataContainer] = useState(null);
  const removeWorkExpRecord = async (record) => {
    dispatch(setBusy(true));
    await axios
      .delete(API_HOST + `new-work-experience/${record}`)
      .then(() => renderSuccess())
      .catch(() => renderFail());
    dispatch(setBusy(false));
  };

  // ===========================================
  // FOR WORK INIT STATE RENDER AND TOOGLE UPDATE HANDLER
  // ===========================================
  let [toogle, setToggle] = useState({
    addModal: false,
    updateModal: false,
  });

  const toggleSetter = (name) => {
    setToggle({ ...toogle, [name]: !toogle[name] });
  };

  useEffect(() => {
    getWorkExperienceRecord();
  }, [toogle]);

  let getAppointment = (item) => {
    var value = "";
    formThreeInput.add_work_status.forEach((element) => {
      if (element.id == item) {
        value = element.title;
      }
    });
    return value;
  };
  return (
    <React.Fragment>
      {/* 
            // ===========================================
            // MODAL FOR ADDING WORK EXPRIENCE
            // =========================================== 
        */}
      <ThreeAddWorkExperienceModal
        isDisplay={toogle.addModal}
        onClose={() => {
          toggleSetter("addModal");
          onCloseClearError();
        }}
      />
      {/* 
            // ===========================================
            // MODAL FOR UPDATING/REMOVING WORK EXPRIENCE
            // =========================================== 
        */}
      <ThreeAddWorkExperienceModal
        isDisplay={toogle.updateModal}
        onPressed={() => {
          removeWorkExpRecord(dataContainer.exp_app_time);
          toggleSetter("updateModal");
          onCloseClearError();
        }}
        onClose={() => {
          toggleSetter("updateModal");
          onCloseClearError();
        }}
        data={dataContainer}
      />

      <div className="scrollable-div-table">
        {/* 
                // ===========================================
                // TABLE STARTS HERE
                // =========================================== 
            */}
        <table id="custom-table">
          {/* 
                // ===========================================
                // TABLE HEADER STARTS HERE
                // =========================================== 
            */}
          <thead>
            <tr className="fixed-label-table main-headers">
              <th colSpan="12">
                <span style={{ float: "left" }}>III. WORK EXPERIENCE</span>
                <span style={{ float: "right" }} onClick={() => setShowData()}>
                  {" "}
                  {showData ? (
                    <AiOutlineArrowUp size="18px" />
                  ) : (
                    <AiOutlineArrowDown size="18px" />
                  )}
                </span>
              </th>
            </tr>
            <tr className="fixed-label-table secondary-headers tr-header">
              <th
                colSpan="1"
                rowSpan="1"
                style={{ textAlign: "center", width: "10%" }}
              >
                Inclusive Dates
              </th>
              <th
                colSpan="3"
                rowSpan="1"
                style={{ textAlign: "center", width: "25%" }}
              >
                Position Title
              </th>
              <th
                colSpan="3"
                rowSpan="1"
                style={{ textAlign: "center", width: "25%" }}
              >
                Department / Agency / Office / Company
              </th>
              <th
                colSpan="2"
                rowSpan="1"
                style={{ textAlign: "center", width: "15%" }}
              >
                Monthly Salary / SG & Increment
              </th>
              <th
                colSpan="2"
                rowSpan="1"
                style={{ textAlign: "center", width: "15%" }}
              >
                Status of Appointment
              </th>
              <th
                colSpan="1"
                rowSpan="1"
                style={{ textAlign: "center", width: "10%" }}
              >
                Government Service
              </th>
            </tr>
          </thead>
          {/* 
                    // ===========================================
                    // TABLE CONTENT STARTS HERE
                    // =========================================== 
                */}
          {showData && (
            <tbody>
              {workExperienceRecord == null
                ? null
                : workExperienceRecord.map((item, key) => {
                    return (
                      <tr
                        key={key}
                        className="tr-education-record"
                        onClick={() => {
                          setDataContainer(item);
                          toggleSetter("updateModal");
                        }}
                      >
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {item.enclusive}
                        </td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          {item.exp_app_position}
                        </td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          {item.exp_app_agency}
                        </td>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          {item.exp_app_salary}
                        </td>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          {getAppointment(item.exp_app_appntmnt)}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {item.exp_app_govt == 1 ? "Yes" : "No"}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          )}
        </table>
      </div>
      <div style={{ marginTop: "10px" }}>
        <ButtonComponent
          buttonLogoStart={<MdAdd size="14px" />}
          buttonName="Add Record"
          onClick={() => {
            toggleSetter("addModal");
          }}
        />
      </div>
    </React.Fragment>
  );
};

const TableFour = () => {
  // ===========================================
  // CUSTOM HOOK SERVICE
  // ===========================================
  const { renderFail, renderSuccess } = usePopUpHelper();
  let [showData, setShowData] = useToggleHelper(false);

  // ===========================================
  // REACT ROUTER FUNCTIONALITY
  // ===========================================
  const { item } = useParams();
  const onCloseClearError = () => {
    dispatch(setMessageError(undefined));
    dispatch(setObjectError({}));
  };
  // ===========================================
  // REDUX TOOLKIT FUNCTIONALITY
  // ===========================================
  const dispatch = useDispatch();

  // ===========================================
  // GET ALL VOLUNTARY RECORD HTTP REQUEST
  // ===========================================
  const [voluntaryRecord, setVoluntaryRecord] = useState([]);
  const getVoluntaryRecord = async () => {
    await axios
      .get(API_HOST + `new-voluntary-work/${item}`)
      .then((response) => {
        setVoluntaryRecord(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ===========================================
  // REMOVE VOLUNTARY RECORD HTTP REQUEST
  // ===========================================
  const [dataContainer, setDataContainer] = useState(null);
  const removeVoluntaryWorkRecord = async (record) => {
    dispatch(setBusy(true));
    console.log("Hello Pressed");
    await axios
      .delete(API_HOST + `new-voluntary-work/${record}`)
      .then(() => renderSuccess())
      .catch(() => renderFail());
    dispatch(setBusy(false));
  };

  // ===========================================
  // FOR VOLUNTARY INIT STATE RENDER AND TOOGLE SCREEN UPDATE HANDLER
  // ===========================================
  let [toogle, setToggle] = useState({
    addModal: false,
    updateModal: false,
  });

  const toggleSetter = (name) => {
    setToggle({ ...toogle, [name]: !toogle[name] });
  };

  useEffect(() => {
    getVoluntaryRecord();
  }, [toogle]);

  return (
    <React.Fragment>
      {/*
            // ===========================================
            // MODAL FOR ADDING RECORD
            // ===========================================
        */}
      <ThreeAddVoluntrayWorkModal
        isDisplay={toogle.addModal}
        onClose={() => {
          toggleSetter("addModal");
          onCloseClearError();
        }}
      />
      {/*
            // ===========================================
            // MODAL FOR UPDATING AND DELETING RECORD
            // ===========================================
        */}
      <ThreeAddVoluntrayWorkModal
        isDisplay={toogle.updateModal}
        onPressed={() => {
          removeVoluntaryWorkRecord(dataContainer.vol_app_time);
          toggleSetter("updateModal");
          onCloseClearError();
        }}
        onClose={() => {
          toggleSetter("updateModal");
          onCloseClearError();
        }}
        data={dataContainer}
      />

      <div className="scrollable-div-table">
        {/*
                // ===========================================
                // TABLE STARTS HERE
                // ===========================================
            */}
        <table id="custom-table">
          {/*
                // ===========================================
                // TABLE HEADER STARTS HERE
                // ===========================================
            */}
          <thead>
            <tr className="fixed-label-table main-headers">
              <th colSpan="12">
                <span style={{ float: "left" }}>
                  III. VOLUNTARY WORK OR INVOLVEMENT IN
                  CIVIC/NON-GOVERNMENT/PEOPLE/VOLUNTARY ORGANIZATION
                </span>
                <span style={{ float: "right" }} onClick={() => setShowData()}>
                  {" "}
                  {showData ? (
                    <AiOutlineArrowUp size="18px" />
                  ) : (
                    <AiOutlineArrowDown size="18px" />
                  )}
                </span>
              </th>
            </tr>
            <tr className="fixed-label-table secondary-headers tr-header">
              <th
                colSpan="5"
                rowSpan="2"
                style={{ textAlign: "center", width: "30%" }}
              >
                Name & Address of Organization
              </th>
              <th
                colSpan="4"
                rowSpan="1"
                style={{ textAlign: "center", width: "20%" }}
              >
                Inclusive Dates
              </th>
              <th
                colSpan="1"
                rowSpan="2"
                style={{ textAlign: "center", width: "20%" }}
              >
                Number of Hours
              </th>
              <th
                colSpan="2"
                rowSpan="2"
                style={{ textAlign: "center", width: "30%" }}
              >
                Position / Nature of Work
              </th>
            </tr>
            <tr className="fixed-label-table secondary-headers tr-header">
              <th
                colSpan="2"
                rowSpan="1"
                style={{ textAlign: "center", width: "10%" }}
              >
                From
              </th>
              <th
                colSpan="2"
                rowSpan="1"
                style={{ textAlign: "center", width: "10%" }}
              >
                To
              </th>
            </tr>
          </thead>
          {/*
                // ===========================================
                // TABLE CONTENT STARTS HERE
                // ===========================================
            */}
          {showData && (
            <tbody>
              {voluntaryRecord == null
                ? null
                : voluntaryRecord.map((item, key) => {
                    return (
                      <tr
                        key={key}
                        className="tr-education-record"
                        onClick={() => {
                          setDataContainer(item);
                          toggleSetter("updateModal");
                        }}
                      >
                        <td colSpan="5" style={{ textAlign: "center" }}>
                          {item.vol_app_org}
                        </td>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          {item.vol_app_from}
                        </td>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          {item.vol_app_to}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {item.vol_app_hours}
                        </td>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          {item.vol_app_work}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          )}
        </table>
      </div>
      <div style={{ marginTop: "10px" }}>
        <ButtonComponent
          buttonLogoStart={<MdAdd size="14px" />}
          buttonName="Add Record"
          onClick={() => toggleSetter("addModal")}
        />
      </div>
    </React.Fragment>
  );
};

const TableFive = () => {
  // ===========================================
  // CUSTOM HOOK SERVICE
  // ===========================================
  const { renderFail, renderSuccess } = usePopUpHelper();
  let [showData, setShowData] = useToggleHelper(false);

  // ===========================================
  // REACT ROUTER FUNCTIONALITY
  // ===========================================
  let { item } = useParams();
  let navigate = useNavigate();

  // ===========================================
  // REDUX TOOLKIT FUNCTIONALITY
  // ===========================================
  const dispatch = useDispatch();
  const onCloseClearError = () => {
    dispatch(setMessageError(undefined));
    dispatch(setObjectError({}));
  };

  // ===========================================
  // GET ALL TRAINING RECORD HTTP REQUEST
  // ===========================================
  const [trainingRecord, setTrainingRecord] = useState([]);
  const getTrainingRecord = async () => {
    await axios
      .get(API_HOST + `new-training/${item}`)
      .then((response) => {
        setTrainingRecord(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ===========================================
  // REMOVE TRAINING RECORD HTTP REQUEST
  // ===========================================
  const [dataContainer, setDataContainer] = useState(null);
  const removeTrainingRecord = async (record) => {
    dispatch(setBusy(true));
    await axios
      .delete(API_HOST + `new-training/${record}`)
      .then(() => renderSuccess())
      .catch(() => renderFail());
    dispatch(setBusy(false));
  };

  // ===========================================
  // FOR TRAINING INIT STATE RENDER AND TOOGLE SCREEN UPDATE HANDLER
  // ===========================================
  let [toogle, setToggle] = useState({
    addModal: false,
    updateModal: false,
  });

  const toggleSetter = (name) => {
    setToggle({ ...toogle, [name]: !toogle[name] });
  };

  useEffect(() => {
    getTrainingRecord();
  }, [toogle]);

  return (
    <React.Fragment>
      {/* 
                // ===========================================
                // MODAL FOR ADDING RECORD
                // =========================================== 
            */}
      <ThreeAddInterventionModal
        isDisplay={toogle.addModal}
        onClose={() => {
          toggleSetter("addModal");
          onCloseClearError();
        }}
      />

      {/* 
                // ===========================================
                // MODAL FOR UPDATING/REMOVING RECORD
                // =========================================== 
            */}
      <ThreeAddInterventionModal
        isDisplay={toogle.updateModal}
        onPressed={() => {
          removeTrainingRecord(dataContainer.trn_app_time);
          toggleSetter("updateModal");
          onCloseClearError();
        }}
        onClose={() => {
          toggleSetter("updateModal");
          onCloseClearError();
        }}
        data={dataContainer}
      />

      <div className="scrollable-div-table">
        {/* 
            // ===========================================
            // TABLE STARTS HERE
            // =========================================== 
        */}
        <table id="custom-table">
          {/* 
              // ===========================================
              // TABLE HEADER STARTS HERE
              // =========================================== 
          */}
          <thead>
            <tr className="fixed-label-table main-headers">
              <th colSpan="12">
                <span style={{ float: "left" }}>
                  VII. LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING PROGRAMS
                  ATTENDED
                </span>
                <span style={{ float: "right" }} onClick={() => setShowData()}>
                  {" "}
                  {showData ? (
                    <AiOutlineArrowUp size="18px" />
                  ) : (
                    <AiOutlineArrowDown size="18px" />
                  )}
                </span>
              </th>
            </tr>
            <tr className="fixed-label-table secondary-headers tr-header">
              <th
                colSpan="4"
                rowSpan="2"
                style={{ textAlign: "center", width: "30%" }}
              >
                Tittle
              </th>
              <th
                colSpan="2"
                rowSpan="1"
                style={{ textAlign: "center", width: "20%" }}
              >
                Inclusive Dates
              </th>
              <th
                colSpan="1"
                rowSpan="2"
                style={{ textAlign: "center", width: "10%" }}
              >
                Number of Hours
              </th>
              <th
                colSpan="2"
                rowSpan="2"
                style={{ textAlign: "center", width: "10%" }}
              >
                Type of L&D
              </th>
              <th
                colSpan="4"
                rowSpan="2"
                style={{ textAlign: "center", width: "30%" }}
              >
                Conducted/ Sponsored By
              </th>
            </tr>
            <tr className="fixed-label-table secondary-headers tr-header">
              <th
                colSpan="1"
                rowSpan="1"
                style={{ textAlign: "center", width: "10%" }}
              >
                From
              </th>
              <th
                colSpan="1"
                rowSpan="1"
                style={{ textAlign: "center", width: "10%" }}
              >
                To
              </th>
            </tr>
          </thead>
          {/* 
                // ===========================================
                // TABLE CONTENT STARTS HERE
                // =========================================== 
            */}
          {showData && (
            <tbody>
              {trainingRecord == null
                ? null
                : trainingRecord.map((item, key) => {
                    return (
                      <tr
                        key={key}
                        className="tr-education-record"
                        onClick={() => {
                          setDataContainer(item);
                          console.log(dataContainer);
                          toggleSetter("updateModal");
                        }}
                      >
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.trn_app_title}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {item.trn_app_from}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {item.trn_app_to}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {item.trn_app_hours}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {item.trn_app_type}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.trn_app_sponsor}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          )}
        </table>
      </div>
      <div style={{ marginTop: "10px" }}>
        <ButtonComponent
          buttonLogoStart={<MdAdd size="14px" />}
          buttonName="Add Record"
          onClick={() => {
            toggleSetter("addModal");
          }}
        />
      </div>
      <br />
      <br />
      <br />
    </React.Fragment>
  );
};

export default FormPageThree;
