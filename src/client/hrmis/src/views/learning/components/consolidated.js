
import React from 'react';
import ConsolidatedTable from './consolidatedTable';
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from 'react-icons/ai'; 
import DevelopmentPlan from '../pages/development_plan';
import Moment from 'moment';

const Consolidated = () => {
  // icons
  let iconStylesPlus = { fontSize: "2.6em", color: "green"};
  let iconStylesClose = { fontSize: "2.6em", color: "red"};

  // date
  const formatDate = Moment().format("DD MMMM YYYY");
  return (
    <div>
      <DevelopmentPlan/>
      <div style={{ marginLeft: 40, marginRight: 40}}>
        <div style={{textAlign: 'right', paddingBottom: '12px'}}>
          As of {formatDate}
        </div>
          <div className="buttons1">
            <select className="button-dropdown">
              <option value="2021-2023">2021-2023</option>
              <option value="2018-2020">2018-2020</option>
              <option value="2015-2017">2015-2017</option>
            </select>
            <select className="button-dropdown">
              <option value="" hidden>Office</option>
              <option value="0">All</option>
            </select>
            <select className="button-dropdown">
              <option value="" hidden>Development Activity</option>
              <option value="0">All</option>
            </select> 
            <span className="left-button">
              <select className="button-dropdown">
                <option value="" hidden>All Group</option>
                <option value="0">All</option>
              </select> 
              <button className='consolidatedButton' onclick=""> <AiOutlinePlusCircle style={iconStylesPlus}/> </button>
              <button className='consolidatedButton' onclick=""> <AiOutlineCloseCircle style={iconStylesClose}/> </button>
            </span>
            <ConsolidatedTable />
          </div>
      </div>
    </div>
  )
}

export default Consolidated;