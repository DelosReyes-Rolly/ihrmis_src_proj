export const useSelectValueCon = () => {
	const displayData = (title, data) => {
		let value = "";
		data.forEach((element) => {
			if (element.title === title) {
				value = element.id;
			}
		});
		return value;
	};

	const trueValue = (id, data) => {
		let value = "";
		data.forEach((element) => {
			if (element.id == id && element.id != undefined) {
				value = element.title;
			}
		});
		return value;
	};

	return { trueValue, displayData };
};
