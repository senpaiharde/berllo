import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import DropdownMembers from "./main/sidebar/dropdownHardcoded/DropdownMembers";
import SvgAddMember from "../../../assets/svgDesgin/SvgAddMember";
import DropdownUi from "./main/sidebar/dropdownHardcoded/DropdownUi";
;


const TaskDetailsMembers = () => {

    const member = useSelector((state) => state.taskDetailsReducer?.selectedTask);


    const [members, setMembers] = useState([]);
    useEffect(() => {
        const hardMembers = [
            {id:'members1',
                icon: 'https://trello-members.s3.amazonaws.com/67dc0d58156e00a0d36695b5/01baa36c84395e6f58f1c00ddab17dd6/50.png',},
            {id:'members2',
                icon: 'https://trello-members.s3.amazonaws.com/67dd4a1311ccad73b3c84135/cb6be1f71478f8e991dd20dc7d409494/50.png',},
            {id:'members3',
                icon: 'https://trello-members.s3.amazonaws.com/67dc117d6c8086501c05fc74/3feae410612bcc882499031607e372b7/50.png',},
        ];

        setMembers(hardMembers)
    },[])



    return(
        <section className="td-section-top-section">
            { <h3 className="td-section-top-h3">Members</h3> }
            <div className="td-section-members"
            style={{
                paddingLeft:'0px',
            }}>
            <div className="members-icon" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {members.map((member) => {
                        return(
                        <button
                        key={member.id}
                        className="td-section-members-button"
                        
                        >
                            <img src={member.icon} alt={`Members ${member.id}`}
                             style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "100%" }} />
                        </button>
                    )
                    })}
                   <DropdownUi
          trigger={
            <button className="td-section-members-addd">
              <SvgAddMember/>
            </button>
          }>
          {(props) => <DropdownMembers {...props} />}
        </DropdownUi>
       
                </div>
            </div>
        </section>
    )

}

export default TaskDetailsMembers;