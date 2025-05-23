import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../../../../redux/taskDetailsSlice';
import { TaskOps } from '../../../../services/backendHandler';
import { formatDistanceToNow, isToday, format } from 'date-fns';
import { SvgServices } from '../../../../services/svgServices';

const TaskDetailsActivity = () => {
  const dispatch = useDispatch();
  const { selectedTask, activities, loading, error } = useSelector((s) => s.taskDetailsReducer);

  const lastTaskId = useRef(null);

  // fetch only once when a new task is opened
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
        if ('isDueComplete' in evt.payload) {
          return evt.payload.isDueComplete
            ? `${user} marked this card as complete`
            : `${user} marked this card as incomplete`;
        }
        if (evt.payload.taskDueDate) {
          const d = new Date(evt.payload.taskDueDate);
          return `${user} set this card to be due ${format(d, 'd MMM')} at ${format(d, 'HH:mm')}`;
        }
        if (evt.payload.labels) {
          return `${user} updated labels`;
        }
        if (evt.payload.checklist) {
          return `${user} added a checklist to this card`;
        }
        if (evt.payload.attachments) {
          return `${user} added an attachment`;
        }
        if (evt.payload.description) {
          return `${user} updated description`;
        }
        return `${user} updated this card`;

      case 'added_comment':
        return `${user} commented`;

      case 'added_attachment':
        return `${user} added an attachment`;

      case 'deleted_attachment':
        return `${user} removed an attachment`;

      case 'joined_task':
        return `${user} joined this card`;

      default:
        return `${user} ${evt.action.replace(/_/g, ' ')}`;
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
        <div className="containerActivityCommand">
          <div className="containerMembers">
            <button className="containerActivityADDCommand">Write a comment...</button>
          </div>
          <div className="containerActivityADD" />
        </div>

        {loading && <div>Loading activity…</div>}
        {error && <div className="error">Error: {error}</div>}

        {activities.map((evt) => (
          <div key={evt.id} className="containerActivityEntry">
            <div className="containerActivityDetails">
              <div className="containerActivityAction">{renderActivityMessage(evt)}</div>

              {/* Show full image if attachment */}
              {evt.payload.attachments && (<> <a
                  className="containerActivityImage"
                  href={evt.payload.attachments[0].url}
                  alt="Attachment"
                  download={evt.payload.attachments[0].name}
                    title={evt.payload.attachments[0].name}
                
                />
                <button onClick={() => (console.log(evt.payload.attachments[0].url))}>2</button></>
               
              )}
 
              {/* Show new description text */}
              {evt.payload.description && (
                <div className="containerActivityProp"></div>
              )}

              {/* Show only notice for labels update */}
              {evt.payload.labels && <div className="containerActivityProp">Labels updated</div>}

              <div className="containerActivityTime">
                {isToday(new Date(evt.createdAt))
                  ? `${formatDistanceToNow(new Date(evt.createdAt))} ago`
                  : format(new Date(evt.createdAt), 'dd MMM yyyy, HH:mm')}
              </div>
            </div>
          </div>
        ))}

        {!loading && activities.length === 0 && <div className="noActivity">No activity yet.</div>}
      </div>
    </section>
  );
};

export default TaskDetailsActivity;
