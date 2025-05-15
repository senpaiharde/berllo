import React, { useEffect, useState } from 'react';

import SvgClose from '../../../../../assets/svgDesgin/SvgClose';
import { defaultCoverColors } from '../../../../../services/ColorStorage';

const Cover = ({ onClose }) => {
  const [selectedColor, setSelectedColor] = useState('');

  
  return (
    <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 className="DropdownHeaderH2">Cover</h2>
        <button className="DropdownClose" onClick={onClose}>
          <SvgClose />
        </button>
      </div>

      {/* Options */}
      <div className="coverstyle">
        <h3 className="DropdownLabelH3">size</h3>
        <div class="size-picker">
          <div class="size-option two-col">
            <div class="col left">
              <div class="line short"></div>
              <div class="line long"></div>
              <div class="dot"></div>
            </div>
            <div class="col right">
              <div class="line medium"></div>
            </div>
          </div>
          <div class="size-option">
            <div class="line long"></div>
            <div class="line short"></div>
          </div>
        </div>

        <h3 style={{ marginTop: '34px' }} className="DropdownLabelH3">
          Colors
        </h3>
        <div className="CoverColor">
          {defaultCoverColors.map((color) => (
            <div className="EditDropdownCoverBox" key={color}>
            <button
                  style={{
                    background: color,
                    border: selectedColor === color ? '2px solid #000' : 'none',
                  }}
                  onClick={() => setSelectedColor(color)}
                  className="EditDropdowncoverBoxbutton"></button>
            </div>
          ))}
        </div>
        <hr className="DropdownHrCover" />
            <button className="DropdownCoverButton">Enable colorblind friendly mode

            </button>
            <h3 style={{ marginTop: '34px' }} className="DropdownLabelH3">
          Attachments
        </h3>
         <button style={{marginTop:'5px'}} className="DropdownCoverButton">
            Upload a cover image

            </button>

             <h3 style={{ marginTop: '14px',fontWeight:'400'  }} className="DropdownLabelH3">
          Tip: Drag an image on to the card to upload it.
        </h3>

        <h3 style={{ marginTop: '17px'}} className="DropdownLabelH3">
          Photos from Unsplash

        </h3>
            
      </div>
    </div>
  );
};

export default Cover;
