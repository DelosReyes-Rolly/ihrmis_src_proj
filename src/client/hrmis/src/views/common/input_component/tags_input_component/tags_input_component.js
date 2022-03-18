import React, { forwardRef, useImperativeHandle, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const TagsInputComponent = forwardRef(({ name, onChange, value }, ref) => {
  //STATE PROPERTIES
  const [arrayInputState, setInputState] = useState([]);

  useImperativeHandle(
    ref,
    () => ({
      arrayValue: arrayInputState,
    }),
    [arrayInputState]
  );

  //METHOD
  const onClickDeleteData = (item) => {
    setInputState(arrayInputState.filter((_, index) => index !== item));
  };
  const onPressKeyAddData = (event) => {
    if (event.target.value !== "") {
      setInputState([...arrayInputState, event.target.value]);
      console.log(arrayInputState);
      event.target.value = "";
    }
  };
  return (
    <div className={`tags-input-component`}>
      <ul className="tags-ul">
        {arrayInputState.map((item, index) => {
          return (
            <li className="ul-list-item" key={index}>
              <span style={{ marginRight: "4px" }}>{item}</span>
              <span className="icon-close">
                <AiFillCloseCircle
                  onClick={() => onClickDeleteData(index)}
                  size="12px"
                />
              </span>
            </li>
          );
        })}
        <li className="for-float-left">
          <input
            onKeyUp={(event) =>
              event.key === "Enter" ? onPressKeyAddData(event) : null
            }
            name={name}
            onChange={onChange}
            value={value}
          />
        </li>
      </ul>
    </div>
  );
});

export default TagsInputComponent;
