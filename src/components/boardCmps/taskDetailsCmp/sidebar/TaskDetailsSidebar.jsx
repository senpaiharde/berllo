import React from "react";
import { User, Tag, Calendar, Paperclip, MapPin, Image, Settings, Copy, Archive, Share } from 'lucide-react';

const TaskDetailsSidebar = () => {
  const sidebarButtons = [
    {
      label: "Leave",
      icon: (
        <svg
          width="14px"
          height="14px"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
        >
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0254 3C9.25613 3 7.01123 5.23858 7.01123 8C7.01123 9.44777 7.62829 10.7518 8.61446 11.6649C5.52103 12.925 3.28572 15.8477 3.02539 19.3193C3.1787 20.2721 4.00691 21 5.00562 21L11 21C11.5523 21 12 20.5523 12 20C12 19.4477 11.5523 19 11 19H5.0767C5.56331 15.6077 8.48892 13 12.0254 13C13.7913 13 15.405 13.6503 16.6387 14.7238C16.8358 14.8953 17.0844 15 17.3457 15H17.6553C18.4554 15 18.9052 14.1202 18.332 13.5618C17.5052 12.7563 16.5237 12.1079 15.4362 11.6649C16.4224 10.7518 17.0395 9.44777 17.0395 8C17.0395 5.23858 14.7946 3 12.0254 3ZM15.0338 8C15.0338 9.65685 13.6869 11 12.0254 11C10.3638 11 9.01688 9.65685 9.01688 8C9.01688 6.34315 10.3638 5 12.0254 5C13.6869 5 15.0338 6.34315 15.0338 8Z" />
        </svg>
      ),
    },
    {
        label: "Members",
        icon: (
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0254 3C9.25613 3 7.01123 5.23858 7.01123 8C7.01123 10.7614 9.25613 13 12.0254 13C14.7946 13 17.0395 10.7614 17.0395 8C17.0395 5.23858 14.7946 3 12.0254 3ZM9.01688 8C9.01688 9.65685 10.3638 11 12.0254 11C13.6869 11 15.0338 9.65685 15.0338 8C15.0338 6.34315 13.6869 5 12.0254 5C10.3638 5 9.01688 6.34315 9.01688 8Z" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0254 11C16.7803 11 20.6765 14.6667 21.0254 19.3194C20.8721 20.2721 20.0439 21 19.0452 21H18.9741C18.9741 21 18.9741 21 18.9741 21L5.0767 21C5.07671 21 5.0767 21 5.0767 21L5.00562 21C4.00691 21 3.1787 20.2721 3.02539 19.3193C3.37428 14.6667 7.27038 11 12.0254 11ZM5.0767 19H18.9741C18.4875 15.6077 15.5618 13 12.0254 13C8.48892 13 5.56331 15.6077 5.0767 19ZM19.0451 19.9769V20.0231C19.0452 20.0154 19.0452 20.0077 19.0452 20C19.0452 19.9923 19.0452 19.9846 19.0451 19.9769Z" />
          </svg>
        ),
      },
      {
        label: "Labels",
        icon: (
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1213 2.80762C12.3403 2.02657 11.0739 2.02657 10.2929 2.80762L3.92891 9.17158C1.19524 11.9052 1.19524 16.3374 3.92891 19.0711C6.66258 21.8047 11.0947 21.8047 13.8284 19.0711L20.1924 12.7071C20.9734 11.9261 20.9734 10.6597 20.1924 9.87869L13.1213 2.80762ZM18.7782 11.2929L11.7071 4.22183L5.34313 10.5858C3.39051 12.5384 3.39051 15.7042 5.34313 17.6569C7.29575 19.6095 10.4616 19.6095 12.4142 17.6569L18.7782 11.2929ZM10 14C10 14.5523 9.55228 15 9 15C8.44772 15 8 14.5523 8 14C8 13.4477 8.44772 13 9 13C9.55228 13 10 13.4477 10 14ZM12 14C12 15.6569 10.6569 17 9 17C7.34315 17 6 15.6569 6 14C6 12.3431 7.34315 11 9 11C10.6569 11 12 12.3431 12 14Z" />
          </svg>
        ),
      },
      {
        label: "Checklist",
        icon: (
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V13C20 12.4477 19.5523 12 19 12C18.4477 12 18 12.4477 18 13V18H6V6L16 6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H6ZM8.73534 10.3223C8.36105 9.91618 7.72841 9.89038 7.3223 10.2647C6.91619 10.639 6.89039 11.2716 7.26467 11.6777L10.8768 15.597C11.4143 16.1231 12.2145 16.1231 12.7111 15.6264L13.0754 15.2683C13.3699 14.9785 13.6981 14.6556 14.0516 14.3075C15.0614 13.313 16.0713 12.3169 17.014 11.3848L17.0543 11.3449C18.7291 9.68869 20.0004 8.42365 20.712 7.70223C21.0998 7.30904 21.0954 6.67589 20.7022 6.28805C20.309 5.90022 19.6759 5.90457 19.2881 6.29777C18.5843 7.01131 17.3169 8.27244 15.648 9.92281L15.6077 9.96263C14.6662 10.8937 13.6572 11.8889 12.6483 12.8825L11.8329 13.6851L8.73534 10.3223Z" />
          </svg>
        ),
      },
      {
        label: "Dates",
        icon: (
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" />
            <path  d="M13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L13.7929 15.2071C14.1834 15.5976 14.8166 15.5976 15.2071 15.2071C15.5976 14.8166 15.5976 14.1834 15.2071 13.7929L13 11.5858V6Z" />
          </svg>
        ),
      },
      {
        label: "Attachment",
        icon: (
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6426 17.9647C10.1123 19.46 7.62736 19.4606 6.10092 17.9691C4.57505 16.478 4.57769 14.0467 6.10253 12.5566L13.2505 5.57184C14.1476 4.6952 15.5861 4.69251 16.4832 5.56921C17.3763 6.44184 17.3778 7.85135 16.4869 8.72199L9.78361 15.2722C9.53288 15.5172 9.12807 15.5163 8.86954 15.2636C8.61073 15.0107 8.60963 14.6158 8.86954 14.3618L15.0989 8.27463C15.4812 7.90109 15.4812 7.29546 15.0989 6.92192C14.7167 6.54838 14.0969 6.54838 13.7146 6.92192L7.48523 13.0091C6.45911 14.0118 6.46356 15.618 7.48523 16.6163C8.50674 17.6145 10.1511 17.6186 11.1679 16.6249L17.8712 10.0747C19.5274 8.45632 19.5244 5.83555 17.8676 4.2165C16.2047 2.59156 13.5266 2.59657 11.8662 4.21913L4.71822 11.2039C2.42951 13.4404 2.42555 17.083 4.71661 19.3218C7.00774 21.5606 10.7323 21.5597 13.0269 19.3174L19.7133 12.7837C20.0956 12.4101 20.0956 11.8045 19.7133 11.431C19.331 11.0574 18.7113 11.0574 18.329 11.431L11.6426 17.9647Z" />
          </svg>
        ),
      },
      {
        label: "Location",
        icon: (
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C14.2802 21 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 9.71981 21 12 21ZM12 12C13.6081 12 14.9118 10.6964 14.9118 9.08823C14.9118 7.48011 13.6081 6.17647 12 6.17647C10.3919 6.17647 9.08824 7.48011 9.08824 9.08823C9.08824 10.6964 10.3919 12 12 12Z" />
          </svg>
        ),
      },
      {
        label: "Cover",
        icon: (
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5ZM19 7H5V13H19V7Z" />
          </svg>
        ),
      },
      {
        label: "Custom Fields",
        icon: (
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C2.44772 6 2 6.44772 2 7C2 7.55228 2.44772 8 3 8H11C11.5523 8 12 7.55228 12 7C12 6.44772 11.5523 6 11 6H3ZM4 16V12H20V16H4ZM2 12C2 10.8954 2.89543 10 4 10H20C21.1046 10 22 10.8954 22 12V16C22 17.1046 21.1046 18 20 18H4C2.89543 18 2 17.1046 2 16V12Z" />
          </svg>
        ),
      },
    
  ];
  const sidebarButtonsBottom = [
    {
        label: "Move",
        icon: (
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.292 4.29149C11.903 4.67949 11.903 5.31649 12.292 5.70549L17.586 10.9995H4C3.45 10.9995 3 11.4495 3 11.9995C3 12.5505 3.45 13.0005 4 13.0005H17.586L12.289 18.2965C11.9 18.6855 11.9 19.3215 12.289 19.7105C12.678 20.1005 13.315 20.1005 13.703 19.7105L20.702 12.7125C20.704 12.7115 20.706 12.7095 20.709 12.7075C20.903 12.5145 21 12.2565 21 11.9995C21 11.7425 20.903 11.4855 20.709 11.2915C20.706 11.2905 20.703 11.2885 20.701 11.2865L13.706 4.29149C13.512 4.09749 13.255 4.00049 12.999 4.00049C12.743 4.00049 12.486 4.09749 12.292 4.29149Z" />
          </svg>
        ),
      },
      {
        label: "Copy",
        icon: (
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V4.99188C5 3.8918 5.90195 3 7.00853 3H14.9915L15 3.00002V5H7V16H5ZM8 19C8 20.1046 8.89543 21 10 21H18C19.1046 21 20 20.1046 20 19V8C20 6.89543 19.1046 6 18 6H10C8.89543 6 8 6.89543 8 8V19ZM10 8V19H18V8H10Z" />
          </svg>
        ),
      },
      {
        label: "Mirror",
        icon: (
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5ZM19 7H5V13H19V7ZM17 16C17 16.5523 17.4477 17 18 17C18.5523 17 19 16.5523 19 16C19 15.4477 18.5523 15 18 15C17.4477 15 17 15.4477 17 16ZM6 17C5.44772 17 5 16.5523 5 16C5 15.4477 5.44772 15 6 15H10C10.5523 15 11 15.4477 11 16C11 16.5523 10.5523 17 10 17H6Z" />
          </svg>
        ),
      },
      {
        label: "Make Template",
        icon: (
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            <path  d="M16 3C15.4477 3 15 3.44772 15 4C15 4.55228 15.4477 5 16 5H19C19 3.89543 18.1046 3 17 3H16Z" />
            <path  d="M8 4C8 3.44772 8.44772 3 9 3H13C13.5523 3 14 3.44772 14 4C14 4.55228 13.5523 5 13 5H9C8.44772 5 8 4.55228 8 4Z" />
            <path  d="M3 9C3 8.44772 3.44772 8 4 8C4.55228 8 5 8.44772 5 9V12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12V9Z" />
            <path  d="M4 14C3.44772 14 3 14.4477 3 15V16C3 17.1046 3.89543 18 5 18V15C5 14.4477 4.55228 14 4 14Z" />
            <path  d="M3 6V5C3 3.89543 3.89543 3 5 3H6C6.55228 3 7 3.44772 7 4C7 4.55228 6.55228 5 6 5H5V6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6Z" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 8C6 6.89543 6.89543 6 8 6H19C20.1046 6 21 6.89543 21 8V18C21 19.1046 20.1046 20 19 20H8C6.89543 20 6 19.1046 6 18V8ZM8 8H19V14H8V8ZM18 18C17.4477 18 17 17.5523 17 17C17 16.4477 17.4477 16 18 16C18.5523 16 19 16.4477 19 17C19 17.5523 18.5523 18 18 18ZM8 17C8 17.5523 8.44772 18 9 18H12C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16H9C8.44772 16 8 16.4477 8 17Z" />
          </svg>
        ),
      },
    
  ]

  const BottomButtons = [
    {
        label: "Archive",
        icon: (
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            <path  d="M3.03418 5.59621C2.98604 5.04603 3.39303 4.56099 3.94322 4.51286L19.8823 3.11837C20.4325 3.07023 20.9175 3.47722 20.9657 4.02741L21.0528 5.0236L3.12133 6.5924L3.03418 5.59621Z" />
            <path  d="M9 12.9999C9 12.4476 9.44772 11.9999 10 11.9999H14C14.5523 11.9999 15 12.4476 15 12.9999C15 13.5522 14.5523 13.9999 14 13.9999H10C9.44772 13.9999 9 13.5522 9 12.9999Z" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 18.9999V7.99993H21V18.9999C21 20.1045 20.1046 20.9999 19 20.9999H5C3.89543 20.9999 3 20.1045 3 18.9999ZM5 9.99993H19V18.9999H5L5 9.99993Z" />
          </svg>
        ),
      },
      {
        label: "Share",
        icon: (
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13.562L15.66 18.562L16.66 16.83L8 11.83L7 13.562Z" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 10.83L8 12.562L16.66 7.56199L15.66 5.82999L7 10.83Z" />
            <path  d="M6 15C6.79565 15 7.55871 14.6839 8.12132 14.1213C8.68393 13.5587 9 12.7956 9 12C9 11.2043 8.68393 10.4413 8.12132 9.87867C7.55871 9.31606 6.79565 8.99999 6 8.99999C5.20435 8.99999 4.44129 9.31606 3.87868 9.87867C3.31607 10.4413 3 11.2043 3 12C3 12.7956 3.31607 13.5587 3.87868 14.1213C4.44129 14.6839 5.20435 15 6 15ZM6 13C5.73478 13 5.48043 12.8946 5.29289 12.7071C5.10536 12.5196 5 12.2652 5 12C5 11.7348 5.10536 11.4804 5.29289 11.2929C5.48043 11.1053 5.73478 11 6 11C6.26522 11 6.51957 11.1053 6.70711 11.2929C6.89464 11.4804 7 11.7348 7 12C7 12.2652 6.89464 12.5196 6.70711 12.7071C6.51957 12.8946 6.26522 13 6 13ZM18 21C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18C21 17.2043 20.6839 16.4413 20.1213 15.8787C19.5587 15.3161 18.7956 15 18 15C17.2044 15 16.4413 15.3161 15.8787 15.8787C15.3161 16.4413 15 17.2043 15 18C15 18.7956 15.3161 19.5587 15.8787 20.1213C16.4413 20.6839 17.2044 21 18 21ZM18 19C17.7348 19 17.4804 18.8946 17.2929 18.7071C17.1054 18.5196 17 18.2652 17 18C17 17.7348 17.1054 17.4804 17.2929 17.2929C17.4804 17.1053 17.7348 17 18 17C18.2652 17 18.5196 17.1053 18.7071 17.2929C18.8946 17.4804 19 17.7348 19 18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19Z" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7ZM18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 7.65685 16.3431 9 18 9Z" />
          </svg>
        ),
      },
      
  ]

  return (
    <div className="td-sidebar">
      {sidebarButtons.map((button, index) => (
        <button key={index} className="trello-btn">
          {button.icon} {button.label}
        </button>
      ))}

      <section className="td-sidebar">
        <hgroup>
          <h4 className="td-sidebar-power">Power-Ups</h4>
        </hgroup>

        <a className="trello-btn" href="" type="button">
          <span className="trello-btn-text">Add Power-Ups</span>
          <span className="td-icons">
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z" />
          </svg>
          </span>
        </a>
      </section>

      <section className="td-sidebar">
        <hgroup>
          <h4 className="td-sidebar-power">
            Automation
            <button className="td-sidebar-h4-button"></button>
          </h4>
        </hgroup>

        <a className="trello-btn" href="" type="button">
          <span className="trello-btn-text">Add button</span>
          <span className="td-icons">
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z" />
          </svg>
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