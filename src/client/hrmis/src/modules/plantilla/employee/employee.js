import React, { useState } from 'react';
import BreadcrumbComponent from '../../../components/breadcrumb_component/Breadcrumb';
// import BadgeComponents from '../../../components/badge_component/Badge';
import { employeeItemsBreadCramp, plantillaItemsBreadCramp } from '../components/breadcramp_data';
import SearchComponent from '../../../components/input_component/search_input/search_input';
import { selectFilter } from './components/filter_item';
import { BsArrowUpDown  } from 'react-icons/bs'
import { MdAdd } from 'react-icons/md'
import { plantillaTableData } from './components/plantilla_table_data';
import PdsProfileMainView from '../../library/pds_profiles/pds_profile';
import './employee.css'


function EmployeeView (){
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    }

    const patternTabOne = <React.Fragment>
                <div className="selector-buttons">
                    <div className="selector-container">
                        <span className="selector-span-1"><button><MdAdd size="18"/><span>Employee</span></button></span>
                            <span className="margin-left-1 selector-span-1">
                                <select defaultValue={'DEFAULT'} >
                                    <option value="DEFAULT" disabled>Filter By</option>
                                    {selectFilter.map(item => {
                                        return <option className="options" key={item.value} value={item.value}>{item.title}</option>
                                    })}
                                </select>
                            </span>
                        </div>

                        <div className="selector-container">
                            <span className="margin-right-1 selector-search-label"><label>Search</label></span>
                            <span><SearchComponent /></span>
                        </div>
                    </div>
                
                <div className="plantilla-table">
                    <div className="scrollable-div-table">
                        <table id="custom-table">
                            <thead>
                                <tr className="fixed-label-table">
                                    <th><button><BsArrowUpDown/></button> Item No.</th>
                                    <th><button><BsArrowUpDown/></button> Position</th>
                                    <th><button><BsArrowUpDown/></button> Office</th>
                                    <th><button><BsArrowUpDown/></button> Status</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    plantillaTableData.map(data => {
                                        return <tr className="trClass" key={data.id}>
                                            <td>{data.itemNo}</td>
                                            <td>{data.position}</td>
                                            <td>{data.office}</td>
                                            <td className = "column-option"><div className="inline-div-td-1">{data.status}<br/>{data.status.score}</div><div className="inline-div-td-2">
                                                {/* <button><MdMoreHoriz size="15"/></button> */}
                                                </div>
                                            </td>
                                        </tr>;
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <p className="data-entry">Total of {plantillaTableData.length} Entries</p>
                </div>                    
    </React.Fragment>
    
    return ( 
        <div className="plantilla-view">
            <div className="container-plantilla">
                <BreadcrumbComponent list={employeeItemsBreadCramp} className=""/>
            </div>

            <div className="tab-button">
                <button onClick={()=>toggleTab(1)} className={ toggleState === 1 ? "tab-tap tab-tap-activate" : "tab-tap"}>List of Employee</button>
                {/* <BadgeComponents className="tab-badge-add-style" value={7}/> */}
                <button onClick={()=>toggleTab(2)} className={ toggleState === 2 ? "tab-tap tab-tap-activate margin-left-1" : "tab-tap margin-left-1"}>PDS Profile</button>
                <hr className="solid" />
            </div>

            <div className={ toggleState === 1 ? "current-tab" : "show-none"}>
                {patternTabOne}
            </div>

            {/* TAB SECOND NON REGULAR */}
            <div className={toggleState === 2 ? "current-tab" : "show-none"}>
                <PdsProfileMainView />
            </div>
    </div>
    );
}
 
export default EmployeeView;
