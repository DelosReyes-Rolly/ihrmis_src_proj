import React from 'react';
import DocumentaryToggle from './../documentary_toggle';


const FormPageSix = () => {
    return ( 
        <div className="pds-prof-class-one">
            <div>
                <strong>Documentary Requirements</strong>
                <br/><br/>
                For online applications, it is expected that original copies will be presented to the
                 Personnel Division for verification within 10 calendar day. Only those applications 
                 with complete requirements as enumarated below shall be entertained. Accepts files in portable
                 Document Format (PDF) or zip file with a maximum size of 5MB.

                <br/><br/>
                <DocumentaryToggle label="Letter of Application" />
                <br/>
                <DocumentaryToggle label="Personal Data Sheet (CSC FORM 212, Revised 2017) with latest passport-size ID picture and name tag" />
                <br/>
                <DocumentaryToggle label="Work Experience Sheet" link="(CS Form 212 Attachments Sample Sheet)"/>
                <br/>
                <DocumentaryToggle label="Photocopy of Diploma" />
                <br/>
                <DocumentaryToggle label="Photocopy of Transcript of Records" />
                <br/>
                <DocumentaryToggle label="Authenticated Certificate of Eligibility/Board Exam" />
                <br/>
                <DocumentaryToggle label="Certificate/s of Trainings/Seminars and Awards" />
                <br/>
                <DocumentaryToggle label="Performance Evaluation Rating in the last rating period or its equivalent" />
                <br/>
                <DocumentaryToggle label="Certificate/s of Previous Employment with No Pending Administrative Charge" />
                <br/>
                <DocumentaryToggle label="Copy of valid NBI Clearance" />
                <br/>

            </div>

            
        </div>
     );
}
 
export default FormPageSix;