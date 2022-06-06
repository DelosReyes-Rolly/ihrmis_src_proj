import React from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../../../common/button_component/button_component.js.js";
import {
  civilStatusDisplay,
  getCitizenDisplay,
} from "../../static/display_option.js";

const PersonalTab = () => {
  const { employee } = useSelector((state) => state.employee);
  const children = employee?.children;
  // const dispatch = useDispatch();

  const displayCitizen = getCitizenDisplay(
    employee?.profile?.emp_filipino,
    employee?.profile?.emp_dual_type,
    employee?.profile?.emp_dual_cny_id
  );

  return (
    <React.Fragment>
      <div className="default-table" style={{ margin: "20px 0px" }}>
        <table className="table-design">
          <thead>
            <tr className="main-header">
              <th colSpan="6">PERSONAL INFORMATION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="secondary-headers-20">NAME TITLE</th>
              <th className="secondary-headers-20">PLACE OF BIRTH</th>
              <th className="secondary-headers-20">DATE OF BIRTH</th>
              <th className="secondary-headers-20">SEX</th>
              <th className="secondary-headers-20">BLOOD TYPE</th>
              <th className="secondary-headers-20">HEIGHT (m)</th>
            </tr>
            <tr>
              <td>{employee?.emp_title}</td>
              <td>{employee?.profile?.emp_birth_place ?? ""}</td>
              <td>{employee?.profile?.emp_birth_date ?? ""}</td>
              <td>{employee?.profile?.emp_sex === "M" ? "Male" : "Female"}</td>
              <td>{employee?.profile?.emp_blood_type ?? ""}</td>
              <td>{employee?.profile?.emp_height ?? ""}</td>
            </tr>
            <tr>
              <th className="secondary-headers-20" colSpan="2">
                CIVIL STATUS
              </th>
              <th className="secondary-headers-20">GSIS ID NO.</th>
              <th className="secondary-headers-20">PHILHEALTH NO.</th>
              <th className="secondary-headers-20" colSpan="2">
                WEIGHT (kg)
              </th>
            </tr>
            <tr>
              <td colSpan="2">
                {civilStatusDisplay[employee?.profile?.emp_civil_status]}
              </td>
              <td>{employee?.profile?.emp_gsis ?? ""}</td>
              <td>{employee?.profile?.emp_philhealth ?? ""}</td>
              <td colSpan="2">{employee?.profile?.emp_weight ?? ""}</td>
            </tr>
            <tr>
              <th className="secondary-headers-20" colSpan="2">
                CITIZENSHIP
              </th>
              <th className="secondary-headers-20">PAG-IBIG ID NO.</th>
              <th className="secondary-headers-20">SSS NO.</th>
              <th className="secondary-headers-20" colSpan="2">
                TIN NO.
              </th>
            </tr>
            <tr>
              <td colSpan="2">{displayCitizen}</td>
              <td>{employee?.profile?.emp_pagibig ?? ""}</td>
              <td>{employee?.profile?.emp_sss ?? ""}</td>
              <td colSpan="2">{employee?.profile?.emp_tin ?? ""}</td>
            </tr>
            <tr>
              <th className="secondary-headers-20" colSpan="2">
                RESIDENTIAL ADDRESS
              </th>
              <th className="secondary-headers-20" colSpan="4">
                PERMANENT ADDRESS
              </th>
            </tr>
            <tr>
              <td colSpan="2">{employee?.profile?.emp_resident_addr ?? ""}</td>
              <td colSpan="4">{employee?.profile?.emp_permanent_addr ?? ""}</td>
            </tr>
            <tr>
              <th className="secondary-headers-20">TELEPHONE NO.</th>
              <th className="secondary-headers-20">MOBILE NO.</th>
              <th className="secondary-headers-20" colSpan="4">
                EMAIL ADDRESS
              </th>
            </tr>
            <tr>
              <td>{employee?.profile?.emp_tel_no ?? ""}</td>
              <td>{employee?.profile?.emp_mobile_no ?? ""}</td>
              <td colSpan="4">{employee?.profile?.emp_email_addr ?? ""}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        style={{ display: "flex", flexDirection: "row", justifyContent: "end" }}
      >
        <ButtonComponent
          buttonName="Edit"
          buttonLogoStart={<BsFillPencilFill />}
        />
      </div>
      {/* FAMILY AND CHILDREN TABLE */}
      <div className="default-table" style={{ margin: "20px 0px" }}>
        <table>
          <thead>
            <tr className="main-header">
              <th colSpan="2">FAMILY BACKGROUND</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="secondary-headers-20">SPOUSE NAME</th>
              <th className="secondary-headers-20">OCCUPATION</th>
            </tr>
            <tr>
              <td>
                {employee?.family?.emp_sps_nm_last},{" "}
                {employee?.family?.emp_sps_nm_first}{" "}
                {employee?.family?.emp_sps_nm_mid}{" "}
                {employee?.family?.emp_sps_nm_extn}
              </td>
              <td>{employee?.family?.emp_sps_occupation}</td>
            </tr>
            <tr>
              <th className="secondary-headers-20">EMPLOYER/BUSINESS NAME</th>
              <th className="secondary-headers-20">BUSINESS ADDRESS</th>
            </tr>
            <tr>
              <td>{employee?.family?.emp_sps_bus_name}</td>
              <td rowSpan="3">{employee?.family?.emp_sps_bus_addr}</td>
            </tr>
            <tr>
              <th className="secondary-headers-20">TELEPHONE</th>
            </tr>
            <tr>
              <td>{employee?.family?.emp_sps_tel_no}</td>
            </tr>
            <tr>
              <th className="secondary-headers-20">FATHERS'S NAME</th>
              <th className="secondary-headers-20">MOTHER'S MAIDEN NAME</th>
            </tr>
            <tr>
              <td>
                {employee?.family?.emp_fthr_nm_last},{" "}
                {employee?.family?.emp_fthr_nm_first}{" "}
                {employee?.family?.emp_fthr_nm_mid}{" "}
                {employee?.family?.emp_fthr_nm_extn}
              </td>
              <td>
                {employee?.family?.emp_mthr_nm_last},{" "}
                {employee?.family?.emp_mthr_nm_first}{" "}
                {employee?.family?.emp_mthr_nm_mid}{" "}
                {employee?.family?.emp_mthr_nm_extn}
              </td>
            </tr>
            <tr>
              <th className="secondary-headers-20">NAME OF CHILDREN</th>
              <th className="secondary-headers-20">DATE OF BIRTH</th>
            </tr>

            {children?.map((el, key) => {
              return (
                <tr key={key}>
                  <td>{el?.chi_emp_name}</td>
                  <td>{el?.chi_emp_birthdate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          marginBottom: "80px",
        }}
      >
        <ButtonComponent
          buttonName="Edit"
          buttonLogoStart={<BsFillPencilFill />}
        />
      </div>
    </React.Fragment>
  );
};

export default PersonalTab;
