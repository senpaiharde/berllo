const svgs = {
    SvgDateRight:` <svg
            width="12px"
            height="12px"
            viewBox="0 0 12 12"
            fill="none"
            role="presentation"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            
            <path stroke="currentcolor" stroke-linejoin="round"
            d="M1.5 10.5 6 6 1.5 1.5m4.75 9 4.5-4.5-4.5-4.5"/>
          </svg>`,
    SvgDateRightsmall:` <svg
            width="12px"
            height="12px"
            viewBox="0 0 12 12"
            fill="none"
            role="presentation"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            
            <path stroke="currentcolor" stroke-linejoin="round"
            d="M4.5 10.5 9 6 4.5 1.5"/>
          </svg>`,
    SvgDateLeftsmall:`<svg
            width="12px"
            height="12px"
            viewBox="0 0 12 12"
            fill="none"
            role="presentation"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            
            <path stroke="currentcolor" stroke-linejoin="round"
            d="M7.5 10.5 3 6l4.5-4.5" />
          </svg>`,
    SvgDateLeft:` <svg
            width="12px"
            height="12px"
            viewBox="0 0 12 12"
            fill="none"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            
            <path stroke="currentcolor" stroke-linejoin="round"
            d="M10.5 10.5 6 6l4.5-4.5m-4.75 9L1.25 6l4.5-4.5" />
          </svg>`,
    SvgDropdown:`<svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            
            role="presentation"
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
          >
            
            <path stroke="currentcolor" fillRule="evenodd"  
            d="M8.292 10.293a1.01 1.01 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0" />
          </svg>`,
    SvgEye:` <svg
              
              width="16px"
              height="16px"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{
               justifyContent:'center',
                textAlign: 'center',
               marginLeft:'5px',
               marginTop: "-px",
               marginBottom: "-4px",
              }}
            >
              <path d="M12.0006 18C7.46367 18 4.00142 13.74 4.00142 12C4.00142 9.999 7.45967 6 12.0006 6C16.3775 6 19.9988 9.973 19.9988 12C19.9988 13.74 16.5366 18 12.0006 18ZM12.0006 4C6.48003 4 2.00012 8.841 2.00012 12C2.00012 15.086 6.5771 20 12.0006 20C17.4241 20 22.0001 15.086 22.0001 12C22.0001 8.841 17.5212 4 12.0006 4ZM11.9775 13.9844C10.8745 13.9844 9.97752 13.0874 9.97752 11.9844C9.97752 10.8814 10.8745 9.9844 11.9775 9.9844C13.0805 9.9844 13.9775 10.8814 13.9775 11.9844C13.9775 13.0874 13.0805 13.9844 11.9775 13.9844ZM11.9775 7.9844C9.77152 7.9844 7.97752 9.7784 7.97752 11.9844C7.97752 14.1904 9.77152 15.9844 11.9775 15.9844C14.1835 15.9844 15.9775 14.1904 15.9775 11.9844C15.9775 9.7784 14.1835 7.9844 11.9775 7.9844Z"
            /></svg>`,
    SvgDrop: ` <svg
                width="14px"
                height="14px"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{
                 marginLeft:'-5px',
                }}
              >
                <path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
              /></svg>`,
    SvgClose: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 6L6 18M6 6l12 12" stroke="#172b4d" strokeWidth="2" strokeLinecap="round" />
    </svg>`,
    CoverHeader:`<svg
      width="18px"
      height="18px"
      viewBox="0 0 24 24"
      fill="currentColor"
      >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5ZM19 7H5V13H19V7Z"
      />
    </svg>`,
    SvgcloseTop:`<svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="currentColor"
          
        >
          <path
            fillRule="evenodd"
           clipRule="evenodd"
            d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
          />
        </svg>`,
  taskDetailsSvgLeft: `  <svg
          width="22px"
          height="22px"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ marginRight: "12px", marginLeft: "-32px"
            , marginTop:'-14px'
           }} 
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM4 9C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11H20C20.5523 11 21 10.5523 21 10C21 9.44772 20.5523 9 20 9H4ZM3 14C3 13.4477 3.44772 13 4 13H20C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14ZM4 17C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19H14C14.5523 19 15 18.5523 15 18C15 17.4477 14.5523 17 14 17H4Z"
          />
        </svg>`,
  next: '<svg role="img" height="16" width="16" aria-hidden="true" class="Svg-sc-ytk21e-0 lmlFMn IYDlXmBmmUKHveMzIPCF" viewBox="0 0 16 16" data-encore-id="icon"><path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z"></path></svg>',
};
export const svgService5 = {
  getSvg: (iconName, iconSize) => svgs[iconName],
};

export const svgService = {
  getSvg(name) {
    return svgs[name] || null;
  },
};
