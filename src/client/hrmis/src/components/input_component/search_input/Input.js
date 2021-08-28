import React, { Component } from 'react';
import './Input.css'

class InputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    addClassName = "custom-input " + this.props.className;
    render() { 
        return ( 
            <div className="input-div">
                <input className={this.addClassName} placeholder="" />
            </div>
        );
    }
}
 
export default InputComponent;