import React, { Component } from 'react';
import './Badge.css'

class BadgeComponents extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        }
    }
    addClassName = 'notification-badge ' + this.props.className;

    render() { 
        return ( 
            <span className={this.addClassName}>{this.props.value}</span>
        );
    }
}

BadgeComponents.defaultProps = {}

export default BadgeComponents;