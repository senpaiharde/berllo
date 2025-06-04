import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../../../../redux/TaskDetailsSlice';
import { TaskOps } from '../../../../services/backendHandler';
import { formatDistanceToNow, isToday, format } from 'date-fns';
import { SvgServices } from '../../../../services/svgServices';
import DescriptionEditor from './DescriptionEditor';

const TaskDetailsActivity = () => {
  const dispatch = useDispatch();

  const task = useSelector((state) => state.taskDetailsReducer?.activities);
  const { selectedTask, activities, loading, error } = useSelector((s) => s.taskDetailsReducer);

  const lastTaskId = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (html) => {
    dispatch(
      liveUpdateTask({
        method: 'update',
        workId: 'tasks',
        Activity: html,
      })
    );
    setIsEditing(false);
  };
  //fetch only once when a new task is opened
  useEffect(() => {
    const id = selectedTask?._id;
    if (!id || lastTaskId.current === id) return;
    lastTaskId.current = id;

    dispatch(liveUpdateTask({ method: TaskOps.FETCH, workId: 'activities' }));
  }, [selectedTask?._id, dispatch]);

  if (!selectedTask) return null;

  // turn raw evt into a human sentence
  const renderActivityMessage = (evt) => {
    const user = evt.userName || (String(evt.user) === '000000000000000000000000' && 'Dima blat');
    switch (evt.action) {
      case 'updated_task':
        if (evt.payload?.isDueComplete) {
          return evt.payload?.isDueComplete
            ? ` marked this card as complete`
            : ` marked this card as incomplete`;
        }
        if (evt.payload?.dueDate) {
          const d = new Date(evt.payload?.dueDate);
          return ` changed the due date of this card to ${format(d, 'd MMM')} ${format(d, 'HH:mm')}`;
        }
        if (evt.payload?.labels) {
          return ` updated labels`;
        }
        if (evt.payload?.Activity) {
          return ``;
        }

        if (evt.payload?.checklist) {
          return ` added a checklist to this card`;
        }
        if (evt.payload?.attachments) {
          return ``;
        }
        if (evt.payload?.description) {
          return ` updated description`;
        }
        return ` updated this card`;

      case 'added_comment':
        return ` commented`;

      case 'added_attachment':
        return ` added an attachment`;

      case 'deleted_attachment':
        return ` removed an attachment`;

      case 'joined_task':
        return ` joined this card`;

      default:
        return ` ${evt.action.replace(/_/g, ' ')}`;
    }
  };

  return (
    <section className="td-section-description-main">
      <div className="td-section-attachment-container">
        <div className="SvgLefSvg">
          <SvgServices name="ActivitySvg" />
        </div>
        <div className="td-section-attachment-containerDiv">
          <div className="td-section-header-attackment">Activity</div>
          <button className="ActivityButton">Show details</button>
        </div>
      </div>

      <div className="containerActivity">
        {isEditing ? (
          <div className="task-description-editor">
            <DescriptionEditor
              textarea={'116px'}
              height={'155px'}
              textarea1yes={'64px'}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        ) : (
          <div className="containerActivityCommand">
            <div className="containerMembers">
              <button onClick={() => setIsEditing(true)} className="containerActivityADDCommand">
                Write a comment...
              </button>
            </div>
          </div>
        )}

        {loading && <div>Loading activity…</div>}
        {error && <div className="error">Error: {error}</div>}

        {activities.slice(0, 30).map((evt) => {
          const atts = evt.payload?.attachments || [];
          const last = Array.isArray(atts) && atts.length ? atts[atts.length - 1] : null;

          return (
            <div key={evt.id} className="containerActivityEntry">
              <a className="attackMentsInsideActivity" href={evt.url} title={evt.name}>
                <div
                  className="attachment-thumbnail"
                  style={{ backgroundImage: `url(${evt.userAvatar})` }}
                />
              </a>
              <div className="containerActivityDetails">
                <div className="containerActivityAction">
                  <span className="containerActivityActionName">
                    {evt.userName}
                    {'  '}
                    {last && (
                      <a style={{ fontWeight: '100' }}> attached {last.name} to this card</a>
                    )}
                    {evt.payload?.Activity && (
                      <a style={{ marginLeft: '5px' }} className="containerActivityTime">
                        {isToday(new Date(evt.createdAt))
                          ? `${formatDistanceToNow(new Date(evt.createdAt))} ago`
                          : format(new Date(evt.createdAt), 'dd MMM yyyy, HH:mm')}
                      </a>
                    )}
                  </span>
                  {renderActivityMessage(evt)}
                </div>

                {!evt.payload?.Activity && (
                  <a className="containerActivityTime">
                    {isToday(new Date(evt.createdAt))
                      ? `${formatDistanceToNow(new Date(evt.createdAt))} ago`
                      : format(new Date(evt.createdAt), 'dd MMM yyyy, HH:mm')}
                  </a>
                )}

                {last && (
                  <>
                    {' '}
                    <img
                      className="containerActivityImage"
                      src={last.url}
                      alt={last.name || 'Attachment'}
                      title={last.name}
                    />
                  </>
                )}
                {evt.payload?.Activity && (
                  <div className="containerActivityCommand">
                    <div className="containerMembers">
                      <button className="containerActivityDescription">
                        {evt.payload?.Activity}
                      </button>
                    </div>
                  </div>
                )}

                {evt.payload?.description && <div className="containerActivityProp"></div>}
                {evt.payload?.checklist && <div className="containerActivityProp"></div>}
                {evt.payload?.labels && <div className="containerActivityProp"></div>}
              </div>
            </div>
          );
        })}

        {!loading && activities.length === 0 && <div className="noActivity">No activity yet.</div>}
      </div>
    </section>
  );
};

export default TaskDetailsActivity;
