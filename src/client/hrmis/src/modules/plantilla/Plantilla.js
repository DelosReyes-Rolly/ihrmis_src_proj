import React from 'react';
import PlantillaItemView from './plantilla_items/Plantilla_items'
import { Component } from 'react';


class PlantillaMainView extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <PlantillaItemView />
         );
    }
}
 
export default PlantillaMainView;