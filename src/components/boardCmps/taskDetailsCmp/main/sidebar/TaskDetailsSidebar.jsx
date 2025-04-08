import React, { useState } from "react";

import DropdownUi from "./dropdownHardcoded/DropdownUi";
import { useSelector } from "react-redux";
import DropdownLabel from "./dropdownHardcoded/DropdownLabel";
import LeaveSvg from '../.././../../../assets/svgDesgin/LeaveSvg'
import LabelsSvg from "../.././../../../assets/svgDesgin/LabelsSvg";
import MembersSvg from "../.././../../../assets/svgDesgin/MembersSvg";
import CheckListSvg from "../.././../../../assets/svgDesgin/CheckListSvg";
import DatesSvg from "../.././../../../assets/svgDesgin/DatesSvg";
import AttachmentSvg from "../.././../../../assets/svgDesgin/AttachmentSvg";
import CoverSvg from "../.././../../../assets/svgDesgin/CoverSvg";
import CustomSvg from "../.././../../../assets/svgDesgin/CustomSvg";
import MoveSvg from "../.././../../../assets/svgDesgin/MoveSvg";
import CopySvg from "../.././../../../assets/svgDesgin/CopySvg";
import MirrorSvg from "../.././../../../assets/svgDesgin/MirrorSvg";
import MakeSvg from "../.././../../../assets/svgDesgin/MakeSvg";
import ArchiveSvg from "../.././../../../assets/svgDesgin/ArchiveSvg";
import ShareSvg from "../.././../../../assets/svgDesgin/ShareSvg";
import PowerUpSvg from "../.././../../../assets/svgDesgin/PowerUpSvg";
import DropdownMembers from "./dropdownHardcoded/DropdownMembers";


const TaskDetailsSidebar = () => {

    
    const boardUsers = useSelector((state) => state.boardReducer?.currentBoard?.boardMembers || []);
    
  const sidebarButtons = [
    {
      label: "Leave",
      icon: (<LeaveSvg/>),
    },
    {
        id: "members",
        label: "Members",
        icon: <MembersSvg />,
        content: (props) => (
          <DropdownMembers
            {...props}
            title="Members"
            options={[
              {
                label: "Invite Member",
                onClick: () => console.log("Invite logic"),
              },
              {
                label: "Manage Access",
                onClick: () => console.log("Manage Access logic"),
              },
            ]}
          />
        ),
      },
      {
        id: "labels",
        label: "Labels",
        icon: <LabelsSvg />,
        content: (props) => (
          <DropdownLabel
            {...props}
            
          />
        ),
      },
      
      {
        id: "Checklist",
        label: "Checklist",
        icon: (
          <CheckListSvg/>),
        content:(props)=> <DropdownLabel {...props}/>,
      },
      {
        id: "Dates",
        label: "Dates",
        icon: (
          <DatesSvg/>),
          content:(props)=> <DropdownLabel {...props}/>,
      },
      {
        id: "Attachment",
        label: "Attachment",
        icon: (
          <AttachmentSvg/>),
        content:(props)=> <DropdownLabel {...props}/>,
      },
      
      {
        id: "Cover",
        label: "Cover",
        icon: (
          <CoverSvg/>),
          content:(props)=> <DropdownLabel {...props}/>,
      },
      {
        id: "Custom Fields",
        label: "Custom Fields",
        icon: (
          <CustomSvg/>),
          content:(props)=> <DropdownLabel {...props}/>,
      },
    
  ];
  const sidebarButtonsBottom = [
    {
        id: "Move",
        label: "Move",
        icon: (
          <MoveSvg/>),
          content:(props)=> <DropdownLabel {...props}/>,
      },
      {
        id: "Copy",
        label: "Copy",
        icon: (
          <CopySvg/>),
          content:(props)=> <DropdownLabel {...props}/>,
      },
      {
        id: "Mirror",
        label: "Mirror",
        icon: (
          <MirrorSvg/>
        ),
      },
      {
        id: "Make Template",
        label: "Make Template",
        icon: (
          <MakeSvg/>
        ),
      },
    
  ]

  const BottomButtons = [
    {
        id: "Archive",
        label: "Archive",
        icon: (
          <ArchiveSvg/>
        ),
      },
      {
        id: "Share",
        label: "Share",
        icon: (
          <ShareSvg/>
        ),
      },
      
  ]

  return (
    <div className="td-sidebar" style={{marginRight:'15px'}}>
      {sidebarButtons.map((button, index) => (
  <DropdownUi
  trigger={
    <button key={index} className="trello-btn">
      {button.icon} {button.label}
    </button>
  }
>
  {(controlProps) => button.content?.({
    title: button.label,
    ...controlProps,
  })}
</DropdownUi>

))}




      <section className="td-sidebar" style={{marginLeft:'-15px'}}  >
        <hgroup>
          <h4 className="td-sidebar-power">Power-Ups</h4>
        </hgroup>

        <a className="trello-btn-powerup" href="" type="button">
        <PowerUpSvg/>
          <span className="trello-btn-text">Add Power-Ups</span>
          <span className="td-icons">
          
          </span>
        </a>
      </section>

      <section className="td-sidebar" style={{marginLeft:'-15px'}}>
        <hgroup>
          <h4 className="td-sidebar-power">
            Automation
            <button className="td-sidebar-h4-button"></button>
          </h4>
        </hgroup>

        <a className="trello-btn-powerup" href="" type="button" style={{padding:'4px 16px'}}>
       <PowerUpSvg/>
          <span className="trello-btn-text">Add button</span>
          <span className="td-icons">
          
          </span>
        </a>
      </section>

      <div className="section-header">Actions</div>
      

      
      {sidebarButtonsBottom.map((button, index) => (
        <button key={index } className="trello-btn">
          {button.icon} {button.label}
        </button>
      ))}
      <div className="divider"></div>
      {BottomButtons.map((button, index) => (
        <button key={index } className="trello-btn">
          {button.icon} {button.label}
        </button>
      ))}
    </div>
  );
};

export default TaskDetailsSidebar;