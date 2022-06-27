import React, { useState } from "react";
import ModalComponent from "../../../../common/modal_component/modal_component";

const DTRModal = ({ isDisplay, onClose }) => {
  // TODO: please contact sir Aren for DTR a day api
  const [dtrData] = useState({
    am_in: "8:13A M",
    am_out: "00:00",
    pm_in: "00:00",
    pm_out: "8:13A M",
  });

  //   const fetchTodayDtr = () => {};
  //   useEffect(() => {}, [isDisplay]);

  const dateNow = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
    weekday: "long",
  });

  return (
    <React.Fragment>
      <ModalComponent
        isDisplay={isDisplay}
        onClose={onClose}
        title="Daily Time Record"
        onSubmitHidden
        onPressedHidden
      >
        <div
          style={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}
        >
          {dateNow}
        </div>
        <br />
        <div className="default-table">
          <table>
            <thead
              className="text-center-alignment "
              style={{ fontSize: "15px" }}
            >
              <tr className="main-header">
                <th colSpan="2">AM</th>
                <th colSpan="2">PM</th>
              </tr>
            </thead>
            <tbody className="text-center-alignment">
              <tr className="secondary-headers">
                <th>IN</th>
                <th>OUT</th>
                <th>IN</th>
                <th>OUT</th>
              </tr>
              <tr>
                <td>{dtrData?.am_in}</td>
                <td>{dtrData?.am_out}</td>
                <td>{dtrData?.pm_in}</td>
                <td>{dtrData?.pm_out}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default DTRModal;
