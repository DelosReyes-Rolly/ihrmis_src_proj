import React from 'react';

const CheckboxComponent = (props) => {
    return (
        <input className={props.className} checked={props.checked} onChange={props.onChange} type="checkbox">
        </input>
    );
}


export default CheckboxComponent;