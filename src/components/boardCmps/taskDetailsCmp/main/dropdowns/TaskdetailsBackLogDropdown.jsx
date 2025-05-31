import React, { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"

import BackLogDropdown from "./BackLogDropdown"
import { SvgServices } from "../../../../../services/svgServices"
import { liveUpdateTask, syncTaskAsync,setCopiedTask } from "../../../../../redux/taskDetailsSlice"
import {
  addTaskToBoard,
  removeTaskFromBoard,
  updateTasklistOrderAndSync,
  updatePreviewEditorPositon,
} from "../../../../../redux/BoardSlice"
import { TaskOps } from "../../../../../services/backendHandler"
import { transformTaskFromBackend } from "../../../../../services/backendDataConverionToState"

const TaskdetailsBackLogDropdown = ({ trigger, onClose, Header }) => {
  const dispatch = useDispatch()
  const board = useSelector((s) => s.boardReducer)
  const workspace = useSelector((s) => s.workSpaceReducer)
  const task = useSelector((s) => s.taskDetailsReducer.selectedTask)

  const [boardId, setBoardId] = useState("")
  const [listId, setListId] = useState("")
  const [position, setPosition] = useState("")

  useEffect(() => {
    if (task) {
      setBoardId(task?.board || task?.taskboard || task.task?.board)
      setListId(task?.list || task?.taskList)
      const sourceIndex = board.boardLists.findIndex((l) => l._id === task.list)
      setSource({
      droppableId: task?.list,
      index: board.boardLists[sourceIndex].taskList?.findIndex(
        (l) => l._id === task._id
      ),
    })
    }
  }, [task])

  useEffect(() => {
    const targetPosition = Number(position) - 1

    setDestination({droppableId: listId,
      index: targetPosition,})
  }, [position, listId])
  

  const boardOptions = useMemo(() => {
    return (
      workspace.boards?.map((b) => ({
        id: b._id,
        title: b.boardTitle || "Untitled Board",
      })) || []
    )
  }, [workspace.boards])

  const listOptions = useMemo(() => {
    return (
      board.boardLists?.map((l) => ({
        id: l._id,
        title: l.taskListTitle || "Untitled List",
      })) || []
    )
  }, [board.boardLists])

  const listObj = useMemo(() => {
    return board.boardLists?.find((l) => l._id === listId)
  }, [board.boardLists, listId])

  const sortedTasks = useMemo(() => {
    if (!listObj || !Array.isArray(listObj.taskList)) return []
    return listObj.taskList
      .slice()
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
  }, [listObj])

  useEffect(() => {
    if (!task?._id || !listObj?.taskList) return

    const idx = listObj.taskList.findIndex((t) => t._id === task._id)
    setPosition(
      idx >= 0 ? String(idx + 1) : String((listObj.taskList.length ?? 0) + 1)
    )
  }, [task?._id, listObj?.taskList])

  const positionOptions = useMemo(() => {
    const count = listObj?.taskList?.length ?? 0

    return Array.from({ length: count + 1 }, (_, i) => ({
      id: String(i + 1),
      title: i + 1 === count + 1 ? `${i + 1} to Last` : `${i + 1}`,
    }))
  }, [listObj?.taskList])

  useEffect(() => {
    if (!task?._id || !sortedTasks.length) return

    const idx = sortedTasks.findIndex((t) => t._id === task._id)
    setPosition(idx >= 0 ? String(idx + 1) : String(sortedTasks.length + 1))
  }, [task?._id, sortedTasks])
  
  // let destination = null
  // let source = null
  const [source, setSource] = useState(null)
  const [destination, setDestination] = useState(null)

  const handleMove = () => {
    console.log("🔥 handleMove fired")
    console.log("position",position,"listId",listId)
    const targetPosition = Number(position) - 1
    // const { destination, source, draggableId } = result
    // console.log("onDragEnd taskList", draggableId, destination, source)
    // destination = {
    //   droppableId: listId,
    //   index: targetPosition,
    // }
    // setDestination({droppableId: listId,
    //   index: targetPosition,})
    console.log("onDragEnd taskList board.boardLists", board.boardLists)
    // const sourceIndex = board.boardLists.findIndex((l) => l._id === task.list)
    // console.log(
    //   "onDragEnd taskList source task.list",
    //   task.list,
    //   " sourceIndex ",
    //   sourceIndex
    // )
    // source = {
    //   droppableId: task?.list,
    //   index: board.boardLists[sourceIndex].taskList?.findIndex(
    //     (l) => l._id === task._id
    //   ),
    // }
    // setSource({
    //   droppableId: task?.list,
    //   index: board.boardLists[sourceIndex].taskList?.findIndex(
    //     (l) => l._id === task._id
    //   ),
    // })
    console.log("onDragEnd taskList task._id =draggableId", task._id)
    console.log("onDragEnd taskList source", source)
    console.log("onDragEnd taskList destination", destination)

    let copiedTask = null
    if (Header !== "100") {
      copiedTask = {
        title: task.title,
        checklist: "",
        labels: "",
        members: "",
        attachments: "",
        comments: ""

      }
      if (inputValue !== "") {
        copiedTask.title = inputValue
      }
      if (keepChecklists) {
        // copiedTask = { ...copiedTask, checklist: task.checklist }
        copiedTask = { ...copiedTask, checklist: "checklist" }
      }
      if (keepLabels) {
        // copiedTask = { ...copiedTask, labels: task.labels }
        copiedTask = { ...copiedTask, labels: "labels" }
      }
      if (keepMembers) {
        // copiedTask = { ...copiedTask, members: task.members }
        copiedTask = { ...copiedTask, members: "members" }
      }
      if (keepAttachments) {
        // copiedTask = { ...copiedTask, attachments: task.attachments }
        copiedTask = { ...copiedTask, attachments: "attachments" }
      }
      if (keepComments) {
        // copiedTask = { ...copiedTask, comments: task.comments }
        copiedTask = { ...copiedTask, comments: "comments" }
      }

      console.log("copiedTask", copiedTask)
      dispatch(
        syncTaskAsync({
          method: TaskOps.ADD,
          args: {
            copying: true,
            body: {
              method: TaskOps.ADD,
              workId: "tasks",
              board: task.taskboard,
              // title: copiedTask.value,
              position: targetPosition,
              listId: listId,
              ...copiedTask,
              copying: true,
              originalTaskId: task._id
            },
          },

          workId: "tasks",
        })
      )
      setCopyingTask(true)
      return
    }
    // const transformedCopiedTask =transformTaskFromBackend(copiedTask)
    
    dispatch(updateTasklistOrderAndSync({ draggableId: task._id, destination, source ,copiedTask: null }))
    dispatch(updatePreviewEditorPositon(null))
    // dispatch(removeTaskFromBoard({ _id: task._id, taskList: task.taskList }));

    // dispatch(
    //   addTaskToBoard({
    //     ...task,
    //     taskList: listId,
    //     taskboard: boardId,
    //     position: targetPosition,
    //   })
    // );

    // dispatch(
    //   liveUpdateTask({
    //     method: TaskOps.UPDATE,
    //     workId: 'tasks',

    //     taskList: listId,
    //     taskboard: boardId,
    //     position: targetPosition,
    //   })
    // );

    onClose()
  }
  const copiedTaskStatus = useSelector((s) => s.taskDetailsReducer.copiedTask)
  
  const [copyingTask,setCopyingTask] = useState(false)
  const [hovering, setHovering] = useState(null)
  const [keepChecklists, setKeepChecklists] = useState(false)
  const [keepLabels, setKeepLabels] = useState(false)
  const [keepMembers, setKeepMembers] = useState(false)
  const [keepAttachments, setKeepAttachments] = useState(false)
  const [keepComments, setKeepComments] = useState(false)
  const [inputValue, setInputValue] = useState(task.title || "")
  useEffect(() => {
    //received new created task from backend and updating board
    if(copiedTaskStatus){
      console.log("copiedTaskStatus destination, source",destination, source)
      const transformedCopiedTask = transformTaskFromBackend(task)
      dispatch(updateTasklistOrderAndSync({ draggableId: task._id, destination, source ,copiedTask: transformedCopiedTask }))
      setCopyingTask(false)
      dispatch(setCopiedTask(false))
      dispatch(updatePreviewEditorPositon(null))
      onClose()
    }
  }, [copiedTaskStatus])
  return (
    <div className="DropdownUi">
      {Header === "100" ? (
        <div className="DropdownUiHeader">
          <h2 className="DropdownHeaderH2">Move Card</h2>
          <button className="DropdownClose" onClick={onClose}>
            <SvgServices name="SvgClose" />
          </button>
        </div>
      ) : (
        <div>
          {" "}
          <div className="DropdownUiHeader">
            <h2 className="DropdownHeaderH2">Copy Card</h2>
            {copyingTask && <h2>copying Task...</h2>}
            <button className="DropdownClose" onClick={onClose}>
              <SvgServices name="SvgClose" />
            </button>
          </div>

        </div>
      )}

      <div className="DropdownOptions" style={{ gap: "0px" }}>
        {Header === "100" ? (
          <h4 className="WorkflowAreah4">Select destination</h4>
        ) : (
          <>
            <h4 className="WorkflowAreah4">Name</h4>
            <textarea
              className="CopyCardTextarea"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <h4 className="WorkflowAreah4">keep...</h4>
            <div className="keepSection">
              {task.checklist.length > 0 && (
                <div
                  // key={key}
                  className="checklist-item-wrapper"
                  style={{ position: "relative", marginLeft: "0px" }}
                  // onMouseEnter={() => setHovering(key)}
                  // onMouseLeave={() => setHovering(null)}
                >
                  {keepChecklists === true ? (
                    <span
                      onClick={() => setKeepChecklists(false)}
                      className="checklist-item-wrapper-done"
                    >
                      <div className="checklistDone">
                        <SvgServices name="checklistDone" />
                      </div>
                    </span>
                  ) : (
                    <span
                      onClick={() => setKeepChecklists(true)}
                      className="checklist-item-wrapper-Undone"
                    ></span>
                  )}

                  <label
                    className="checklistAvi "
                    style={{ marginTop: "12px" }}
                  >{`checklist (${task.checklist.length})`}</label>
                </div>
              )}
              {task.labels.length && (
                <div
                  // key={key}
                  className="checklist-item-wrapper"
                  style={{ position: "relative", marginLeft: "0px" }}
                  // onMouseEnter={() => setHovering(key)}
                  // onMouseLeave={() => setHovering(null)}
                >
                  {keepLabels > 0 === true ? (
                    <span
                      onClick={() => setKeepLabels(false)}
                      className="checklist-item-wrapper-done"
                    >
                      <div className="checklistDone">
                        <SvgServices name="checklistDone" />
                      </div>
                    </span>
                  ) : (
                    <span
                      onClick={() => setKeepLabels(true)}
                      className="checklist-item-wrapper-Undone"
                    ></span>
                  )}

                  <label
                    className="checklistAvi "
                    style={{ marginTop: "12px" }}
                  >{`Labels (${task.labels.length})`}</label>
                </div>
              )}
              {task.members.length > 0 && (
                <div
                  // key={key}
                  className="checklist-item-wrapper"
                  style={{ position: "relative", marginLeft: "0px" }}
                  onMouseEnter={() => setHovering(key)}
                  onMouseLeave={() => setHovering(null)}
                >
                  {keepMembers === true ? (
                    <span
                      onClick={() => setKeepMembers(false)}
                      className="checklist-item-wrapper-done"
                    >
                      <div className="checklistDone">
                        <SvgServices name="checklistDone" />
                      </div>
                    </span>
                  ) : (
                    <span
                      onClick={() => setKeepMembers(true)}
                      className="checklist-item-wrapper-Undone"
                    ></span>
                  )}

                  <label
                    className="checklistAvi "
                    style={{ marginTop: "12px" }}
                  >{`Members (${task.members.length})`}</label>
                </div>
              )}
              {task.attachments.length > 0 && (
                <div
                  // key={key}
                  className="checklist-item-wrapper"
                  style={{ position: "relative", marginLeft: "0px" }}
                  onMouseEnter={() => setHovering(key)}
                  onMouseLeave={() => setHovering(null)}
                >
                  {keepAttachments === true ? (
                    <span
                      onClick={() => setKeepAttachments(false)}
                      className="checklist-item-wrapper-done"
                    >
                      <div className="checklistDone">
                        <SvgServices name="checklistDone" />
                      </div>
                    </span>
                  ) : (
                    <span
                      onClick={() => setKeepAttachments(true)}
                      className="checklist-item-wrapper-Undone"
                    ></span>
                  )}

                  <label
                    className="checklistAvi "
                    style={{ marginTop: "12px" }}
                  >{`Attachments (${task.attachments.length})`}</label>
                </div>
              )}
              {task.comments.length > 0 && (
                <div
                  // key={key}
                  className="checklist-item-wrapper"
                  style={{ position: "relative", marginLeft: "0px" }}
                  onMouseEnter={() => setHovering(key)}
                  onMouseLeave={() => setHovering(null)}
                >
                  {keepComments === true ? (
                    <span
                      onClick={() => setKeepComments(false)}
                      className="checklist-item-wrapper-done"
                    >
                      <div className="checklistDone">
                        <SvgServices name="checklistDone" />
                      </div>
                    </span>
                  ) : (
                    <span
                      onClick={() => setKeepComments(true)}
                      className="checklist-item-wrapper-Undone"
                    ></span>
                  )}

                  <label
                    className="checklistAvi "
                    style={{ marginTop: "12px" }}
                  >{`Comments (${task.comments.length})`}</label>
                </div>
              )}
            </div>
            {/* <label className='checklistAvi'>checklist</label> */}
            <h4 className="WorkflowAreah4">Copy to...</h4>
          </>
        )}

        {/* ):(<div > <div className="DropdownUiHeader">
                <h2 className="DropdownHeaderH2">Copy Card</h2>
                <button className="DropdownClose" onClick={onClose}>
                    <SvgServices name='SvgClose'/>
                  
                </button>
              </div></div>)}

      <div className="DropdownOptions" style={{ gap: '0px' }}>
       {Header  === '100'?(<h4 className="WorkflowAreah4">Select destination</h4>)
       :
       
       (<>
        <h4 className="WorkflowAreah4">Name</h4>
                <textarea className='CopyCardTextarea'/>
                <h4 className="WorkflowAreah4">keep...</h4>
                <div className='keepSection'></div>
                <label className='checklistAvi'>checklist</label>
                 <h4 className="WorkflowAreah4">Copy to...</h4>

       </>)}  */}

        <div className="workFlowCard">
          <div className="BoardReminderWrapper">
            <div className="WorkflowArea">
              <BackLogDropdown
                label="Board"
                options={boardOptions}
                value={boardId}
                onselect={setBoardId}
              />
            </div>
          </div>

          <div className="WorkflowRow">
            <div className="WorkflowList">
              <BackLogDropdown
                label="List"
                options={listOptions}
                value={listId}
                onselect={setListId}
                disabled={listOptions.length === 0}
              />
            </div>

            <div className="WorkflowPosition">
              <BackLogDropdown
                label="Position"
                options={positionOptions}
                value={position}
                onselect={setPosition}
                disabled={positionOptions.length === 0}
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleMove}
          disabled={!boardId || !listId || !position}
          className="MoveCardButton"
        >
          Move
        </button>
      </div>
    </div>
  )
}

export default TaskdetailsBackLogDropdown
