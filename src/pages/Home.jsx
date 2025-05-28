import GlobalHeader from '../components/GlobalHeader';

export function Home() {
  return (
    <div>
      <GlobalHeader />
      <div className="HomepageDisplay">
        <nav className="HomepageDisplayNav">
          <div>
            <ul className="HomepageDisplayNavTop">
              <li className="HomepageDisplayNavTopButtons">
                <a>
                  <span></span>
                  <span>Boards</span>
                </a>
              </li>
              <li className="HomepageDisplayNavTopButtons">
                <a>
                  <span></span>
                  <span>Templates</span>
                </a>
              </li>
              <li className="HomepageDisplayNavTopButtons">
                <a>
                  <span></span>
                  <span>Home</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="HomepageDisplayNavBottom">
              <div className="HomepageDisplayNavBottomText"></div>
              <li className="HomepageDisplayNavTopButtons">
                <a className="HomepageDisplayNavBottomWorkspace"></a>
                <ul className="HomepageDisplayNavBottomWorkspaceUL">
                  <li className="HomepageDisplayNavBottomWorkspaceULLi">
                    <a>
                      <span></span>
                      <span>Boards</span>
                    </a>
                  </li>
                  <li className="HomepageDisplayNavBottomWorkspaceULLi">
                    <a>
                      <span></span>
                      <span>Highlights</span>
                    </a>
                  </li>
                  <li className="HomepageDisplayNavBottomWorkspaceULLi">
                    <a>
                      <span></span>
                      <span>Views</span>
                    </a>
                  </li>
                  <li className="HomepageDisplayNavBottomWorkspaceULLi">
                    <a>
                      <span></span>
                      <span>Members</span>
                    </a>
                  </li>
                  <li className="HomepageDisplayNavBottomWorkspaceULLi">
                    <a>
                      <span></span>
                      <span>Settings</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        <div className="home-main-content-container">
          <div 
            className="home-main-content-item">
                <div className="home-main-content-item-high"></div>
                <div></div>
                <ul></ul>
            </div>
        </div>
        <div className="home-right-sidebar-container"></div>
      </div>
    </div>
  );
}
