import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsTrashFill, BsX, BsXLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { setRefresh } from "../../../../../../features/reducers/popup_response";
import {
  ALERT_ENUM,
  popupAlert,
  popupConfirmation,
} from "../../../../../../helpers/alert_response";
import {
  API_HOST,
  SANCTUM,
} from "../../../../../../helpers/global/global_config";
import { useIsMounted } from "../../../../../../helpers/use_hooks/isMounted";
import IconComponent from "../../../../../common/icon_component/icon";
import { deleteDocument, functions } from "../../../static/functions";

const DocumentListComponent = ({ applicantId, isDisplay, level, cluster }) => {
  const mounted = useIsMounted();
  const { refresh } = useSelector((state) => state.popupResponse);
  const [requirements, setDocumentRequirements] = useState([]);

  const getUploadedDocuments = async () => {
    let options = [];
    await axios
      .get(
        API_HOST +
          "get-uploaded-documents/" +
          level +
          "/" +
          cluster +
          "/" +
          applicantId
      )
      .then((response) => {
        let data = response.data.data;
        data.forEach((element) => {
          let temp = {
            id: element.doc_id,
            title: element.doc_name,
            filled: false,
            file: [],
          };
          if (element.tbldocumentary_attachments.length !== 0) {
            element.tbldocumentary_attachments.forEach((value, index) => {
              const count = index + 1;
              let add = {
                id: value.att_id,
                title: element.doc_name + " - " + count,
                filled: true,
                file: value.att_app_file,
              };
              options.push(add);
            });
          } else {
            options.push(temp);
          }
        });
      })
      .catch((error) => {});
    if (!mounted.current) return;
    if (options.length > 0) {
      setDocumentRequirements(options);
    } else {
      setDocumentRequirements([
        {
          none: "none",
        },
      ]);
    }
  };

  useEffect(() => {
    getUploadedDocuments();
  }, [applicantId, refresh, isDisplay]);
  return (
    <React.Fragment>
      <table className="documents_table">
        <tbody>
          <TableList data={requirements ?? []} counter={0} />
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default DocumentListComponent;

const TableList = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      {data.map((element, key) => {
        return (
          <tr key={key}>
            {element?.filled === true && (
              <td
                id={"document_text"}
                data-tip
                data-for={"rc-dc-txt" + key}
                onClick={() => {
                  window.open(
                    SANCTUM +
                      "storage/applicant/applicant-docs/" +
                      element.file,
                    "_blank"
                  );
                }}
                className={
                  element.filled === false ? "unfilled" : "td-file-list"
                }
              >
                <ReactTooltip id={"rc-dc-txt" + key} place="top" effect="solid">
                  Open {element.title} in another Window
                </ReactTooltip>
                {element.title}
              </td>
            )}
            {element?.filled === false && (
              <td
                id={"document_text"}
                data-tip
                data-for={"rc-dc-txt" + key}
                className={element.filled === false ? "unfilled" : ""}
              >
                {element.title}
              </td>
            )}
            <td
              className="col-2 w5 email_icon"
              onClick={() => {
                popupConfirmation({
                  title: "Confirmation",
                  message: "Are you sure you want to delete this document?",
                  type: ALERT_ENUM.fail,
                  cancel: true,
                  functions: functions['deleteDocument'],
                  value: element.id,
                  dispatch: dispatch,
                });
              }}
            >
              <IconComponent
                id={"delete " + key}
                className={
                  element.filled === false
                    ? "gone"
                    : "delete point"
                }
                icon={<BsX />}
                position="top"
                toolTipId={"rc-vp-mail-" + key}
                textHelper={"Delete this file?"}
              />
            </td>
          </tr>
        );
      })}
    </React.Fragment>
  );
};
