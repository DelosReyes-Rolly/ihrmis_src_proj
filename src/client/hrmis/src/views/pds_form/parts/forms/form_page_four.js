import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import QuestionComponent from "../question_component";
import SubQuestionComponent from "../sub_question_component";
import SpecifyDetailComponents from "../specify_detail_component";
import PdsAddInput from "../add_inputs";
import PrevNextSubButtons from "../prev_next_sub_buttons";
import { setMessageError } from "../../../../features/reducers/error_handler_slice";
import DostHeader from "../dost_header";
import axios from "axios";
import {
  API_HOST,
  validationRequired,
} from "../../../../helpers/global/global_config";
import { useScrollToTop } from "../../../../helpers/use_hooks/useScollTop";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAxiosHelper from "../../../../helpers/use_hooks/axios_helper";

const VALIDATIONHANDLER = (value) =>
  Yup.string().when(value, {
    is: "1",
    then: validationRequired,
  });

const FormPageFour = () => {
  useScrollToTop();
  // =====================================
  // CUSTOM HOOK SERVICES
  // =====================================
  const { renderBusy, renderSucceed, renderFailed } = usePopUpHelper();
  const [data, setData] = useState();

  // ===================================
  // HANDLING ROUTES
  // ===================================
  const { item } = useParams();
  let navigate = useNavigate();

  // ===================================
  // REDUX STATE AND FUNCIONALITIES
  // ===================================
  const dispatch = useDispatch();

  const PdsFourInputHandler = useFormik({
    enableReinitialize: true,
    initialValues: {
      Q1A: data?.Q1A ?? "",
      Q1B: data?.Q1B ?? "",
      Q2A: data?.Q2A ?? "",
      Q2B: data?.Q2B ?? "",
      Q3: data?.Q3 ?? "",
      Q4: data?.Q4 ?? "",
      Q5A: data?.Q5A ?? "",
      Q5B: data?.Q5B ?? "",
      Q6: data?.Q6 ?? "",
      Q7A: data?.Q7A ?? "",
      Q7B: data?.Q1B ?? "",
      Q7C: data?.Q7C ?? "",

      Q1B_spec: data?.Q1B_spec ?? "",
      Q2A_spec: data?.Q2A_spec ?? "",
      Q2B_spec: data?.Q2B_spec ?? "",
      Q3_spec: data?.Q3_spec ?? "",
      Q4_spec: data?.Q4_spec ?? "",
      Q5A_spec: data?.Q5A_spec ?? "",
      Q5B_spec: data?.Q5B_spec ?? "",
      Q6_spec: data?.Q6_spec ?? "",
      Q7A_spec: data?.Q7A_spec ?? "",
      Q7B_spec: data?.Q7B_spec ?? "",
      Q7C_spec: data?.Q7C_spec ?? "",

      Q2B_date: data?.Q2B_date ?? "",
    },
    validationSchema: Yup.object({
      Q1A: validationRequired,
      Q1B: validationRequired,
      Q2A: validationRequired,
      Q2B: validationRequired,
      Q3: validationRequired,
      Q4: validationRequired,
      Q5A: validationRequired,
      Q5B: validationRequired,
      Q6: validationRequired,
      Q7A: validationRequired,
      Q7B: validationRequired,
      Q7C: validationRequired,

      Q1B_spec: VALIDATIONHANDLER("Q1B"),
      Q2A_spec: VALIDATIONHANDLER("Q2A"),
      Q2B_spec: VALIDATIONHANDLER("Q2B"),
      Q3_spec: VALIDATIONHANDLER("Q3"),
      Q4_spec: VALIDATIONHANDLER("Q4"),
      Q5A_spec: VALIDATIONHANDLER("Q5A"),
      Q5B_spec: VALIDATIONHANDLER("Q5B"),
      Q6_spec: VALIDATIONHANDLER("Q6"),
      Q7A_spec: VALIDATIONHANDLER("Q7A"),
      Q7B_spec: VALIDATIONHANDLER("Q7B"),
      Q7C_spec: VALIDATIONHANDLER("Q7C"),

      Q2B_date: VALIDATIONHANDLER("Q2B"),
    }),
    onSubmit: async (values) => {
      renderBusy(true);
      await useAxiosHelper
        .post(values, "new-declaration", item)
        .then(() => renderSucceed({ content: "Form submitted successfully" }))
        .catch((err) => renderFailed(err.message));
      renderBusy(false);
    },
  });

  const getDeclarationRecord = async () => {
    await axios
      .get(API_HOST + "new-get-delcaration/" + item)
      .then((response) => {
        const res = response.data.data;
        setData(res);
      });
  };

  useEffect(() => {
    getDeclarationRecord();
  }, []);

  const formValue = PdsFourInputHandler.values;

  return (
    <React.Fragment>
      <div className="pds-profile-main-view">
        <DostHeader />
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
        <form onSubmit={PdsFourInputHandler.handleSubmit}>
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
                  subQuestion="1.a within the third degree?"
                  name="Q1A"
                  checked={formValue.Q1A === "" ? undefined : formValue.Q1A}
                  formik={PdsFourInputHandler}
                />

                <SubQuestionComponent
                  subQuestion="1.b within the fourth degree (for Local Government Unit - Career Employee)?"
                  name="Q1B"
                  checked={formValue.Q1B === "" ? undefined : formValue.Q1B}
                  formik={PdsFourInputHandler}
                />
              </tbody>
            </table>

            <SpecifyDetailComponents
              name="Q1B_spec"
              label="If Yes, give details"
              formik={PdsFourInputHandler}
            />
          </div>

          {/* NUMBER TWO STARTS HERE  */}

          <div>
            <table id="custom-table">
              <tbody>
                <SubQuestionComponent
                  subQuestion="2.a Have you ever been found guilty of any administrative offense?"
                  name="Q2A"
                  checked={formValue.Q2A === "" ? undefined : formValue.Q2A}
                  formik={PdsFourInputHandler}
                />
              </tbody>
            </table>

            <SpecifyDetailComponents
              name="Q2A_spec"
              label="If Yes, give details"
              formik={PdsFourInputHandler}
            />

            <table id="custom-table">
              <tbody>
                <SubQuestionComponent
                  subQuestion="2.b Have you been criminally charged before any court?"
                  name="Q2B"
                  checked={formValue.Q2B === "" ? undefined : formValue.Q2B}
                  formik={PdsFourInputHandler}
                />
              </tbody>
            </table>

            <SpecifyDetailComponents
              componentNo={2}
              name="Q2B_spec"
              date_name="Q2B_date"
              label="If Yes, give details"
              formik={PdsFourInputHandler}
            />
          </div>

          {/* NUMBER THREEE STARTS HERE  */}
          <div>
            <table id="custom-table">
              <tbody>
                <SubQuestionComponent
                  subQuestion="3. Have ever been convicted of any crime or violation of any law, decree ordinance or regulation by any court or tribunal"
                  name="Q3"
                  checked={formValue.Q3 === "" ? undefined : formValue.Q3}
                  formik={PdsFourInputHandler}
                />
              </tbody>
            </table>

            <SpecifyDetailComponents
              name="Q3_spec"
              label="If Yes, give details"
              formik={PdsFourInputHandler}
            />
          </div>

          {/* NUMBER FOUR STARTS HERE  */}

          <div>
            <table id="custom-table">
              <tbody>
                <SubQuestionComponent
                  subQuestion="4. Have you ever been seperated from the service in any of the following modes: 
                    resignation, retirement, dropped from the rolls, dismissal, termination, end of term, finished contract or phased 
                    sout (abolition), in public or private sector?"
                  name="Q4"
                  checked={formValue.Q4 === "" ? undefined : formValue.Q4}
                  formik={PdsFourInputHandler}
                />
              </tbody>
            </table>

            <SpecifyDetailComponents
              name="Q4_spec"
              label="If Yes, give details"
              formik={PdsFourInputHandler}
            />
          </div>

          {/* NUMBER FIVE STARTS HERE */}
          <div>
            <table id="custom-table">
              <tbody>
                <SubQuestionComponent
                  subQuestion="5.a Have you ever been a candidate in a national or local election
                    held within the last year. (except Barangay election)?"
                  name="Q5A"
                  checked={formValue.Q5A === "" ? undefined : formValue.Q5A}
                  formik={PdsFourInputHandler}
                />
              </tbody>
            </table>
            <SpecifyDetailComponents
              name="Q5A_spec"
              label="If Yes, give details"
              formik={PdsFourInputHandler}
            />
          </div>

          <div>
            <table id="custom-table">
              <tbody>
                <SubQuestionComponent
                  subQuestion="5.a Have you resigned from the government service during the three
                    (3)-month period before the las election to promote/actively campaign for a national or local candidate?"
                  name="Q5B"
                  checked={formValue.Q5B === "" ? undefined : formValue.Q5B}
                  formik={PdsFourInputHandler}
                />
              </tbody>
            </table>
            <SpecifyDetailComponents
              name="Q5B_spec"
              label="If Yes, give details"
              formik={PdsFourInputHandler}
            />
          </div>

          {/* NUMBER SIX STARTS HERE  */}

          <div>
            <table id="custom-table">
              <tbody>
                <SubQuestionComponent
                  subQuestion="6 Have you acquird status of an immigrant or permanent resident of another country?"
                  name="Q6"
                  checked={formValue.Q6 === "" ? undefined : formValue.Q6}
                  formik={PdsFourInputHandler}
                />
              </tbody>
            </table>
            <SpecifyDetailComponents
              name="Q6_spec"
              label="If Yes, give details (Country)"
              formik={PdsFourInputHandler}
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
                  subQuestion="7.a Are you a member of indigenous group?"
                  name="Q7A"
                  checked={formValue.Q7A === "" ? undefined : formValue.Q7A}
                  formik={PdsFourInputHandler}
                />
              </tbody>
            </table>
            <SpecifyDetailComponents
              name="Q7A_spec"
              label="If Yes, give details"
              formik={PdsFourInputHandler}
            />
          </div>

          <div>
            <table id="custom-table">
              <tbody>
                <SubQuestionComponent
                  subQuestion="7.b Are you a person with disability?"
                  name="Q7B"
                  checked={formValue.Q7B === "" ? undefined : formValue.Q7B}
                  formik={PdsFourInputHandler}
                />
              </tbody>
            </table>
            <SpecifyDetailComponents
              name="Q7B_spec"
              label="If Yes, give details"
              formik={PdsFourInputHandler}
            />
          </div>

          <div>
            <table id="custom-table">
              <tbody>
                <SubQuestionComponent
                  subQuestion="7.c Are you a solo parent?"
                  name="Q7C"
                  checked={formValue.Q7C === "" ? undefined : formValue.Q7C}
                  formik={PdsFourInputHandler}
                />
              </tbody>
            </table>
            <SpecifyDetailComponents
              name="Q7C_spec"
              label="If Yes, give details"
              formik={PdsFourInputHandler}
            />
          </div>
          <br />
          <br />
          <br />
          <div className="buttons-pos-right">
            <PrevNextSubButtons
              page="4"
              onClickBack={() => {
                navigate(`/pds-applicant/form-page-three/${item}`);
                dispatch(setMessageError(undefined));
              }}
              onClickNext={() => {
                navigate(`/pds-applicant/form-page-five/${item}`);
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
