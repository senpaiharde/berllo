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
            <ul>
                <li><a></a>
                <ul></ul>
                <div></div></li>
              
            </ul>
          </div>
        </nav>
        <div className="home-main-content-container"></div>
        <div className="home-right-sidebar-container"></div>
      </div>
    </div>
  );
}
