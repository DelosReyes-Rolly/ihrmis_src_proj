import React, { memo, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoIosMore } from "react-icons/io";
import { CSSTransition } from "react-transition-group";

const AccordionComponent = ({ children, title, listItemGetter }) => {
  const [toggle, setToggle] = useState(true);
  const [toggleMore, setToggleMore] = useState(false);

  const fakeList = [
    {
      value: "0",
      label: "Add Item",
    },
    {
      value: "1",
      label: "Delete",
    },
  ];

  return (
    <React.Fragment>
      <div className="accordion-container">
        <div
          className="accordion-header"
          style={toggle ? null : { borderRadius: "5px" }}
        >
          <div
            className="title-header"
            onClick={(e) => {
              setToggle(!toggle);
            }}
          >
            <div className="icon-accordion-div">
              {toggle ? (
                <IoIosArrowDown size={20} />
              ) : (
                <IoIosArrowUp size={20} />
              )}
            </div>
            <div>{title ?? "Accordion Title"}</div>
          </div>

          <div
            className="more-icon"
            onClick={(e) => {
              e.stopPropagation();
              setToggleMore(!toggleMore);
            }}
          >
            <IoIosMore size={30} />
            {toggleMore && (
              <div className="drop-list">
                <DropListItem
                  list={fakeList}
                  listItemGetter={listItemGetter}
                  setToggleMore={setToggleMore}
                />
              </div>
            )}
          </div>
        </div>

        <CSSTransition
          in={toggle}
          unmountOnExit
          timeout={200}
          classNames="accordion-trans"
        >
          <div className="accordion-body">{children}</div>
        </CSSTransition>
      </div>
    </React.Fragment>
  );
};

export default memo(AccordionComponent);

const DropListItem = memo(({ list = [], listItemGetter, setToggleMore }) => {
  return (
    <React.Fragment>
      <div className="drop-list-item">
        {list?.map((item) => {
          return (
            <div
              key={item?.value}
              className="item"
              onClick={(e) => {
                if (listItemGetter !== undefined) listItemGetter(item?.value);
                setToggleMore(false);
              }}
            >
              {item?.label}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
});
