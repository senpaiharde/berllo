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
import StarButton from '../services/isStarred';
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
  const handleStarToggle = async (boardId, newState) => {
    try {
      const me = await fetchCurrentUser();
      setUser(me);
    } catch (err) {
      console.error('Failed to toggle star:', err);
    }
  };
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
          <div style={{ paddingBottom: '24px', width: '362px' }}>
            <div className="home-right-sidebar-container-viewed">
              <span className="IstarredInside" style={{marginRight:'8px',marginLeft:'6px'}}>
                <span
                  className="IstarredFalse"
                  style={{
                    color: '#44546F',
                    fill: 'inherit',
                  }}>
                  <svg width="16" height="16 " viewBox="0 0 24 24" className="IstarredInsideSvg">
                    <path
                      fillRule="nonzero"
                      clipRule="evenodd"
                      d="M7.49495 20.995L11.9999 18.6266L16.5049 20.995C16.8059 21.1533 17.1507 21.2079 17.4859 21.1504C18.3276 21.006 18.893 20.2066 18.7486 19.3649L17.8882 14.3485L21.5328 10.7959C21.7763 10.5585 21.9348 10.2475 21.9837 9.91094C22.1065 9.06576 21.5209 8.28106 20.6758 8.15825L15.6391 7.42637L13.3866 2.86236C13.2361 2.55739 12.9892 2.31054 12.6843 2.16003C11.9184 1.78206 10.9912 2.0965 10.6132 2.86236L8.36072 7.42637L3.32403 8.15825C2.98747 8.20715 2.67643 8.36564 2.43904 8.60917C1.84291 9.22074 1.85542 10.1998 2.46699 10.7959L6.11158 14.3485L5.25121 19.3649C5.19372 19.7 5.24833 20.0448 5.40658 20.3459C5.80401 21.1018 6.739 21.3924 7.49495 20.995ZM19.3457 10.0485L15.6728 13.6287L16.5398 18.684L11.9999 16.2972L7.45995 18.684L8.327 13.6287L4.65411 10.0485L9.72993 9.31093L11.9999 4.71146L14.2699 9.31093L19.3457 10.0485Z"
                      fill="currentColor"></path>
                  </svg>
                </span>
              </span>
              <div className="home-right-sidebar-container-viewed-Text">Starred</div>
            </div>
            <ul className="home-right-sidebar-container-viewed-ul">
              <div className="recenetBoards">
                {user?.starredBoards
                  ?.filter((sb) => sb.isStarred)
                  .map((sb) => {
                    const recent = user.lastBoardVisited?.find((r) => r.id === sb.id);

                    return (
                      <a
                        key={sb.id}
                        style={{ height: '40px', width: '322px' }}
                        className="recenetBoardsNexted">
                        <div className="boxboards" />

                        <h2
                          style={{ marginRight: '38px' }}
                          onClick={() => {
                            const slug = recent.boardTitle;
                            const boardId = recent.id;
                            if (boardId && slug) navigate(`/b/${boardId}/${slug}`);
                          }}>
                          {recent.boardTitle}
                          <br />
                          <span className="ClassnameGlobalName">Berllo Workspace</span>
                        </h2>

                        <div style={{ marginLeft: '100px' }}>
                          <StarButton
                            boardId={sb.id}
                            initialIsStarred={sb.isStarred}
                            onToggle={(newState) => handleStarToggle(sb.id, newState)}
                          />
                        </div>
                      </a>
                    );
                  })}
              </div>
            </ul>
          </div>
          <div style={{ paddingBottom: '24px', width: '362px' }}>
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
              <div className="recenetBoards">
                {user?.lastBoardVisited?.map((recent) => {
                  const { id, boardTitle } = recent;
                  // find whether this is starred in the latest user state
                  const starEntry = user.starredBoards?.find((sb) => sb.id === id);
                  const isStarred = !!starEntry?.isStarred;

                  return (
                    <a
                      key={id}
                      style={{ height: '40px', width: '322px' }}
                      className="recenetBoardsNexted">
                      <div className="boxboards" />
                      <h2
                        style={{ marginRight: '38px' }}
                        onClick={() => {
                          console.log('last visited entry:', recent);
                          console.log('🧠 Navigating to:', `/b/${id}/${boardTitle}`);

                          navigate(`/b/${id}/${boardTitle}`);
                        }}>
                        {boardTitle}
                        <br />
                        <span className="ClassnameGlobalName">Berllo Workspace</span>
                      </h2>
                      <div style={{ marginLeft: 100 }}>
                        <StarButton
                          boardId={id}
                          initialIsStarred={starEntry}
                          onToggle={(newState) => handleStarToggle(id, newState)}
                        />
                      </div>
                    </a>
                  );
                })}
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
