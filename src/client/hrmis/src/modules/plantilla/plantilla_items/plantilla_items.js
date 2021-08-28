import React, { useState } from 'react';
import BreadcrumbComponent from '../../../components/breadcrumb_component/Breadcrumb';
import BadgeComponents from '../../../components/badge_component/Badge';
import { plantillaItemsBreadCramp } from '../components/breadcramp_data';
import InputComponent from '../../../components/input_component/search_input/Input';
import { selectFilter } from './components/filter_item';
import { BsArrowUpDown  } from 'react-icons/bs'
import { MdMoreHoriz, MdAdd } from 'react-icons/md'
import { plantillaTableData } from './components/plantilla_table_data';
import './plantilla_items.css'


function PlantillaItemView (){
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    }
    return ( 
        <div className="plantilla-view">
            <div className="container-plantilla">
                <BreadcrumbComponent list={plantillaItemsBreadCramp} className=""/>
            </div>

            <div className="tab-button">
                <button onClick={()=>toggleTab(1)} className={ toggleState === 1 ? "tab-tap tab-tap-activate" : "tab-tap"}>Regular</button><BadgeComponents className="tab-badge-add-style" value={'9'}/>
                <button onClick={()=>toggleTab(2)} className={ toggleState === 2 ? "tab-tap tab-tap-activate margin-left-1" : "tab-tap margin-left-1"}>Non-Regular</button>
                <hr className="solid" />
            </div>

            <div className={ toggleState === 1 ? "current-tab" : "show-none"}>
                <div className="selector-buttons">
                    <div className="selector-container">
                        <span className="selector-span-1"><button><MdAdd size="18"/><span>Plantilla Item</span></button></span>                            <span className="margin-left-1 selector-span-1"><select>
                            <option value="" disabled selected>Filter By</option>
                            {selectFilter.map(item => {
                                return <option className="options" key={item.value} defaultValue={item.value}>{item.title}</option>
                            })}
                        </select></span>
                        </div>

                        <div className="selector-container">
                            <span className="margin-right-1 selector-search-label"><label>Search</label></span>
                            <span><InputComponent /></span>
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
                                                <td className = "column-option"><div className="inline-div-td-1">{data.status}<br/>{data.status.score}</div><div className="inline-div-td-2"><button><MdMoreHoriz size="15"/></button></div></td>
                                            </tr>;
                                        })
                                    }

                                </tbody>


                            </table>
                        </div>
                        
                        <p className="data-entry">Total of {plantillaTableData.length} Entries</p>
                    </div>                    
                </div>
                
            <div className={toggleState === 2 ? "current-tab" : "show-none"}>
                <h1 className="margin-left-2">Employee</h1>
            </div>
        </div>
    );
}
 
export default PlantillaItemView;
