import { useEffect, useLayoutEffect, useRef, useState } from 'react';
/**
 * This hook is calculates for the location of a parent element and
 * returns the coordinates for the child element for use in a position:fixed css
 */
const usePositionSetter = (event) => {
	/**
	 * X and Y are coordinates to be used by the child element
	 * Location is to be used as a ref in the parent element (It will get the Elements Postion via BoudingRect)
	 * ElementSize is to be used as a ref in the child element (It will be used to move the child element to the correct position)
	 */
	const [x, setx] = useState(0);
	const [y, sety] = useState(0);
	const location = useRef();
	const elementSize = useRef();

	const setPosition = () => {
		if (location.current !== null && elementSize.current !== null) {
			setx(
				location.current.getBoundingClientRect().x -
					elementSize.current.clientWidth +
					location.current.clientWidth
			);
			sety(location.current.getBoundingClientRect().y + 30);
		}
	};

	useLayoutEffect(() => {
		setPosition();
		window.addEventListener('resize', setPosition, false);
		window.addEventListener('scroll', setPosition, false);
	}, [event]);

	return [x, y, location, elementSize];
};
export default usePositionSetter;
