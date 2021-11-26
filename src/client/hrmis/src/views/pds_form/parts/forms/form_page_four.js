import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setBusy } from "../../../../features/reducers/popup_response";
import { useFormHelper } from "../../../../helpers/use_hooks/form_helper";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import ValidationComponent from "../../../common/response_component/validation_component/validation_component";
import QuestionComponent from "../question_component";
import SubQuestionComponent from "../sub_question_component";
import SpecifyDetailComponents from "../specify_detail_component";
import PdsAddInput from "../add_inputs";
import PrevNextSubButtons from "../prev_next_sub_buttons";
import {
  setMessageError,
  setObjectError,
} from "../../../../features/reducers/error_handler_slice";
import useAxiosRequestHelper from "../../../../helpers/use_hooks/axios_request_helper";
import DostHeader from "../dost_header";
import axios from "axios";
import { API_HOST } from "../../../../helpers/global/global_config";
import { useScrollToTop } from "../../../../helpers/use_hooks/useScollTop";

const FormPageFour = () => {
  useScrollToTop();
  // =====================================
  // CUSTOM HOOK SERVICES
  // =====================================
  const [dataState, inputData, multiInputData, setter] = useFormHelper();
  const { renderFail, renderSuccess } = usePopUpHelper();

  // ===================================
  // HANDLING ROUTES
  // ===================================
  const { item } = useParams();
  let navigate = useNavigate();

  // ===================================
  // REDUX STATE AND FUNCIONALITIES
  // ===================================
  const dispatch = useDispatch();
  const errorObj = useSelector((state) => state.error.objectError);
  const errorMsg = useSelector((state) => state.error.messageError);

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(setBusy(true));
    await useAxiosRequestHelper
      .post(dataState, "new-declaration", item)
      .then(() => {
        renderSuccess();
        dispatch(setObjectError({}));
        dispatch(setMessageError(undefined));
      })
      .catch((error) => {
        renderFail();
        if (typeof error === "object") {
          console.log(error);
          dispatch(setObjectError(error));
          dispatch(setMessageError("Unprocessable Entity"));
        } else dispatch(setMessageError(error));
      });
    dispatch(setBusy(false));
  };

  const getDeclarationRecord = async () => {
    await axios
      .get(API_HOST + "/new-get-delcaration/" + item)
      .then((response) => {
        let data = response.data.data;
        setter({
          Q1A: data ? data.Q1A : "",
          Q1B: data ? data.Q1B : "",
          Q2A: data ? data.Q2A : "",
          Q2B: data ? data.Q2B : "",
          Q3: data ? data.Q3 : "",
          Q4: data ? data.Q4 : "",
          Q5A: data ? data.Q5A : "",
          Q5B: data ? data.Q5B : "",
          Q6: data ? data.Q6 : "",
          Q7A: data ? data.Q7A : "",
          Q7B: data ? data.Q1B : "",
          Q7C: data ? data.Q7C : "",
          Q1B_spec: data ? data.Q1B_spec : "",
          Q2A_spec: data ? data.Q2A_spec : "",
          Q2B_spec: data ? data.Q2B_spec : "",
          Q3_spec: data ? data.Q3_spec : "",
          Q4_spec: data ? data.Q4_spec : "",
          Q5A_spec: data ? data.Q5A_spec : "",
          Q5B_spec: data ? data.Q5B_spec : "",
          Q6_spec: data ? data.Q6_spec : "",
          Q7A_spec: data ? data.Q7A_spec : "",
          Q7B_spec: data ? data.Q7B_spec : "",
          Q7C_spec: data ? data.Q7C_spec : "",

          Q2B_date: data ? data.Q2B_date : "",
        });
      });
  };

  useEffect(() => {
    getDeclarationRecord();
  }, []);

  return (
    <React.Fragment>
      <div className="pds-profile-main-view">
        <DostHeader />
        <br />
        {errorMsg && (
          <ValidationComponent title="FAILED TO SUBMIT">
            <p> {errorMsg} </p>
          </ValidationComponent>
        )}
        <br />
        <table id="custom-table">
          <thead>
            <tr className="main-headers">
              <th className="">VIII. OTHER INFORMATION</th>
            </tr>
          </thead>
        </table>
        <br />
        <div style={{ marginBottom: "5px" }}>
          <PdsAddInput
            type="SKILL"
            label={"SPECIAL SKILLS AND HOBBIES"}
            error={{ skills: "This field is require" }}
          />
        </div>
        <div style={{ marginBottom: "5px" }}>
          <PdsAddInput
            type="RECOG"
            label={"NON ACADEMIC-DISTINCTIONS/RECOGNITION"}
          />
        </div>
        <div style={{ marginBottom: "5px" }}>
          <PdsAddInput
            type="MEMBR"
            label={"MEMBERSHIP OF ASSOCIATION/ORGANIZATION"}
          />
        </div>

        <br />
        <form onSubmit={submitHandler}>
          <div>
            <table id="custom-table">
              <tbody>
                <QuestionComponent
                  queston={`1. Are you related by consanguinity or affinity to 
                              the appointing or recommending authority, or to the chief of bureau or office or 
                              to the person who was immediate supervision over you in the  Office, Bureau or 
                              Department where you will be appointed?`}
                />
                <SubQuestionComponent
                  name="Q1A"
                  checked={dataState.Q1A === "" ? undefined : dataState.Q1A}
                  onChange={(e) => {
                    inputData(e);
                  }}
                  subQuestion="1.a within the third degree?"
                  error={errorObj ? errorObj.Q1A : ""}
                />

                <SubQuestionComponent
                  name="Q1B"
                  checked={dataState.Q1B === "" ? undefined : dataState.Q1B}
                  onChange={(e) => {
                    inputData(e);
                  }}
                  subQuestion="1.b within the fourth degree (for Local Government Unit - Career Employee)?"
                  error={errorObj ? errorObj.Q1B : ""}
                />
              </tbody>
            </table>

            <SpecifyDetailComponents
              name="Q1B_spec"
              label="If Yes, give details"
              value={dataState ? dataState.Q1B_spec : undefined}
              onChange={(e) => {
                inputData(e);
                console.log(e.target.value);
              }}
            />
          </div>

          {/* NUMBER TWO STARTS HERE  */}

          <div>
            <table id="custom-table">
              <tbody>
                <SubQuestionComponent
                  name="Q2A"
                  checked={dataState.Q2A === "" ? undefined : dataState.Q2A}
                  onChange={(e) => {
                    inputData(e);
                  }}
                  subQuestion="2.a Have you ever been found guilty of any administrative offense?"
                  error={errorObj ? errorObj.Q2A : ""}
                />
              </tbody>
            </table>

            <SpecifyDetailComponents
              name="Q2A_spec"
              label="If Yes, give details"
              value={dataState.Q2A_spec}
              onChange={(e) => {
                inputData(e);
              }}
            />

            <table id="custom-table">
              <tbody>
                <SubQuestionComponent
                  name="Q2B"
                  checked={dataState.Q2B === "" ? undefined : dataState.Q2B}
                  onChange={(e) => {
                    inputData(e);
                  }}
                  subQuestion="2.b Have you been criminally charged before any court?"
                  error={errorObj ? errorObj.Q2B : ""}
                />
              </tbody>
            </table>

            <SpecifyDetailComponents
              date_name="Q2B_date"
              date_value={dataState.Q2B_date}
              onChangeDate={(e) => {
                inputData(e);
              }}
              name="Q2B_spec"
              value={dataState.Q2B_spec}
              onChange={(e) => {
                inputData(e);
              }}
              componentNo={2}
              label="If Yes, give details"
            />
          </div>

          {/* NUMBER THREEE STARTS HERE  */}
          <div>
            <table id="custom-table">
              <tbody>
                <SubQuestionComponent
                  name="Q3"
                  checked={dataState.Q3 === "" ? undefined : dataState.Q3}
                  onChange={(e) => {
                    inputData(e);
                  }}
                  subQuestion="3. Have ever been convicted of any crime or violation of any law, decree ordinance or regulation by any court or tribunal"
                  error={errorObj ? errorObj.Q3 : ""}
                />
              </tbody>
            </table>

            <SpecifyDetailComponents
              name="Q3_spec"
              value={dataState.Q3_spec}
              onChange={(e) => {
                inputData(e);
              }}
              label="If Yes, give details"
            />
          </div>

          {/* NUMBER FOUR STARTS HERE  */}

          <div>
            <table id="custom-table">
              <tbody>
                <SubQuestionComponent
                  name="Q4"
                  checked={dataState.Q4 === "" ? undefined : dataState.Q4}
                  onChange={(e) => {
                    inputData(e);
                  }}
                  subQuestion="4. Have you ever been seperated from the service in any of the following modes: 
                                        resignation, retirement, dropped from the rolls, dismissal, termination, end of term, finished contract or phased 
                                        sout (abolition), in public or private sector?"
                  error={errorObj ? errorObj.Q4 : ""}
                />
              </tbody>
            </table>

            <SpecifyDetailComponents
              name="Q4_spec"
              value={dataState.Q4_spec}
              onChange={(e) => {
                inputData(e);
              }}
              label="If Yes, give details"
            />
          </div>

          {/* NUMBER FIVE STARTS HERE */}
          <div>
            <table id="custom-table">
              <tbody>
                <SubQuestionComponent
                  name="Q5A"
                  checked={dataState.Q5A === "" ? undefined : dataState.Q5A}
                  onChange={(e) => {
                    inputData(e);
                  }}
                  subQuestion="5.a Have you ever been a candidate in a national or local election
                                        held within the last year. (except Barangay election)?"
                  error={errorObj ? errorObj.Q5A : ""}
                />
              </tbody>
            </table>
            <SpecifyDetailComponents
              name="Q5A_spec"
              value={dataState.Q5A_spec}
              onChange={(e) => {
                inputData(e);
              }}
              label="If Yes, give details"
            />
          </div>

          <div>
            <table id="custom-table">
              <tbody>
                <SubQuestionComponent
                  name="Q5B"
                  checked={dataState.Q5B === "" ? undefined : dataState.Q5B}
                  onChange={(e) => {
                    inputData(e);
                  }}
                  subQuestion="5.a Have you resigned from the government service during the three
                                        (3)-month period before the las election to promote/actively campaign for a national or local candidate?"
                  error={errorObj ? errorObj.Q5B : ""}
                />
              </tbody>
            </table>
            <SpecifyDetailComponents
              name="Q5B_spec"
              value={dataState.Q5B_spec}
              onChange={(e) => {
                inputData(e);
              }}
              label="If Yes, give details"
            />
          </div>

          {/* NUMBER SIX STARTS HERE  */}

          <div>
            <table id="custom-table">
              <tbody>
                <SubQuestionComponent
                  name="Q6"
                  checked={dataState.Q6 === "" ? undefined : dataState.Q6}
                  onChange={(e) => {
                    inputData(e);
                  }}
                  subQuestion="6 Have you acquird status of an immigrant or permanent resident of another country?"
                  error={errorObj ? errorObj.Q6 : ""}
                />
              </tbody>
            </table>
            <SpecifyDetailComponents
              name="Q6_spec"
              value={dataState.Q6_spec}
              onChange={(e) => {
                inputData(e);
              }}
              label="If Yes, give details (Country)"
            />
          </div>

          <div>
            <table id="custom-table">
              <tbody>
                <QuestionComponent
                  queston="7. Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna Carta for Disable Persons (RA 7277); and 
                                        (c) Solo Parents Welfare Act of 2000 (RA 8972), please answer the fallowing items:"
                />

                <SubQuestionComponent
                  name="Q7A"
                  checked={dataState.Q7A === "" ? undefined : dataState.Q7A}
                  onChange={(e) => {
                    inputData(e);
                  }}
                  subQuestion="7.a Are you a member of indigenous group?"
                  error={errorObj ? errorObj.Q7A : ""}
                />
              </tbody>
            </table>
            <SpecifyDetailComponents
              name="Q7A_spec"
              value={dataState.Q7A_spec}
              onChange={(e) => {
                inputData(e);
              }}
              label="If Yes, give details"
            />
          </div>

          <div>
            <table id="custom-table">
              <tbody>
                <SubQuestionComponent
                  name="Q7B"
                  checked={dataState.Q7B === "" ? undefined : dataState.Q7B}
                  onChange={(e) => {
                    inputData(e);
                  }}
                  subQuestion="7.b Are you a person with disability?"
                  error={errorObj ? errorObj.Q7B : ""}
                />
              </tbody>
            </table>
            <SpecifyDetailComponents
              name="Q7B_spec"
              value={dataState.Q7B_spec}
              onChange={(e) => {
                inputData(e);
              }}
              label="If Yes, give details"
            />
          </div>

          <div>
            <table id="custom-table">
              <tbody>
                <SubQuestionComponent
                  name="Q7C"
                  checked={dataState.Q7C === "" ? undefined : dataState.Q7C}
                  onChange={(e) => {
                    inputData(e);
                  }}
                  subQuestion="7.c Are you a solo parent?"
                  error={errorObj ? errorObj.Q7C : ""}
                />
              </tbody>
            </table>
            <SpecifyDetailComponents
              name="Q7C_spec"
              value={dataState.Q7C_spec}
              onChange={(e) => {
                inputData(e);
              }}
              label="If Yes, give details"
            />
          </div>
          <br />
          <br />
          <br />
          <div className="buttons-pos-right">
            <PrevNextSubButtons
              page="4"
              onClickBack={() => {
                navigate(`/ihrmis/pds-applicant/form-page-three/${item}`);
                dispatch(setMessageError(undefined));
              }}
              onClickNext={() => {
                navigate(`/ihrmis/pds-applicant/form-page-five/${item}`);
                dispatch(setMessageError(undefined));
              }}
            />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default FormPageFour;
