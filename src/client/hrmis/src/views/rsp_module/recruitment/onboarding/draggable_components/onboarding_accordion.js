import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { BiGridVertical } from 'react-icons/bi';
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';

const OnboardingAccordion = ({ title, id }) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<Draggable draggableId='droppable' index={id}>
			{(provided) => (
				<div
					style={{ display: 'flex', marginBottom: '8px' }}
					{...provided.droppableProps}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					{this.props.task.content}
					<BiGridVertical style={{ paddingRight: '5px' }} size='36px' />
					<div className='accordion-item'>
						<div
							className='accordion-title'
							onClick={() => setIsActive(!isActive)}
						>
							<div>{title}</div>
							<div style={{ justifyContent: 'flex-end' }}>
								{isActive ? (
									<BsCaretUpFill size='22px' />
								) : (
									<BsCaretDownFill size='22px' />
								)}
							</div>
						</div>
						{isActive && <div className='accordion-content'>{id}</div>}
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default OnboardingAccordion;
