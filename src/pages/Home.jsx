import { useNavigate } from 'react-router-dom';
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

export function Home() {
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
      <div className="HomepageDisplay">
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
                  className="HomepageDisplayNavTopButtonsBoard">Boards</span>
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
        <div className="home-main-content-container">
          <div className="home-main-content-item">
            <div className="home-main-content-item-high">
              <div className="home-main-content-item-highSvg">
                <span className="HomepageDisplayNavTopButtonsIconInside">
                  <img
                    style={{ marginTop: '4px', color: '#172b4d' }}
                    width={16}
                    height={16}
                    src={HeartIcon}
                    alt="My icon"
                  />
                </span>
              </div>
              <div className="home-main-content-item-Highlights"> Highlights</div>
            </div>
            <div className="home-main-content-item-high-container">
              <div className="home-main-content-item-high-container-sticker"></div>
              <div className="home-main-content-item-high-container-text">
                <span className="home-main-content-item-high-container-text-first">Highlights</span>
                <span className="home-main-content-item-high-container-text-2">
                  Stay up to date with activity from your Workspaces and boards.
                </span>
                <button className="home-main-content-item-high-container-button">
                  Got it! Dismiss this.
                </button>
              </div>
            </div>
            <ul className="home-main-content-container-ul">
              <li className="home-main-content-container-ul-li"></li>
              <li></li>
            </ul>
          </div>
        </div>
        <div className="home-right-sidebar-container">
          <div style={{ paddingBottom: '24px' }}>
            <div className="home-right-sidebar-container-viewed">
              <div className="home-right-sidebar-container-viewed-Svg">
                <span className="HomepageDisplayNavTopButtonsIconInside">
                  <img
                    style={{ marginTop: '4px', color: '#172b4d' }}
                    width={16}
                    height={16}
                    src={ClockIcon}
                    alt="My icon"
                  />
                </span>
              </div>
              <div className="home-right-sidebar-container-viewed-Text">Recently viewed</div>
            </div>
            <ul className="home-right-sidebar-container-viewed-ul">
              <div className="recenetBoards" >
                {user?.lastBoardVisited[0]?.boardTitle && (
                  <a 
                  style={{marginLeft:'-20px'}} className="recenetBoardsNexted">
                    <div className="boxboards"></div>
                    <h2
                      onClick={() => {
                        const last = user?.lastBoardVisited?.[0];

                        const slug = last?.boardTitle;
                        const boardId = last?.id;

                        console.log('last visited entry:', last);
                        console.log('🧠 Navigating to:', `/b/${boardId}/${slug}`);

                        if (boardId && slug) {
                          navigate(`/b/${boardId}/${slug}`);
                        }
                      }}>
                      {user?.lastBoardVisited[0]?.boardTitle ?? ''}
                      <br />

                      <span className="ClassnameGlobalName">Berllo Workspace</span>
                    </h2>
                  </a>
                )}{' '}
                {user?.lastBoardVisited[1]?.boardTitle && (
                  <a 
                  style={{marginLeft:'-20px'}} className="recenetBoardsNexted">
                    <div className="boxboards"></div>
                    <h2
                      onClick={() => {
                        const last = user?.lastBoardVisited?.[1];

                        const slug = last?.boardTitle;
                        const boardId = last?.id;

                        console.log('last visited entry:', last);
                        console.log('🧠 Navigating to:', `/b/${boardId}/${slug}`);

                        if (boardId && slug) {
                          navigate(`/b/${boardId}/${slug}`);
                        }
                      }}>
                      {user?.lastBoardVisited[1]?.boardTitle ?? ''}
                      <br />

                      <span className="ClassnameGlobalName">Berllo Workspace</span>
                    </h2>
                  </a>
                )}{' '}
                {user?.lastBoardVisited[2]?.boardTitle && (
                  <a 
                  style={{marginLeft:'-20px'}} className="recenetBoardsNexted">
                    <div className="boxboards"></div>
                    <h2
                      onClick={() => {
                        const last = user?.lastBoardVisited?.[2];

                        const slug = last?.boardTitle;
                        const boardId = last?.id;

                        console.log('last visited entry:', last);
                        console.log('🧠 Navigating to:', `/b/${boardId}/${slug}`);

                        if (boardId && slug) {
                          navigate(`/b/${boardId}/${slug}`);
                        }
                      }}>
                      {user?.lastBoardVisited[2]?.boardTitle ?? ''}
                      <br />

                      <span className="ClassnameGlobalName">Berllo Workspace</span>
                    </h2>
                  </a>
                )}{' '}
                {user?.lastBoardVisited[3]?.boardTitle && (
                  <a 
                  style={{marginLeft:'-20px'}} className="recenetBoardsNexted">
                    <div className="boxboards"></div>
                    <h2
                      onClick={() => {
                        const last = user?.lastBoardVisited?.[3];

                        const slug = last?.boardTitle;
                        const boardId = last?.id;

                        console.log('last visited entry:', last);
                        console.log('🧠 Navigating to:', `/b/${boardId}/${slug}`);

                        if (boardId && slug) {
                          navigate(`/b/${boardId}/${slug}`);
                        }
                      }}>
                      {user?.lastBoardVisited[3]?.boardTitle ?? ''}
                      <br />

                      <span className="ClassnameGlobalName">Berllo Workspace</span>
                    </h2>
                  </a>
                )}{' '}
              </div>
            </ul>
          </div>
          <div style={{ paddingBottom: '24px' }}>
            <div className="home-right-sidebar-container-link">
              <div className="home-right-sidebar-container-link-inside">Links</div>
            </div>
            <div className="home-right-sidebar-container-create">
              <button className="home-right-sidebar-container-bottom">
                <span className="home-right-sidebar-container-bottom-plus">+</span>
                <span>Create a board</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
