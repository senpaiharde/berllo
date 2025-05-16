import React, { useState } from 'react';



import { SvgServices } from '../../../../../services/svgServices';


const CustomFields = ({ onClose }) => {
 
  return (
    <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 className="DropdownHeaderH2">Custom Fields</h2>
        <button className="DropdownClose" onClick={onClose}>
            <SvgServices name='SvgClose'/>
          
        </button>
      </div>
        
      {/* Options */}
      <div className="DropdownOptions">
        <img style={{width:'100%',paddingTop:'10px', paddingBottom:'8px'}} aria-label="upgrade image"  
        src="https://trello.com/assets/2e4c395d9d1f2d341f2b.png"/>
        <div style={{paddingTop:'10px',paddingBottom: '16px'}}>
        <div style={{marginTop:'8px'}}>
            <h2 style={{color:'#44546f', fontSize:'12px', lineHeight:'16px'}}>
                Add dropdowns, text fields, dates, and more to your cards.
            </h2>
            <button>Upgrade</button>
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default CustomFields;
