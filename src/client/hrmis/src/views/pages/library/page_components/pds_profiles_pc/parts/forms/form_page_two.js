import React, { useState } from 'react';
import InputComponent from '../../../../../../common/input_component/input_component/input_component';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

const FormPageTwo = () => {
    return ( 
        <div>
            <table id="custom-table">
                <thead>
                    <tr className="main-headers">
                        <th className="">
                            II. FAMILY BACKGROUND
                        </th>
                    </tr>
                </thead>
            </table>
            <br/>

            {/* SPOUSE INFORMATION */}
            <div>
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"50%"}}>
                        <label htmlFor="surname" >SPOUSE's Surname</label>
                        <InputComponent />
                    </div>
                    <div style={{marginLeft:"5px", width:"50%"}}>
                        <label htmlFor="surname" >First Name</label>
                        <InputComponent />
                    </div>
                </div>
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"50%"}}>
                        <label htmlFor="surname" >Middle Name</label>
                        <InputComponent />
                    </div>
                    <div style={{marginLeft:"5px", width:"50%"}}>
                        <label htmlFor="surname" >Name Extension (Jr., Sr.)</label>
                        <InputComponent />
                    </div>
                </div>
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"50%"}}>
                        <label htmlFor="surname" >Occupation</label>
                        <InputComponent />
                    </div>
                    <div style={{marginLeft:"5px", width:"50%"}}>
                        <label htmlFor="surname" >Employer/Business Name</label>
                        <InputComponent />
                    </div>
                </div>
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"65%"}}>
                        <label htmlFor="surname" >Business Address</label>
                        <InputComponent />
                    </div>
                    <div style={{marginLeft:"5px", width:"35%"}}>
                        <label htmlFor="surname" >Telephone No.</label>
                        <InputComponent />
                    </div>
                </div> <br/><br/>

                {/* FATHERS INFORMATION  */}
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"50%"}}>
                        <label htmlFor="surname" >FATHERS's Surname</label>
                        <InputComponent />
                    </div>
                    <div style={{marginLeft:"5px", width:"50%"}}>
                        <label htmlFor="surname" >First Name</label>
                        <InputComponent />
                    </div>
                </div>
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"50%"}}>
                        <label htmlFor="surname" >Middle Name</label>
                        <InputComponent />
                    </div>
                    <div style={{marginLeft:"5px", width:"50%"}}>
                        <label htmlFor="surname" >Name Extension (Jr., Sr.)</label>
                        <InputComponent />
                    </div>
                </div> <br/><br/>
                {/* MOTHERS MAIDEN INFORMATION  */}
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"50%"}}>
                        <label htmlFor="surname" >MOTHER's MAIDEN Surname</label>
                        <InputComponent />
                    </div>
                    <div style={{marginLeft:"5px", width:"50%"}}>
                        <label htmlFor="surname" >First Name</label>
                        <InputComponent />
                    </div>
                </div>
                <div className="pds-prof-class-one" style={{marginBottom:"10px"}}>
                    <div style={{marginRight:"5px", width:"50%"}}>
                        <label htmlFor="surname" >MOTHER's MAIDEN Middle Name</label>
                        <InputComponent />
                    </div>
                    <div style={{marginLeft:"5px", width:"50%"}}>
                        <label htmlFor="surname" >Name Extension (Jr., Sr.)</label>
                        <InputComponent />
                    </div>
                </div>
            </div>
            <br/><br/>
            {/* LIST OF CHILDREN */}
            <AddRemoveChildDisplay /> <br/><br/>
        </div>
     );
}


const AddRemoveChildDisplay =()=>{
    // STATE 
    const [strChildName, setStrChildName] = useState();
    const [dateBirthDate, setDateBirthday] = useState(); 
    const [arrChildInfoState, setArrChildInfoState] = useState([]); //Array Data
    // METHODS
    const addChildData = (childName, childBirthDate) =>{
        if(childName !== undefined)
            if (childBirthDate !== null)
                if(childName !== "")
                    if (childBirthDate !== ""){
                        setArrChildInfoState([...arrChildInfoState, {childName, childBirthDate}]);
                        console.log(arrChildInfoState);
                        setDateBirthday(null);
                        setStrChildName(null);
                    }

    }

    const removeChildData = (childName) =>{
            setArrChildInfoState(arrChildInfoState.filter(arrChildInfoState => arrChildInfoState.childName !== childName));
    }
    return(
        <div>
            <h5 style={{color:"rgba(70, 70, 70, 0.8)",}}>NAME OF CHILDREN 
                <span style={{fontSize:"10px", fontWeight:"normal"}}>  (List all)</span>
            </h5>
            <br/>
            <div className="pds-prof-class-one">
                <div style={{marginRight:"5px", width:"70%"}}>
                    <label htmlFor="surname" >Full Name</label>
                </div>
                <div style={{marginLeft:"5px", marginRight:"5px", width:"30%"}}>
                    <label htmlFor="surname" >Date of Birth</label>
                </div>
                <div style={{display:"flex", alignItems:"center"}}>
                    <AiOutlineMinusCircle style={{color:"whitesmoke"}} size="22px"/>
                </div>
            </div>
            {arrChildInfoState === null ? null : arrChildInfoState.map((item, index) => {
                return (
                    <div className="pds-prof-class-one" key={index}>
                        <div style={{marginRight:"5px", width:"70%"}}>
                            <InputComponent value={item.childName} readOnly={true}/> 
                        </div>
                        <div style={{marginLeft:"5px", marginRight:"5px", width:"30%"}}>
                            <InputComponent value={item.childBirthDate} readOnly={true}/>  
                        </div>
                        <div style={{display:"flex", alignItems:"center"}}>
                            <AiOutlineMinusCircle style={{color:"red"}} size="22px" onClick={()=>removeChildData(item.childName, dateBirthDate)}/>
                        </div>
                    </div>);
            })}

            <div className="pds-prof-class-one">
                <div style={{marginRight:"5px", width:"70%"}}>
                    <InputComponent onChange={(e)=> setStrChildName(e.target.value)} 
                        value={strChildName === null ? "" : strChildName}/> 
                </div>
                <div style={{marginLeft:"5px", marginRight:"5px", width:"30%"}}>
                    <InputComponent type="date" onChange={(e)=>setDateBirthday(e.target.value)} 
                        value={dateBirthDate === null ? "" : dateBirthDate}/>  
                </div>
                <div style={{display:"flex", alignItems:"center"}}>
                    <AiOutlinePlusCircle style={{color:"green"}} size="22px" onClick={() => addChildData(strChildName, dateBirthDate)}/>
                </div>
            </div>
            
        </div>
    );
}

 
export default FormPageTwo;