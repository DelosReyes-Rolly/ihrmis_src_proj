import DropdownViewComponent from '../../../../common/dropdown_menu_custom_component/Dropdown_view';
import BreadcrumbComponent from '../../../../common/breadcrumb_component/Breadcrumb';
import BadgeComponents from '../../../../common/badge_component/Badge';
import { plantillaItemsBreadCramp } from '../../static/breadcramp_data';
import SearchComponent from '../../../../common/input_component/search_input/search_input';
import { plantillaItemSelectFilter } from '../../static/filter_items';
import { plantillaItemMenuItem } from '../../static/menu_items';
import AddPlantillaItemModal from '../add_plantilla_item_modal/add_plantilla_item_modal';
import NextInRankModal from '../next_in_rank_modal/next_in_rank_modal';
import { useToggleService } from '../../../../../services/toggle_service';
import { API_HOST } from '../../../../../helpers/global/global_config';
import { setBusy } from '../../../../../features/reducers/loading_slice';
import { statusDisplay } from '../../static/display_option';
import { BsArrowUp  } from 'react-icons/bs'
import { MdMoreHoriz, MdAdd } from 'react-icons/md'
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

// import { propTypes } from 'react-recaptcha';

const PlantillaItemPageComponentView = () => {

 
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    }
    
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
                <TableView regularValue={1}/>
            </div>

            {/* TAB SECOND NON REGULAR */}
            <div className={toggleState === 2 ? "current-tab" : "show-none"}>
                <TableView regularValue={0}/>
            </div>           
                
        </div>

        
              
        </React.Fragment>
        
    );
}

const TableView = (props) => {

        let [toggleNextRank, setToggletoggleNextRank] = useToggleService(false);
        let [toggleAddPlantillaItem, setTogglePlantillaItem] = useToggleService(false);

        const [buttonToggleState, setButtonToggleState] = useState({on: false, index: 0});
    
        const buttonTogleTab = (number) => {
            if(buttonToggleState.on === false){
                setButtonToggleState({on: true, index: number});
            } else {
                setButtonToggleState({on: false, index: number});
            }
        }

        //API CALL FOR VIEWING
        const dispatch = useDispatch();
        const [plantillaItemTableData, setData] = useState();        
        useEffect(()=>{     
            const plantillaItemApi = async () => {
                dispatch(setBusy(true));
                await axios.get(API_HOST + '/plantilla-items')
                    .then(
                        response => {            
                            setData(response.data.data);
                            console.log('Run');
                        }
                    ).catch(
                        error => {
                            console.log(error);
                        }
                    );
                dispatch(setBusy(false));
            }
            plantillaItemApi();
            
        },[]);

    return ( 
        <React.Fragment>
            <NextInRankModal 
            isDisplay={toggleNextRank}
            onClose={setToggletoggleNextRank}/>
                
            <div className="selector-buttons">
                <div className="selector-container">
                    <span className="selector-span-1">
                        <button onClick={ ()=> setTogglePlantillaItem() }>
                            <MdAdd size="14"/>
                            <span>Plantilla Item</span>
                        </button>
                    </span>
                        <AddPlantillaItemModal 
                            isDisplay={ toggleAddPlantillaItem } 
                            onClose={ () => setTogglePlantillaItem() }
                            regularValue={props.regularValue}/>
                            
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
                                <th><button><BsArrowUp/></button> Item No.</th>
                                <th><button><BsArrowUp/></button> Position</th>
                                <th><button><BsArrowUp/></button> Office</th>
                                <th><button><BsArrowUp/></button> Status</th>
                            </tr>
                        </thead>
                        <tbody>
                    
                            { 
                                plantillaItemTableData && plantillaItemTableData.map(data => {

                                    if(props.regularValue === 1 & data.itm_regular === 1 ){
                                        return (
                                            <tr className="trClass" key={data.itm_id}>
                                                <td>{data.itm_no?? ""}</td>
                                                <td>{data.position.pos_short_name ?? ""}</td>
                                                <td>{data.office.ofc_acronym ?? ""}</td>
                                                <td className = "column-option"><div className="inline-div-td-1">{statusDisplay[data.itm_status]}<br/>{}</div><div className="inline-div-td-2">
                                                    <button onClick={()=>buttonTogleTab(data.itm_id)}><MdMoreHoriz size="15"/></button>
                                                
                                                    <DropdownViewComponent display={
                                                            buttonToggleState.on
                                                            ? buttonToggleState.index === data.itm_id ? "block" 
                                                            : "none" : "none"
                                                        }
                                                        itemList={plantillaItemMenuItem}
                                                        onClick={()=>{
                                                            setToggletoggleNextRank(); 
                                                            setButtonToggleState({on: data.itm_id, index: false})
                                                        }}
                                                    />
                                                </div></td>
                                            </tr>);
                                    } else if (props.regularValue === 0 & data.itm_regular === 0){
                                        return (
                                            <tr className="trClass" key={data.itm_id}>
                                            <td>{data.itm_no}</td>
                                            <td>{data.position.pos_short_name }</td>
                                            <td>{data.office.ofc_acronym}</td>
                                            <td className = "column-option"><div className="inline-div-td-1">{statusDisplay[data.itm_status]}<br/>{}</div><div className="inline-div-td-2">
                                                <button onClick={()=>buttonTogleTab(data.itm_id)}><MdMoreHoriz size="15"/></button>
                                            
                                                <DropdownViewComponent display={
                                                        buttonToggleState.on
                                                        ? buttonToggleState.index === data.itm_id ? "block" 
                                                        : "none" : "none"
                                                    }
                                                    itemList={plantillaItemMenuItem}
                                                    onClick={()=>{
                                                        setToggletoggleNextRank(); 
                                                        setButtonToggleState({on: data.itm_id, index: false})
                                                    }}
                                                />
                                            </div></td>
                                        </tr>);
                                    }
                                    return (<React.Fragment></React.Fragment>);
                                }
                            )}
                        </tbody>
                    </table>
                </div>
              
                <p className="data-entry">Total of {plantillaItemTableData && 
                    plantillaItemTableData.length} Entries
                </p>
                <br/>
            </div>                    
        </React.Fragment>
     );
}
 


export default PlantillaItemPageComponentView;
