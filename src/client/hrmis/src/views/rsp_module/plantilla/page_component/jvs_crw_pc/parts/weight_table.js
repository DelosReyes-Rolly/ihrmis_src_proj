import React from "react";
import { MdAdd } from "react-icons/md";
import ButtonComponent from "../../../../../common/button_component/button_component.js";

const WeightingTable = (props) => {
    return ( 
        <React.Fragment>
            <table id="custom-table" style={{ marginBottom:"10px" }}>
                <thead>
                    { (props.title === undefined) ? null :
                        <tr className="main-headers">
                            <th colSpan="12">{props.title}</th>
                        </tr>
                    }
                    <tr className="secondary-headers">
                        <th colSpan="10" style={{ textAlign:"center" }} className="percent-75-wide">CALIBRATED WEIGHT OF FACTOR WEIGHT</th>
                        <th colSpan="2" style={{ textAlign:"center" }} className="percent-25-wide">PERCENTAGE (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {(props.data === undefined)? null : props.data.map(
                        (item) => {            
                            return (
                                <tr key={item.id}>
                                    <td colSpan="10" className="percent-75-wide">{item.info}</td>
                                    <td colSpan="2" style={{ textAlign:"center" }} className="percent-25-wide">{item.rate}</td>
                                </tr>
                            );
                    })}
                    
                    <tr className="secondary-headers">
                        <th colSpan="5" style={{ textAlign:"right" }} className="percent-30-wide">Minimum Factor Weight</th>
                        <th colSpan="2" style={{ textAlign:"center" }} className="percent-20-wide">{props.min}</th>{/* LEAST */}
                        <th colSpan="3" style={{ textAlign:"right" }} className="percent-30-wide">Miximum Factor Weight</th> 
                        <th colSpan="2" style={{ textAlign:"center" }} className="percent-20-wide">{props.max}</th>{/* HIGHEST */}
                    </tr>

                </tbody>
            </table>
            <ButtonComponent buttonLogoStart={<MdAdd size="14"/>} buttonName="Add"/>

        </React.Fragment>
    );
}
 
export default WeightingTable;