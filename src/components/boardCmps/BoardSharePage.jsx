import { useDispatch, useSelector } from "react-redux"
import { toggleShareModal, updateBoardMembers } from "../../redux/BoardSlice"
import { SvgServices } from "../../services/svgServices"
import { useState, useEffect } from "react"
import backendHandler, { TaskOps } from "../../services/backendHandler"
import { IconButton } from "../IconButton"
export function BoardSharePage() {
  const board = useSelector((state) => state.boardReducer)
  const dispatch = useDispatch()
  const showModal = board.shareModalOpen ? "block" : "none"

  //   const taskMembers = Array.isArray(task?.members) ? task.members : []
  const [allMembers, setAllMembers] = useState()
  const availableMembers = allMembers
    ? allMembers.users.filter(
        (member) =>
          !board.boardMembers.some(
            (boardMember) =>
              boardMember?._id?.toLowerCase() === member?._id?.toLowerCase()
          )
      )
    : ""

  //   const filterTaskMembers = board.boardMembers.filter((member) =>
  //     member?.fullname?.toLowerCase().includes(searchTerm)
  //   )
  //   const filterBoardMembers = availableMembers.filter((member) =>
  //     member?.fullname?.toLowerCase().includes(searchTerm)
  //   )

  //   const hasMatches =
  //     filterTaskMembers.length > 0 || filterBoardMembers.length > 0
  useEffect(() => {
    fetchAllMembers()
  }, [])
  useEffect(() => {
    // dispatch(fetchWorkSpaces())
    // console.log("board.boardMembers", board.boardMembers)
    // console.log("allMembers", allMembers)
  }, [allMembers])
  async function fetchAllMembers() {
    const body = { method: TaskOps.FETCH, workId: "user" }
    const data = await backendHandler({ args: { body } })
    // console.log(data)
    setAllMembers(data)
  }
  function exitShare() {
    dispatch(toggleShareModal(false))
  }

  function SharePageLink() {
    const [copied, setCopied] = useState(false)
    const currentUrl = window.location.href

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(currentUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000) // Reset after 2 sec
      } catch (err) {
        console.error("Failed to copy: ", err)
      }
    }

    return (
      <div
        className="share-page-link-container"
        // style={{ display: "flex", gap: "8px", alignItems: "center" }}
      >
        <div
        style={{width:"24px",height:"24px", backgroundColor:"#A1BDD914", alignSelf: "center"}}>
         <svg
          width="24"
          height="24"
          role="presentation"
          focusable="false"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="24"
            height="24"
            fill="transparent"
            fill-opacity="0.01"
          ></rect>
          <path
            d="M12.6539 8.76404C12.4917 8.91817 12.2757 9.00284 12.052 8.99998C11.8282 8.99713 11.6145 8.90698 11.4562 8.74875C11.298 8.59053 11.2078 8.37675 11.205 8.153C11.2021 7.92926 11.2868 7.71325 11.4409 7.55104L12.6549 6.33704C13.0001 5.99183 13.4099 5.71799 13.8609 5.53116C14.3119 5.34433 14.7953 5.24817 15.2834 5.24817C15.7716 5.24817 16.255 5.34433 16.706 5.53116C17.157 5.71799 17.5668 5.99183 17.9119 6.33704C18.2577 6.68195 18.5321 7.09168 18.7193 7.54276C18.9065 7.99385 19.003 8.47743 19.0031 8.96583C19.0031 9.45423 18.9069 9.93785 18.7199 10.389C18.5328 10.8402 18.2586 11.25 17.9129 11.595L16.6989 12.809L15.8949 13.613C15.5498 13.9591 15.1398 14.2338 14.6885 14.4214C14.2371 14.6089 13.7532 14.7057 13.2645 14.7062C12.7757 14.7066 12.2916 14.6108 11.8399 14.4241C11.3882 14.2374 10.9777 13.9635 10.6319 13.618C10.471 13.4571 10.3805 13.2387 10.3805 13.011C10.3805 12.7834 10.471 12.565 10.6319 12.404C10.7929 12.2431 11.0113 12.1526 11.2389 12.1526C11.4666 12.1526 11.685 12.2431 11.8459 12.404C12.6269 13.186 13.8959 13.184 14.6819 12.399L15.4859 11.596L16.6999 10.382C16.8862 10.1963 17.034 9.97569 17.1348 9.73275C17.2356 9.48981 17.2874 9.22935 17.2873 8.96633C17.2873 8.70331 17.2352 8.44289 17.1343 8.20002C17.0333 7.95715 16.8853 7.7366 16.6989 7.55104C16.5132 7.36508 16.2926 7.21757 16.0498 7.11692C15.807 7.01627 15.5468 6.96446 15.2839 6.96446C15.0211 6.96446 14.7609 7.01627 14.5181 7.11692C14.2753 7.21757 14.0547 7.36508 13.8689 7.55104L12.6539 8.76404ZM11.8459 15.236C12.0082 15.0819 12.2242 14.9972 12.4479 15.0001C12.6717 15.0029 12.8854 15.0931 13.0437 15.2513C13.2019 15.4095 13.292 15.6233 13.2949 15.8471C13.2977 16.0708 13.2131 16.2868 13.0589 16.449L11.8449 17.663C11.4998 18.0082 11.09 18.2821 10.639 18.4689C10.188 18.6557 9.70461 18.7519 9.21644 18.7519C8.72827 18.7519 8.24489 18.6557 7.79389 18.4689C7.34288 18.2821 6.9331 18.0082 6.58794 17.663C6.24216 17.3181 5.9678 16.9084 5.78057 16.4573C5.59334 16.0062 5.49692 15.5226 5.49683 15.0342C5.49673 14.5458 5.59297 14.0622 5.78003 13.6111C5.96708 13.1599 6.24129 12.7501 6.58694 12.405L7.80094 11.191L8.60494 10.387C8.95008 10.041 9.36005 9.76628 9.8114 9.57872C10.2627 9.39116 10.7466 9.29438 11.2354 9.29391C11.7242 9.29345 12.2082 9.38931 12.66 9.57601C13.1117 9.76272 13.5221 10.0366 13.8679 10.382C14.0289 10.543 14.1194 10.7614 14.1194 10.989C14.1194 11.2167 14.0289 11.4351 13.8679 11.596C13.707 11.757 13.4886 11.8475 13.2609 11.8475C13.0333 11.8475 12.8149 11.757 12.6539 11.596C12.4674 11.4101 12.2461 11.2627 12.0026 11.1624C11.7591 11.062 11.4983 11.0106 11.2349 11.011C10.9715 11.0115 10.7109 11.0638 10.4677 11.1651C10.2246 11.2663 10.0038 11.4145 9.81794 11.601L9.01394 12.404L7.79994 13.618C7.61366 13.8037 7.46589 14.0244 7.36508 14.2673C7.26428 14.5103 7.21244 14.7707 7.21253 15.0337C7.21263 15.2968 7.26465 15.5572 7.36563 15.8001C7.4666 16.0429 7.61453 16.2635 7.80094 16.449C7.98669 16.635 8.20726 16.7825 8.45006 16.8832C8.69286 16.9838 8.95311 17.0356 9.21594 17.0356C9.47877 17.0356 9.73903 16.9838 9.98182 16.8832C10.2246 16.7825 10.4452 16.635 10.6309 16.449L11.8459 15.236Z"
            fill="currentColor"
          ></path>
        </svg>   
        </div>
        <div className="share-page-link-content">
            <span>{currentUrl}</span>
            <button
            className="share-page-link-copy"
            onClick={copyToClipboard}>
          {copied ? "Copied!" : "Copy Link"}
        </button>
        </div>

        
        
      </div>
    )
  }

  function DisplayMember({ member }) {
    const clickableMember = member.email ? "clickable-member" : ""

    return (
      <div
        className={`share-page-member-container ${clickableMember}`}
        onClick={() => toggleBoardMember(member, "add")}
      >
        <img
          className="share-page-member-avatar"
          alt={`Member ${member._id}`}
          src={member.avatar}
        />
        <div className="share-page-member-description">
          <div className="share-page-member-title">{member.fullname}</div>
          {/* <div className="share-page-member-mail">{member.email}</div> */}
        </div>
        {clickableMember === "" && (
          <button
            className="share-page-close-button"
            onClick={(e) => {
              e.stopPropagation()
              toggleBoardMember(member, "remove")
            }}
          >
            <SvgServices name="SvgcloseTop" />
          </button>
        )}
      </div>
    )
  }
  function toggleBoardMember(member, action) {
    let newBoardMembers = [...board.boardMembers]
    console.log("newBoardMembers", newBoardMembers)
    console.log(action, "member", member)
    if (action === "add") {
      console.log("adding member", member)
      const cutMember = {
        _id: member._id,
        fullname: member.fullname,
        avatar: member.avatar,
      }
      newBoardMembers.push(cutMember)
    }
    if (action === "remove") {
      const index = newBoardMembers.findIndex(
        (boardMember) => boardMember._id === member._id
      )
      if (index !== -1) {
        newBoardMembers.splice(index, 1)
      }
      //    dispatch(updateBoardMembers({...board.boardMembers.splice(boardMember=> boardMember._id === member._id)}))
    }
    console.log("newBoardMembers", newBoardMembers)
    dispatch(updateBoardMembers(newBoardMembers))
  }

  return (
    <div className="layer-manager-overlay" style={{ display: showModal }}>
      <div className="share-page-background positioning-horizontal ">
        <div className="positioning-vertical">
          <div
            className="share-page-wrapper"
            // onClick={()=> exitShare()}
          >
            <div className="share-page-container">
              <div className="share-page-header" style={{ fontSize: "20px" }}>
                <div>Board Members</div>
                <button
                  className="share-page-close-button"
                  onClick={() => exitShare()}
                >
                  <SvgServices name="SvgcloseTop" />
                </button>
              </div>
              <div className="share-page-link-wrapper">
                <SharePageLink></SharePageLink>
              </div>
              <div className="share-page-members">
                <div className="share-page-members-list-container">
                  <div className="share-page-members-list">
                    {board.boardMembers.map((member) => (
                      <div
                        // onClick={() => handleDeleteMember(member)}
                        key={member._id}
                        className="share-page-member-wrapper"
                      >
                        <DisplayMember member={member} />
                      </div>
                    ))}
                  </div>
                  <div>Available Members</div>
                  <div className="share-page-members-list">
                    {availableMembers !== "" &&
                      availableMembers.map((member) => (
                        <div
                          // onClick={() => handleDeleteMember(member)}
                          key={member._id}
                          className="share-page-member-wrapper"
                        >
                          <DisplayMember member={member} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
