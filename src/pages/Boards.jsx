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
            <div className="BoardsHomeContainerMainRecent">
              <div className="BoardsHomeContainerMainRecentTitle">
                <span className="BoardsHomeContainerMainRecentClock">
                  <span className="BoardsHomeContainerMainRecentClock5">
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      role="presentation"
                      focusable="false">
                      <path d="M13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L13.7929 15.2071C14.1834 15.5976 14.8166 15.5976 15.2071 15.2071C15.5976 14.8166 15.5976 14.1834 15.2071 13.7929L13 11.5858V6Z"></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
                    </svg>
                  </span>
                </span>
                <h3 className="BoardsHomeContainerMainRecentTitleh3">Recently viewed</h3>
              </div>

              <div className="BoardsHomeContainerMainRecentDisplay">
                {user?.lastBoardVisited?.map((recent) => {
                     const { id, boardTitle } = recent;
                  const starEntry = user.starredBoards?.find((sb) => sb.id === id);
                  const isStarred = !!starEntry?.isStarred;
                  return (
                    <div
                      onClick={() => {
                        

                        

                        console.log('last visited entry:', recent);
                        console.log('🧠 Navigating to:', `/b/${id}/${boardTitle}`);

                        
                          navigate(`/b/${id}/${boardTitle}`);
                      }}
                     
                      className="DisplayCardsInBoards">
                      <a className="DisplayCardsInBoardsA">
                        <div className="DisplayCardsInBoardsADiv"></div>
                        <div className="DisplayCardsInBoardsADiv2">
                          <div className="DisplayCardsInBoardsADiv2Title">
                            {boardTitle}
                          </div>
                          <div className="DisplayCardsInBoardsADiv2Svg">
                            <div className="DisplayCardsInBoardsADiv2SvgIcon">
                              <div className="DisplayCardsInBoardsADiv2SvgIconDiv">
                                <span className="DisplayCardsInBoardsADiv2SvgIconSpan">
                                  <svg
                                    style={{ color: 'white' }}
                                    viewBox="0 0 24 24"
                                    focusable="false"
                                    role="presentation"
                                    width="16"
                                    height="16">
                                    <path
                                      d="M12.5048 5.67168C11.9099 5.32669 11.2374 5.10082 10.5198 5.0267C11.2076 3.81639 12.5085 3 14 3C16.2092 3 18 4.79086 18 7C18 7.99184 17.639 8.89936 17.0413 9.59835C19.9512 10.7953 22 13.6584 22 17C22 17.5523 21.5523 18 21 18H18.777C18.6179 17.2987 18.3768 16.6285 18.0645 16H19.917C19.4892 13.4497 17.4525 11.445 14.8863 11.065C14.9608 10.7218 15 10.3655 15 10C15 9.58908 14.9504 9.18974 14.857 8.80763C15.5328 8.48668 16 7.79791 16 7C16 5.89543 15.1046 5 14 5C13.4053 5 12.8711 5.25961 12.5048 5.67168ZM10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12ZM14 10C14 10.9918 13.639 11.8994 13.0412 12.5984C15.9512 13.7953 18 16.6584 18 20C18 20.5523 17.5523 21 17 21H3C2.44772 21 2 20.5523 2 20C2 16.6584 4.04879 13.7953 6.95875 12.5984C6.36099 11.8994 6 10.9918 6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10ZM9.99999 14C12.973 14 15.441 16.1623 15.917 19H4.08295C4.55902 16.1623 7.02699 14 9.99999 14Z"
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"></path>
                                  </svg>
                                </span>
                              </div>
                            </div>
                            <div className="DisplayCardsInBoardsADiv2SvgBlock"></div>
                          </div>
                        </div>
                      </a>
                    </div>
                  );
                })}
                
              </div>
            </div>
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
                  <li
                    onClick={() => {
                      const last = user?.lastBoardVisited?.[0];

                      const slug = last?.boardTitle;
                      const boardId = last?.id;

                      console.log('last visited entry:', last);
                      console.log('🧠 Navigating to:', `/b/${boardId}/${slug}`);

                      if (boardId && slug) {
                        navigate(`/b/${boardId}/${slug}`);
                      }
                    }}
                    className="boards-page-board-section-list-item">
                    <a className="board-tile">
                      <span className="board-tile-fade"></span>
                      <div className="board-tile-details">
                        <h2 className="board-tile-details-name">
                          {user?.lastBoardVisited[0]?.boardTitle}
                        </h2>
                        <div className="board-tile-details-sub-container"></div>
                      </div>
                    </a>
                  </li>
                  <li className="boards-page-board-section-list-item-yes">
                    <div className="board-tile-mod-add">
                      <p>
                        <span>Create new board</span>
                      </p>
                      <p className="remaining">
                        <span>no Limit</span>
                      </p>
                      <div className="question-icon">5</div>
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
