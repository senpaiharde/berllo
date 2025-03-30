import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";



const TaskDetailsMembers = () => {
    const [members, setMembers] = useState([]);
    useEffect(() => {
        const hardMembers = [
            {id:'members1',
                icon: 'https://trello-members.s3.amazonaws.com/67dc0d58156e00a0d36695b5/01baa36c84395e6f58f1c00ddab17dd6/50.png',},
            {id:'members2',
                icon: 'https://trello-members.s3.amazonaws.com/67dd4a1311ccad73b3c84135/cb6be1f71478f8e991dd20dc7d409494/50.png',},
            {id:'members2',
                icon: 'https://trello-members.s3.amazonaws.com/67dc117d6c8086501c05fc74/3feae410612bcc882499031607e372b7/50.png',},
        ];

        setMembers(hardMembers)
    },[])



    return(
        <section className="td-section-top-section">
            <h3 className="td-section-top-h3">Members</h3>
            <div className="td-section-members">
            <div className="members-icon" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {members.map((member) => {
                        return(
                        <button
                        key={member.id}
                        className="td-section-members-button"
                        style={{
                            padding: 0,
                            border: 0,
                            borderRadius: "100%",
                            height: "32px",
                            width: "32px",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                            <img src={member.icon} alt={`Members ${member.id}`}
                             style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "100%" }} />
                        </button>
                    )
                    })}
                    <button className="td-section-members-add">
                        <svg width='24' height='24px' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z" />

                        </svg>
                    </button>
                </div>

            </div>
        </section>
    )

}

export default TaskDetailsMembers;