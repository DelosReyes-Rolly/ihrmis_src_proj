const useServiceHooks = () => {
	const removeElementByClass = (className) => {
		let elements = document.getElementsByClassName(className);
		while (elements.length > 0) {
			elements[0].parentNode.removeChild(elements[0]);
		}
	};

	const triggerClickById = (id) => {
		document.getElementById(id).click();
	};

	const triggerClickByClassName = (id) => {
		document.getElementsByClassName(id).click();
	};

	return [removeElementByClass, triggerClickById, triggerClickByClassName];
};

export default useServiceHooks;
