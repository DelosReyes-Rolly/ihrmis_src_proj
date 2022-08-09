import React, { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import NavbarGetStartedPage from "../../../common/get_started_navbar/get_started_navbar";
import IconComponent from "../../../common/icon_component/icon";

const JoinPageMainComponent = () => {
	const [part, setFormPart] = useState(0);
	const { item } = useParams();
	const titles = [
		{
			title: "General Information",
			url: "/join-page/one/" + item ?? "/join-page",
		},
		{
			title: "Contact Information",
			url: "/join-page/two/" + item ?? "",
		},
		{
			title: "Email Verification",
			url: "/join-page/three/" + item ?? "",
		},
		{
			title: "Confirmation",
			url: "/join-page/four/" + item ?? "",
		},
	];
	return (
		<>
			<NavbarGetStartedPage />
			<div className="join-page-body">
				<div className="join-info">
					<p>Complete the form to request for a user access account</p>
					<h1 className="join-info-name">{titles[part]?.title}</h1>
				</div>
				<div className="join-form">
					<div className="form-part">
						<FormNavigator
							setFormPart={setFormPart}
							part={part}
							titles={titles}
						/>
					</div>
					<Outlet />
				</div>
			</div>
		</>
	);
};

const FormNavigator = ({ setFormPart, part, titles }) => {
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		if (location.pathname.includes("two")) {
			setFormPart(1);
		} else if (location.pathname.includes("three")) {
			setFormPart(2);
		} else if (location.pathname.includes("four")) {
			setFormPart(3);
		} else {
			setFormPart(0);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	return (
		<>
			<div className="form-navigator">
				{titles.map((data, index) => {
					return (
						<div
							className={
								part < index
									? "form-navigator-part unfilled"
									: "form-navigator-part filled"
							}
							key={index}
						>
							<div className="form-icon">
								<div
									className={
										part <= index ? "circle unfilled" : "circle filled"
									}
									onClick={() => {
										if (part > index) {
											setFormPart(index);
											navigate(data.url);
										}
									}}
								>
									<b>
										{part > index && (
											<IconComponent
												color="rgba(128, 0, 33, 255)"
												icon={<BsCheck size={25} />}
											/>
										)}
										{part <= index && index + 1}
										{}
									</b>
								</div>
							</div>
							<p>{data.title}</p>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default JoinPageMainComponent;
