//scss at _pds_profile.scss
import { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import InputComponent from "./../../../../../common/input_component/input_component/input_component";

const PdsAddInput = (props) => {

       //OTHER PROFILE
    const [arrInput, setArrInput] = useState([]);

    
    const addInputData = (strInput)=> { //ADD SKILL
       if(strInput !== undefined)
           if(strInput !== "")
               setArrInput([...arrInput, {strInput}])
    }
       
    const removeHobbySkills = (strInput) => { //REMOVE SKILL
        setArrInput(arrInput.filter(arrInput => arrInput.strInput !== strInput));
    }
   

    const [strInputHolder, setStrInputHolder] = useState(null);
    const addSkill = () => {
        addInputData(strInputHolder);
        setStrInputHolder(null);
    }

    return ( 
            <div>
                <div className="pds-prof-class-one">
                    <div style={{width:"100%"}}>
                        <label htmlFor="surname" >{props.label}</label>
                    </div>
                </div>

                {arrInput === null ? null : arrInput.map((item, key)=>{
                    return (
                        <div className="pds-prof-class-one" key={key}>
                            <div style={{width:"100%", paddingRight:"5px"}}>
                                <InputComponent value={item.strInput} readOnly={true}/>
                                
                            </div>
                            <div style={{display:"flex", alignItems:"center"}}>
                                <AiOutlineMinusCircle 
                                onClick={()=>removeHobbySkills(item.strInput)}
                                style={{color:"red"}} size="22px"/>
                    
                            </div>
                        </div>
                    );
                })}

                <div className="pds-prof-class-one">
                    <div style={{width:"100%", paddingRight:"5px"}}>
                        <InputComponent onChange={(e)=>setStrInputHolder(e.target.value)}
                            value={strInputHolder === null ? "" : strInputHolder}/>
                    </div>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <AiOutlinePlusCircle 
                        onClick={()=>addSkill()}
                        style={{color:"green"}} size="22px"/>
                    </div>
                </div>
            </div>
     );
}
 
export default PdsAddInput;