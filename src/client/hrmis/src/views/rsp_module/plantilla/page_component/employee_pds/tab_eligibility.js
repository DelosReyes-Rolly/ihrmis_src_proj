import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setBusy } from "../../../../../features/reducers/popup_response.js";
import {
  ALERT_ENUM,
  popupAlert,
} from "../../../../../helpers/alert_response.js";
import { API_HOST } from "../../../../../helpers/global/global_config.js";
import ButtonComponent from "../../../../common/button_component/button_component.js.js";
import { eligibilityInputItems } from "../../../../pds_form/static/input_items";
import ThreeAddCivilServiceModal from "../../../../pds_form/parts/add_modals/three_add_csc";

const fetchEmployeeEligibility = async (id) => {
  let data = [];
  await axios
    .get(API_HOST + "get-emp_cse/" + id)
    .then((res) => {
      data = res.data.data;
    })
    .catch((err) => console.log(err.response.data.message ?? err.message));
  return data;
};

const removeEligibility = async (id) => {
  await axios
    .delete(API_HOST + "remove-emp_cse/" + id)
    .then(() =>
      popupAlert({
        message: "Deleted Successfully",
        type: ALERT_ENUM.success,
      })
    )
    .catch((error) =>
      popupAlert({
        message: error?.response?.data?.message ?? error?.message,
        type: ALERT_ENUM.fail,
      })
    );
};

const EligibilityTab = () => {
  const [cselibilityRecord, setCselibilityRecord] = useState([]);
  const [togModal, setTogModal] = useState(false);
  const [togEditModal, setTogEditModal] = useState(false);
  const [sgEligibility, setSgEligibility] = useState(undefined);

  const { item } = useParams();
  const dispatch = useDispatch();

  const removeHandler = async () => {
    dispatch(setBusy(true));
    setTogEditModal(false);
    await removeEligibility(sgEligibility?.cse_id);
    dispatch(setBusy(false));
  };

  useEffect(() => {
    const fetcher = async () => {
      setCselibilityRecord(await fetchEmployeeEligibility(item));
    };
    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [togEditModal, togModal]);

  return (
    <React.Fragment>
      <ThreeAddCivilServiceModal
        isDisplay={togModal}
        onClose={() => setTogModal(false)}
        endpoint="add-update-emp_cse"
      />

      <ThreeAddCivilServiceModal
        isDisplay={togEditModal}
        onClose={() => setTogEditModal(false)}
        endpoint="add-update-emp_cse"
        reference={sgEligibility}
        remove={removeHandler}
      />
      <div className="default-table" style={{ margin: "20px 0px" }}>
        <table id="table-design">
          <thead>
            <tr className="main-header">
              <th colSpan="12">CIVIL SERVICE ELIGIBILITY</th>
            </tr>
            <tr className="secondary-headers-20">
              <th colSpan="4" rowSpan="2" style={{ textAlign: "center" }}>
                Civil Service Eligibility
              </th>
              <th colSpan="1" rowSpan="2" style={{ textAlign: "center" }}>
                Rating
              </th>
              <th colSpan="4" rowSpan="2" style={{ textAlign: "center" }}>
                Place of Examination
              </th>
              <th colSpan="1" rowSpan="2" style={{ textAlign: "center" }}>
                Date
              </th>
              <th colSpan="2" rowSpan="1" style={{ textAlign: "center" }}>
                License
              </th>
            </tr>
            <tr className="secondary-headers-20">
              <th colSpan="1" rowSpan="1" style={{ textAlign: "center" }}>
                Number
              </th>
              <th colSpan="1" rowSpan="1" style={{ textAlign: "center" }}>
                Validity
              </th>
            </tr>
          </thead>
          <tbody>
            {cselibilityRecord?.map((item, key) => {
              return (
                <tr
                  className="trHoverBody"
                  onClick={() => {
                    setSgEligibility(item);
                    setTogEditModal(true);
                  }}
                  key={key}
                >
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    {eligibilityInputItems[item?.cse_app_title]?.label}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {item?.cse_app_rating}
                  </td>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    {item?.cse_app_place}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {item?.cse_app_date}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {item?.cse_app_license}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {item?.cse_app_validity}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        style={{ display: "flex", flexDirection: "row", justifyContent: "end" }}
      >
        <ButtonComponent
          onClick={() => setTogModal(true)}
          buttonName="Add"
          buttonLogoStart={<MdAdd />}
        />
      </div>
    </React.Fragment>
  );
};

export default EligibilityTab;
