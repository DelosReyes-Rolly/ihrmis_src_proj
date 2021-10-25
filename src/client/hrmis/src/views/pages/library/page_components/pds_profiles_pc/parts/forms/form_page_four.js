import React from 'react';
import PdsAddInput from './../add_inputs';
import QuestionComponent from './../question_component';
import SubQuestionComponent from './../sub_question_component';
import SpecifyDetailComponents from './../specify_detail_component';

const FormPageFour = () => {
    return ( 
        <React.Fragment>
            <div>
                <table id="custom-table">
                    <thead>
                        <tr className="main-headers">
                            <th className="">
                                VIII. OTHER INFORMATION
                            </th>
                        </tr>
                    </thead>
                </table>
                <br/>

                <div style={{marginBottom:"5px"}}>
                    <PdsAddInput label={'SPECIAL SKILLS AND HOBBIES'}/>
                </div>
                <div style={{marginBottom:"5px"}}>
                    <PdsAddInput label={'NON ACADEMIC-DISTINCTIONS/RECOGNITION'} />
                </div>
                <div style={{marginBottom:"5px"}}>
                    <PdsAddInput label={'MEMBERSHIP OF ASSOCIATION/ORGANIZATION'} />
                </div>

                <br/>

                <div>
                    <table id="custom-table">
                        <tbody>
                            <QuestionComponent queston={`1. Are you related by consanguinity or affinity to 
                            the appointing or recommending authority, or to the chief of bureau or office or 
                            to the person who was immediate supervision over you in the  Office, Bureau or 
                            Department where you will be appointed?`}/>
                            <SubQuestionComponent subQuestion="1.a within the third degree?"/>
                            <SubQuestionComponent subQuestion="1.b within the fourth degree (for Local Government Unit - Career Employee)?"/>
                        </tbody>
                    </table>

                    <SpecifyDetailComponents label="If Yes, give details"/>
                </div>

                {/* NUMBER TWO STARTS HERE  */}

                <div>
                    <table id="custom-table">
                        <tbody>
                            <SubQuestionComponent subQuestion="2.a Have you ever been found guilty of any administrative offense?"/>
                        </tbody>
                    </table>

                    <SpecifyDetailComponents label="If Yes, give details"/>

                    <table id="custom-table">
                        <tbody>
                            <SubQuestionComponent subQuestion="2.b Have you been criminally charged before any court?"/>
                        </tbody>
                    </table>

                    <SpecifyDetailComponents componentNo={2} label="If Yes, give details"/>
                </div>

                {/* NUMBER THREEE STARTS HERE  */}
                <div>
                    <table id="custom-table">
                        <tbody>
                            <SubQuestionComponent subQuestion="3. Have ever been convicted of any crime or violation of any law, decree ordinance or regulation by any court or tribunal"/>
                        </tbody>
                    </table>

                    <SpecifyDetailComponents label="If Yes, give details"/>
                </div>

                {/* NUMBER FOUR STARTS HERE  */}

                <div>
                    <table id="custom-table">
                        <tbody >
                            <SubQuestionComponent subQuestion="4. Have you ever been seperated from the service in any of the following modes: 
                            resignation, retirement, dropped from the rolls, dismissal, termination, end of term, finished contract or phased 
                            sout (abolition), in public or private sector?"/>
                        </tbody>
                    </table>

                    <SpecifyDetailComponents label="If Yes, give details"/>
                </div>

                {/* NUMBER FIVE STARTS HERE */}
                <div>
                    <table id="custom-table">
                        <tbody>
                            <SubQuestionComponent subQuestion="5.a Have you ever been a candidate in a national or local election
                            held within the last year. (except Barangay election)?"/>
                        </tbody>
                    </table>
                    <SpecifyDetailComponents label="If Yes, give details"/>
                </div>

                <div>
                    <table id="custom-table">
                        <tbody>
                            <SubQuestionComponent subQuestion="5.a Have you resigned from the government service during the three
                            (3)-month period before the las election to promote/actively campaign for a national or local candidate?"/>
                        </tbody>
                    </table>
                    <SpecifyDetailComponents label="If Yes, give details"/>
                </div>

                {/* NUMBER SIX STARTS HERE  */}

                <div>
                    <table id="custom-table">
                        <tbody>
                            <SubQuestionComponent subQuestion="6 Have you acquird status of an immigrant or permanent resident of another country?"/>
                        </tbody>
                    </table>
                    <SpecifyDetailComponents label="If Yes, give details (Country)"/>
                </div>


                <div>
                    <table id="custom-table">
                        <tbody>
                            <QuestionComponent queston="7. Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna Carta for Disable Persons (RA 7277); and 
                                (c) Solo Parents Welfare Act of 2000 (RA 8972), please answer the fallowing items:"/>
                            <SubQuestionComponent subQuestion="7.a Are you a member of indigenous group?"/>
                        </tbody>
                    </table>
                    <SpecifyDetailComponents label="If Yes, give details"/>
                </div>

                <div>
                    <table id="custom-table">
                        <tbody>
                            <SubQuestionComponent subQuestion="7.b Are you a person with disability?"/>
                        </tbody>
                    </table>
                    <SpecifyDetailComponents label="If Yes, give details"/>
                </div>

                <div>
                    <table id="custom-table">
                        <tbody>
                            <SubQuestionComponent subQuestion="7.c Are you a solo parent?"/>
                        </tbody>
                    </table>
                    <SpecifyDetailComponents label="If Yes, give details"/>
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default FormPageFour;