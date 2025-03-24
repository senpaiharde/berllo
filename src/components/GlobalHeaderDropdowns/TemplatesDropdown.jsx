


const TemplatesDropdown = () => {
    return(
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

    )

}

export default TemplatesDropdown;