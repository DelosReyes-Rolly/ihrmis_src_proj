import React from 'react';
import {Link} from "react-router-dom";
import { FaPrint, FaMailBulk, FaEdit } from 'react-icons/fa';
 

function NavigationBar() {
    let iconStyles = { fontSize: "2em" };
    return (
        <div className='grey-line'>  
            <span className='choices'><Link to='/rsp/submissionView'>Submissions</Link></span>
            <span className='choices'><Link to='/rsp/consolidated'>Consolidated</Link></span>
            <span className="logos"><a href="#" target="_blank" rel="noreferrer"><FaEdit style={iconStyles}/></a></span>
            <span className="logos"><a href="#" target="_blank" rel="noreferrer"><FaMailBulk style={iconStyles}/></a></span>
            <span className="logos"><a href="#" target="_blank" rel="noreferrer"><FaPrint style={iconStyles}/></a></span>
        </div>
    )
};

export default NavigationBar;