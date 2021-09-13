import React, { Component } from 'react';

class BreadcrumbComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 

            <React.Fragment>

                <ul className="breadcrumb">
                    {
                        this.props.list.map(listName => {
                            if(listName.link === '#'){
                                return <li key={listName.name}>{listName.name}</li>;
                            } else {
                                
                                return <li key={listName.name}><a href={listName.link}>{listName.name}</a></li>;
                            }
                            
                        })
                    }
                </ul>

            </React.Fragment>
         );
    }
}
 
export default BreadcrumbComponent;