import React, {useState} from "react";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";

const CollapsibleComponent = (props) => {
    const toggle = () => {
        setOpen(!open);
    }
    const active = () =>{
        setisActive(!isActive)
    }
    const [open, setOpen] = useState(true);
    const [isActive, setisActive] = useState(true);
    return (
        <div>
            <div className="modal-container">
            <div className="modals-row">
            <p style={{"font-size":"15px", "font-weight":"bold", "color": "#2596be"}}>{props.title}</p>    
            </div>
                <div className="modals-row">
                    {isActive? <IoIosArrowUp onClick={()=>{toggle(); active();}} size="15px" style={{"color": "#2596be"}}/>: <IoIosArrowDown onClick={()=>{toggle(); active();}} size="15px" style={{"color": "#2596be"}}/>}

                </div>
            </div>
            {open && (
                        <div>
                            {props.children}
                        </div>
                    )}
        </div>
    );
};

export default CollapsibleComponent;