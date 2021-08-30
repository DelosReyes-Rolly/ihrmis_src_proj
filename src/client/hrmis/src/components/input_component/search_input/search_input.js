import React, { Component } from 'react';
import './search_input.css'

class SearchComponent extends Component {
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
 
export default SearchComponent;