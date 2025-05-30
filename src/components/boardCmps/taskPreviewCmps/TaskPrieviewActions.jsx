import { IconButton } from "../../IconButton"
import TaskdetailsBackLogDropdown from "../taskDetailsCmp/main/dropdowns/TaskdetailsBackLogDropdown"
import Cover from "../taskDetailsCmp/main/sidebar/cover"
import DropdownDate from "../taskDetailsCmp/main/sidebar/dropdownHardcoded/DropdownDate"
import DropdownLabel from "../taskDetailsCmp/main/sidebar/dropdownHardcoded/DropdownLabel"
import DropdownMembers from "../taskDetailsCmp/main/sidebar/dropdownHardcoded/DropdownMembers"
import DropdownUi from "../taskDetailsCmp/main/sidebar/dropdownHardcoded/DropdownUi"
import { Link, useNavigate } from "react-router-dom"

export function TaskPreviewActions({ task, parentPosition }) {
  const navigate = useNavigate()
  // console.log("TaskPreviewActions task", task)
  const position = parentPosition
    ? {
        transform: `translate3d(${parentPosition.x}px, ${parentPosition.y}px, 0px)`,
      }
    : { transform: "translate3d(0px, 0px, 0px)" }
    const labelButton={
      id: "labels",
      label: "Labels",
      // icon: <LabelsSvg />,
      content: (props) => (
        <DropdownLabel
          {...props}
          title="Labels"
          allLabels={[ "red", "blue", "green", "yellow" ]}
          activeLabels={["red", "blue"]}
          options={[
            {
              
              label: "Create Label",
              onClick: () => console.log("New label"),
            },
            {
              label: "Edit Labels",
              onClick: () => console.log("Manage labels"),
            },
          ]}
        />
      ),
    }
    const membersButton={
      id: "members",
      label: "Members",
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
    }
    
    const coverButton= {
      id: 'Cover',
       hover: 'Add Cover',
      label: 'Cover',
      // icon: <CoverSvg />,
      content: (props) => <Cover {...props} />,
    }

    const datesButton = {
      id: 'Dates',
       hover: 'Open Dates',
      label: 'Dates',
      // icon: <DatesSvg />,
      content: (props) => <DropdownDate {...props} />,
    }
    const moveButton ={
      id: 'Move',
       hover: 'Move Card',
      label: 'Move',
      // icon: <MoveSvg />,
      content: (props) => <TaskdetailsBackLogDropdown {...props} Header={'100'} />,
    }
    const copyButton ={
      id: 'Copy',
       hover: 'Copy Card',
      label: 'Copy',
      // icon: <MoveSvg />,
      content: (props) => <TaskdetailsBackLogDropdown {...props} Header={'0'} />,
    }
    // navigate(
    //   `/b/${boardId}/board/${task._id}-${encodeURIComponent(
    //     task.taskTitle
    //   )}`
    // )
  return (
    <section
      className="task-preview-actions-container"
      // style={position}
    >
      <div className="task-preview-actions">
        <div className="task-preview-action"
          onClick={() => {
            navigate(`/b/${task.taskboard}/board/${task._id}`)}}
            
            >
          <IconButton label={"Open card"}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5ZM19 7H5V13H19V7ZM17 16C17 16.5523 17.4477 17 18 17C18.5523 17 19 16.5523 19 16C19 15.4477 18.5523 15 18 15C17.4477 15 17 15.4477 17 16ZM6 17C5.44772 17 5 16.5523 5 16C5 15.4477 5.44772 15 6 15H10C10.5523 15 11 15.4477 11 16C11 16.5523 10.5523 17 10 17H6Z"
              fill="currentColor"
            ></path>
          </IconButton>
        </div>
        <div className="task-preview-action">
          
          <DropdownUi
            trigger={
              <IconButton label={"Edit labels"}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.1213 2.80762C12.3403 2.02657 11.0739 2.02657 10.2929 2.80762L3.92891 9.17158C1.19524 11.9052 1.19524 16.3374 3.92891 19.0711C6.66258 21.8047 11.0947 21.8047 13.8284 19.0711L20.1924 12.7071C20.9734 11.9261 20.9734 10.6597 20.1924 9.87869L13.1213 2.80762ZM18.7782 11.2929L11.7071 4.22183L5.34313 10.5858C3.39051 12.5384 3.39051 15.7042 5.34313 17.6569C7.29575 19.6095 10.4616 19.6095 12.4142 17.6569L18.7782 11.2929ZM10 14C10 14.5523 9.55228 15 9 15C8.44772 15 8 14.5523 8 14C8 13.4477 8.44772 13 9 13C9.55228 13 10 13.4477 10 14ZM12 14C12 15.6569 10.6569 17 9 17C7.34315 17 6 15.6569 6 14C6 12.3431 7.34315 11 9 11C10.6569 11 12 12.3431 12 14Z"
              fill="currentColor"
            ></path>
          </IconButton>
            }
          >
            {(controlProps) =>
              labelButton.content?.({
                title: labelButton.label,
                ...controlProps,
              })
            }
          </DropdownUi>
        </div>
        <div className="task-preview-action">
        <DropdownUi
            trigger={
              <IconButton label={"Change members"}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0254 3C9.25613 3 7.01123 5.23858 7.01123 8C7.01123 10.7614 9.25613 13 12.0254 13C14.7946 13 17.0395 10.7614 17.0395 8C17.0395 5.23858 14.7946 3 12.0254 3ZM9.01688 8C9.01688 9.65685 10.3638 11 12.0254 11C13.6869 11 15.0338 9.65685 15.0338 8C15.0338 6.34315 13.6869 5 12.0254 5C10.3638 5 9.01688 6.34315 9.01688 8Z"
              fill="currentColor"
            ></path>
            <path fillRule="evenodd" clipRule="evenodd" d="M12.0254 11C16.7803 11 20.6765 14.6667 21.0254 19.3194C20.8721 20.2721 20.0439 21 19.0452 21H18.9741C18.9741 21 18.9741 21 18.9741 21L5.0767 21C5.07671 21 5.0767 21 5.0767 21L5.00562 21C4.00691 21 3.1787 20.2721 3.02539 19.3193C3.37428 14.6667 7.27038 11 12.0254 11ZM5.0767 19H18.9741C18.4875 15.6077 15.5618 13 12.0254 13C8.48892 13 5.56331 15.6077 5.0767 19ZM19.0451 19.9769V20.0231C19.0452 20.0154 19.0452 20.0077 19.0452 20C19.0452 19.9923 19.0452 19.9846 19.0451 19.9769Z" fill="currentColor"></path>
          </IconButton>
            }
          >
            {(controlProps) =>
              membersButton.content?.({
                title: labelButton.label,
                ...controlProps,
              })
            }
          </DropdownUi>
          {/* <IconButton label={"Change members"}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0254 3C9.25613 3 7.01123 5.23858 7.01123 8C7.01123 10.7614 9.25613 13 12.0254 13C14.7946 13 17.0395 10.7614 17.0395 8C17.0395 5.23858 14.7946 3 12.0254 3ZM9.01688 8C9.01688 9.65685 10.3638 11 12.0254 11C13.6869 11 15.0338 9.65685 15.0338 8C15.0338 6.34315 13.6869 5 12.0254 5C10.3638 5 9.01688 6.34315 9.01688 8Z"
              fill="currentColor"
            ></path>
          </IconButton> */}
        </div>
        <div className="task-preview-action">
          <DropdownUi
            trigger={
              <IconButton label={"Change cover"}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5ZM19 7H5V13H19V7Z"
              fill="currentColor"
            ></path>
          </IconButton>
            }
          >
            {(controlProps) =>
              coverButton.content?.({
                title: coverButton.label,
                ...controlProps,
              })
            }
          </DropdownUi>
          {/* <IconButton label={"Change cover"}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5ZM19 7H5V13H19V7Z"
              fill="currentColor"
            ></path>
          </IconButton> */}
        </div>
        <div className="task-preview-action">
          <DropdownUi
            trigger={
              <IconButton label={"Edit dates"}>
            <path
              d="M13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L13.7929 15.2071C14.1834 15.5976 14.8166 15.5976 15.2071 15.2071C15.5976 14.8166 15.5976 14.1834 15.2071 13.7929L13 11.5858V6Z"
              fill="currentColor"
            ></path>
            <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" fill="currentColor"></path>
          </IconButton>
            }
          >
            {(controlProps) =>
              datesButton.content?.({
                title: datesButton.label,
                ...controlProps,
              })
            }
          </DropdownUi>
          {/* <IconButton label={"Edit dates"}>
            <path
              d="M13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L13.7929 15.2071C14.1834 15.5976 14.8166 15.5976 15.2071 15.2071C15.5976 14.8166 15.5976 14.1834 15.2071 13.7929L13 11.5858V6Z"
              fill="currentColor"
            ></path>
            <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" fill="currentColor"></path>
          </IconButton> */}
        </div>
        <div className="task-preview-action">
          <DropdownUi
            trigger={
              <IconButton label={"Move"}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.292 4.29149C11.903 4.67949 11.903 5.31649 12.292 5.70549L17.586 10.9995H4C3.45 10.9995 3 11.4495 3 11.9995C3 12.5505 3.45 13.0005 4 13.0005H17.586L12.289 18.2965C11.9 18.6855 11.9 19.3215 12.289 19.7105C12.678 20.1005 13.315 20.1005 13.703 19.7105L20.702 12.7125C20.704 12.7115 20.706 12.7095 20.709 12.7075C20.903 12.5145 21 12.2565 21 11.9995C21 11.7425 20.903 11.4855 20.709 11.2915C20.706 11.2905 20.703 11.2885 20.701 11.2865L13.706 4.29149C13.512 4.09749 13.255 4.00049 12.999 4.00049C12.743 4.00049 12.486 4.09749 12.292 4.29149Z"
              fill="currentColor"
            ></path>
          </IconButton>
            }
          >
            {(controlProps) =>
              moveButton.content?.({
                title: moveButton.label,
                ...controlProps,
              })
            }
          </DropdownUi>
          {/* <IconButton label={"Move"}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.292 4.29149C11.903 4.67949 11.903 5.31649 12.292 5.70549L17.586 10.9995H4C3.45 10.9995 3 11.4495 3 11.9995C3 12.5505 3.45 13.0005 4 13.0005H17.586L12.289 18.2965C11.9 18.6855 11.9 19.3215 12.289 19.7105C12.678 20.1005 13.315 20.1005 13.703 19.7105L20.702 12.7125C20.704 12.7115 20.706 12.7095 20.709 12.7075C20.903 12.5145 21 12.2565 21 11.9995C21 11.7425 20.903 11.4855 20.709 11.2915C20.706 11.2905 20.703 11.2885 20.701 11.2865L13.706 4.29149C13.512 4.09749 13.255 4.00049 12.999 4.00049C12.743 4.00049 12.486 4.09749 12.292 4.29149Z"
              fill="currentColor"
            ></path>
          </IconButton> */}
        </div>
        <div className="task-preview-action">
          <DropdownUi
            trigger={
              <IconButton label={"Copy"}>
            <path fillRule="evenodd" clipRule="evenodd" d="M5 16V4.99188C5 3.8918 5.90195 3 7.00853 3H14.9915L15 3.00002V5H7V16H5ZM8 19C8 20.1046 8.89543 21 10 21H18C19.1046 21 20 20.1046 20 19V8C20 6.89543 19.1046 6 18 6H10C8.89543 6 8 6.89543 8 8V19ZM10 8V19H18V8H10Z" fill="currentColor"></path>
          </IconButton>
            }
          >
            {(controlProps) =>
              copyButton.content?.({
                title: copyButton.label,
                ...controlProps,
              })
            }
          </DropdownUi>
        </div>
        {/* <div className="task-preview-action">
          <IconButton label={"Archive"}>
            <path
              d="M3.03418 5.59621C2.98604 5.04603 3.39303 4.56099 3.94322 4.51286L19.8823 3.11837C20.4325 3.07023 20.9175 3.47722 20.9657 4.02741L21.0528 5.0236L3.12133 6.5924L3.03418 5.59621Z"
              fill="currentColor"
            ></path>
          </IconButton>
        </div> */}
        {/* <TaskPreviewLabels task={task} />
        <TaskDetailsMembers task={task} /> */}
        {/* Add any other action components here */}
      </div>
    </section>
  )
}
