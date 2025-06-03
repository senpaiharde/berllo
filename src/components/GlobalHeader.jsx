import React, { useState, useRef, useEffect } from "react"
import {
  Layout,
  Grid,
  Clock,
  Star,
  ChevronDown,
  Search,
  Bell,
  HelpCircle,
  Plus,
  Settings,
  User,
  Activity,
  CreditCard,
  HelpCircle as Help,
  Building2,
  ExternalLink,
  LayoutGrid,
} from "lucide-react"

import { useNavigate } from "react-router-dom"
import axios from "axios"
import Template1 from "../assets/images/1-on-1 Meeting Agenda.jpg"
import Template2 from "../assets/images/Company Overview.jpg"
import Template3 from "../assets/images/Design Huddle.jpg"
import Template4 from "../assets/images/Go To Market Strategy.jpg"
import Template5 from "../assets/images/Project Management.jpg"
import { useSelector, useDispatch } from "react-redux"
import fetchCurrentUser, {
  accountSwitch,
  demoUsersStorage,
} from "../services/backendCallsUsers"
import StarButton from "../services/isStarred"
import { TaskOps, toggleStar } from "../services/backendHandler"
import { updateStarStatus, syncBoardAsync } from "../redux/BoardSlice"
import DropdownUi from './boardCmps/taskDetailsCmp/main/sidebar/dropdownHardcoded/DropdownUi';
import BoardsCreateDropdown from '../pages/BoardsCreateDropdown';

const demoUsers = demoUsersStorage

const GlobalHeader = () => {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchFocused, setSearchFocused] = useState(false)
  const [isGridHovered, setIsGridHovered] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const board = useSelector((state) => state.boardReducer)
  const isBoardReady = board?._id?.length > 0 && board?.boardTitle?.length > 0
  const [user, setUser] = useState(null)
  const [showAIForm, setShowAIForm] = useState(false);
  const [aiGoal, setAiGoal] = useState('');
  const [aiStart, setAiStart] = useState('');
  const [aiEnd, setAiEnd] = useState('');
  const [loading, setLoading] = useState(false);
  const dropdownRefs = {
    workspaces: useRef(null),
    recent: useRef(null),
    starred: useRef(null),
    templates: useRef(null),
    create: useRef(null),
    profile: useRef(null),
  };
  const token = localStorage.getItem('token');
  const handleCreateAI = async () => {
    if (!aiGoal.trim() || !aiStart || !aiEnd) {
      alert('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const prompt = `${aiGoal} from ${aiStart} until ${aiEnd}`;
      console.log('Prompting:', prompt);
      const resp = await fetch('http://localhost:4000/autoBoard/', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.error || 'Failed To create Board!.');
      }
      const { boardId } = await resp.json();
      console.log('board id:', boardId);
      const slugBase = aiGoal.trim().split(' ').slice(0, 5).join(' ');
      const slug = slugBase
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      navigate(`/b/${boardId}/${slug}`);
      console.log('board name:', slug);
    } catch (err) {
      console.error('err at creating board with ai:', err);
      alert('failed to create board: ' + err.message);
    } finally {
      setLoading(false);
      setShowAIForm(false);
      setAiGoal('');
      setAiStart('');
      setAiEnd('');
    }
  };
  const [lastBoard, setLastBoard] = useState(null);
  const [currentEmail, setCurrentEmail] = useState('');
  const [newStar, setNewStar] = useState(null);
  // load current email from localStorage
  useEffect(() => {
    setCurrentEmail(localStorage.getItem("demoEmail") || "")
  }, [])

  const handleSwitch = async (e) => {
    const email = e.target.value
    if (!email) return
    accountSwitch(email)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("demoEmail")
    window.location.reload()
  }
  useEffect(() => {
    async function load() {
      try {
        const me = await fetchCurrentUser()
        setUser(me)
        setLastBoard(me.lastBoardVisited)
      } catch (err) {
        console.log("there is error on loading users", err)
        return err
      }
    }

    load()
  }, [])
  useEffect(() => {
    const handleClickOutside = (e) => {
      const currentRef = dropdownRefs[activeDropdown]
      if (currentRef && !currentRef.current?.contains(e.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [activeDropdown])

  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key)
  }

  const handleStarToggle = async (boardId, newState) => {
    try {
      const me = await fetchCurrentUser()
      setUser(me)
    } catch (err) {
      console.error("Failed to toggle star:", err)
    }
  }
  function updateBoardSlice(boardId, newState) {
    if (boardId === board._id) {
      dispatch(updateStarStatus(newState))
      dispatch(
        syncBoardAsync({
          method: TaskOps.UPDATE,
          args: {
            taskId: board._id,
            body: {
              method: TaskOps.UPDATE,
              workId: "board",
              isStarred: newState,
            },
          },
          workId: "board",
        })
      )
    }
  }
function darkenHexColor(hex, percent) {
    // Remove "#" if present
    hex = hex.replace(/^#/, "")

    // Parse hex into RGB
    let r = parseInt(hex.slice(0, 2), 16)
    let g = parseInt(hex.slice(2, 4), 16)
    let b = parseInt(hex.slice(4, 6), 16)

    // Decrease each component by percentage
    r = Math.max(0, Math.floor(r * (1 - percent / 100)))
    g = Math.max(0, Math.floor(g * (1 - percent / 100)))
    b = Math.max(0, Math.floor(b * (1 - percent / 100)))

    // Convert back to hex and pad with zeroes if needed
    const toHex = (c) => c.toString(16).padStart(2, "0")
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }
const color =  darkenHexColor(board?.boardStyle.boardColor,50)
  return (
    <header className="global-header" style={{ backgroundColor:color}}>
      <div className="header-left">
        <button
          className="header-icon"
          onMouseEnter={() => setIsGridHovered(true)}
          onMouseLeave={() => setIsGridHovered(false)}
        >
          <Grid
            size={16}
            className={`grid-icon ${isGridHovered ? "rotate" : ""}`}
          />
        </button>

        <div className="trello-logo">
          <Layout size={20} onClick={() => navigate("/")} />
          <span onClick={() => navigate("/")}>Berllo</span>
        </div>

        <div className="header-dropdowns">
          <div ref={dropdownRefs.workspaces} className="dropdown-wrapper">
            <button
              className={`header-button ${activeDropdown === "workspaces" ? "active" : ""}`}
              onClick={() => toggleDropdown("workspaces")}
            >
              Workspaces <ChevronDown size={14} />
            </button>
            {activeDropdown === "workspaces" && (
              <div className="dropdown-menu">
                <div className="dropdown-header">Current Workspaces</div>
                <div className="dropdown-item">
                  <div className="workspace-icon">B</div>
                  <div>
                    <div
                      className="textCurrectworkspace"
                      onClick={() => {
                        if (isBoardReady) {
                          const slug =
                            board.slug ||
                            (board.boardTitle
                              ? board.boardTitle
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")
                              : "board")
                          console.log(
                            "🧠 Navigating to:",
                            `/b/${board._id}/${slug}`
                          )
                          navigate(`/b/${board._id}/${slug}`)
                        } else {
                          console.warn(
                            "⚠️ Board not ready for navigation:",
                            board
                          )
                        }
                      }}
                      style={{ cursor: "pointer", color: "#0079bf" }}
                    >
                      Brello Workspace
                    </div>
                  </div>
                </div>

                <div className="workspace">
                  <div className="dropdown-header">Your Workspaces</div>

                  <div className="dropdown-item">
                    <div className="workspace-icon">B</div>
                    <div>
                      <div
                        className="textCurrectworkspace"
                        onClick={() => {
                          if (isBoardReady) {
                            const slug =
                              board.slug ||
                              (board.boardTitle
                                ? board.boardTitle
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")
                                : "board")
                            console.log(
                              "🧠 Navigating to:",
                              `/b/${board._id}/${slug}`
                            )
                            navigate(`/b/${board._id}/${slug}`)
                          } else {
                            console.warn(
                              "⚠️ Board not ready for navigation:",
                              board
                            )
                          }
                        }}
                        style={{ cursor: "pointer", color: "#0079bf" }}
                      >
                        Brello Workspace
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-item">
                    <div className="workspace-icon">B</div>
                    <div>
                      <div
                        className="textCurrectworkspace"
                        onClick={() => {
                          if (isBoardReady) {
                            const slug =
                              board.slug ||
                              (board.boardTitle
                                ? board.boardTitle
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")
                                : "board")
                            console.log(
                              "🧠 Navigating to:",
                              `/b/${board._id}/${slug}`
                            )
                            navigate(`/b/${board._id}/${slug}`)
                          } else {
                            console.warn(
                              "⚠️ Board not ready for navigation:",
                              board
                            )
                          }
                        }}
                        style={{ cursor: "pointer", color: "#0079bf" }}
                      >
                        Brello Workspace
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div ref={dropdownRefs.recent} className="dropdown-wrapper">
            <button
              className={`header-button ${activeDropdown === "recent" ? "active" : ""}`}
              onClick={() => toggleDropdown("recent")}
            >
              Recent <ChevronDown size={14} />
            </button>
            {activeDropdown === "recent" && (
              <div className="dropdown-menu-recent">
                <div className="recenetBoards">
                  {user?.lastBoardVisited?.slice(0, 5).map((recent) => {
                    const { id, boardTitle } = recent;
                    // find whether this is starred in the latest user state
                    const starEntry = user.starredBoards?.find(
                      (sb) => sb.id === id
                    )
                    const isStarred = !!starEntry?.isStarred

                    return (
                      <a key={id} className="recenetBoardsNexted ">
                        <div className="boxboards" />
                        <h2
                          onClick={() => {
                            console.log("last visited entry:", recent)
                            console.log(
                              "🧠 Navigating to:",
                              `/b/${id}/${boardTitle}`
                            )

                            navigate(`/b/${id}/${boardTitle}`)
                          }}
                        >
                          {boardTitle}
                          <br />
                          <span className="ClassnameGlobalName">
                            Berllo Workspace
                          </span>
                        </h2>
                        <div style={{ marginLeft: 90 }}>
                          <StarButton
                            boardId={id}
                            initialIsStarred={starEntry}
                            onToggle={(newState) => {
                              handleStarToggle(id, newState)
                              updateBoardSlice(id, newState)
                            }}
                          />
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* STARRED */}
          <div ref={dropdownRefs.starred} className="dropdown-wrapper">
            <button
              className={`header-button ${activeDropdown === "starred" ? "active" : ""}`}
              onClick={() => toggleDropdown("starred")}
            >
              Starred <ChevronDown size={14} />
            </button>
            {activeDropdown === "starred" && (
              <div className="dropdown-menu-recent">
                <div className="recenetBoards">
                  {user?.starredBoards
                    .slice(0, 5)
                    .slice(0, 5)
                    ?.filter((sb) => sb.isStarred)
                    .map((sb) => {
                      const recent = user.lastBoardVisited?.find(
                        (r) => r.id === sb.id
                      )

                      return (
                        <a key={sb.id} className="recenetBoardsNexted">
                          <div className="boxboards" />

                          <h2
                            onClick={() => {
                              const slug = recent.boardTitle
                              const boardId = recent.id
                              if (boardId && slug)
                                navigate(`/b/${boardId}/${slug}`)
                            }}
                          >
                            {recent?.boardTitle}
                            <br />
                            <span className="ClassnameGlobalName">
                              Berllo Workspace
                            </span>
                          </h2>

                          <div style={{ marginLeft: "90px" }}>
                            <StarButton
                              boardId={sb.id}
                              initialIsStarred={sb.isStarred}
                              onToggle={(newState) =>
                                handleStarToggle(sb.id, newState)
                              }
                            />
                          </div>
                        </a>
                      )
                    })}
                </div>
              </div>
            )}
          </div>

          {/* TEMPLATES (with imported local images) */}
          <div ref={dropdownRefs.templates} className="dropdown-wrapper">
            <button
              className={`header-button ${activeDropdown === "templates" ? "active" : ""}`}
              onClick={() => toggleDropdown("templates")}
            >
              Templates <ChevronDown size={14} />
            </button>
            {activeDropdown === 'templates' && (
             <div className="dropdown-menu">
                <div className="dropdown-header">Current Workspaces</div>
                <div className="dropdown-item">
                  <div className="workspace-icon">B</div>
                  <div>
                    <div
                      className="textCurrectworkspace"
                      
                      style={{ cursor: 'pointer', color: '#0079bf' }}>
                      Brello Workspace
                    </div>
                  </div>
                </div>

               
              </div>
            )}
          </div>

          {/* CREATE */}
          <div ref={dropdownRefs.create} className="dropdown-wrapper">
            <button
            
            className="create-button" onClick={() => toggleDropdown('create')}>
              Create
            </button >
            {activeDropdown === 'create' && (
              <div   ref={dropdownRefs.create}
                className="dropdown-menu create-menu"
                style={{ margin: '0 0', textAlign: 'center' }}>
                <DropdownUi  
                
                trigger={<button 
                onClick={(e) => {e.preventDefault()}}
                className="CreateBoardHard" style={{marginTop:'12px'}}>
                  <span className="HeaderCreateBoardHard">Create Board</span>
                  <div className="HeaderCreateBoardHardText">
                    A board is made up of cards ordered on lists. Use it to manage projects, track
                    information, or organize anything.
                  </div>
                </button>}>
                     {({ onClose }) => <BoardsCreateDropdown onClose={onClose} />}
                </DropdownUi>
                
                <div   className="OpenAiButtonHeaderHeaderDiv"
                
                style={{  textAlign: 'left' }}>
                  {!showAIForm ? (
                    <button
                      style={{
                        
                        color: '#44546f',
                        borderRadius: '12px',
                      }}
                      className="OpenAiButtonHeaderHeader"
                      onClick={() => setShowAIForm(true)}>
                     
                      <span className="HeaderCreateBoardHard"> 
                         <img 
                      style={{marginRight:'4px'}}
                        src="https://upload.wikimedia.org/wikipedia/commons/e/ef/ChatGPT-Logo.svg"
                        alt="ChatGPT Logo"
                        width={16}
                        height={16}
                      />
                        Create Board with AI</span>
                      
                      <div
                      style={{width:'280px',paddingRight:'34px'}}
                      className="HeaderCreateBoardHardText">
                   Get started faster with AI Board Design layout.
                  </div>
                    </button>
                  ) : (
                    <div className="OpenAiButtonContainer">
                      <div style={{ marginBottom: '12px' }}>
                        <label htmlFor="aiGoal" className="OpenAiButtonContainerLabel">
                          Goal / Description:
                        </label>
                        <textarea
                          className="OpenAiButtonContainerTextarea"
                          id="aiGoal"
                          rows={2}
                          placeholder="E.g. I have a birthday to my mother"
                          value={aiGoal}
                          onChange={(e) => setAiGoal(e.target.value)}
                        />
                      </div>

                      <div style={{ marginBottom: '12px' }}>
                        <label htmlFor="aiStart" className="OpenAiButtonContainerLabel">
                          From Date:
                        </label>
                        <input
                          className="OpenAiButtonContainerInput"
                          type="date"
                          id="aiStart"
                          value={aiStart}
                          onChange={(e) => setAiStart(e.target.value)}
                        />
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="aiEnd" className="OpenAiButtonContainerLabel">
                          Until Date:
                        </label>
                        <input
                          className="OpenAiButtonContainerInput"
                          type="date"
                          id="aiEnd"
                          value={aiEnd}
                          onChange={(e) => setAiEnd(e.target.value)}
                        />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button
                          onClick={() => setShowAIForm(false)}
                          disabled={loading}
                          className="OpenAiButtonContainerCancel"
                          style={{
                            cursor: loading ? 'not-allowed' : 'pointer',
                          }}>
                          Cancel
                        </button>
                        <button
                          onClick={handleCreateAI}
                          disabled={loading}
                          className="OpenAiButtonContainerCreate"
                          style={{
                            cursor: loading ? 'not-allowed' : 'pointer',
                          }}>
                          {loading ? 'Creating…' : 'Create'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <br className="brCreate"></br>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Search, Notifications, Help, Profile */}
      <div className="header-right">
        <div className={`search-wrapper ${searchFocused ? "focused" : ""}`}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Search"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        <button className="header-icon">
          <Bell size={16} />
        </button>

        <button className="header-icon">
          <HelpCircle size={16} />
        </button>

        {/* PROFILE DROPDOWN */}
        <div ref={dropdownRefs.profile} className="dropdown-wrapper">
          <button
            className="profile-button"
            onClick={() => toggleDropdown("profile")}
          >
            {user?.email ? (
              <div
                style={{
                  height: "24px",
                  width: "24px",
                  marginTop: "4px",
                  marginRight: "12px",
                }}
                className="td-section-members-button"
              >
                {user?.avatar && (
                  <img
                    src={user?.avatar || "No"}
                    alt={`Member ${user?._id || user?.id}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "100%",
                    }}
                  />
                )}
              </div>
            ) : (
              <div className="avatar">?</div>
            )}
          </button>
          {activeDropdown === "profile" && (
            <div className="dropdown-menu profile-menu">
              <div className="section-header-dropdown">ACCOUNT</div>
              <div className="profile-header">
                {" "}
                <div
                  style={{ height: "50px", width: "50px" }}
                  className="td-section-members-button"
                >
                  {user?.avatar && (
                    <img
                      src={user?.avatar || "No"}
                      alt={`Member ${user?._id || user?.id}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "100%",
                      }}
                    />
                  )}
                </div>
                <div className="InfoDemoUsers">
                  {user?.fullname}
                  <br></br>
                  <div className="userEmailHeader">
                    {user?.email || "Not logged in"}
                  </div>
                </div>
              </div>
              <div className="profile-info">
                <select
                  className="demo-user-select"
                  defaultValue=""
                  onChange={handleSwitch}
                >
                  <option value="" disabled>
                    {user?.email ? "switch account" : "login"}
                  </option>
                  {demoUsers.map((u) => (
                    <option
                      className="InfoDemoUsers"
                      key={u.email}
                      value={u.email}
                    >
                      {u.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="menu-section">
                <div className="section-header-dropdown">BERLLO</div>
                {[
                  ["Profile and visibility"],
                  ["Activity"],
                  ["Cards"],
                  ["Settings"],
                ].map(([label, icon], i) => (
                  <div key={i} className="menu-item">
                    {icon}
                    <span className="styleForOptions">{label}</span>
                  </div>
                ))}
              </div>
              <div className="menu-section">
                {[["Help"], ["Shortcuts"]].map(([label, icon], i) => (
                  <div key={i} className="menu-item">
                    {icon}
                    <span className="styleForOptions">{label}</span>
                  </div>
                ))}
              </div>
              <div className="menu-footer">
                <button onClick={handleLogout} className="logout-button">
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default GlobalHeader
