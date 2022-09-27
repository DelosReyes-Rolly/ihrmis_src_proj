import React, { useState } from 'react'
import InputComponent from '../../common/input_component/input_component/input_component';
import Greeting from '../components/greeting';

const MeetingOne = () => {

  const [count, setcount] = useState(0);
  const addFunction = () => {
    setcount(count + 1);
  };

  const subFunction = () => {
    setcount(count - 1);
  };

  return (
    <div>
      <h1>{count}</h1>
      <Greeting/>
      <div className='container-hello'>
        <div onClick={addFunction} className="hello-1">
          Add
        </div>
        <div onClick={subFunction} className="hello-2">
          Subtract
        </div>
      </div>
    </div>  
  )
}

export default MeetingOne;