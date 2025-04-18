import React from "react";
import SvgDropdown from "../../../../../assets/svgDesgin/SvgDate/SvgDropdown";

const BackLogDropdown = ({label, options, value, onselect}) => {
  


    return (
        <>
        
        <label className='WorkflowAreaLabel'>List</label>
            <div className="BoardReminderDiv">
                  <div className="BoardReminderDivText">
                    <div className="BoardReminderDivText2"> title</div>
                  </div>
                  <div className="BoardReminderDivSVG">
                    <span className="BoardReminderDivSVG2">
                      <SvgDropdown />
                    </span>
                  </div>
                  
                </div>
        </>
    )
}

export default BackLogDropdown;