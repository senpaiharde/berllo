import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SvgClose from '../../../../../assets/svgDesgin/SvgClose';


const DropdowndeleteCheck = ({ onClose ,onDelete}) => {
  const dispatch = useDispatch();

 

  return (
    
       <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 style={{ marginLeft: '25px' }} className="DropdownHeaderH2">
          Delete Checklist?
        </h2>
        <button className="DropdownClose" onClick={onClose}>
          <SvgClose />
        </button>
        
        </div>
        <div style={{height:'90px'}} className="DropdownLabelOption">
              <p style={{fontSize:'14px',fontWeight:'400',color:'#172b4d'}} className="DropdownLabelH3">
            Deleting a checklist is permanent and there is no way to get it back.
        </p>
          <button onClick={onDelete}  className="DropdownCheckboxButtonDelete">
              Delete checklist
            </button>
         </div>
      

    </div>
  );
};

export default DropdowndeleteCheck;
