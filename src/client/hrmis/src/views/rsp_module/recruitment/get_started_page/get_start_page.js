import axios from "axios";
import React, { Children, useEffect, useRef, useState } from "react";
import NavbarGetStartedPage from "./navbar_get_started";
import { API_HOST, SANCTUM } from "../../../../helpers/global/global_config";
import { outsiteWebHelper } from "../../../../router/outside_routes";

const GetStartedPage = () => {
  const [selected, setSelected] = useState();
  const [onBoarindList, setOnBoarindList] = useState([]);
  const scrollReference = useRef([]);

  const fetchOnboardingList = async () => {
    await axios
      .get(API_HOST + "get-onboarding-lists")
      .then((res) => {
        // console.log(res.data[0].sectionitem[2].attachments);
        setOnBoarindList(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    fetchOnboardingList();
  }, []);

  useEffect(() => {
    const convetString = selected + "";
    const splittedArray = convetString.split(".");
    console.log(parseInt(splittedArray[1]) - 1);
    scrollReference.current[parseInt(splittedArray[1] - 1)]?.scrollIntoView();
  }, [selected]);

  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  if (isMobile) {
    return (
      <div>
        <NavbarGetStartedPage />
      </div>
    );
  }
  return (
    <React.Fragment>
      <div>
        <NavbarGetStartedPage />
        <div className="onboarding-display-container">
          <div className="timeline-container-2"></div>
          <div className="timeline-container">
            <TimelineComponent selectedValue={setSelected}>
              {onBoarindList?.map((main) => {
                const subItem = main.sectionitem;
                return (
                  <TimelineMainItem
                    key={main?.sec_onb_id}
                    name={main?.sec_onb_name}
                    id={main?.sec_onb_id}
                  >
                    {subItem?.map((sub) => {
                      return (
                        <TimelineSubItem
                          key={sub?.itm_onb_id}
                          name={sub?.itm_onb_name}
                          id={sub?.itm_onb_id}
                        />
                      );
                    })}
                  </TimelineMainItem>
                );
              })}
            </TimelineComponent>
          </div>

          <div className="display-content-onboarding">
            <div className="scrollable-container">
              {onBoarindList.map((element, index) => {
                if (Math.floor(selected) - 1 === index)
                  return (
                    <DisplayOnboardingItemList
                      refer={scrollReference}
                      key={element.sec_onb_id}
                      itemElement={element.sectionitem}
                    />
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GetStartedPage;

const DisplayOnboardingItemList = ({ itemElement = [], refer }) => {
  return (
    <React.Fragment>
      {itemElement?.map((item, index) => {
        return (
          <div
            ref={(element) => {
              refer.current[index] = element;
            }}
            key={item?.itm_onb_id}
          >
            <div className="header-title">
              <h1>{item?.itm_onb_name}</h1>
            </div>
            <div className="onboarding-content">
              <div
                dangerouslySetInnerHTML={{ __html: item?.itm_onb_content }}
              />
            </div>
            <div
              style={{ marginTop: "30px", color: "#408fd6", cursor: "pointer" }}
            >
              <p>Aditional Resource</p>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {item.attachments.map((link, key) => {
                  return (
                    <p
                      key={key}
                      style={{ color: "#408fd6", cursor: "pointer" }}
                      onClick={() => outsiteWebHelper(SANCTUM + link)}
                    >
                      + Attachment-{key + 1}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

/// Dropdown timeline
const TimelineComponent = ({ selectedValue = null, id = null, ...props }) => {
  const [SELECTED, SETSELECTED] = useState(1);
  const [SUBSELECTED, SETSUBSELECTED] = useState(1);

  const reference = useRef([]);

  const changeColor = (counter) => {
    const makeArray = [...Array(Children.count(props?.children)).keys()];
    makeArray.forEach((item) => {
      reference.current[item + 1].className = "timeline-main-item";
    });

    reference.current[counter].className =
      "timeline-main-item timeline-component-active";

    SETSELECTED(counter);
  };

  const childrenWithProps = React.Children.map(
    props.children,
    (child, count) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          selectedSetter: SETSUBSELECTED,
          count: count + 1,
          reference: reference,
          onClick: () => changeColor(count + 1),
          selected: SELECTED,
          length: Children.count(props.children),
        });
      }
      return child;
    }
  );

  useEffect(() => {
    SETSUBSELECTED(1);
  }, [SELECTED]);

  useEffect(() => {
    if (selectedValue !== null) {
      selectedValue(SELECTED + "." + SUBSELECTED);
    }
  }, [SELECTED, SUBSELECTED]);

  return <div className="timeline-component">{childrenWithProps}</div>;
};

const TimelineMainItem = ({ name = "About Dost", ...props }) => {
  const subReference = useRef([]);

  const changeColor = (counter) => {
    props.selectedSetter(counter);
    const makeArray = [...Array(Children.count(props.children)).keys()];
    makeArray.forEach((item) => {
      subReference.current[item + 1].className = "radio-circle";
    });

    const coloredArray = [...Array(counter).keys()];
    coloredArray.forEach((item) => {
      subReference.current[item + 1].className =
        "radio-circle radio-circle-active";
    });
  };

  const childrenWithProps = React.Children.map(
    props.children,
    (child, count) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          setMainId: props.setMainId,
          setSubId: props.setSubId,
          count: count + 1,
          subReference: subReference,
          onClick: () => changeColor(count + 1),
          length: Children.count(props.children),
        });
      }
      return child;
    }
  );

  useEffect(() => {
    if (props?.selected === 1 && props?.count === 1) {
      const activeName = props?.reference.current[props.count];
      activeName.className = "timeline-main-item timeline-component-active";
    }
  }, []);

  return (
    <React.Fragment>
      <div
        ref={(el) => (props.reference.current[props.count] = el)}
        className="timeline-main-item"
      >
        <div className="item-line">
          <div onClick={() => props.onClick()} className="timeline-circle">
            <strong>{props?.count}</strong>
          </div>
          {props?.count !== props?.length && props?.selected !== props?.count && (
            <React.Fragment>
              <div className="vline"></div>
            </React.Fragment>
          )}

          {props?.selected === props?.count && (
            <div className="sub-item-list">{childrenWithProps}</div>
          )}
        </div>

        <p>
          <strong>{name}</strong>
        </p>
      </div>
    </React.Fragment>
  );
};

const TimelineSubItem = ({ name = "History", ...props }) => {
  useEffect(() => {
    if (props?.count === 1) {
      const activeName = props?.subReference.current[props.count];
      activeName.className = "radio-circle radio-circle-active";
    }
  }, []);

  return (
    <React.Fragment>
      <div className="item-submenu">
        <div className="sub-vline"></div>
        <div
          ref={(el) => (props.subReference.current[props.count] = el)}
          className="radio-circle"
          onClick={() => props?.onClick()}
        >
          <div className="radio-circle-inside"></div>
        </div>
        {props.count === props.length && <div className="sub-vline"></div>}
        <div className="floating-name">{name}</div>
      </div>
    </React.Fragment>
  );
};
