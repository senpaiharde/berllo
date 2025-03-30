import React from "react";

const TaskDetailsSidebar = () => {
    return(  <>
        <button className="trello-btn"><User size={16} /> Leave</button>
                <button className="trello-btn"><User size={16} /> Members</button>
                <button className="trello-btn"><Tag size={16} /> Labels</button>
                <button className="trello-btn"><Calendar size={16} /> Dates</button>
                <button className="trello-btn"><Paperclip size={16} /> Attachment</button>
                <button className="trello-btn"><MapPin size={16} /> Location</button>
                <button className="trello-btn"><Image size={16} /> Cover</button>
                <button className="trello-btn"><Settings size={16} /> Custom Fields</button>
        
                    <section className="td-sidebar">
                        <hgroup>
                            <h4 className="td-sidebar-power">Power-Ups
                            </h4>
                        </hgroup>
                        
                            <a className="trello-btn" href="" type="button"> <span className="trello-btn-text">Add Power-Ups</span>
                                <span className="td-icons"><svg width={24} height={24}><path d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"></path></svg></span>
                            </a>
                       
                    </section>
                    <section className="td-sidebar">
                        <hgroup>
                            <h4 className="td-sidebar-power">Automation
                                <button className="td-sidebar-h4-button"></button>
                            </h4>
                        </hgroup>
                        
                            <a className="trello-btn" href="" type="button"> <span className="trello-btn-text">Add button</span>
                                <span className="td-icons"><svg width={24} height={24}><path d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"></path></svg></span>
                            </a>
                       
                    </section>
        
                     <div className="section-header">Actions</div>
                     <button className="trello-btn"><Copy size={16} /> Move</button>
                    <button className="trello-btn"><Copy size={16} /> Copy</button>
                    <button className="trello-btn"><Copy size={16} /> Mirror</button>
                    <button className="trello-btn"><Copy size={16} /> Copy</button>
                    <button className="trello-btn"><Copy size={16} /> Make template</button>
                    <div className="divider" ></div>
                    <button className="trello-btn"><Archive size={16} /> Archive</button>
                    <button className="trello-btn"><Share size={16} /> Share</button>
                   </>

    )
}

export default TaskDetailsSidebar;