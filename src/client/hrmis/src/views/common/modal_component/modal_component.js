import React from "react";
import { MdClose } from "react-icons/md";
import ButtonComponent from "../button_component/button_component.js";
import { CSSTransition } from "react-transition-group";
import { CgMaximizeAlt } from "react-icons/cg";

const ModalComponent = (props) => {
	const buttonAlignment = {
		padding: "0px",
		margin: "0px",
		background: "whitesmoke",
		border: "none",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};
	const newbuttonAlignment = {
		padding: "0px",
		margin: "0px",
		background: "whitesmoke",
		border: "none",
		display: props.displayMaxView ?? "flex",
		justifyContent: "center",
		alignItems: "center",
	};
	const modalViewFunction = () => {
		return (
			<React.Fragment>
				<div className="modal-component-div" onClick={props.onClose}>
					{props.addElement}
					<form
						style={props.fullScreen ? { maxWidth: "98%" } : {}}
						onSubmit={props.onSubmit}
						onClick={(e) => e.stopPropagation()}
					>
						<div className="mcf-header">
							<h3>{props.title}</h3>

							<div
								style={{
									display: "flex",
									flexDirection: "row",
									gap: "15px",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<button
									type="button"
									onClick={props.onMaxView}
									style={newbuttonAlignment}
								>
									<CgMaximizeAlt size="17px" />
								</button>

								<button
									type="button"
									onClick={props.onClose}
									style={buttonAlignment}
								>
									<MdClose size="20px" />
								</button>
							</div>
						</div>
						<hr style={{ border: "1px solid rgba(70, 70, 70, 0.1)" }} />
						<div className="mcf-body">{props.children}</div>
						<hr style={{ border: "1px solid rgba(70, 70, 70, 0.1)" }} />
						<div className="mcf-footer">
							{props.onPressedHidden ? (
								""
							) : (
								<div>
									<ButtonComponent
										className={
											props.onPressStyle ? props.onPressStyle : "ft-button "
										}
										type="button"
										bgColor="rgb(230, 230, 230)"
										border="1px solid rgba(70, 70, 70, 0.8)"
										onClick={
											props.onPressed != null ? props.onPressed : props.onClose
										}
										buttonName={props.onCloseName}
									/>
								</div>
							)}
							{props.addExtraButton}
							{props.onSubmitHidden ? (
								""
							) : (
								<div className="">
									<ButtonComponent
										className={props.onSubStyle}
										type={props.onSubmitType}
										buttonName={props.onSubmitName}
										onClick={props.onClickSubmit ?? null}
									/>
								</div>
							)}
						</div>
					</form>
				</div>
			</React.Fragment>
		);
	};

	return (
		<React.Fragment>
			<CSSTransition
				in={props.isDisplay}
				unmountOnExit
				timeout={200}
				classNames="modal-trans"
			>
				{modalViewFunction()}
			</CSSTransition>
		</React.Fragment>
	);
};

ModalComponent.defaultProps = {
	title: "Title",
	isDisplay: false,
	onSubmitName: "Submit",
	onSubmitType: "button",
	onCloseName: "Close",
};

export default ModalComponent;
