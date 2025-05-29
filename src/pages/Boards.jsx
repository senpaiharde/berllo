import GlobalHeader from '../components/GlobalHeader';
import BoardsIcon from '.././assets/images/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgdmlld0JveD0iMCAwIDI0IDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCI (2).svg';
import myIconSearch from '.././assets/images/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiByb2xlPSJwcmVzZW50YXRpb24iPjxwYXRoIGZpbGw9ImN1cnJlbnRjb2xvciIgZmlsbC1ydWxlPSJldmVub2RkIiB.svg';

import homeIcon from '.././assets/images/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgdmlld0JveD0iMCAwIDI0IDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCI (3).svg';
import HeartIcon from '.././assets/images/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgdmlld0JveD0iMCAwIDI0IDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCI (4).svg';
import MemberIcon from '.././assets/images/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgdmlld0JveD0iMCAwIDI0IDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCI (5).svg';
import GearIcon from '.././assets/images/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgdmlld0JveD0iMCAwIDI0IDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCI (6).svg';
import ClockIcon from '.././assets/images/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTEzIDZDMTMgNS40NDc.svg';
import { useEffect, useState } from 'react';
import fetchCurrentUser from '../services/backendCallsUsers';
import { useNavigate } from 'react-router-dom';
const workspaceLeft = [
  {
    title: 'Boards',
    icon: BoardsIcon,
  },
  {
    title: 'highlights',
    icon: HeartIcon,
  },
  {
    title: 'Views',
    icon: homeIcon,
  },
  {
    title: 'Members',
    icon: MemberIcon,
  },
  {
    title: 'settings',
    icon: GearIcon,
  },
];
const workspaceMain = [
  {
    title: 'Boards',
    icon: BoardsIcon,
  },

  {
    title: 'Views',
    icon: homeIcon,
  },
  {
    title: 'Members',
    icon: MemberIcon,
  },
  {
    title: 'settings',
    icon: GearIcon,
  },
];
export function Boards() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const me = await fetchCurrentUser();
        setUser(me);
      } catch (err) {
        console.log('there is error on loading users', err);
        return err;
      }
    }

    load();
  }, []);
  return (
    <div>
      <GlobalHeader />
      <div className="BoardsHomeContainer">
        <nav className="HomepageDisplayNav">
          <div>
            <ul className="HomepageDisplayNavTop">
              <li className="HomepageDisplayNavTopButtons">
                <a className="HomepageDisplayNavTopButtonsHref">
                  <span className="HomepageDisplayNavTopButtonsIcon">
                    <span className="HomepageDisplayNavTopButtonsIconInside">
                      <img
                        style={{ marginTop: '4px' }}
                        width={16}
                        height={16}
                        src={BoardsIcon}
                        alt="My icon"
                      />
                    </span>
                  </span>
                  <span
                    onClick={() => navigate(`/u/user/boards`)}
                    className="HomepageDisplayNavTopButtonsBoard">
                    Boards
                  </span>
                </a>
              </li>
              <li className="HomepageDisplayNavTopButtons">
                <a className="HomepageDisplayNavTopButtonsHref">
                  <span className="HomepageDisplayNavTopButtonsIcon">
                    <span className="HomepageDisplayNavTopButtonsIconInside">
                      <img
                        style={{ marginTop: '4px', color: '#172b4d' }}
                        width={16}
                        height={16}
                        src={myIconSearch}
                        alt="My icon"
                      />
                    </span>
                  </span>
                  <span className="HomepageDisplayNavTopButtonsBoard">Templates</span>
                </a>
              </li>
              <li className="HomepageDisplayNavTopButtons">
                <a className="HomepageDisplayNavTopButtonsHref">
                  <span className="HomepageDisplayNavTopButtonsIcon">
                    <span className="HomepageDisplayNavTopButtonsIconInside">
                      <img
                        style={{ marginTop: '4px' }}
                        width={16}
                        height={16}
                        src={homeIcon}
                        alt="My icon"
                      />
                    </span>
                  </span>
                  <span className="HomepageDisplayNavTopButtonsBoard" onClick={() => navigate('/')}>
                    Home
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="HomepageDisplayNavBottom">
              <div className="HomepageDisplayNavBottomText">
                <div className="HomepageDisplayNavBottomText">
                  <h2 className="HomepageDisplayNavBottomTextH2">Workspaces</h2>
                </div>
              </div>
              <li className="HomepageDisplayNavTopButtons">
                <a className="HomepageDisplayNavBottomWorkspace">
                  <div className="HomepageDisplayNavBottomWorkspaceIcon">B</div>
                  <span className="HomepageDisplayNavBottomWorkspaceIconspan">
                    Brello Workspace
                  </span>
                  <span className="HomepageDisplayNavBottomWorkspaceIconSvg"> </span>
                </a>
                <ul className="HomepageDisplayNavBottomWorkspaceUL">
                  {workspaceLeft.map((item) => (
                    <li className="HomepageDisplayNavTopButtons">
                      <a
                        className="HomepageDisplayNavTopButtonsHref"
                        style={{ color: '#172b4d', fontWeight: '200' }}>
                        <span className="HomepageDisplayNavTopButtonsIcon">
                          <span className="HomepageDisplayNavTopButtonsIconInside">
                            <img
                              style={{ marginTop: '4px', color: '#172b4d' }}
                              width={16}
                              height={16}
                              src={item.icon}
                              alt="My icon"
                            />
                          </span>
                        </span>
                        <span className="HomepageDisplayNavTopButtonsBoard">{item.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        <div className="BoardsHomeContainerMain">
          <div>
            <div className="BoardsHomeContainerMainRecent"></div>
            <h3 className="BoardsHomeContainerMainH3">YOUR WORKSPACES</h3>
            <div className="BoardsHomeContainerMainWorkspace">
              <div className="BoardsHomeContainerMainWorkspaceHeader">
                <div className="LoBoardsHomeContainerMainWorkspaceHeaderLogo">
                  <div className="LoBoardsHomeContainerMainWorkspaceHeaderLogoDisplay">
                    <div className="LoBoardsHomeContainerMainWorkspaceHeaderLogoDisplayB">B</div>
                  </div>
                </div>
                <h3 className="boards-page-board-section-header-name">Brello Workspace</h3>
                <div className="boards-page-board-section-header-options">
                  {workspaceMain.map((item) => (
                    <a
                      className="boards-page-board-section-header-options-item"
                      style={{ color: '#172b4d', fontWeight: '200', paddingBottom: '0px' }}>
                      <span className="HomepageDisplayNavTopButtonsIcon">
                        <span className="HomepageDisplayNavTopButtonsIconInside">
                          <img
                            style={{ color: '#172b4d' }}
                            width={16}
                            height={16}
                            src={item.icon}
                            alt="My icon"
                          />
                        </span>
                      </span>
                      <span className="HomepageDisplayNavTopButtonsBoard">{item.title}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <ul className="BoardsHomeContainerMainWorkspaceDisplay">
                  <li className="boards-page-board-section-list-item">
                    <a className="board-tile">
                      <span className="board-tile-fade"></span>
                      <div className='board-tile-details'>
                        <h2 className='board-tile-details-name'>Work Flow</h2>
                        <div className='board-tile-details-sub-container'></div>
                      </div>
                      
                    </a>
                  </li>
                   <li  className="boards-page-board-section-list-item-yes">
                    <div className='board-tile-mod-add'>
                        <p><span>Create new board</span></p>
                         <p className='remaining'><span>no Limit</span></p>
                          <div className='question-icon'>5</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
