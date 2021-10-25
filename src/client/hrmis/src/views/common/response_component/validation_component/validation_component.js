import React from 'react'

function ValidationComponent(props) {
    return (
       <React.Fragment>
           <div className="invalid-div">
                <p style={{ marginBottom:"5px" }}><strong>{props.title}</strong></p>
                <div>
                    {props.children}
                </div>
            </div>
       </React.Fragment>
    )
}

export default ValidationComponent
