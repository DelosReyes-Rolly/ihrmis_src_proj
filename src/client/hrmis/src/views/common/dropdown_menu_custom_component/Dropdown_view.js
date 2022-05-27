import React, { useEffect, useRef, useState } from 'react';
import { AiFillCaretUp } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

const DropdownViewComponent = ({
	title = {},
	className,
	itemList,
	alignItems = 'start',
	toolTipId,
	textHelper,
	position = 'top',
	effect = 'solid',
	setValue,
}) => {
	const [dropable, setDropable] = useState(false);
	const timerRef = useRef();
	const navigate = useNavigate();
	const location = useRef();

	const selectedProperty = (link = null) => {
		if (link !== null) {
			navigate(link);
			setDropable(false);
		}

		if (link === null) {
			timerRef.current = setTimeout(() => {
				setDropable(false);
			}, 200);
		}
	};

	return (
		<div
			style={{
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				alignItems: alignItems,
			}}
			ref={location}
			onBlur={() => selectedProperty()}
		>
			{toolTipId && (
				<ReactTooltip id={toolTipId} place={position} effect={effect}>
					{textHelper}
				</ReactTooltip>
			)}

			<button
				data-tip
				data-for={toolTipId}
				className={className}
				style={{ width: 'max-content' }}
				onClick={() => {
					setDropable(!dropable);
				}}
			>
				{title}
			</button>
			{itemList && (
				<DropList
					itemList={itemList}
					display={dropable ? 'block' : 'none'}
					onClick={selectedProperty}
					setValue={setValue}
					location={location}
				/>
			)}
		</div>
	);
};

export default DropdownViewComponent;

const DropList = ({ itemList = [], display = 'none', setValue, location }) => {
	const navigate = useNavigate();
	const size = useRef();
	const [x, setx] = useState(0);
	const [y, sety] = useState(0);
	const linkDetector = (item) => {
		if (typeof item === "string" || item instanceof String)
			return navigate(item);
		else if (typeof item === "function") {
			item();
		}
	};

	useEffect(() => {
		setx(
			location.current.getBoundingClientRect().x - size.current.clientWidth + 20
		);
		sety(location.current.getBoundingClientRect().y + 30);
	}, [display]);

	return (
		<React.Fragment>
			<ul
				className='ul-dropdown-container'
				ref={size}
				style={{ display: display, position: 'fixed', top: y, left: x }}
			>
				<div className='ul-menu-item-arrow'>
					<AiFillCaretUp size='15px' />
				</div>
				{itemList?.map((element, key) => {
					return (
						<li
							style={{ listStyle: 'none' }}
							className='ul-menu-item'
							onClick={() => {
								setValue(element.id);
								linkDetector(element);
							}}
							key={key}
						>
							{element.label}
						</li>
					);
				})}
			</ul>
		</React.Fragment>
	);
};
