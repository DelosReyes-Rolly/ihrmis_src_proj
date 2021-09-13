import DropdownViewComponent from '../../../../common/dropdown_menu_custom_component/Dropdown_view';
import BreadcrumbComponent from '../../../../common/breadcrumb_component/Breadcrumb';
import BadgeComponents from '../../../../common/badge_component/Badge';
import { plantillaItemsBreadCramp } from '../../static/breadcramp_data';
import SearchComponent from '../../../../common/input_component/search_input/search_input';
import { plantillaItemSelectFilter } from '../../static/filter_items';
import { plantillaItemTableData } from '../../fake_data/table_data';
import { plantillaItemMenuItem } from '../../static/menu_items';
import { BsArrowUpDown  } from 'react-icons/bs'
import { MdMoreHoriz, MdAdd } from 'react-icons/md'
import React, { useState } from 'react';
import AddPlantillaItemModal from '../add_plantilla_item_modal/add_plantilla_item_modal';
import NextInRankModal from '../next_in_rank_modal/next_in_rank_modal';
import { useToggleService } from '../../../../../services/toggle_service';

const PlantillaItemPageComponentView = () => {
    let [toggleAddPlantillaItem, setTogglePlantillaItem] = useToggleService(false);
    let [toggleNextRank, setToggletoggleNextRank] = useToggleService(false);
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    }

    const [buttonToggleState, setButtonToggleState] = useState({on: false, index: 0});
    const buttonTogleTab = (number) => {
        if(buttonToggleState.on === false){
            setButtonToggleState({on: true, index: number});
        } else {
            setButtonToggleState({on: false, index: number});
        }
    }

    const patternTab = <React.Fragment>
                <div className="selector-buttons">
                    <div className="selector-container">
                        <span className="selector-span-1">
                            <button onClick={ ()=> setTogglePlantillaItem() }>
                                <MdAdd size="14"/>
                                <span>Plantilla Item</span>
                            </button>
                        </span>
                            <AddPlantillaItemModal isDisplay={ toggleAddPlantillaItem } onClose={ () => setTogglePlantillaItem() }/>
                            <span className="margin-left-1 selector-span-1">
                                <select defaultValue={'DEFAULT'} >
                                    <option value="DEFAULT" disabled>Filter By</option>
                                    {plantillaItemSelectFilter.map(item => {
                                        return <option className="options" key={item.value} value={item.value}>{item.title}</option>
                                    })}
                                </select>
                            </span>
                        </div>

                        <div className="search-container">
                            <span className="margin-right-1 selector-search-label"><label>Search</label></span>
                            <span><SearchComponent placeholder="Search"/></span>
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
                                    plantillaItemTableData.map(data => {
                                        return <tr className="trClass" key={data.id}>
                                            <td>{data.itemNo}</td>
                                            <td>{data.position}</td>
                                            <td>{data.office}</td>
                                            <td className = "column-option"><div className="inline-div-td-1">{data.status}<br/>{data.status.score}</div><div className="inline-div-td-2">
                                                <button onClick={()=>buttonTogleTab(data.id)}><MdMoreHoriz size="15"/></button>
                                            
                                                <DropdownViewComponent display={
                                                        buttonToggleState.on
                                                        ? buttonToggleState.index === data.id ? "block" 
                                                        : "none" : "none"
                                                    }
                                                    itemList={plantillaItemMenuItem}
                                                    onClick={()=>{
                                                        setToggletoggleNextRank(); 
                                                        setButtonToggleState({on: data.id, index: false})
                                                    }}
                                                />
                                            </div></td>
                                        </tr>;
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <p className="data-entry">Total of {plantillaItemTableData.length} Entries</p>
                </div>                    
    </React.Fragment>
    
    return ( 
        <React.Fragment>
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
                {patternTab}
            </div>

            {/* TAB SECOND NON REGULAR */}
            <div className={toggleState === 2 ? "current-tab" : "show-none"}>
                {patternTab}
            </div>


           
                
        </div>
            <NextInRankModal 
                isDisplay={toggleNextRank}
                onClose={setToggletoggleNextRank}
            />
        </React.Fragment>
        
    );
}
 
export default PlantillaItemPageComponentView;
