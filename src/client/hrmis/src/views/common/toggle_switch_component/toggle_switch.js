import React from 'react';

const ToggleSwitchComponent = (props) => {
	return (
		<label className='switch'>
			{}
			<input
				ref={props.checkboxRef}
				onClick={props.onClick}
				value='1'
				type='checkbox'
				name={props.name}
				onChange={props.onChange}
			/>
			<span className='slider round'></span>
		</label>
	);
};

export default ToggleSwitchComponent;
