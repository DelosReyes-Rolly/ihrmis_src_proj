import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import ButtonComponent from "../../common/button_component/button_component.js";

const PrevNextSubButtons = (props) => {
  const { item } = useParams();

  return (
    <React.Fragment>
      <div className="next-submit-back-button">
        {props.page === 1 ? undefined : (
          <ButtonComponent
            type="button"
            buttonLogoStart={<AiOutlineLeft size="15px" />}
            className="back-button"
            buttonName="Back"
            onClick={props.onClickBack}
          />
        )}

        {props.page === 3 ? undefined : (
          <ButtonComponent
            type="submit"
            form={props.form}
            className={
              props.page === 6 ? "last-submit-button" : "submit-button"
            }
            buttonName={
              item != null ? (props.page === 6 ? "Submit" : "Save") : "Submit"
            }
          />
        )}

        {props.page === 6 ? undefined : props.page === 1 ? (
          item != null ? (
            <ButtonComponent
              type="button"
              buttonLogoEnd={<AiOutlineRight size="15px" />}
              className="next-button"
              buttonName="Next"
              onClick={props.onClickNext}
            />
          ) : undefined
        ) : (
          <ButtonComponent
            type="button"
            buttonLogoEnd={<AiOutlineRight size="15px" />}
            className="next-button"
            buttonName="Next"
            onClick={props.onClickNext}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default PrevNextSubButtons;
