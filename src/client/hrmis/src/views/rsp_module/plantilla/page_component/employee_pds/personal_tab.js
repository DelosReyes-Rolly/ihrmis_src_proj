import React from "react";
import { BsFillPencilFill } from "react-icons/bs";
import ButtonComponent from "../../../../common/button_component/button_component.js";

const PersonalTab = () => {
  return (
    <React.Fragment>
      <div className="default-table" style={{ margin: "20px 0px" }}>
        <table className="table-design">
          <thead>
            <tr className="main-header">
              <th colspan="6">PERSONAL INFORMATION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="secondary-headers">NAME TITLE</th>
              <th className="secondary-headers">PLACE OF BIRTH</th>
              <th className="secondary-headers">DATE OF BIRTH</th>
              <th className="secondary-headers">SEX</th>
              <th className="secondary-headers">BLOOD TYPE</th>
              <th className="secondary-headers">HEIGHT (m)</th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th className="secondary-headers" colspan="2">
                CIVIL STATUS
              </th>
              <th className="secondary-headers">GSIS ID NO.</th>
              <th className="secondary-headers">PHILHEALTH NO.</th>
              <th className="secondary-headers" colspan="2">
                WEIGHT (kg)
              </th>
            </tr>
            <tr>
              <td colspan="2"></td>
              <td></td>
              <td></td>
              <td colspan="2"></td>
            </tr>
            <tr>
              <th className="secondary-headers" colspan="2">
                CITIZENSHIP
              </th>
              <th className="secondary-headers">PAG-IBIG ID NO.</th>
              <th className="secondary-headers">SSS NO.</th>
              <th className="secondary-headers" colspan="2">
                TIN NO.
              </th>
            </tr>
            <tr>
              <td colspan="2"></td>
              <td></td>
              <td></td>
              <td colspan="2"></td>
            </tr>
            <tr>
              <th className="secondary-headers" colspan="2">
                RESIDENTIAL ADDRESS
              </th>
              <th className="secondary-headers" colspan="4">
                PERMANENT ADDRESS
              </th>
            </tr>
            <tr>
              <td colspan="2"></td>
              <td colspan="4"></td>
            </tr>
            <tr>
              <th className="secondary-headers">TELEPHONE NO.</th>
              <th className="secondary-headers">MOBILE NO.</th>
              <th className="secondary-headers" colspan="4">
                EMAIL ADDRESS
              </th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td colspan="4"></td>
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
    </React.Fragment>
  );
};

export default PersonalTab;
