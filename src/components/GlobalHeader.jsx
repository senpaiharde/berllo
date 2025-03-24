import React, { useState, useRef, useEffect } from 'react';
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
  LayoutGrid
} from 'lucide-react';
import '../styles/GlobalHeader.scss';
import { useNavigate } from 'react-router-dom';

const GlobalHeader = () => {
  const [workspacesOpen, setWorkspacesOpen] = useState(false);
  const [recentOpen, setRecentOpen] = useState(false);
  const [starredOpen, setStarredOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isGridHovered, setIsGridHovered] = useState(false);
  const navigate = useNavigate();

  const dropdownRefs = {
    workspaces: useRef(null),
    recent: useRef(null),
    starred: useRef(null),
    templates: useRef(null),
    create: useRef(null),
    profile: useRef(null)
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
    if(
        !dropdownRefs.workspaces.current?.contains(e.target) &&
        !dropdownRefs.recent.current?.contains(e.target) &&
        !dropdownRefs.starred.current?.contains(e.target) &&
        !dropdownRefs.templates.current?.contains(e.target) &&
        !dropdownRefs.create.current?.contains(e.target) &&
        !dropdownRefs.profile.current?.contains(e.target)   //reaction on click and differentt effects
    ){
        setWorkspacesOpen(false);
        setRecentOpen(false);
        setStarredOpen(false);
        setTemplatesOpen(false);
        setCreateOpen(false);
        setProfileOpen(false);

    }
    
    };


    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="global-header">
      <div className="header-left">
        <button 
          className="header-icon"
          onMouseEnter={() => setIsGridHovered(true)}
          onMouseLeave={() => setIsGridHovered(false)}
        >
          <Grid size={16} className={`grid-icon ${isGridHovered ? 'rotate' : ''}`} />
        </button>
        
        <div className="trello-logo">
          <Layout size={20}  onClick={() => navigate('/')}/>
          <span onClick={() => navigate('/')}>Berllo</span>
        </div>

        <div className="header-dropdowns">
          {/* Workspaces Dropdown */}
          <div ref={dropdownRefs.workspaces} className="dropdown-wrapper">
            <button 
              className={`header-button ${workspacesOpen ? 'active' : ''}`}
              onClick={() => setWorkspacesOpen(!workspacesOpen)}
            >
              Workspaces
              <ChevronDown size={14} />
            </button>
            {workspacesOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">Your Workspaces</div>
                <div className="dropdown-item">
                  <div className="workspace-icon">T</div>
                  <div>
                    <div onClick={() => navigate("/b/:boardId/:boardSlug")}>Trello Workspace</div>
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

          {/* Recent Dropdown */}
          <div ref={dropdownRefs.recent} className="dropdown-wrapper">
            <button 
              className={`header-button ${recentOpen ? 'active' : ''}`}
              onClick={() => setRecentOpen(!recentOpen)}
            >
              Recent
              <ChevronDown size={14} />
            </button>
            {recentOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">Recent Boards</div>
                <div className="dropdown-item">
                  <Clock size={14} />
                  <span onClick={() => navigate("/b/:boardId/:boardSlug")}>Work Flow</span>
                </div>
              </div>
            )}
          </div>

          {/* Starred Dropdown */}
          <div ref={dropdownRefs.starred} className="dropdown-wrapper">
            <button 
              className={`header-button ${starredOpen ? 'active' : ''}`}
              onClick={() => setStarredOpen(!starredOpen)}
            >
              Starred
              <ChevronDown size={14} />
            </button>
            {starredOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">Starred Boards</div>
                <div className="dropdown-item">
                  <Star size={14} />
                  <span>Important Project</span>
                </div>
              </div>
            )}
          </div>

          {/* Templates Dropdown */}
          <div ref={dropdownRefs.templates} className="dropdown-wrapper">
            <button 
              className={`header-button ${templatesOpen ? 'active' : ''}`}
              onClick={() => setTemplatesOpen(!templatesOpen)}
            >
              Templates
              <ChevronDown size={14} />
            </button>
            {templatesOpen && (
              <div className="dropdown-menu templates-menu">
                <div className="dropdown-header">Top Templates</div>
                {[
                  { img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4", title: "1-on-1 Meeting Agenda" },
                  { img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe", title: "Project Management" },
                  { img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97", title: "Company Overview" },
                  { img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12", title: "Design Huddle" },
                  { img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f", title: "Go To Market Strategy" },
                ].map((template, index) => (
                  <div key={index} className="template-item">
                    <img src={`${template.img}?w=50&h=50&fit=crop`} alt={template.title} />
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

          {/* Create Button Dropdown */}
          <div ref={dropdownRefs.create} className="dropdown-wrapper">
            <button 
              className="create-button"
              onClick={() => setCreateOpen(!createOpen)}
            >
              <Plus size={14} />
              Create
            </button>
            {createOpen && (
              <div className="dropdown-menu create-menu">
                <div className="create-item">
                  <div className="create-icon">
                    <LayoutGrid size={16} />
                  </div>
                  <div className="create-info">
                    <div>Create board</div>
                    <div className="create-desc">A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.</div>
                  </div>
                </div>
                <div className="create-item">
                  <div className="create-icon">
                    <Building2 size={16} />
                  </div>
                  <div className="create-info">
                    <div>Create workspace</div>
                    <div className="create-desc">A Workspace is a group of boards and people. Use it to organize your company, side hustle, family, or friends.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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

        {/* Profile Dropdown */}
        <div ref={dropdownRefs.profile} className="dropdown-wrapper">
          <button 
            className="profile-button"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="avatar">SV</div>
          </button>
          {profileOpen && (
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
                <div className="menu-item">
                  <User size={14} />
                  <span>Profile and visibility</span>
                </div>
                <div className="menu-item">
                  <Activity size={14} />
                  <span>Activity</span>
                </div>
                <div className="menu-item">
                  <CreditCard size={14} />
                  <span>Cards</span>
                </div>
                <div className="menu-item">
                  <Settings size={14} />
                  <span>Settings</span>
                </div>
              </div>
              <div className="menu-section">
                <div className="menu-item">
                  <Help size={14} />
                  <span>Help</span>
                </div>
                <div className="menu-item">
                  <ExternalLink size={14} />
                  <span>Shortcuts</span>
                </div>
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