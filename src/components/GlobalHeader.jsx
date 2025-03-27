import React, { useState, useRef, useEffect } from 'react';
import {
  Layout, Grid, Clock, Star, ChevronDown, Search,
  Bell, HelpCircle, Plus, Settings, User, Activity,
  CreditCard, HelpCircle as Help, Building2, ExternalLink, LayoutGrid
} from 'lucide-react';
import '../styles/GlobalHeader.scss';
import { useNavigate} from 'react-router-dom';

// Local image imports for templates
import Template1 from '../assets/images/1-on-1 Meeting Agenda.jpg';
import Template2 from '../assets/images/Company Overview.jpg';
import Template3 from '../assets/images/Design Huddle.jpg';
import Template4 from '../assets/images/Go To Market Strategy.jpg';
import Template5 from '../assets/images/Project Management.jpg';
import { useSelector } from 'react-redux';

const GlobalHeader = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isGridHovered, setIsGridHovered] = useState(false);
  const navigate = useNavigate();
  const board = useSelector((state) => state.boardReducer);
  const isBoardReady = board?._id?.length > 0 && board?.boardTitle?.length > 0;

  
  console.log(" boardReducer:", board);

  const dropdownRefs = {
    workspaces: useRef(null),
    recent: useRef(null),
    starred: useRef(null),
    templates: useRef(null),
    create: useRef(null),
    profile: useRef(null)
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      const currentRef = dropdownRefs[activeDropdown];
      if (currentRef && !currentRef.current?.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };
   
  return (
    <header className="global-header">
      {/* LEFT SIDE: Grid icon, Logo, Dropdowns */}
      <div className="header-left">
        <button
          className="header-icon"
          onMouseEnter={() => setIsGridHovered(true)}
          onMouseLeave={() => setIsGridHovered(false)}
        >
          <Grid size={16} className={`grid-icon ${isGridHovered ? 'rotate' : ''}`} />
        </button>

        <div className="trello-logo">
          <Layout size={20} onClick={() => navigate('/')} />
          <span onClick={() => navigate('/')}>Berllo</span>
        </div>

        <div className="header-dropdowns">
          {/* WORKSPACES */}
          <div ref={dropdownRefs.workspaces} className="dropdown-wrapper">
            <button
              className={`header-button ${activeDropdown === 'workspaces' ? 'active' : ''}`}
              onClick={() => toggleDropdown('workspaces')}
            >
              Workspaces <ChevronDown size={14} />
            </button>
            {activeDropdown === 'workspaces' && (
              <div className="dropdown-menu">
                <div className="dropdown-header">Your Workspaces</div>
                <div className="dropdown-item">
                  <div className="workspace-icon">T</div>
                  <div>
                  <div
                onClick={() => {
                 if (isBoardReady) {
                    const slug = board.slug || (board.boardTitle ? board.boardTitle.toLowerCase().replace(/\s+/g, "-") : "board");
                    console.log("🧠 Navigating to:", `/b/${board._id}/${slug}`);
                    navigate(`/b/${board._id}/${slug}`);
                  } else {
                    console.warn("⚠️ Board not ready for navigation:", board);
                  }
                }}
                 style={{ cursor: "pointer", color: "#0079bf" }}
                >Trello Workspace</div>
                    <div className="workspace-type">Free</div>
                  </div>
                </div>
                <div className="dropdown-item">
                  <Settings size={16} />
                  <span>Workspace settings</span>
                </div>
              </div>
            )}
          </div>

          {/* RECENT */}
          <div ref={dropdownRefs.recent} className="dropdown-wrapper">
            <button
              className={`header-button ${activeDropdown === 'recent' ? 'active' : ''}`}
              onClick={() => toggleDropdown('recent')}
            >
              Recent <ChevronDown size={14} />
            </button>
            {activeDropdown === 'recent' && (
              <div className="dropdown-menu">
                <div className="dropdown-header">Recent Boards</div>
                <div className="dropdown-item">
                  <Clock size={14} />
                  <span
                   onClick={() => {
                   if (isBoardReady) {
                    const slug = board.slug || (board.boardTitle ? board.boardTitle.toLowerCase().replace(/\s+/g, "-") : "board");
                    console.log("🧠 Navigating to:", `/b/${board._id}/${slug}`);
                    navigate(`/b/${board._id}/${slug}`);
                  } else {
                    console.warn("⚠️ Board not ready for navigation:", board);
                  }
                    }}
                     style={{ cursor: "pointer", color: "#0079bf" }}
>
                     Work Flow
                    </span>

                </div>
              </div>
            )}
          </div>

          {/* STARRED */}
          <div ref={dropdownRefs.starred} className="dropdown-wrapper">
            <button
              className={`header-button ${activeDropdown === 'starred' ? 'active' : ''}`}
              onClick={() => toggleDropdown('starred')}
            >
              Starred <ChevronDown size={14} />
            </button>
            {activeDropdown === 'starred' && (
              <div className="dropdown-menu">
                <div className="dropdown-header">Starred Boards</div>
                <div className="dropdown-item">
                  <Star size={14} />
                  <span>Important Project</span>
                </div>
              </div>
            )}
          </div>

          {/* TEMPLATES (with imported local images) */}
          <div ref={dropdownRefs.templates} className="dropdown-wrapper">
            <button
              className={`header-button ${activeDropdown === 'templates' ? 'active' : ''}`}
              onClick={() => toggleDropdown('templates')}
            >
              Templates <ChevronDown size={14} />
            </button>
            {activeDropdown === 'templates' && (
              <div className="dropdown-menu templates-menu">
                <div className="dropdown-header">Top Templates</div>
                {[
                  { title: "1-on-1 Meeting Agenda", img: Template1 },
                  { title: "Project Management", img: Template2 },
                  { title: "Company Overview", img: Template3 },
                  { title: "Design Huddle", img: Template4 },
                  { title: "Go To Market Strategy", img: Template5 },
                ].map((template, index) => (
                  <div key={index} className="template-item">
                    <img src={template.img} alt={template.title} />
                    <div className="template-info">
                      <div>{template.title}</div>
                      <div className="template-desc">Trello Workspace</div>
                    </div>
                  </div>
                ))}
                <div className="template-footer">
                  <button className="template-explore">
                    <LayoutGrid size={14} />
                    Explore templates
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* CREATE */}
          <div ref={dropdownRefs.create} className="dropdown-wrapper">
            <button className="create-button" onClick={() => toggleDropdown('create')}>
              <Plus size={14} /> Create
            </button>
            {activeDropdown === 'create' && (
              <div className="dropdown-menu create-menu">
                {[{
                  icon: <LayoutGrid size={16} />, title: "Create board",
                  desc: "A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything."
                }, {
                  icon: <Building2 size={16} />, title: "Create workspace",
                  desc: "A Workspace is a group of boards and people. Use it to organize your company, side hustle, family, or friends."
                }].map(({ icon, title, desc }, i) => (
                  <div key={i} className="create-item">
                    <div className="create-icon">{icon}</div>
                    <div className="create-info">
                      <div>{title}</div>
                      <div className="create-desc">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Search, Notifications, Help, Profile */}
      <div className="header-right">
        <div className={`search-wrapper ${searchFocused ? 'focused' : ''}`}>
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
          <button className="profile-button" onClick={() => toggleDropdown('profile')}>
            <div className="avatar">SV</div>
          </button>
          {activeDropdown === 'profile' && (
            <div className="dropdown-menu profile-menu">
              <div className="profile-header">
                <div className="avatar large">SV</div>
                <div className="profile-info">
                  <div className="name">Slava Vasilin</div>
                  <div className="email">slavavaslin@gmail.com</div>
                </div>
              </div>
              <div className="menu-section">
                <div className="section-header">ACCOUNT</div>
                {[['Profile and visibility', <User size={14} />], ['Activity', <Activity size={14} />], ['Cards', <CreditCard size={14} />], ['Settings', <Settings size={14} />]].map(([label, icon], i) => (
                  <div key={i} className="menu-item">{icon}<span>{label}</span></div>
                ))}
              </div>
              <div className="menu-section">
                {[['Help', <Help size={14} />], ['Shortcuts', <ExternalLink size={14} />]].map(([label, icon], i) => (
                  <div key={i} className="menu-item">{icon}<span>{label}</span></div>
                ))}
              </div>
              <div className="menu-footer">
                <button className="logout-button">Log out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;
