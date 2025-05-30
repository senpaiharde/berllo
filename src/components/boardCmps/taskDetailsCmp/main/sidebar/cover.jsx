import React, { useEffect, useState } from 'react';


import { defaultCoverColors, defaultCoverIcons } from '../../../../../services/ColorStorage';
import { liveUpdateTask } from '../../../../../redux/taskDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TaskOps } from '../../../../../services/backendHandler';
import { SvgServices } from '../../../../../services/svgServices';
import { useRef } from 'react';

const Cover = ({ onClose }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const dispatch = useDispatch();
 

  

   
    
  return (
    <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 className="DropdownHeaderH2">Cover</h2>
        <button className="DropdownClose" onClick={onClose}>
            <SvgServices name='SvgClose'/>
          
        </button>
      </div>

      {/* Options */}
      <div className="coverstyle">
        <h3 className="DropdownLabelH3">size</h3>
        
        
      </div>
    </div>
  );
};

export default Cover;
