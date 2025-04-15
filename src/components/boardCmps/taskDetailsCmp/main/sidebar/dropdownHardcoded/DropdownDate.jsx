import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SvgClose from '../../../../../../assets/svgDesgin/SvgClose';
import SvgDateLeft from '../../../../../../assets/svgDesgin/SvgDate/SvgDateLeft';

const DropdownDate = ({onClose}) => {

  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  
  return (
    <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 className="DropdownHeaderH2">Date</h2>
        <button className="DropdownClose" onClick={onClose}>
          <SvgClose />
        </button>
      </div>
      <div>
      <form>
      <div className='DateBoard'>
      <div className='DateBoardDiv'>
        <div className='DateDates'>
            <div className='DateDatesleft'>
                <button className='DateDatesButton'><SvgDateLeft/></button>
                <button className='DateDatesButton'></button>
            </div>
            <div className=''></div>
            <div className=''></div>
        </div>
      </div>
      </div>
      </form>
      </div>
      </div>
  );
};

export default DropdownDate;
