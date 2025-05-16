const svgs = {
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
