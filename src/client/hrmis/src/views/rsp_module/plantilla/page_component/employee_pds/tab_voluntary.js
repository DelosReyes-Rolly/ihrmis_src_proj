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
import ThreeAddVoluntrayWorkModal from "../../../../pds_form/parts/add_modals/three_add_voluntary";

const fetchEmployeeVoluntary = async (id) => {
  let data = [];
  await axios
    .get(API_HOST + "get-emp_vol/" + id)
    .then((res) => {
      data = res.data.data;
    })
    .catch((err) => console.log(err.response.data.message ?? err.message));
  return data;
};

const removeVoluntary = async (id) => {
  await axios
    .delete(API_HOST + "remove-emp_vol/" + id)
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

const VoluntaryTab = () => {
  const [voluntaryRecord, setVoluntaryRecord] = useState([]);
  const [togModal, setTogModal] = useState(false);
  const [togEditModal, setTogEditModal] = useState(false);
  const [sgVoluntary, setSgVoluntary] = useState(undefined);

  const { item } = useParams();
  const dispatch = useDispatch();

  const removeTrnHandler = async () => {
    dispatch(setBusy(true));
    setTogEditModal(false);
    await removeVoluntary(sgVoluntary?.vol_id);
    dispatch(setBusy(false));
  };

  useEffect(() => {
    const fetcher = async () => {
      setVoluntaryRecord(await fetchEmployeeVoluntary(item));
    };
    fetcher();
  }, [togEditModal, togModal]);

  return (
    <React.Fragment>
      <ThreeAddVoluntrayWorkModal
        isDisplay={togModal}
        onClose={() => setTogModal(false)}
        endpoint="add-update-emp_vol"
      />

      <ThreeAddVoluntrayWorkModal
        isDisplay={togEditModal}
        onClose={() => setTogEditModal(false)}
        endpoint="add-update-emp_vol"
        reference={sgVoluntary}
        remove={removeTrnHandler}
      />
      <div className="default-table" style={{ margin: "20px 0px" }}>
        <table id="table-design" style={{ cursor: "default" }}>
          <thead>
            <tr className="main-header">
              <th colSpan="12">
                VOLUNTARY WORK OR INVOLVEMENT IN
                CIVIC/NON-GOVERNMENT/PEOPLE/VOLUNTARY ORGANIZATION
              </th>
            </tr>
            <tr className="secondary-headers-20">
              <th colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>
                Name & Address of Organization
              </th>
              <th colSpan="4" rowSpan="1" style={{ textAlign: "center" }}>
                Inclusive Dates
              </th>
              <th colSpan="1" rowSpan="2" style={{ textAlign: "center" }}>
                Number of Hours
              </th>
              <th colSpan="2" rowSpan="2" style={{ textAlign: "center" }}>
                Position / Nature of Work
              </th>
            </tr>
            <tr className="secondary-headers-20">
              <th colSpan="2" rowSpan="1" style={{ textAlign: "center" }}>
                From
              </th>
              <th colSpan="2" rowSpan="1" style={{ textAlign: "center" }}>
                To
              </th>
            </tr>
          </thead>

          <tbody>
            {voluntaryRecord?.map((item, key) => {
              return (
                <tr
                  className="trHoverBody"
                  key={key}
                  onClick={() => {
                    setSgVoluntary(item);
                    setTogEditModal(true);
                  }}
                >
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {item?.vol_app_org}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {item?.vol_app_from}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {item?.vol_app_to}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {item?.vol_app_hours}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {item?.vol_app_work}
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

export default VoluntaryTab;
