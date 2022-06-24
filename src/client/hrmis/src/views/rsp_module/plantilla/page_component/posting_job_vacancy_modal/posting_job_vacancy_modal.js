import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import InputComponent from "../../../../common/input_component/input_component/input_component";
import ModalComponent from "../../../../common/modal_component/modal_component";
import RichTextEditorComponent from "../../../../common/rich_text_editor_component/rich_text_editor_component";

const PostingOnJobVacancyModal = ({ isDisplay, onClose }) => {
  // TODO: Change this array name to actual data name, and use a props that will be use for initializing this array
  const [arrSample, setArrSample] = useState([
    { id: 1, date: "2022-12-23", message: "Wrestle Maniac" },
    { id: 2, date: "2022-12-05", message: "Pro Googler" },
  ]);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);

  const pageNavigator = (isNext) => {
    if (isNext === false) {
      if (page === 0) return setPage(0);
      return setPage(page - 1);
    }
    if (isNext === true) {
      //TODO: Change the array length to actual array name length
      if (page === arrSample.length - 1) return setPage(arrSample.length - 1);
      return setPage(page + 1);
    }
  };

  const formDataHandler = (isMessage, index, value) => {
    // TODO: Change this array to actual array name
    let newFormData = arrSample;
    if (isMessage === true) newFormData[index].message = value;
    if (isMessage === false) newFormData[index].date = value;
    setArrSample(newFormData);
  };

  const removeFormData = (index) => {
    // TODO: Change this array to actual array name
    setLoading(true);
    let newArray = arrSample;
    newArray = newArray.filter((item) => item.id !== newArray[index].id);
    console.log(newArray);
    setArrSample(newArray);
    setTimeout(() => {
      if (newArray.length === 0) return onClose();
      setLoading(false);
    }, 200);
  };

  return (
    <React.Fragment>
      <ModalComponent
        title="Posting On Job Vacancy"
        isDisplay={isDisplay}
        onClose={onClose}
        onPressed={() => removeFormData(page)}
        onCloseName="Remove"
        onSubmitName="Submit"
      >
        <div className="posting-job-vacancy-main">
          {/* TODO: Change this array to actual array name */}
          {arrSample?.map((data, index) => {
            if (index === page) {
              return (
                <React.Fragment key={data.id}>
                  {loading === true ? (
                    <LoaderFunction title="Removing..." />
                  ) : (
                    <EditableContentTemplate
                      item={data}
                      navigate={pageNavigator}
                      setForm={formDataHandler}
                      index={index}
                      currentPage={page}
                      // TODO: Change this array to actual array name
                      count={arrSample.length}
                    />
                  )}
                </React.Fragment>
              );
            }
            return null;
          })}
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default PostingOnJobVacancyModal;

const EditableContentTemplate = ({
  item,
  navigate,
  currentPage,
  count,
  setForm,
  index,
}) => {
  const [state, setState] = useState(false);
  const [itemData, setItemData] = useState(item);

  useEffect(() => {
    setTimeout(() => {
      setState(true);
    }, 300);
  }, [item]);

  const onChangeHandler = (value, isMessage) => {
    const arrHolder = itemData;
    if (isMessage === false) {
      arrHolder.date = value;
      setItemData(arrHolder);
      setForm(false, index, arrHolder.date);
    }
    if (isMessage === true) {
      arrHolder.message = value;
      setItemData(arrHolder);
      setForm(true, index, arrHolder.message);
    }
  };

  if (state === false) {
    return <LoaderFunction />;
  }

  return (
    <React.Fragment>
      <RichTextEditorComponent
        setFieldValue={(val) => {
          onChangeHandler(val, true);
        }}
        value={itemData?.message}

        // value={}
        // toolbar={{
        // 	options: [
        // 		"inline",
        // 		"fontFamily",
        // 		"fontSize",
        // 		"list",
        // 		"textAlign",
        // 		"link",
        // 		"history",
        // 	],
        // 	inline: { inDropdown: true },
        // 	list: { inDropdown: true },
        // 	textAlign: { inDropdown: true },
        // 	link: { inDropdown: true },
        // 	history: { inDropdown: false },
        // }}
      />

      <div className="posting-job-vacancy">
        <span>
          <span
            onClick={() => navigate(false)}
            className={`posting-job-vacancy-anchor ${
              currentPage === 0 && "on-last-page"
            }`}
            href="#"
          >
            {"<<"}
          </span>
        </span>
        <span style={{ paddingLeft: "20px" }}>
          <span
            onClick={() => navigate(true)}
            className={`posting-job-vacancy-anchor ${
              currentPage === count - 1 && "on-last-page"
            }`}
            href="#"
          >
            {">>"}
          </span>
        </span>
      </div>
      <div className="posting-job-vacancy-deadline">
        <label htmlFor="deadline_label">Deadline</label>
        <InputComponent
          className="margin-left"
          type="date"
          value={itemData?.date}
          onChange={(e) => onChangeHandler(e.target.value, false)}
        />
      </div>
    </React.Fragment>
  );
};

const LoaderFunction = ({ title = null }) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 25,
          alignItems: "center",
        }}
      >
        <SyncLoader size={10} color="rgba(0, 78, 135, 1)" />{" "}
        <p style={{ fontSize: "17px" }}> {title ?? "Please Wait"}</p>
      </div>
    </React.Fragment>
  );
};
