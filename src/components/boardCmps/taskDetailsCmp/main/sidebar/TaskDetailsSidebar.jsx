import React, { useState } from 'react';

import DropdownUi from './dropdownHardcoded/DropdownUi';
import { useSelector } from 'react-redux';
import DropdownLabel from './dropdownHardcoded/DropdownLabel';

import LabelsSvg from '../.././../../../assets/svgDesgin/LabelsSvg';
import MembersSvg from '../.././../../../assets/svgDesgin/MembersSvg';
import CheckListSvg from '../.././../../../assets/svgDesgin/CheckListSvg';
import DatesSvg from '../.././../../../assets/svgDesgin/DatesSvg';
import AttachmentSvg from '../.././../../../assets/svgDesgin/AttachmentSvg';
import CoverSvg from '../.././../../../assets/svgDesgin/CoverSvg';
import CustomSvg from '../.././../../../assets/svgDesgin/CustomSvg';
import MoveSvg from '../.././../../../assets/svgDesgin/MoveSvg';
import CopySvg from '../.././../../../assets/svgDesgin/CopySvg';
import MirrorSvg from '../.././../../../assets/svgDesgin/MirrorSvg';
import MakeSvg from '../.././../../../assets/svgDesgin/MakeSvg';
import ArchiveSvg from '../.././../../../assets/svgDesgin/ArchiveSvg';
import ShareSvg from '../.././../../../assets/svgDesgin/ShareSvg';
import PowerUpSvg from '../.././../../../assets/svgDesgin/PowerUpSvg';
import DropdownMembers from './dropdownHardcoded/DropdownMembers';
import DropdownDate from './dropdownHardcoded/DropdownDate';
import DropdownChecklistSide from './dropdownChecklistSide';
import CustomFields from './CustomFields';
import Cover from './cover';
import { SvgServices } from '../../../../../services/svgServices';
import Attachment from './Attachment';
import TaskdetailsBackLogDropdown from '../dropdowns/TaskdetailsBackLogDropdown';
const TaskDetailsSidebar = () => {
  const sidebarButtons = [
    {
      label: 'Leave',
       hover: `Leave Card `,
      icon: <SvgServices name="LeaveSvg" />,
    },
    {
      id: 'members',
       hover: 'Open Labels',
      label: 'Members',
      icon: <MembersSvg />,
      content: (props) => (
        <DropdownMembers
          {...props}
          title="Members"
          options={[
            {
              label: 'Invite Member',
              onClick: () => console.log('Invite logic'),
            },
            {
              label: 'Manage Access',
              onClick: () => console.log('Manage Access logic'),
            },
          ]}
        />
      ),
    },
    {
      id: 'labels',
      label: 'Labels',
      hover: 'Open Labels',
      icon: <LabelsSvg />,
      content: (props) => <DropdownLabel {...props} />,
    },

    {
      id: 'Checklist',
       hover: 'Create Checklist',
      label: 'Checklist',
      icon: <CheckListSvg />,
      content: (props) => <DropdownChecklistSide {...props} />,
    },
    {
      id: 'Dates',
       hover: 'Open Dates',
      label: 'Dates',
      icon: <DatesSvg />,
      content: (props) => <DropdownDate {...props} />,
    },
    {
      id: 'Attachment',
       hover: 'Open Attachment',
      label: 'Attachment',
      icon: <AttachmentSvg />,
      content: (props) => <Attachment {...props} />,
    },

    {
      id: 'Cover',
       hover: 'Add Cover',
      label: 'Cover',
      icon: <CoverSvg />,
      content: (props) => <Cover {...props} />,
    },
    {
      id: 'Custom Fields',
       hover: 'Custom',
      label: 'Custom Fields',
      icon: <CustomSvg />,
      content: (props) => <CustomFields {...props} />,
    },
  ];
  const sidebarButtonsBottom = [
    {
      id: 'Move',
       hover: 'Move Card',
      label: 'Move',
      icon: <MoveSvg />,
      content: (props) => <TaskdetailsBackLogDropdown {...props} />,
    },
    {
      id: 'Copy',
       hover: 'Copy Card',
      label: 'Copy',
      icon: <CopySvg />,
      content: (props) => <DropdownLabel {...props} />,
    },
    {
      id: 'Mirror',
       hover: 'Mirror Task',
      label: 'Mirror',
      icon: <MirrorSvg />,
    },
    {
      id: 'Make Template',
       hover: 'Open Template',
      label: 'Make Template',
      icon: <MakeSvg />,
    },
  ];

  const BottomButtons = [
    {
      id: 'Archive',
       hover: 'Archive Card',
      label: 'Archive',
      icon: <ArchiveSvg />,
    },
    {
      id: 'Share',
       hover: 'Share Card',
      label: 'Share',
      icon: <ShareSvg />,
    },
  ];

  return (
    <div className="td-sidebar" style={{ marginRight: '15px' }}>
      {sidebarButtons.map((button, index) => (
        <DropdownUi
          trigger={
            <button key={index} className="trello-btn"
           data-tooltip={button.hover}
            >
              {button.icon} {button.label}
            </button>
          }>
          {(controlProps) =>
            button.content?.({
              title: button.label,
              ...controlProps,
            })
          }
        </DropdownUi>
      ))}

      <section className="td-sidebar" style={{ marginLeft: '-15px' }}>
        <hgroup>
          <h4 className="td-sidebar-power">Power-Ups</h4>
        </hgroup>

        <a className="trello-btn-powerup" href="" type="button">
          <PowerUpSvg />
          <span className="trello-btn-text">Add Power-Ups</span>
          <span className="td-icons"></span>
        </a>
      </section>

      <section className="td-sidebar" style={{ marginLeft: '-15px' }}>
        <hgroup>
          <h4 className="td-sidebar-power">
            Automation
          
          </h4>
        </hgroup>

        <a className="trello-btn-powerup" href="" type="button" style={{ padding: '4px 16px' }}>
          <PowerUpSvg />
          <span className="trello-btn-text">Add button</span>
          <span className="td-icons"></span>
        </a>
      </section>

      <div className="section-header">Actions</div>

      {sidebarButtonsBottom.map((button, index) => (
         <DropdownUi
          trigger={
            <button key={index} className="trello-btn"
        data-tooltip={button.hover}
        >
          {button.icon} {button.label}
        </button>
          }>
          {(controlProps) =>
            button.content?.({
              title: button.label,
              ...controlProps,
            })
          }
        </DropdownUi>
       
      ))}
      <div className="divider"></div>
      {BottomButtons.map((button, index) => (
        <button key={index} className="trello-btn"
        data-tooltip={button.hover}
        >
          {button.icon} {button.label}
        </button>
      ))}
    </div>
  );
};

export default TaskDetailsSidebar;
