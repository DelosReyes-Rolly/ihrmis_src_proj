import React, { Component } from 'react';

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    addClassName = "custom-input " + this.props.className;
    render() { 
        return ( 
            <div className="input-div">
                <input className={this.addClassName} placeholder={this.props.placeholder} />
            </div>
        );
    }
}
 
export default SearchComponent;