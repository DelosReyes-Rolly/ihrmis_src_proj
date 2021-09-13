import React, { useState } from 'react';
import {AiFillCloseCircle} from 'react-icons/ai'

const TagsInputComponent = ({}) => {
    //STATE PROPERTIES
    const [stringInputState, setInputState] = useState([]);

    //METHOD
    const onClickDeleteData = (item) => {
        setInputState(stringInputState.filter((_, index) => index !== item));
    }
    const onPressKeyAddData = (event) =>{
        if(event.target.value !== ""){
            setInputState([...stringInputState, event.target.value]);
            console.log(stringInputState);
            event.target.value = "";
        }
    }
    return(
        <div className={`tags-input-component`}>
            <ul className="tags-ul">
                {
                    stringInputState.map((item, index) => {
                        return (
                            <li className="ul-list-item" key={index} >
                                <span style={{marginRight:"4px"}}>{item}</span>
                                <span className="icon-close">
                                    <AiFillCloseCircle onClick={() => onClickDeleteData(index)} size="12px"/>
                                </span>
                            </li>
                        );
                    })
                }
                <li className="for-float-left">
                    <input 
                        onKeyUp={
                            (event) => event.key === "Enter" 
                                ? onPressKeyAddData(event) 
                                : null}/>
                </li>
            </ul>
            

        </div>
    );
}

export default TagsInputComponent;