import React from 'react';

const CheckboxComponent = (props) => {
    return (
        <input className={props.className} type="checkbox">
        </input>
    );
}

CheckboxComponent.defaultProps={
    // className: "",
}

export default CheckboxComponent;