import React from 'react';


const DashboardView = (props) => {
    
    return (
        <div style={{margin:"20px"}}>  
            <h1>Dashboard</h1>
            <br/>

            <table id="custom-table">
                <tbody>
                    <tr className="tr-shade-color">
                        <td colSpan="12">
                            {props.queston ?? "Main Question"}
                        </td>
                    </tr>
                    <tr className="tr-shade-color">

                        <td colSpan="9" className="td-sub-question">
                            {props.subQuestion ?? "Sub Question"} 
                        </td>

                        <td colSpan="3" className="td-yes-no">
                            <div className="items-checkbox">
                                <div className="checkbox-alignment">
                                    <input type="radio" name={ props.name ?? "name" } value="1"/> <span className="margin-left-1">Yes</span> 
                                    
                                </div>
                                <div className="checkbox-alignment">
                                    <input type="radio" name={ props.name ?? "name" } value="0"/> <span className="margin-left-1">No</span> 
                                </div>
                            </div> 
                        </td>
                    </tr>
                </tbody> 
            </table>
        </div> 
    );
}


export default DashboardView;