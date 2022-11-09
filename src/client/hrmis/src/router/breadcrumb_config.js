import React from "react";
import { useNavigate } from "react-router-dom";

export const crumbFirstLevel = () => {
	const route = [
		{
			label: "Home",
			route: "/rsp",
		},
		{
			label: "Home",
			route: "/rsp",
		},
		{
			label: "Library",
			route: "/library",
		},
		{
			label: "Home",
			route: "/rsp",
		},
		{
			label: "Home",
			route: "/rsp",
		},
	];
	const getFirstLevel = (number) => {
		let newArr = [];
		newArr.push(route[number]);
		return newArr;
	};

	return { getFirstLevel };
};

export const crumbSecondLevel = () => {
	const route = [
		{
			label: "Plantilla",
			route: "/ihrmis/plantilla",
		},
		{
			label: "Dashboard",
			route: "/ihrmis/Dashboard",
		},
		{
			label: "Office",
			route: "/ihrmis/library",
		},
		{
			label: "Calendar",
			route: "/ihrmis/calendar",
		},
		{
			label: "Learning",
			route: "/learning/development/submissions",
		},
	];

	const getSecondLevel = (number) => {
		const { getFirstLevel } = crumbFirstLevel();
		let newArr = [];
		getFirstLevel(number).forEach((element) => {
			console.log(element?.length);
			newArr.push(element);
		});
		newArr.push(route[number]);
		return newArr;
	};

	return { getSecondLevel };
};

export const crumbThirdLevel = () => {
	const route = [
		{ label: "Employee", route: "ihrmis/employee" },
		{ label: "Plantilla Items", route: "ihrmis/plantilla-items" },
		{ label: "Office", route: "ihrmis/office" },
		{ label: "Office", route: "ihrmis/office" },
		{ label: "Development Plan", route: "ihrmis/submissionView" },
	];

  const getThirdLevel = (number) => {
		const { getSecondLevel } = crumbSecondLevel();
		let newArr = [];
    	getSecondLevel(number).forEach((element) => {
			console.log(element?.length);
			newArr.push(element);
		});
		newArr.push(route[number]);
		return newArr;
	};

  return { getThirdLevel };
};

// const getThirdLevel = (number) => {
// 	const { getFirstLevel } = crumbFirstLevel();
// 	const { getSecondLevel } = crumbSecondLevel();
// 	let newArr = [];
// 	getSecondLevel(number).forEach((element) => {
// 		console.log(element?.length);
// 		newArr.push(element);
// 	});
// 	newArr.push(route[number]);
// 	return newArr;
// };

// return { getThirdLevel };

const BreadcrumbConfig = ({ array = [] }) => {
	const navigate = useNavigate();
	return (
		<React.Fragment>
			<ul
				className="breadcrumb"
				style={{ display: "flex", flexDirection: "row" }}
			>
				{array.map((element, index) => {
					if (index === array.length - 1)
						return (
							<li style={{ color: "grey" }} key={index}>
								{element?.label}
							</li>
						);
					return (
						<li key={index} onClick={() => navigate(element.route)}>
							<span>{element?.label}</span>
						</li>
					);
				})}
			</ul>
		</React.Fragment>
	);
};

export default BreadcrumbConfig;
