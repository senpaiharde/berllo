import { useDispatch, useSelector } from "react-redux"
import { toggleShareModal, updateBoardMembers } from "../../redux/BoardSlice"
import { SvgServices } from "../../services/svgServices"
import { useState, useEffect } from "react"
import backendHandler, { TaskOps } from "../../services/backendHandler"
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
        className="share-page-link"
        style={{ display: "flex", gap: "8px", alignItems: "center" }}
      >
        <span>{currentUrl}</span>
        <button onClick={copyToClipboard}>
          {copied ? "Copied!" : "Copy Link"}
        </button>
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
              <div className="share-page-link">
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
