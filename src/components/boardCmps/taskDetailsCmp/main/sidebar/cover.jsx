import React, { useEffect, useState } from 'react';

import SvgClose from '../../../../../assets/svgDesgin/SvgClose';
import { defaultCoverColors, defaultCoverIcons } from '../../../../../services/ColorStorage';
import { liveUpdateTask } from '../../../../../redux/taskDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TaskOps } from '../../../../../services/backendHandler';

const Cover = ({ onClose }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const dispatch = useDispatch();
  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  
  const handleCoverSelect = (type, value) => {
  if (!task) return;

  // Build the cover object exactly to match your schema:
  const coverPayload = {
    cover: {
      coverType: type,                // 'color' or 'image'
      coverColor: type === 'color'    ? value : undefined,
      coverImg:   type === 'image'    ? value : undefined,
    }
  };
   console.log(coverPayload, 'dispatching the cover')
  // Dispatch the same way you did for members:
  dispatch(
    liveUpdateTask({
      method: 'update',
      workId: 'tasks',
      ...coverPayload,
    })
  );
};
const cover = task.cover;
const handleDeleteCover = () => {
    if (!task) return;

    

    dispatch(
      liveUpdateTask({
        method: 'update',
        workId: 'tasks',
       cover: null,
      })
    );
  };
  
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
        {cover && (
           <button onClick={handleDeleteCover}
           style={{ marginTop: '10px' }} 
           className="DropdownCoverButton">
         Remove Cover 
        </button>
        )}
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
                 key={color}
                 onClick={() => handleCoverSelect('color', color)}
                className="EditDropdowncoverBoxbutton"></button>
            </div>
          ))}
        </div>
        <hr className="DropdownHrCover" />
        <button className="DropdownCoverButton">Enable colorblind friendly mode</button>
        <h3 style={{ marginTop: '34px' }} className="DropdownLabelH3">
          Attachments
        </h3>
        <button style={{ marginTop: '5px' }} className="DropdownCoverButton">
          Upload a cover image
        </button>

        <h3 style={{ marginTop: '14px', fontWeight: '400' }} className="DropdownLabelH3">
          Tip: Drag an image on to the card to upload it.
        </h3>

        <h3 style={{ marginTop: '17px' }} className="DropdownLabelH3">
          Photos from Unsplash
        </h3>

        <div className="CoverColorImg">
          {defaultCoverIcons.map((item) => (
            <div className="EditDropdownCoverBox" key={item.title}>
              <button
                type="button"
                 key={item.title}
                className="EditDropdowncoverBoxbuttonImg"
                onClick={() => handleCoverSelect('image', item.icon)}
                style={{
                  border: selectedColor === item.title ? '2px solid #000' : 'none',
                }}
               
              >
                <img src={item.icon} alt={item.title} />
                <div className="hover-text">
                  <div className="hover-text__title">{item.title}</div>
                  <a
                    href={item.title}
                    className="hover-text__src"
                    target="_blank"
                    rel="noopener noreferrer">
                    
                  </a>
                </div>
              </button>
            </div>
          ))}
        </div>

        <button style={{ marginTop: '10px' }} className="DropdownCoverButton">
          Search for photos
        </button>


        <h3 style={{ marginTop: '14px', fontWeight: '400' }} className="DropdownLabelH3">
          By using images from Unsplash, you agree to their <a href=''>license</a> and 
          <a href=''>Terms of Service</a>
        </h3>
      </div>
    </div>
  );
};

export default Cover;
